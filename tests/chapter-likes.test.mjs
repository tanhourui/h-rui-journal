import assert from 'node:assert/strict';
import test from 'node:test';
import { handleLikeRequest } from '../api/chapter-likes.js';

const ENV = {
  UPSTASH_REDIS_REST_URL: 'https://redis.example',
  UPSTASH_REDIS_REST_TOKEN: 'test-token',
  VERCEL_ENV: 'production'
};
const SLUG = 'japan/tokyo-everyday';
const ENDPOINT = `https://journal.example/api/chapter-likes?slug=${encodeURIComponent(SLUG)}`;

function redisMock(responses) {
  const calls = [];
  const mock = async (url, options) => {
    calls.push({ url, body: JSON.parse(options.body) });
    const response = responses.shift();
    assert.ok(response, 'Unexpected Redis request');
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  };
  mock.calls = calls;
  return mock;
}

async function getVisitorCookie() {
  const fetchImpl = redisMock([[{ result: 3 }, { result: 0 }]]);
  const response = await handleLikeRequest(new Request(ENDPOINT), { env: ENV, fetchImpl });
  return response.headers.get('set-cookie').split(';')[0];
}

test('GET returns public state and issues a signed anonymous cookie', async () => {
  const fetchImpl = redisMock([[{ result: 12 }, { result: 0 }]]);
  const response = await handleLikeRequest(new Request(ENDPOINT), { env: ENV, fetchImpl });

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { count: 12, liked: false });
  assert.match(response.headers.get('set-cookie'), /^hrui_like_id=[0-9a-f-]{36}\./);
  assert.match(response.headers.get('set-cookie'), /HttpOnly/);
  assert.equal(fetchImpl.calls[0].url, 'https://redis.example/multi-exec');
  assert.equal(fetchImpl.calls[0].body[0][1], `hrui:likes:prod:chapter:${SLUG}`);
});

test('POST like and unlike send idempotent desired states for one visitor', async () => {
  const cookie = await getVisitorCookie();
  const fetchImpl = redisMock([
    { result: 1 }, { result: [4, 1] },
    { result: 2 }, { result: [3, 0] }
  ]);
  const headers = {
    'Content-Type': 'application/json',
    Origin: 'https://journal.example',
    Cookie: cookie,
    'X-Forwarded-For': '203.0.113.4'
  };

  const liked = await handleLikeRequest(new Request(ENDPOINT, {
    method: 'POST', headers, body: JSON.stringify({ liked: true })
  }), { env: ENV, fetchImpl });
  assert.deepEqual(await liked.json(), { count: 4, liked: true });

  const unliked = await handleLikeRequest(new Request(ENDPOINT, {
    method: 'POST', headers, body: JSON.stringify({ liked: false })
  }), { env: ENV, fetchImpl });
  assert.deepEqual(await unliked.json(), { count: 3, liked: false });
  assert.equal(fetchImpl.calls[1].body.at(-1), '1');
  assert.equal(fetchImpl.calls[3].body.at(-1), '0');
});

test('POST without a valid visitor cookie initializes identity but does not mutate', async () => {
  const fetchImpl = redisMock([]);
  const response = await handleLikeRequest(new Request(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: 'https://journal.example' },
    body: JSON.stringify({ liked: true })
  }), { env: ENV, fetchImpl });

  assert.equal(response.status, 409);
  assert.deepEqual(await response.json(), { error: 'Visitor initialized', retry: true });
  assert.match(response.headers.get('set-cookie'), /^hrui_like_id=/);
  assert.equal(fetchImpl.calls.length, 0);
});

test('cross-origin, unknown chapter, and missing configuration fail closed', async () => {
  const fetchImpl = redisMock([]);
  const crossOrigin = await handleLikeRequest(new Request(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: 'https://attacker.example' },
    body: JSON.stringify({ liked: true })
  }), { env: ENV, fetchImpl });
  const invalid = await handleLikeRequest(
    new Request('https://journal.example/api/chapter-likes?slug=unknown'),
    { env: ENV, fetchImpl }
  );
  const unconfigured = await handleLikeRequest(new Request(ENDPOINT), { env: {}, fetchImpl });

  assert.equal(crossOrigin.status, 403);
  assert.equal(invalid.status, 404);
  assert.equal(unconfigured.status, 503);
  assert.equal(fetchImpl.calls.length, 0);
});

test('rate limit returns 429 before the membership mutation', async () => {
  const cookie = await getVisitorCookie();
  const fetchImpl = redisMock([{ result: 31 }]);
  const response = await handleLikeRequest(new Request(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: 'https://journal.example',
      Cookie: cookie,
      'X-Forwarded-For': '203.0.113.5'
    },
    body: JSON.stringify({ liked: true })
  }), { env: ENV, fetchImpl });

  assert.equal(response.status, 429);
  assert.equal(response.headers.get('retry-after'), '60');
  assert.equal(fetchImpl.calls.length, 1);
});

test('preview requests use a separate Redis namespace', async () => {
  const fetchImpl = redisMock([[{ result: 2 }, { result: 1 }]]);
  const response = await handleLikeRequest(new Request(ENDPOINT), {
    env: { ...ENV, VERCEL_ENV: 'preview' },
    fetchImpl
  });

  assert.equal(response.status, 200);
  assert.equal(fetchImpl.calls[0].body[0][1], `hrui:likes:preview:chapter:${SLUG}`);
});

test('POST rejects an oversized body even without a Content-Length header', async () => {
  const cookie = await getVisitorCookie();
  const fetchImpl = redisMock([]);
  const response = await handleLikeRequest(new Request(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: 'https://journal.example',
      Cookie: cookie
    },
    body: JSON.stringify({ liked: true, padding: 'x'.repeat(600) })
  }), { env: ENV, fetchImpl });

  assert.equal(response.status, 400);
  assert.equal(fetchImpl.calls.length, 0);
});
