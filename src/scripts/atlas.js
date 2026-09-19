// Ordinary DOM navigation works independently of the optional WebGL scene.
const root = document.querySelector('#atlas');
// Preview-only palette override; the published homepage remains time-based.
const previewTheme = new URLSearchParams(location.search).get('theme');
if (location.pathname.replace(/\/$/, '') === '/atlas-preview' && ['day','dawn','dusk'].includes(previewTheme)) {
  document.body.classList.remove('theme-dawn','theme-dusk');
  if (previewTheme !== 'day') document.body.classList.add(`theme-${previewTheme}`);
}
const journeys = JSON.parse(document.querySelector('#atlas-data').textContent);
const host = document.querySelector('#atlas-world');
const motion = document.querySelector('#atlas-motion');
const hint = document.querySelector('#atlas-hint');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
let eraKey = Object.keys(journeys)[0], chapter = 0, paused = reduced.matches;
let focusGlobe = () => {};
const keyFor = slug => slug.replace(/[^a-zA-Z0-9_-]/g, '-');
function select(era, index = 0, updateURL = true) {
  if (!journeys[era]?.states.length) return;
  eraKey = era;
  chapter = Math.max(0, Math.min(index, journeys[era].states.length - 1));
  const selected = journeys[era].states[chapter];
  root.querySelectorAll('[data-era]').forEach(panel => {
    const active = panel.dataset.era === era;
    panel.hidden = !active;
    panel.querySelector('select').value = panel.dataset.era;
    const echo = panel.querySelector('.photo-echo');
    if (active && echo) echo.src = journeys[era].states[(chapter + 1) % journeys[era].states.length].hero;
    panel.querySelectorAll('[data-chapter]').forEach(button => button.setAttribute('aria-pressed', String(active && Number(button.dataset.chapter) === chapter)));
    panel.querySelectorAll('[data-photo]').forEach(photo => {
      const visible = active && Number(photo.dataset.photo) === chapter;
      photo.hidden = !visible;
      photo.style.viewTransitionName = visible ? `chapter-${keyFor(selected.slug)}` : 'none';
      photo.querySelector('img').style.viewTransitionName = visible ? `photo-${keyFor(selected.slug)}` : 'none';
    });
  });
  root.querySelectorAll('[data-dest]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.dest === journeys[era].country)));
  host.setAttribute('aria-label', `Globe: ${selected.title}. Drag horizontally or use arrow keys to rotate.`);
  focusGlobe(selected.coords, journeys[era].states);
  if (updateURL) {
    const url = new URL(location.href);
    url.searchParams.set('era', era); url.searchParams.set('chapter', selected.slug);
    history.replaceState(null, '', url);
  }
}
root.querySelectorAll('[data-dest]').forEach(button => button.addEventListener('click', () => select(Object.keys(journeys).find(key => journeys[key].country === button.dataset.dest))));
root.querySelectorAll('[data-era-select]').forEach(el => el.addEventListener('change', () => select(el.value)));
root.querySelectorAll('[data-chapter]').forEach(button => button.addEventListener('click', () => select(button.closest('[data-era]').dataset.era, Number(button.dataset.chapter))));
const params = new URLSearchParams(location.search);
const initialEra = journeys[params.get('era')] ? params.get('era') : eraKey;
select(initialEra, Math.max(0, journeys[initialEra].states.findIndex(s => s.slug === params.get('chapter'))), false);
function syncMotion() {
  motion.textContent = reduced.matches ? 'Motion reduced' : paused ? 'Resume motion' : 'Pause motion';
  motion.disabled = reduced.matches; motion.setAttribute('aria-pressed', String(paused));
}
motion.addEventListener('click', () => { paused = !paused; syncMotion(); });
reduced.addEventListener('change', () => { paused = reduced.matches; syncMotion(); root.style.setProperty('--photo-x', '0px'); root.style.setProperty('--photo-y', '0px'); });
root.addEventListener('pointermove', event => {
  if (!finePointer.matches || reduced.matches || innerWidth < 1000) return;
  root.style.setProperty('--photo-x', `${(event.clientX / innerWidth - .5) * 10}px`);
  root.style.setProperty('--photo-y', `${(event.clientY / innerHeight - .5) * 6}px`);
});
root.addEventListener('pointerleave', () => { root.style.setProperty('--photo-x', '0px'); root.style.setProperty('--photo-y', '0px'); });
function fallback() {
  host.replaceChildren(); host.removeAttribute('tabindex'); motion.hidden = true;
  hint.textContent = 'Choose a country or chapter to explore';
  const {d3, topojson:topo, WORLD_ATLAS:atlas} = window;
  if (!d3 || !topo || !atlas) { host.textContent = 'Your journeys are ready below.'; return; }
  focusGlobe = coords => {
    const projection = d3.geoOrthographic().rotate([-coords[0], -coords[1]]).translate([340,340]).scale(300);
    const path = d3.geoPath(projection);
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.setAttribute('viewBox', '0 0 680 680');
    const sphere = document.createElementNS(svg.namespaceURI,'path');
    sphere.setAttribute('d',path({type:'Sphere'})); sphere.setAttribute('fill','var(--globe-base)');
    const coast = document.createElementNS(svg.namespaceURI,'path');
    coast.setAttribute('d',path(topo.mesh(atlas,atlas.objects.countries)));
    coast.setAttribute('fill','none'); coast.setAttribute('stroke','var(--ink-muted)'); coast.setAttribute('stroke-width','0.8');
    svg.append(sphere,coast); host.replaceChildren(svg);
  };
  focusGlobe(journeys[eraKey].states[chapter].coords);
}
async function initWorld() {
  const THREE = await import('three');
  const {RoomEnvironment}=await import('three/addons/environments/RoomEnvironment.js');
  // Locally served Natural Earth geometry; retain the bundled map if unavailable.
  let atlas = window.WORLD_ATLAS;
  try {
    const response = await fetch('/atlas-countries-50m.json', {signal:AbortSignal.timeout(2500)});
    if (response.ok) {
      const detailed = await response.json();
      if (detailed.objects?.countries) atlas = detailed;
    }
  } catch { /* The lower-resolution map is sufficient for the fallback. */ }
  const [elevationImage,rivers,nightImage]=await Promise.all([
    (async()=>{
      let url;
      try{
        const response=await fetch('/atlas-earth-elevation.jpg',{signal:AbortSignal.timeout(4000)});
        if(!response.ok)return null;
        url=URL.createObjectURL(await response.blob());const image=new Image();image.src=url;await image.decode();return image;
      }catch{return null;}finally{if(url)URL.revokeObjectURL(url);}
    })(),
    fetch('/atlas-rivers-50m.geojson',{signal:AbortSignal.timeout(4000)})
      .then(r=>r.ok?r.json():null).then(data=>data?.type==='FeatureCollection'?data:null).catch(()=>null),
    (async()=>{
      let url;
      try{
        const response=await fetch('/atlas-earth-night.jpg',{signal:AbortSignal.timeout(4000)});
        if(!response.ok)return null;
        url=URL.createObjectURL(await response.blob());const image=new Image();image.src=url;await image.decode();return image;
      }catch{return null;}finally{if(url)URL.revokeObjectURL(url);}
    })()
  ]);
  const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true, powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75)); renderer.setClearColor(0x000000,0); host.append(renderer.domElement);
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(38,1,.1,20);
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  const room=new RoomEnvironment(), pmrem=new THREE.PMREMGenerator(renderer);
  const studio=pmrem.fromScene(room,.04);
  scene.environment=studio.texture;scene.environmentIntensity=.18;
  room.dispose();pmrem.dispose();
  camera.position.z = 3.6;
  const globe = new THREE.Group(); scene.add(globe);
  // Sculpted graphite, not a satellite Earth: uniform color and shallow continent relief.
  const atlasMap = document.createElement('canvas'); atlasMap.width=4096; atlasMap.height=2048;
  const mapContext = atlasMap.getContext('2d');
  const mapProjection = window.d3.geoEquirectangular().translate([2048,1024]).scale(4096/(2*Math.PI));
  const mapPath = window.d3.geoPath(mapProjection).context(mapContext);
  const land = window.topojson.feature(atlas,atlas.objects.countries);
  // Country masking follows journal destinations, not the currently selected chapter.
  const countryIds={japan:'392',malaysia:'458',thailand:'764',vietnam:'704'};
  const visitedCountryIds=new Set(Object.values(journeys).map(era=>countryIds[era.country]).filter(Boolean));
  const visitedLand={type:'FeatureCollection',features:land.features.filter(feature=>visitedCountryIds.has(String(feature.id)))};
  const nightMap=document.createElement('canvas');nightMap.width=4096;nightMap.height=2048;
  const nightContext=nightMap.getContext('2d');
  const nightPath=window.d3.geoPath(mapProjection).context(nightContext);
  nightContext.fillStyle='white';nightContext.beginPath();nightPath(visitedLand);nightContext.fill();
  nightContext.globalCompositeOperation='source-in';
  if(nightImage)nightContext.drawImage(nightImage,0,0,4096,2048);
  else nightContext.clearRect(0,0,4096,2048);
  nightContext.globalCompositeOperation='source-over';
  const nightPixels=nightContext.getImageData(0,0,4096,2048);
  for(let i=0;i<nightPixels.data.length;i+=4){
    // Remove the source's blue land/ocean background. Keep only city luminance.
    const light=Math.max(0,(nightPixels.data[i]*.6+nightPixels.data[i+1]*.4-28)/227)*nightPixels.data[i+3]/255;
    // Suppress diffuse outskirts instead of boosting them into route-like bands.
    const value=Math.round(Math.pow(light,1.6)*255);
    nightPixels.data[i]=nightPixels.data[i+1]=nightPixels.data[i+2]=value;nightPixels.data[i+3]=255;
  }
  nightContext.putImageData(nightPixels,0,0);
  const nightTexture=new THREE.CanvasTexture(nightMap);nightTexture.colorSpace=THREE.SRGBColorSpace;
  const texture = new THREE.CanvasTexture(atlasMap); texture.colorSpace=THREE.SRGBColorSpace;
  texture.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),4);
  const reliefMap = document.createElement('canvas'); reliefMap.width=4096; reliefMap.height=2048;
  const reliefContext = reliefMap.getContext('2d');
  reliefContext.fillStyle='rgb(0,0,0)';reliefContext.fillRect(0,0,4096,2048);
  const reliefPath=window.d3.geoPath(mapProjection).context(reliefContext);
  reliefContext.filter='blur(1px)';
  reliefContext.fillStyle='rgb(240,240,240)';reliefContext.beginPath();reliefPath(land);reliefContext.fill();
  reliefContext.filter='none';
  // A separate micro-relief layer keeps the silhouette clean while breaking up highlights.
  const bumpMap=document.createElement('canvas');bumpMap.width=4096;bumpMap.height=2048;
  const bumpContext=bumpMap.getContext('2d');bumpContext.drawImage(reliefMap,0,0);
  const bumpPixels=bumpContext.getImageData(0,0,4096,2048);
  const elevationMap=document.createElement('canvas');elevationMap.width=4096;elevationMap.height=2048;
  const elevationContext=elevationMap.getContext('2d');
  // Smooth only the height field, not the rendered globe, coastlines or rivers.
  elevationContext.filter='blur(0.65px)';
  if(elevationImage)elevationContext.drawImage(elevationImage,0,0,4096,2048);
  elevationContext.filter='none';
  const elevationPixels=elevationContext.getImageData(0,0,4096,2048);
  const hillshadeMap=document.createElement('canvas');hillshadeMap.width=4096;hillshadeMap.height=2048;
  const hillshadeContext=hillshadeMap.getContext('2d'),hillshadePixels=hillshadeContext.createImageData(4096,2048);
  const displacementPixels=reliefContext.getImageData(0,0,4096,2048);
  let materialSeed=731;
  function materialSample(){
    materialSeed^=materialSeed<<13;materialSeed^=materialSeed>>>17;materialSeed^=materialSeed<<5;
    return (materialSeed>>>0)/4294967296;
  }
  const roughMap=document.createElement('canvas');roughMap.width=4096;roughMap.height=2048;
  const roughContext=roughMap.getContext('2d'),roughPixels=roughContext.createImageData(4096,2048);
  for(let y=0;y<2048;y++)for(let x=0;x<4096;x++){
    const i=(y*4096+x)*4;
    const landWeight=bumpPixels.data[i]/240;
    // Lift low mountain ranges as well as the Himalayas, without photographic color.
    const elevation=Math.pow(elevationPixels.data[i]/255,.65);
    const heightAt=(xx,yy)=>elevationPixels.data[(Math.max(0,Math.min(2047,yy))*4096+(xx+4096)%4096)*4];
    const slope=(heightAt(x-1,y)-heightAt(x+1,y))*.75+(heightAt(x,y+1)-heightAt(x,y-1));
    const shade=128+52*Math.tanh(slope*3.2/52);
    hillshadePixels.data[i]=hillshadePixels.data[i+1]=hillshadePixels.data[i+2]=shade;
    hillshadePixels.data[i+3]=landWeight*255;
    const landDetail=elevation*195+(materialSample()-.5)*.5;
    const seaDetail=Math.sin(x*.55+y*.18)*1.2+(materialSample()-.5);
    const value=8+30*landWeight+landDetail*landWeight+seaDetail*(1-landWeight);
    bumpPixels.data[i]=bumpPixels.data[i+1]=bumpPixels.data[i+2]=value;
    const height=landWeight*(25+elevation*215);
    displacementPixels.data[i]=displacementPixels.data[i+1]=displacementPixels.data[i+2]=height;
    roughPixels.data[i]=roughPixels.data[i+1]=roughPixels.data[i+2]=155+landWeight*70;
    roughPixels.data[i+3]=255;
  }
  bumpContext.putImageData(bumpPixels,0,0);
  hillshadeContext.putImageData(hillshadePixels,0,0);
  reliefContext.putImageData(displacementPixels,0,0);
  if(rivers){
    const riverPath=window.d3.geoPath(mapProjection).context(bumpContext);
    bumpContext.save();bumpContext.globalCompositeOperation='multiply';bumpContext.globalAlpha=.48;
    bumpContext.strokeStyle='rgb(20,20,20)';bumpContext.lineWidth=2.2;bumpContext.lineJoin='round';
    bumpContext.beginPath();riverPath(rivers);bumpContext.stroke();bumpContext.restore();
  }
  roughContext.putImageData(roughPixels,0,0);
  const roughTexture=new THREE.CanvasTexture(roughMap);
  const bumpTexture=new THREE.CanvasTexture(bumpMap);
  const reliefTexture=new THREE.CanvasTexture(reliefMap);
  reliefTexture.anisotropy=texture.anisotropy;
  // Fine, seamless satin normals affect reflected light only, never the surface color.
  const grainSize=256, grainData=new Uint8Array(grainSize*grainSize*4);
  for(let y=0;y<grainSize;y++)for(let x=0;x<grainSize;x++){
    const i=(y*grainSize+x)*4;
    grainData[i]=116+Math.floor(materialSample()*24);
    grainData[i+1]=116+Math.floor(materialSample()*24);
    grainData[i+2]=254;grainData[i+3]=255;
  }
  const satinTexture=new THREE.DataTexture(grainData,grainSize,grainSize);
  satinTexture.wrapS=satinTexture.wrapT=THREE.RepeatWrapping;satinTexture.repeat.set(4,2);
  satinTexture.magFilter=THREE.LinearFilter;satinTexture.minFilter=THREE.LinearMipmapLinearFilter;
  satinTexture.generateMipmaps=true;satinTexture.needsUpdate=true;
  const surface = new THREE.MeshPhysicalMaterial({map:texture,emissiveMap:nightTexture,emissiveIntensity:0,bumpMap:bumpTexture,bumpScale:.085,
    displacementMap:reliefTexture,displacementScale:.003,roughness:1,roughnessMap:roughTexture,metalness:.12,
    clearcoat:.3,clearcoatRoughness:.8,clearcoatNormalMap:satinTexture,clearcoatNormalScale:new THREE.Vector2(.8,.8)});
  const sphereGeometry = new THREE.SphereGeometry(1,384,192);
  surface.addEventListener('dispose',()=>nightTexture.dispose());
  // Match sphere UV longitude to the same lon/lat convention as the coastlines.
  sphereGeometry.rotateY(-Math.PI/2);
  globe.add(new THREE.Mesh(sphereGeometry,surface));
  // View-dependent rim highlights the curved silhouette without a full-screen bloom pass.
  const rimMaterial=new THREE.ShaderMaterial({
    uniforms:{rimColor:{value:new THREE.Color()},rimStrength:{value:.2}},
    vertexShader:`varying vec3 vNormal; varying vec3 vView;
      void main(){ vec4 p=modelViewMatrix*vec4(position,1.0);vNormal=normalize(normalMatrix*normal);vView=-p.xyz;gl_Position=projectionMatrix*p; }`,
    fragmentShader:`uniform vec3 rimColor; uniform float rimStrength;varying vec3 vNormal;varying vec3 vView;
      void main(){vec3 n=normalize(vNormal);float edge=pow(1.0-max(dot(n,normalize(vView)),0.0),4.0);
      float light=max(dot(n,normalize(vec3(0.8,0.6,0.1))),0.0);gl_FragColor=vec4(rimColor,edge*light*rimStrength);}`,
    transparent:true,depthWrite:false,blending:THREE.AdditiveBlending
  });
  globe.add(new THREE.Mesh(new THREE.SphereGeometry(1.002,96,64),rimMaterial));
  const ambient = new THREE.AmbientLight(0xffffff,.22); scene.add(ambient);
  const sun = new THREE.DirectionalLight(0xffffff,5.5); sun.position.set(3,2,.9); scene.add(sun);
  const fill = new THREE.DirectionalLight(0xc9d8e8,.3); fill.position.set(-4,0,3); scene.add(fill);
  const outline = new THREE.LineBasicMaterial({transparent:true,opacity:.5});
  const routeMaterial = new THREE.MeshBasicMaterial(), pinMaterial = new THREE.MeshBasicMaterial();
  const routeGlow = new THREE.MeshBasicMaterial({transparent:true,opacity:.12,depthWrite:false,blending:THREE.AdditiveBlending});
  const routeHalo = new THREE.MeshBasicMaterial({transparent:true,opacity:.035,depthWrite:false,blending:THREE.AdditiveBlending});
  const pinGlow=new THREE.ShaderMaterial({
    uniforms:{glowColor:{value:new THREE.Color()}},
    vertexShader:`varying vec3 n;varying vec3 v;void main(){vec4 p=modelViewMatrix*vec4(position,1.0);n=normalize(normalMatrix*normal);v=-p.xyz;gl_Position=projectionMatrix*p;}`,
    fragmentShader:`uniform vec3 glowColor;varying vec3 n;varying vec3 v;void main(){float a=pow(max(dot(normalize(n),normalize(v)),0.0),3.0);gl_FragColor=vec4(glowColor,a*.18);}`,
    transparent:true,depthWrite:false,blending:THREE.AdditiveBlending
  });
  const xyz = ([lon,lat], radius=1.004) => {
    const phi=lat*Math.PI/180, theta=lon*Math.PI/180;
    return new THREE.Vector3(Math.cos(phi)*Math.sin(theta)*radius, Math.sin(phi)*radius, Math.cos(phi)*Math.cos(theta)*radius);
  };
  const geometry = window.topojson.mesh(atlas, atlas.objects.countries);
  const positions=[];
  for(const line of geometry.coordinates) for(let i=1;i<line.length;i++) positions.push(...xyz(line[i-1]).toArray(),...xyz(line[i]).toArray());
  const coastGeometry = new THREE.BufferGeometry(); coastGeometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  globe.add(new THREE.LineSegments(coastGeometry,outline));
  const pins = new THREE.Group(); globe.add(pins);
  const target = new THREE.Quaternion();
  let hasFocused=false;
  focusGlobe = (coords, states) => {
    // Longitude first, then latitude: preserve north-up instead of rolling the map.
    target.setFromEuler(new THREE.Euler(coords[1]*Math.PI/180,-coords[0]*Math.PI/180,0,'XYZ'));
    if(!hasFocused || reduced.matches) globe.quaternion.copy(target);
    hasFocused=true;
    while(pins.children.length) { const item=pins.children[0]; item.geometry.dispose(); pins.remove(item); }
    for(const state of states) {
      const pin=new THREE.Mesh(new THREE.SphereGeometry(state === states[chapter] ? .004 : .0025,12,8),pinMaterial);
      pin.position.copy(xyz(state.coords,1.014)); pins.add(pin);
      const glow=new THREE.Mesh(new THREE.SphereGeometry(.011,16,12),pinGlow);glow.position.copy(pin.position);pins.add(glow);
    }
    for(let i=1;i<states.length;i++) {
      const a=xyz(states[i-1].coords,1),b=xyz(states[i].coords,1),points=[];
      for(let j=0;j<=32;j++) points.push(a.clone().lerp(b,j/32).normalize().multiplyScalar(1.009+Math.sin(j/32*Math.PI)*.012));
      const curve=new THREE.CatmullRomCurve3(points);
      for(const [radius,material] of [[.00065,routeMaterial],[.002,routeGlow],[.004,routeHalo]])
        pins.add(new THREE.Mesh(new THREE.TubeGeometry(curve,48,radius,6,false),material));
    }
  };
  const refreshTheme = () => {
    const css=getComputedStyle(document.body), atlasCss=getComputedStyle(root), dusk=document.body.classList.contains('theme-dusk'), dawn=document.body.classList.contains('theme-dawn');
    mapContext.fillStyle=atlasCss.getPropertyValue('--atlas-ocean').trim();mapContext.fillRect(0,0,4096,2048);
    mapContext.fillStyle=atlasCss.getPropertyValue('--atlas-land').trim();mapContext.beginPath();mapPath(land);mapContext.fill();texture.needsUpdate=true;
    // Cartographic hillshade makes geographic ridges legible at whole-globe scale.
    // It is neutral luminance only; dynamic bump lighting still follows rotation.
    mapContext.save();mapContext.globalCompositeOperation='soft-light';
    mapContext.drawImage(hillshadeMap,0,0);mapContext.restore();
    if(rivers){
      mapContext.save();mapContext.strokeStyle=css.getPropertyValue('--ink-muted').trim();mapContext.globalAlpha=.38;
      mapContext.lineWidth=2.2;mapContext.lineJoin='round';mapContext.beginPath();mapPath(rivers);mapContext.stroke();mapContext.restore();
    }
    outline.color.set(css.getPropertyValue('--ink-muted').trim()).lerp(new THREE.Color(css.getPropertyValue('--sub-accent').trim()),.38);
    routeMaterial.color.set(css.getPropertyValue('--sub-accent').trim()); pinMaterial.color.copy(routeMaterial.color);
    // City lights are background geography; the accent belongs to routes/pins.
    surface.emissive.set(css.getPropertyValue('--sub-secondary').trim());
    surface.emissiveIntensity=dusk?.25:0;
    routeGlow.color.copy(routeMaterial.color);routeHalo.color.copy(routeMaterial.color);
    pinGlow.uniforms.glowColor.value.copy(routeMaterial.color);
    rimMaterial.uniforms.rimColor.value.set(css.getPropertyValue('--ink-primary').trim());
    rimMaterial.uniforms.rimStrength.value=dusk?.18:.08;
    sun.color.set(dusk || dawn ? 0xffecd5 : 0xffffff); sun.position.set(dawn ? -3 : 3,2,-.6); ambient.intensity=dusk ? .12 : .45;
    sun.intensity=dusk?5:3;fill.intensity=dusk?.22:.4;
    scene.environmentIntensity=dusk?.18:.4;
    document.querySelector('#atlas-atmosphere').textContent=dusk ? 'Evening light' : dawn ? 'Morning light' : 'Daylight';
  };
  refreshTheme();
  const themeObserver=new MutationObserver(refreshTheme); themeObserver.observe(document.body,{attributes:true,attributeFilter:['class']});
  // Lens-like peripheral softness on the globe only. DOM photographs/text stay sharp.
  const focusTarget=new THREE.WebGLRenderTarget(1,1,{type:THREE.HalfFloatType});
  const focusMaterial=new THREE.ShaderMaterial({
    uniforms:{sceneMap:{value:focusTarget.texture},pixel:{value:new THREE.Vector2()},aspect:{value:1},radius:{value:1},softness:{value:1}},
    vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.0,1.0);}`,
    fragmentShader:`uniform sampler2D sceneMap;uniform vec2 pixel;uniform float aspect,radius,softness;varying vec2 vUv;
      void main(){
        float distanceFromCenter=length((vUv-.5)*vec2(aspect,1.0))/radius;
        float amount=smoothstep(.76,.98,distanceFromCenter)*softness;
        vec2 delta=pixel*amount;
        vec4 sum=vec4(0.0);float total=0.0;
        for(int x=-1;x<=1;x++)for(int y=-1;y<=1;y++){
          float weight=(x==0?2.0:1.0)*(y==0?2.0:1.0);
          vec4 s=texture2D(sceneMap,vUv+vec2(float(x),float(y))*delta);
          sum+=vec4(s.rgb*s.a,s.a)*weight;total+=weight;
        }
        sum/=total;gl_FragColor=vec4(sum.rgb/max(sum.a,.00001),sum.a);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
    transparent:true,depthTest:false,depthWrite:false
  });
  const focusScene=new THREE.Scene(),focusCamera=new THREE.Camera();
  const focusQuad=new THREE.Mesh(new THREE.PlaneGeometry(2,2),focusMaterial);focusScene.add(focusQuad);
  const resize=()=>{
    const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;
    renderer.setSize(w,h);camera.aspect=w/h;camera.position.z=innerWidth<1000?Math.max(3.5,3.5/camera.aspect):3.25;camera.updateProjectionMatrix();
    const size=renderer.getDrawingBufferSize(new THREE.Vector2());focusTarget.setSize(size.x,size.y);
    focusMaterial.uniforms.pixel.value.set(1/size.x,1/size.y);
    focusMaterial.uniforms.aspect.value=camera.aspect;
    focusMaterial.uniforms.radius.value=1/(2*Math.tan(THREE.MathUtils.degToRad(camera.fov/2))*Math.sqrt(camera.position.z**2-1));
    focusMaterial.uniforms.softness.value=(innerWidth<1000?.7:1.5)*renderer.getPixelRatio();
  };
  const observer=new ResizeObserver(resize); observer.observe(host); resize();
  let dragging=false,lastX=0,lastY=0;
  function rotate(dx,dy) {
    target.premultiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(dy*.004,dx*.004,0)));
    if(reduced.matches) globe.quaternion.copy(target);
  }
  host.tabIndex=0;
  host.addEventListener('pointerdown',e=>{if(e.button!==0)return;dragging=true;lastX=e.clientX;lastY=e.clientY;paused=true;syncMotion();host.setPointerCapture(e.pointerId);});
  host.addEventListener('pointermove',e=>{if(!dragging)return;rotate(e.clientX-lastX,e.pointerType==='touch'?0:e.clientY-lastY);lastX=e.clientX;lastY=e.clientY;});
  ['pointerup','pointercancel','lostpointercapture'].forEach(name=>host.addEventListener(name,()=>{dragging=false;}));
  host.addEventListener('keydown',e=>{const steps={ArrowLeft:[-15,0],ArrowRight:[15,0],ArrowUp:[0,-15],ArrowDown:[0,15]};if(steps[e.key]){e.preventDefault();paused=true;syncMotion();rotate(...steps[e.key]);}});
  hint.textContent='Drag to explore'; motion.hidden=false; syncMotion(); select(eraKey,chapter,false);
  let last=performance.now(),frame=0,failed=false,phase=0;
  function render(now) {
    if(failed)return;
    frame=requestAnimationFrame(render);
    const dt=Math.min((now-last)/1000,.05); last=now;
    if(document.hidden)return;
    if(!paused&&!reduced.matches&&!dragging) {
      const nextPhase=phase+dt*Math.PI*2/24;
      target.premultiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),.05236*(Math.sin(nextPhase)-Math.sin(phase))));
      phase=nextPhase;
    }
    globe.quaternion.slerp(target,reduced.matches?1:1-Math.exp(-dt*6));
    renderer.setRenderTarget(focusTarget);renderer.render(scene,camera);
    renderer.setRenderTarget(null);renderer.render(focusScene,focusCamera);
  }
  frame=requestAnimationFrame(render);
  function dispose(){failed=true;cancelAnimationFrame(frame);observer.disconnect();themeObserver.disconnect();scene.traverse(item=>{item.geometry?.dispose();});texture.dispose();reliefTexture.dispose();bumpTexture.dispose();roughTexture.dispose();satinTexture.dispose();studio.dispose();focusTarget.dispose();focusMaterial.dispose();focusQuad.geometry.dispose();surface.dispose();rimMaterial.dispose();outline.dispose();pinMaterial.dispose();pinGlow.dispose();routeMaterial.dispose();routeGlow.dispose();routeHalo.dispose();renderer.dispose();}
  renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();dispose();fallback();});
  window.addEventListener('pagehide',e=>{if(!e.persisted)dispose();},{once:true});
}
initWorld().catch(error=>{console.warn('Atlas 3D unavailable; using map fallback.',error);fallback();});
