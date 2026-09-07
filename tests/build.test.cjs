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

test('bhajan entries specify mandatory provenance, split rights, and status metadata', () => {
  const validStatuses = ['verified', 'draft', 'needs-review', 'not-published'];
  const validRights = ['public-domain', 'permission-granted', 'original-work', 'link-only', 'needs-review'];
  const publishableRights = ['public-domain', 'permission-granted', 'original-work'];

  for (const file of fs.readdirSync(path.join(root, 'src/content/bhajans'))) {
    const content = fs.readFileSync(path.join(root, 'src/content/bhajans', file), 'utf8');

    // Mandatory field assertions
    const statusMatch = content.match(/^status:\s*([a-z-]+)/m);
    assert.ok(statusMatch, `${file} is missing mandatory status field`);
    assert.ok(
      validStatuses.includes(statusMatch[1]),
      `${file} has invalid status '${statusMatch[1]}'`
    );

    const textRightsMatch = content.match(/^textRightsStatus:\s*([a-z-]+)/m);
    assert.ok(textRightsMatch, `${file} is missing mandatory textRightsStatus field`);
    assert.ok(
      validRights.includes(textRightsMatch[1]),
      `${file} has invalid textRightsStatus '${textRightsMatch[1]}'`
    );

    const transRightsMatch = content.match(/^translationRightsStatus:\s*([a-z-]+)/m);
    assert.ok(transRightsMatch, `${file} is missing mandatory translationRightsStatus field`);
    assert.ok(
      validRights.includes(transRightsMatch[1]),
      `${file} has invalid translationRightsStatus '${transRightsMatch[1]}'`
    );

    const langMatch = content.match(/^language:\s*.+/m);
    assert.ok(langMatch, `${file} is missing mandatory language field`);

    const transStatusMatch = content.match(/^translationStatus:\s*.+/m);
    assert.ok(transStatusMatch, `${file} is missing mandatory translationStatus field`);

    // Tightened validation rule: status: 'verified' requires verified non-draft rights on both text and translation
    if (statusMatch[1] === 'verified') {
      assert.ok(
        publishableRights.includes(textRightsMatch[1]),
        `${file} has status: verified but textRightsStatus is '${textRightsMatch[1]}' (must be public-domain, permission-granted, or original-work)`
      );
      assert.ok(
        publishableRights.includes(transRightsMatch[1]),
        `${file} has status: verified but translationRightsStatus is '${transRightsMatch[1]}' (must be public-domain, permission-granted, or original-work)`
      );
      assert.match(content, /^textRightsBasis:\s*.+/m, `${file} (verified) needs a textRightsBasis explanation`);
      assert.match(content, /^translationRightsBasis:\s*.+/m, `${file} (verified) needs a translationRightsBasis explanation`);
    }
  }
});

test('theme centralizes visual tokens', () => {
  const css = fs.readFileSync(path.join(root, 'src/styles/theme.css'), 'utf8');
  for (const token of ['--paper', '--saffron', '--maroon', '--radius']) {
    assert.match(css, new RegExp(token));
  }
});
