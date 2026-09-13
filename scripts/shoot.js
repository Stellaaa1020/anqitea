/* 截图脚本：本地起静态服务，渲染全部页面为 PNG（桌面+移动），供视觉走查
   截图前固定动效状态：nav 转 absolute、关闭平滑滚动、等待数字滚动结束 */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, '.shots');
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml' };

function serve() {
  return new Promise(resolve => {
    const srv = http.createServer((req, res) => {
      let p = decodeURIComponent(req.url.split('?')[0]);
      if (p === '/') p = '/index.html';
      const fp = path.join(ROOT, p);
      fs.readFile(fp, (err, buf) => {
        if (err) { res.writeHead(404); res.end('nf'); return; }
        res.writeHead(200, { 'content-type': MIME[path.extname(fp)] || 'application/octet-stream' });
        res.end(buf);
      });
    });
    srv.listen(0, '127.0.0.1', () => resolve(srv));
  });
}

const PAGES = ['index.html', 'project.html', 'biluochun.html', 'dianhong.html'];
const VIEWPORTS = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } };

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const srv = await serve();
  const port = srv.address().port;
  const exe = path.join(process.env.HOME, 'Library/Caches/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-mac-arm64/chrome-headless-shell');
  const browser = await chromium.launch(process.platform === 'darwin' && fs.existsSync(exe) ? { executablePath: exe } : {});
  for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
    const page = await browser.newPage({ viewport: vp, deviceScaleFactor: 1 });
    for (const p of PAGES) {
      await page.goto(`http://127.0.0.1:${port}/${p}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(500);
      // 逐屏滚动触发全部 reveal/数字滚动，再回顶部等待过渡收尾
      await page.evaluate(async () => {
        document.documentElement.style.scrollBehavior = 'auto';
        const step = Math.round(innerHeight * 0.8);
        for (let y = 0; y <= document.body.scrollHeight; y += step) {
          window.scrollTo({ top: y, behavior: 'instant' });
          await new Promise(r => setTimeout(r, 140));
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
        window.dispatchEvent(new Event('scroll'));
        await new Promise(r => setTimeout(r, 1700)); // 等数字滚动 + 进场过渡收尾
      });
      // fullPage 截图前固定 fixed 元素，避免拼接伪影
      await page.addStyleTag({ content: '.nav{position:absolute!important}.to-top{display:none!important}' });
      const name = p.replace('.html', '');
      await page.screenshot({ path: path.join(OUT, `${name}-${vpName}.png`), fullPage: true });
      console.log('shot', `${name}-${vpName}`);
    }
    await page.close();
  }
  await browser.close();
  srv.close();
})();
