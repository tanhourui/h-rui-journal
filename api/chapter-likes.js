import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';

const COOKIE_NAME = 'hrui_like_id';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
const RATE_LIMIT_WINDOW_SECONDS = 60;
const RATE_LIMIT_MAX_MUTATIONS = 30;

export const VALID_CHAPTER_SLUGS = new Set([
  'japan/fuji-five-lakes',
  'japan/japan19-dusk-reflections-departure',
  'japan/japan19-kansai-historic-canopy',
  'japan/japan19-tokyo-summer-awakening',
  'japan/japan23-kawaguchiko-fuji-reeds',
  'japan/japan23-kyoto-ancient-capital',
  'japan/japan23-tokyo-first-impressions',
  'japan/japan24-hakone-fuji-foothills',
  'japan/japan24-kamakura-shonan',
  'japan/japan24-tokyo-autumn-ginkgo',
  'japan/tokyo-bay-skyline',
  'japan/tokyo-everyday',
  'japan/tokyo-shitamachi',
  'malaysia/malacca-hometown-straits',
  'malaysia/merdeka-parade',
  'malaysia/penang-heritage-alleys',
  'thailand/bangkok-chao-phraya',
  'thailand/betong-southern-mist',
  'vietnam/hanoi-old-quarter'
]);

const RATE_LIMIT_SCRIPT = `
local current = redis.call('INCR', KEYS[1])
if current == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end
return current
`;

const SET_LIKE_SCRIPT = `
if ARGV[2] == '1' then
  redis.call('SADD', KEYS[1], ARGV[1])
else
  redis.call('SREM', KEYS[1], ARGV[1])
end
return {redis.call('SCARD', KEYS[1]), redis.call('SISMEMBER', KEYS[1], ARGV[1])}
`;

function jsonResponse(body, status = 200, extraHeaders = {}) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...extraHeaders } });
}

function getConfig(env) {
  const redisUrl = env.UPSTASH_REDIS_REST_URL?.trim();
  const redisToken = env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!redisUrl || !redisToken) return null;
  const cookieSecret = env.LIKES_COOKIE_SECRET?.trim()
    || createHmac('sha256', redisToken).update('hrui-journal-cookie-signing-v1').digest('hex');
  const namespace = env.VERCEL_ENV === 'production' ? 'prod' : 'preview';
  return { redisUrl: redisUrl.replace(/\/$/, ''), redisToken, cookieSecret, namespace };
}

function parseCookies(cookieHeader) {
  const cookies = new Map();
  for (const part of (cookieHeader || '').split(';')) {
    const separator = part.indexOf('=');
    if (separator > 0) cookies.set(part.slice(0, separator).trim(), part.slice(separator + 1).trim());
  }
  return cookies;
}

function signVisitorId(visitorId, secret) {
  return createHmac('sha256', secret).update(visitorId).digest('base64url');
}

function readVisitorId(request, secret) {
  const signedValue = parseCookies(request.headers.get('cookie')).get(COOKIE_NAME);
  if (!signedValue) return null;
  const separator = signedValue.lastIndexOf('.');
  if (separator < 1) return null;
  const visitorId = signedValue.slice(0, separator);
  const signature = signedValue.slice(separator + 1);
  if (!/^[0-9a-f-]{36}$/.test(visitorId) || !signature) return null;
  const actual = Buffer.from(signature);
  const expected = Buffer.from(signVisitorId(visitorId, secret));
  return actual.length === expected.length && timingSafeEqual(actual, expected) ? visitorId : null;
}

function createVisitorCookie(visitorId, secret, secure) {
  const value = `${visitorId}.${signVisitorId(visitorId, secret)}`;
  return [
    `${COOKIE_NAME}=${value}`, 'Path=/', `Max-Age=${COOKIE_MAX_AGE}`,
    'HttpOnly', 'SameSite=Lax', secure ? 'Secure' : ''
  ].filter(Boolean).join('; ');
}

async function redisRequest(config, path, body, fetchImpl) {
  const response = await fetchImpl(`${config.redisUrl}${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${config.redisToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(4000)
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok || !payload || payload.error) throw new Error('Redis request failed');
  return payload;
}

async function readLikeState(config, chapterKey, visitorId, fetchImpl) {
  const payload = await redisRequest(config, '/multi-exec', [
    ['SCARD', chapterKey], ['SISMEMBER', chapterKey, visitorId]
  ], fetchImpl);
  if (!Array.isArray(payload) || payload.some(item => item?.error)) {
    throw new Error('Invalid Redis transaction response');
  }
  const count = Number(payload[0]?.result);
  const membership = Number(payload[1]?.result);
  if (!Number.isSafeInteger(count) || count < 0 || ![0, 1].includes(membership)) {
    throw new Error('Invalid Redis like state');
  }
  return { count, liked: membership === 1 };
}

async function enforceRateLimit(config, request, fetchImpl) {
  const forwarded = request.headers.get('x-vercel-forwarded-for')
    || request.headers.get('x-forwarded-for') || 'unknown';
  const clientIp = forwarded.split(',')[0].trim();
  const clientKey = createHmac('sha256', config.cookieSecret).update(clientIp).digest('hex').slice(0, 24);
  const bucket = Math.floor(Date.now() / (RATE_LIMIT_WINDOW_SECONDS * 1000));
  const rateKey = `hrui:likes:${config.namespace}:rate:${clientKey}:${bucket}`;
  const payload = await redisRequest(config, '', [
    'EVAL', RATE_LIMIT_SCRIPT, 1, rateKey, RATE_LIMIT_WINDOW_SECONDS
  ], fetchImpl);
  return Number(payload.result || 0) <= RATE_LIMIT_MAX_MUTATIONS;
}

async function setLikeState(config, chapterKey, visitorId, liked, fetchImpl) {
  const payload = await redisRequest(config, '', [
    'EVAL', SET_LIKE_SCRIPT, 1, chapterKey, visitorId, liked ? '1' : '0'
  ], fetchImpl);
  if (!Array.isArray(payload.result) || payload.result.length < 2) {
    throw new Error('Invalid Redis mutation response');
  }
  const count = Number(payload.result[0]);
  const membership = Number(payload.result[1]);
  if (!Number.isSafeInteger(count) || count < 0 || ![0, 1].includes(membership)) {
    throw new Error('Invalid Redis mutation state');
  }
  return { count, liked: membership === 1 };
}

function hasValidOrigin(request) {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  try { return new URL(origin).origin === new URL(request.url).origin; } catch { return false; }
}

export async function handleLikeRequest(request, options = {}) {
  const env = options.env || process.env;
  const fetchImpl = options.fetchImpl || fetch;
  const config = getConfig(env);
  if (!config) return jsonResponse({ error: 'Likes are not configured' }, 503);
  if (request.method !== 'GET' && request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405, { Allow: 'GET, POST' });
  }

  const url = new URL(request.url);
  const slug = url.searchParams.get('slug') || '';
  if (!VALID_CHAPTER_SLUGS.has(slug)) return jsonResponse({ error: 'Unknown chapter' }, 404);
  if (request.method === 'POST' && !hasValidOrigin(request)) {
    return jsonResponse({ error: 'Invalid origin' }, 403);
  }

  let visitorId = readVisitorId(request, config.cookieSecret);
  const hadValidVisitor = Boolean(visitorId);
  let setCookie = '';
  if (!visitorId) {
    visitorId = randomUUID();
    setCookie = createVisitorCookie(visitorId, config.cookieSecret, url.protocol === 'https:');
  }
  const responseHeaders = setCookie ? { 'Set-Cookie': setCookie } : {};
  const chapterKey = `hrui:likes:${config.namespace}:chapter:${slug}`;

  try {
    if (request.method === 'GET') {
      return jsonResponse(await readLikeState(config, chapterKey, visitorId, fetchImpl), 200, responseHeaders);
    }
    if (!hadValidVisitor) {
      return jsonResponse({ error: 'Visitor initialized', retry: true }, 409, responseHeaders);
    }
    const contentType = request.headers.get('content-type') || '';
    const contentLength = Number(request.headers.get('content-length') || 0);
    if (!contentType.toLowerCase().startsWith('application/json') || contentLength > 512) {
      return jsonResponse({ error: 'Invalid request body' }, 400, responseHeaders);
    }
    const rawBody = await request.text();
    if (Buffer.byteLength(rawBody, 'utf8') > 512) {
      return jsonResponse({ error: 'Invalid request body' }, 400, responseHeaders);
    }
    let body = null;
    try { body = JSON.parse(rawBody); } catch { body = null; }
    if (!body || typeof body.liked !== 'boolean') {
      return jsonResponse({ error: 'Invalid request body' }, 400, responseHeaders);
    }
    if (!await enforceRateLimit(config, request, fetchImpl)) {
      return jsonResponse({ error: 'Too many requests' }, 429, {
        ...responseHeaders, 'Retry-After': String(RATE_LIMIT_WINDOW_SECONDS)
      });
    }
    const state = await setLikeState(config, chapterKey, visitorId, body.liked, fetchImpl);
    return jsonResponse(state, 200, responseHeaders);
  } catch (error) {
    console.error('Chapter likes request failed:', error instanceof Error ? error.message : 'Unknown error');
    return jsonResponse({ error: 'Likes are temporarily unavailable' }, 502, responseHeaders);
  }
}

export default { fetch: request => handleLikeRequest(request) };
