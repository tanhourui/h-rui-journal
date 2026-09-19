import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import test from 'node:test';

const source = await readFile(new URL('../src/scripts/atlas.js', import.meta.url), 'utf8');
const component = await readFile(new URL('../src/components/Atlas.astro', import.meta.url), 'utf8');
const story = await readFile(new URL('../src/pages/journey/[...slug].astro', import.meta.url), 'utf8');
const selectSource = source.slice(source.indexOf('function select('), source.indexOf("\nroot.querySelectorAll('[data-dest]')"));
test('ordinary page scrolling has no pinned scene or scroll-driven transforms',()=>{
  assert.doesNotMatch(source,/scrollProgress|scrollWorld|scrollStage|scrub/);
  assert.doesNotMatch(component,/atlas-scroll-stage|scrub|position:sticky|65dvh/);
  assert.match(source,/scene.add\(globe\)/);
  assert.match(component,/translate3d\(var\(--photo-x,0px\),var\(--photo-y,0px\),0\)/);
  assert.doesNotMatch(source,/addEventListener\(['"](?:scroll|wheel)['"]/);
});
function node(dataset = {}) {
  return { dataset, hidden:false, style:{}, attrs:{}, setAttribute(k,v){this.attrs[k]=v;} };
}
test('night lights are restricted to visited countries and disabled outside dusk',async()=>{
  const start=source.indexOf('const countryIds=');
  const end=source.indexOf("const nightMap=",start);
  const context={journeys:{one:{country:'japan'},two:{country:'malaysia'},three:{country:'thailand'},four:{country:'vietnam'}},land:{features:['392','458','764','704','156','410'].map(id=>({id}))}};
  vm.createContext(context);vm.runInContext(source.slice(start,end)+'globalThis.result=visitedLand;',context);
  assert.deepEqual(Array.from(context.result.features,f=>f.id),['392','458','764','704']);
  assert.match(source,/surface.emissiveIntensity=dusk\?\.25:0/);
  assert.match(source,/surface.emissive.set\(css.getPropertyValue\('--sub-secondary'\)/);
  assert.match(source,/routeMaterial.color.set\(css.getPropertyValue\('--sub-accent'\)/);
  const curve=source.match(/const value=(Math.round\(Math.pow\(light,[\d.]+\)\*255\));/)[1];
  const intensity=light=>vm.runInNewContext(curve,{Math,light});
  assert.equal(intensity(0),0);
  assert.equal(intensity(1),255);
  assert.ok(intensity(.25)<64,'diffuse outskirts must be suppressed, not boosted');
  assert.ok(intensity(.5)>intensity(.25),'retain city brightness hierarchy');
  assert.match(source,/nightTexture.dispose\(\)/);
  const {default:sharp}=await import('sharp');
  const metadata=await sharp(await readFile(new URL('../public/atlas-earth-night.jpg',import.meta.url))).metadata();
  assert.equal(metadata.width,2048);assert.equal(metadata.height,1024);
});
function fixture() {
  const journeys = { japan:{country:'japan',states:[{slug:'japan/one',title:'One',coords:[139,35]},{slug:'japan/two',title:'Two',coords:[138,34]}]}, vietnam:{country:'vietnam',states:[{slug:'vietnam/one',title:'Hanoi',coords:[105,21]}]} };
  const panels=Object.keys(journeys).map(key=>{
    const panel=node({era:key}); panel.select={value:''}; panel.echo={};
    panel.buttons=journeys[key].states.map((_,i)=>node({chapter:String(i)}));
    panel.photos=journeys[key].states.map((_,i)=>{const p=node({photo:String(i)});p.img=node();p.querySelector=()=>p.img;return p;});
    panel.querySelector=s=>s==='select'?panel.select:panel.echo;
    panel.querySelectorAll=s=>s==='[data-chapter]'?panel.buttons:panel.photos;
    return panel;
  });
  const destinations=Object.keys(journeys).map(key=>node({dest:key}));
  const context={journeys,eraKey:'japan',chapter:0,url:new URL('http://localhost:3000/atlas-preview'),host:node(),URL,Math,String,Number,
    root:{querySelectorAll:s=>s==='[data-era]'?panels:destinations},
    keyFor:s=>s.replace(/[^a-zA-Z0-9_-]/g,'-'),
    focusGlobe:()=>{},location:{href:'http://localhost:3000/atlas-preview'},history:{replaceState(...args){context.url=args[2];}}};
  vm.createContext(context);vm.runInContext(selectSource,context);
  return {context,panels,destinations};
}
test('Atlas changes the visible era, chapter, transition names and URL together',()=>{
  const {context,panels,destinations}=fixture(); context.select('japan',1);
  assert.equal(panels[0].hidden,false);assert.equal(panels[1].hidden,true);
  assert.equal(panels[0].photos[0].hidden,true);assert.equal(panels[0].photos[1].hidden,false);
  assert.equal(panels[0].buttons[1].attrs['aria-pressed'],'true');
  assert.equal(panels[0].photos[1].img.style.viewTransitionName,'photo-japan-two');
  assert.equal(context.url.searchParams.get('chapter'),'japan/two');
  context.select('vietnam');assert.equal(destinations[1].attrs['aria-pressed'],'true');assert.equal(panels[0].hidden,true);
});
test('invalid eras are ignored and chapter indices are bounded',()=>{
  const {context,panels}=fixture();context.select('missing');assert.equal(context.eraKey,'japan');
  context.select('japan',99);assert.equal(context.chapter,1);
  context.select('japan',-4);assert.equal(context.chapter,0);assert.equal(panels[0].photos[0].hidden,false);
});
test('ambient motion is bounded and gated by pause, reduced motion, drag and visibility',()=>{
  assert.match(source,/if\(document.hidden\)return/);
  assert.match(source,/if\(!paused&&!reduced.matches&&!dragging\)/);
  assert.match(source,/\.05236\*\(Math.sin\(nextPhase\)-Math.sin\(phase\)\)/);
  let sum=0,phase=0;for(let i=0;i<1440;i++){const next=phase+(1/60)*Math.PI*2/24;sum+=.05236*(Math.sin(next)-Math.sin(phase));assert.ok(Math.abs(sum)<=.052361);phase=next;}
  assert.ok(Math.abs(sum)<1e-8);
});
test('Atlas preserves ordinary story navigation and returns to the homepage chapter',()=>{
  assert.match(component,/href=\{`\/journey\/\$\{s.slug\}\?from=atlas`\}/);
  assert.match(story,/const returnHref = `\/\?country=/);
  assert.match(story,/chapter=\$\{encodeURIComponent\(entry.slug\)\}/);
});
test('WebGL failure has a map fallback and mobile/reduced-motion remove photo perspective',()=>{
  assert.match(source,/webglcontextlost/);assert.match(source,/dispose\(\);fallback\(\)/);
  assert.match(source,/initWorld\(\).catch/);assert.match(source,/geoOrthographic/);
  assert.match(component,/@media\(max-width:999px\)/);
  assert.match(component,/@media\(prefers-reduced-motion:reduce\)\{.photo-space\{transform:none/);
});

test('reference correction uses deliberate perspective without sideways roll and geographic detail',async()=>{
  assert.doesNotMatch(component,/rotateZ\(/);
  assert.match(component,/rotateY\(12deg\)/);
  assert.match(source,/sphereGeometry.rotateY\(-Math.PI\/2\)/);
  assert.match(source,/bumpMap:bumpTexture/);
  assert.match(source,/TubeGeometry/);
  assert.match(source,/reliefTexture.dispose\(\)/);
  assert.match(source,/pinGlow.dispose\(\)/);
  assert.match(source,/AbortSignal.timeout\(2500\)/);
  const atlas=JSON.parse(await readFile(new URL('../public/atlas-countries-50m.json',import.meta.url),'utf8'));
  assert.equal(atlas.type,'Topology');
  assert.ok(atlas.objects.countries.geometries.length>150);
  assert.ok(atlas.arcs.length>1000);
});

test('sculpted material uses studio lighting and relief without satellite colour imagery; drag stays live',()=>{
  assert.match(source,/MeshPhysicalMaterial/);
  assert.match(source,/PMREMGenerator/);
  assert.match(source,/bumpTexture.dispose\(\)/);
  assert.match(source,/satinTexture.dispose\(\)/);
  assert.match(source,/studio.dispose\(\)/);
  assert.match(source,/displacementScale:\.003/);
  assert.doesNotMatch(source,/atlas-earth-day|loadEarthImage/);
  assert.match(source,/setPointerCapture\(e.pointerId\)/);
  assert.match(source,/rotate\(e.clientX-lastX/);
});

test('real elevation and river assets supply charcoal terrain with bounded loading',async()=>{
  assert.match(source,/atlas-earth-elevation\.jpg/);
  assert.match(source,/AbortSignal.timeout\(4000\)/);
  assert.match(source,/mapContext.drawImage\(hillshadeMap,0,0\)/);
  assert.match(source,/bumpScale:\.085/);
  assert.match(source,/elevationContext.filter='blur\(0.65px\)'/);
  assert.match(source,/52\*Math.tanh\(slope\*3.2\/52\)/);
  assert.match(component,/atlas-terrain-credits\.txt/);
  const rivers=JSON.parse(await readFile(new URL('../public/atlas-rivers-50m.geojson',import.meta.url),'utf8'));
  assert.equal(rivers.type,'FeatureCollection');
  assert.ok(rivers.features.length>100);
  assert.ok(rivers.features.every(feature=>['LineString','MultiLineString'].includes(feature.geometry.type)));
  const {default:sharp}=await import('sharp');
  const elevation=await sharp(await readFile(new URL('../public/atlas-earth-elevation.jpg',import.meta.url))).metadata();
  assert.equal(elevation.width,5400);assert.equal(elevation.height,2700);
});

test('land/sea materials differ and peripheral blur has resize and disposal guards',()=>{
  assert.match(source,/landDetail\*landWeight\+seaDetail\*\(1-landWeight\)/);
  assert.match(source,/roughnessMap:roughTexture/);
  assert.match(source,/smoothstep\(\.76,\.98,distanceFromCenter\)/);
  assert.match(source,/focusTarget.setSize\(size.x,size.y\)/);
  assert.match(source,/focusTarget.dispose\(\)/);
  assert.match(source,/roughTexture.dispose\(\)/);
  assert.match(source,/renderer.setRenderTarget\(null\)/);
});
