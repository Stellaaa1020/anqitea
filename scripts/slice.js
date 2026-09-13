/* 供视觉走查：把 .shots 下的整页长截图切成 1600px 高的分段 PNG（canvas 像素精确） */
'use strict';
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');
const dir = '.shots', out = '.shots/seg', H = 1600;
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const exe = path.join(process.env.HOME, 'Library/Caches/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-mac-arm64/chrome-headless-shell');
  const browser = await chromium.launch(process.platform === 'darwin' && fs.existsSync(exe) ? { executablePath: exe } : {});
  const page = await browser.newPage();
  for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.png')).sort()) {
    const name = f.replace('.png', '');
    const b64 = fs.readFileSync(path.join(dir, f)).toString('base64');
    const slices = await page.evaluate(async (payload) => {
      const { b64, H } = payload;
      const img = new Image();
      img.src = 'data:image/png;base64,' + b64;
      await new Promise(r => { img.onload = r; });
      const out = [];
      for (let y = 0; y < img.naturalHeight; y += H) {
        const hh = Math.min(H, img.naturalHeight - y);
        const c = document.createElement('canvas');
        c.width = img.naturalWidth; c.height = hh;
        c.getContext('2d').drawImage(img, 0, -y);
        out.push({ y, png: c.toDataURL('image/png') });
      }
      return out;
    }, { b64, H });
    slices.forEach((s, i) => {
      fs.writeFileSync(path.join(out, `${name}-${String(i + 1).padStart(2, '0')}.png`), Buffer.from(s.png.split(',')[1], 'base64'));
    });
    console.log(name, slices.length);
  }
  await browser.close();
})();
