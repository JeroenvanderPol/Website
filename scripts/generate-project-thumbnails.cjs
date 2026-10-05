// Uses the Sharp image processor installed with Next.js. Never modifies originals.
const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require(require.resolve('sharp', { paths: [require.resolve('next')] }));
const root = path.resolve(__dirname, '..');
const publicRoot = path.join(root, 'public');
function publicFile(url) {
  if (!url.startsWith('/images/')) throw new Error(`Expected /images/ path: ${url}`);
  const file = path.resolve(publicRoot, `.${url}`);
  if (!file.startsWith(publicRoot + path.sep)) throw new Error('Image path escapes public directory');
  return file;
}
async function generate() {
  const file = path.join(root, 'data/original-projects.json');
  const projects = JSON.parse(await fs.readFile(file, 'utf8'));
  const outputs = new Set();
  let before = 0, after = 0;
  for (const project of projects) {
    if (!project.images?.length || !project.images.some(p => p.id === project.coverImageId)) throw new Error(`Invalid gallery/cover: ${project.slug}`);
    for (const photo of project.images) {
      const input = publicFile(photo.src);
      photo.thumbnail ||= `/images/thumbnails/${project.slug}-${photo.id}.webp`;
      const output = publicFile(photo.thumbnail);
      if (!photo.thumbnail.startsWith('/images/thumbnails/') || !output.endsWith('.webp') || output === input || outputs.has(output)) throw new Error(`Invalid or duplicate thumbnail: ${output}`);
      outputs.add(output);
      const meta = await sharp(input).metadata();
      const rotated = meta.orientation >= 5 && meta.orientation <= 8;
      photo.width = rotated ? meta.height : meta.width;
      photo.height = rotated ? meta.width : meta.height;
      await fs.mkdir(path.dirname(output), { recursive: true });
      await sharp(input).rotate().resize({ width: 640, height: 480, fit: 'inside', withoutEnlargement: true }).webp({ quality: 76 }).toFile(output);
      before += (await fs.stat(input)).size;
      after += (await fs.stat(output)).size;
    }
    // Keep legacy references aligned while existing archive/preview consumers migrate.
    const cover = project.images.find(photo => photo.id === project.coverImageId);
    project.src = cover.src; project.alt = cover.alt; project.category = project.tags[0];
  }
  await fs.writeFile(file, JSON.stringify(projects, null, 2) + '\n');
  console.log(`${outputs.size} thumbnails generated; ${(before/1024).toFixed(0)} KB originals → ${(after/1024).toFixed(0)} KB thumbnails (${(100-after/before*100).toFixed(1)}% smaller).`);
}
generate().catch(error => { console.error(error.message); process.exitCode = 1; });
