import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const globe = await readFile(new URL('src/components/Globe.astro', root), 'utf8');
const story = await readFile(new URL('src/pages/journey/[...slug].astro', root), 'utf8');
const layout = await readFile(new URL('src/layouts/BaseLayout.astro', root), 'utf8');

test('card and story share distinct photograph and surface transition identities', () => {
  for (const source of [globe, story]) {
    assert.ok(source.includes('view-transition-name: photo-${transitionKey}'));
    assert.ok(source.includes('view-transition-name: chapter-${transitionKey}'));
    assert.ok(source.includes(".slug.replace(/[^a-zA-Z0-9_-]/g, '-')"));
  }
});

test('photo navigation remains a native link and reduced motion opts out', () => {
  assert.ok(globe.includes('<a class="card-img-wrap" href="/journey/${s.slug}"'));
  assert.match(layout, /@view-transition\s*\{ navigation: auto; \}/);
  assert.match(layout, /@media \(prefers-reduced-motion: reduce\)\s*\{\s*@view-transition \{ navigation: none; \}/);
  assert.ok(!layout.includes('<ClientRouter'));
});
