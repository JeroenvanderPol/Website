const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const vm = require('node:vm');
const projects = require('../data/original-projects.json');
const services = require('../data/services.json');
const sharp = require(require.resolve('sharp', { paths: [require.resolve('next')] }));

test('galleries have valid covers, multiple service tags and small thumbnails', async () => {
  for (const project of projects) {
    assert.ok(project.images.length > 0);
    assert.equal(new Set(project.images.map(p => p.id)).size, project.images.length);
    const cover = project.images.find(p => p.id === project.coverImageId);
    assert.ok(cover);
    assert.equal(project.src, cover.src);
    assert.ok(project.tags.length > 0);
    assert.equal(new Set(project.tags).size, project.tags.length);
    for (const tag of project.tags) assert.ok(services.some(s => s.title === tag));
    for (const photo of project.images) {
      assert.ok(fs.existsSync(`public${photo.src}`));
      assert.ok(photo.alt && photo.width > 0 && photo.height > 0);
      const meta = await sharp(`public${photo.thumbnail}`).metadata();
      assert.equal(meta.format, 'webp');
      assert.ok(meta.width <= 640 && meta.height <= 480);
    }
  }
});

test('all project records have unique routes, valid content and existing images', () => {
  for (const key of ['id', 'slug']) assert.equal(new Set(projects.map(p => p[key])).size, projects.length);
  for (const project of projects) {
    assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    for (const key of ['alt','title','city','summary','request','approach','result']) assert.ok(project[key]?.trim(), `${project.slug}: ${key}`);
    assert.equal(project.status, 'confirmed', `${project.slug}: project status`);
    assert.ok(['needs-review', 'verified'].includes(project.contentStatus), `${project.slug}: content status`);
    assert.ok(services.some(s => s.title === project.category));
    assert.ok(project.src.startsWith('/images/'));
    assert.ok(fs.existsSync(`public${project.src}`));
  }
  for (let id = 1; id <= 23; id++) assert.ok(projects.some(p => p.id === id), `Original image ${id} retained`);
});

function sitemap(preview, records) {
  const exports = {};
  const source = ts.transpileModule(fs.readFileSync('app/sitemap.ts','utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  vm.runInNewContext(source, { exports, require: name => {
    if (name === '@/lib/projects') return { projects: records };
    if (name === '@/data/services.json') return { default: services };
    if (name === '@/lib/site') return { isPreview: preview, absoluteUrl: p => `https://vandevoortgrondwerken.nl${p}` };
    throw new Error(name);
  }});
  return exports.default();
}

test('sitemap requires real projects with verified copy and excludes preview URLs', () => {
  const records = projects.map(project => ({ ...project, status: 'confirmed' }));
  const pendingUrls = sitemap(false, records).map(p => p.url);
  assert.ok(!pendingUrls.some(url => url.endsWith('/projecten')));
  assert.ok(!pendingUrls.some(url => url.includes('/projecten/')));

  const mockRecords = records.map(project => ({ ...project, contentStatus: 'verified' }));
  mockRecords[0].status = 'mock';
  const mockUrls = sitemap(false, mockRecords).map(p => p.url);
  assert.ok(!mockUrls.some(url => url.endsWith('/projecten')));
  assert.ok(!mockUrls.some(url => url.endsWith(`/projecten/${mockRecords[0].slug}`)));

  const verifiedRecords = records.map(project => ({ ...project, contentStatus: 'verified' }));
  const urls = sitemap(false, verifiedRecords).map(p => p.url);
  assert.ok(urls.some(url => url.endsWith('/projecten')));
  for (const project of verifiedRecords) {
    assert.ok(urls.some(url => url.endsWith(`/projecten/${project.slug}`)));
  }
  assert.equal(urls.length, 2 + services.length + verifiedRecords.length);
  assert.equal(sitemap(true, verifiedRecords).length, 0);
});
