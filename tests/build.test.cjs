const test=require('node:test'), assert=require('node:assert/strict'), fs=require('node:fs'), path=require('node:path'), cp=require('node:child_process'), os=require('node:os');
const root=path.resolve(__dirname,'..'), {markdown}=require('../scripts/build.cjs');
const build=(env={})=>cp.execFileSync(process.execPath,['scripts/build.cjs'],{cwd:root,env:{...process.env,...env}});
test('docs escape markup and preserve code blocks',()=>{assert.ok(markdown('# <img src=x>').includes('&lt;img'));assert.ok(markdown('~~~\nhello\n~~~').includes('<pre><code>'));});
test('preview build excludes private source and emits noindex headers',()=>{
  build({DEPLOY_ENV:'preview'});
  const headers=fs.readFileSync(path.join(root,'dist/_headers'),'utf8');
  assert.match(headers,/X-Robots-Tag: noindex/);assert.match(headers,/connect-src 'none'/);
  assert.ok(!fs.existsSync(path.join(root,'dist/package.json')));assert.ok(!fs.existsSync(path.join(root,'dist/AGENTS.md')));
  assert.ok(fs.existsSync(path.join(root,'dist/docs/index.html')));
});
test('production build emits the configured canonical origin and GitHub Pages domain file',()=>{
  build({DEPLOY_ENV:'production'});
  const index=fs.readFileSync(path.join(root,'dist/index.html'),'utf8');
  const robots=fs.readFileSync(path.join(root,'dist/robots.txt'),'utf8');
  const sitemap=fs.readFileSync(path.join(root,'dist/sitemap.xml'),'utf8');
  assert.match(index,/https:\/\/hinducompanion\.com\//);assert.match(robots,/Allow: \//);assert.match(sitemap,/https:\/\/hinducompanion\.com\//);
  assert.equal(fs.readFileSync(path.join(root,'dist/CNAME'),'utf8').trim(),'hinducompanion.com');
});
test('export includes dotfiles and refuses overwrite',()=>{
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'hindu-companion-test-')),target=path.join(dir,'new-project');
  cp.execFileSync(process.execPath,['scripts/export.cjs',target],{cwd:root});
  assert.ok(fs.existsSync(path.join(target,'.github/workflows/quality.yml')));assert.ok(!fs.existsSync(path.join(target,'node_modules')));
  assert.throws(()=>cp.execFileSync(process.execPath,['scripts/export.cjs',target],{cwd:root,stdio:'pipe'}));fs.rmSync(dir,{recursive:true,force:true});
});
