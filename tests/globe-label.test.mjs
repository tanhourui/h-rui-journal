import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('../src/components/Globe.astro', import.meta.url), 'utf8');
const placement = source.match(/const preferredPillX = px \+ 12;[\s\S]*?const pillX = [\s\S]*?: Math\.max\(8, px - pillW - 12\);/)?.[0];
const drawText = source.match(/ctx\.fillText\(labelText, pillX \+ 7, py \+ 4\);/)?.[0];

assert.ok(placement, 'Could not locate active-pin pill placement in Globe.astro');
assert.ok(drawText, 'Active-pin text must be positioned from the final pill coordinate');

function renderLabel({ px, py, textWidth, canvasWidth }) {
  const canvas = { width: canvasWidth };
  const pillW = textWidth + 14;
  const labelText = '01. Tokyo';
  let textCall;
  const ctx = {
    fillText(text, x, y) {
      textCall = { text, x, y };
    }
  };
  Function('px', 'py', 'pillW', 'canvas', 'ctx', 'labelText', `${placement}\n${drawText}`)(
    px, py, pillW, canvas, ctx, labelText
  );
  return { pillW, textWidth, ...textCall };
}

test('active-pin text stays inside a right-side pill', () => {
  const result = renderLabel({ px: 80, py: 100, textWidth: 70, canvasWidth: 400 });
  assert.equal(result.x, 99);
  assert.ok(result.x + result.textWidth <= 80 + 12 + result.pillW);
});

test('active-pin text follows a pill flipped to the left canvas edge', () => {
  const result = renderLabel({ px: 360, py: 100, textWidth: 70, canvasWidth: 400 });
  const expectedPillX = 360 - result.pillW - 12;
  assert.equal(result.x, expectedPillX + 7);
  assert.ok(result.x >= expectedPillX);
  assert.ok(result.x + result.textWidth <= expectedPillX + result.pillW);
});
