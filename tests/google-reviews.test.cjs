const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function compile(file, deps = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  vm.runInNewContext(code, { exports, require, URL, Response, AbortSignal, ...deps });
  return exports;
}
const schema = compile('lib/google-reviews.ts');
function route(env, fetch) {
  return compile('app/api/google-reviews/route.ts', {
    process: { env }, fetch,
    require: (name) => name === '@/lib/google-reviews' ? schema : require(name),
  }).GET;
}
const env = { GOOGLE_PLACES_API_KEY: 'test-secret', GOOGLE_PLACE_ID: 'test-place' };
test('unconfigured route does not call Google', async () => {
  const result = await route({}, () => { throw new Error('must not fetch'); })();
  assert.equal((await result.json()).status, 'not-configured');
  assert.match(result.headers.get('cache-control'), /no-store/);
});
test('successful response targets configured listing, keeps key server-side and disables caching', async () => {
  const result = await route(env, async (url, options) => {
    assert.match(url, /places\/test-place\?languageCode=nl$/);
    assert.equal(options.headers['X-Goog-Api-Key'], 'test-secret');
    assert.equal(options.cache, 'no-store');
    return Response.json({displayName:{text:'Test business'},googleMapsUri:'https://maps.google.com/example',reviews:[]});
  })();
  const body = await result.text();
  assert.equal(JSON.parse(body).status, 'ready');
  assert.ok(!body.includes('test-secret'));
});
test('upstream failure is a sanitized unavailable response', async () => {
  const result = await route(env, async () => new Response('private provider details', {status:403}))();
  assert.equal(result.status, 503);
  assert.deepEqual(await result.json(), {status:'unavailable'});
});
test('malformed or executable source links are rejected', async () => {
  const result = await route(env, async () => Response.json({displayName:{text:'Test'},googleMapsUri:'javascript:alert(1)'}))();
  assert.equal(result.status, 503);
});
test('network timeout or failure degrades gracefully', async () => {
  const result = await route(env, async () => { throw new Error('timeout'); })();
  assert.equal(result.status, 503);
});
