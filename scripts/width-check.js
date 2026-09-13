const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');
const ROOT = '/Volumes/Treasure/dev/anqitea';
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml' };
const srv = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  fs.readFile(path.join(ROOT, p), (err, buf) => {
    if (err) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { 'content-type': MIME[path.extname(p)] || 'application/octet-stream' });
    res.end(buf);
  });
});
(async () => {
  await new Promise(r => srv.listen(0, '127.0.0.1', r));
  const port = srv.address().port;
  const exe = path.join(process.env.HOME, 'Library/Caches/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-mac-arm64/chrome-headless-shell');
  const browser = await chromium.launch({ executablePath: exe });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  for (const p of ['index.html', 'project.html', 'biluochun.html', 'dianhong.html', 'shoumei.html', 'mayu.html']) {
    await page.goto(`http://127.0.0.1:${port}/${p}`, { waitUntil: 'networkidle' });
    const w = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, body: document.body.scrollWidth, vw: innerWidth }));
    const widest = await page.evaluate(() => {
      let bad = [];
      document.querySelectorAll('*').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.right > innerWidth + 1) bad.push(`${el.tagName}.${(el.className||'').toString().split(' ')[0]}→${Math.round(r.right)}`);
      });
      return bad.slice(0, 5);
    });
    console.log(p, JSON.stringify(w), widest.join(' | ') || 'no overflow');
  }
  await browser.close(); srv.close();
})();
