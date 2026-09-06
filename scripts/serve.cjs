const http = require('node:http'), fs = require('node:fs'), path = require('node:path');
const root = path.resolve(__dirname, '../dist');
if (!fs.existsSync(root)) {
  require('./build.cjs').build();
}
const port = 3000;
const host = '0.0.0.0';
http.createServer((req, res) => {
  let name; try { name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); } catch { res.writeHead(400).end(); return; }
  let file = path.resolve(root, '.' + name + (name.endsWith('/') ? 'index.html' : ''));
  if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403).end(); return; }
  try {
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      file = path.join(file, 'index.html');
    }
  } catch {}
  fs.readFile(file, (error, data) => {
    if (error) { res.writeHead(404).end('Not found'); return; }
    res.setHeader('Content-Type', { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.xml':'application/xml' }[path.extname(file)] || 'text/plain');
    res.end(data);
  });
}).listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
