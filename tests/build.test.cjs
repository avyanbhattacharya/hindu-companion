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

test('bhajan entries specify valid publication status and rights metadata', () => {
  const validStatuses = ['verified', 'draft', 'needs-review', 'not-published'];
  const validRights = ['public-domain', 'permission-granted', 'original-work', 'link-only'];

  for (const file of fs.readdirSync(path.join(root, 'src/content/bhajans'))) {
    const content = fs.readFileSync(path.join(root, 'src/content/bhajans', file), 'utf8');
    const statusMatch = content.match(/^status:\s*([a-z-]+)/m);
    const rightsMatch = content.match(/^rightsStatus:\s*([a-z-]+)/m);

    if (statusMatch) {
      assert.ok(
        validStatuses.includes(statusMatch[1]),
        `${file} has invalid status '${statusMatch[1]}'`
      );
    }
    if (rightsMatch) {
      assert.ok(
        validRights.includes(rightsMatch[1]),
        `${file} has invalid rightsStatus '${rightsMatch[1]}'`
      );
    }
  }
});

test('theme centralizes visual tokens', () => {
  const css = fs.readFileSync(path.join(root, 'src/styles/theme.css'), 'utf8');
  for (const token of ['--paper', '--saffron', '--maroon', '--radius']) {
    assert.match(css, new RegExp(token));
  }
});
