const test = require('node:test'), assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path');
const root = path.resolve(__dirname, '..');

test('Astro uses the production origin and static output', () => {
  const config = fs.readFileSync(path.join(root, 'astro.config.mjs'), 'utf8');
  assert.match(config, /https:\/\/hinducompanion\.com/);
  assert.match(config, /output: 'static'/);
});

test('content entries include required provenance fields', () => {
  for (const folder of ['bhajans', 'guides']) {
    for (const file of fs.readdirSync(path.join(root, 'src/content', folder))) {
      const source = fs.readFileSync(path.join(root, 'src/content', folder, file), 'utf8');
      assert.match(source, /^---[\s\S]*?^source:/m, `${folder}/${file} needs source frontmatter`);
    }
  }
});

test('bhajan entries specify valid editorial model metadata', () => {
  const validOrigins = ['traditional-source', 'original-site-writing', 'permission', 'link-only'];
  const validStatuses = ['draft', 'published'];

  for (const file of fs.readdirSync(path.join(root, 'src/content/bhajans'))) {
    const content = fs.readFileSync(path.join(root, 'src/content/bhajans', file), 'utf8');

    // Minimal editorial model assertions
    const statusMatch = content.match(/^status:\s*([a-z-]+)/m);
    assert.ok(statusMatch, `${file} is missing mandatory status field`);
    assert.ok(
      validStatuses.includes(statusMatch[1]),
      `${file} has invalid status '${statusMatch[1]}'`
    );

    const originMatch = content.match(/^contentOrigin:\s*([a-z-]+)/m);
    assert.ok(originMatch, `${file} is missing mandatory contentOrigin field`);
    assert.ok(
      validOrigins.includes(originMatch[1]),
      `${file} has invalid contentOrigin '${originMatch[1]}'`
    );

    const langMatch = content.match(/^language:\s*.+/m);
    assert.ok(langMatch, `${file} is missing mandatory language field`);
  }
});

test('theme centralizes visual tokens', () => {
  const css = fs.readFileSync(path.join(root, 'src/styles/theme.css'), 'utf8');
  for (const token of ['--paper', '--saffron', '--maroon', '--radius']) {
    assert.match(css, new RegExp(token));
  }
});
