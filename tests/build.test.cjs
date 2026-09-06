const test = require('node:test'), assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path');
const root = path.resolve(__dirname, '..');
test('Astro uses the production origin and static output', () => {
  const config = fs.readFileSync(path.join(root, 'astro.config.mjs'), 'utf8');
  assert.match(config, /https:\/\/hinducompanion\.com/); assert.match(config, /output: 'static'/);
});
test('content entries include required provenance fields', () => {
  for (const folder of ['bhajans', 'guides']) for (const file of fs.readdirSync(path.join(root, 'src/content', folder))) {
    const source = fs.readFileSync(path.join(root, 'src/content', folder, file), 'utf8');
    assert.match(source, /^---[\s\S]*?^source:/m, `${folder}/${file} needs source frontmatter`);
  }
});
test('theme centralizes visual tokens', () => {
  const css = fs.readFileSync(path.join(root, 'src/styles/theme.css'), 'utf8');
  for (const token of ['--paper', '--saffron', '--maroon', '--radius']) assert.match(css, new RegExp(token));
});
