import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('../src/components/Globe.astro', import.meta.url), 'utf8');
const block = source.match(/if \(!motionPaused && !reducedMotion.matches && !document.hidden && !isDragging\) \{[\s\S]*?driftPhase = nextPhase;\s*\}/)?.[0];
assert.ok(block, 'Ambient drift must retain its interaction and accessibility guards');
const tick = Function('state', `let {motionPaused, reducedMotion, document, isDragging, driftPhase, targetRot, elapsed} = state; ${block}; return {...state, driftPhase, targetRot};`);
const initial = () => ({motionPaused:false,reducedMotion:{matches:false},document:{hidden:false},isDragging:false,driftPhase:0,targetRot:[0,0],elapsed:1/60});

test('drift stays within three degrees and returns to its starting longitude', () => {
  let state = initial();
  for (let frame = 0; frame < 1440; frame++) {
    state = tick(state);
    assert.ok(Math.abs(state.targetRot[0]) <= 3.000001);
    assert.equal(state.targetRot[1], 0);
  }
  assert.ok(Math.abs(state.targetRot[0]) < 0.000001);
});

test('pause, reduced motion, hidden tabs and dragging all stop ambient drift', () => {
  for (const guard of [{motionPaused:true},{reducedMotion:{matches:true}},{document:{hidden:true}},{isDragging:true}]) {
    const state = tick({...initial(), ...guard});
    assert.deepEqual(state.targetRot, [0,0]);
    assert.equal(state.driftPhase, 0);
  }
});
