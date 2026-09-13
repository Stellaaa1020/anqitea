/* 行为规格：全站双语覆盖 + 内链完整性（开发记录 e01s04） */
'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const load = require('../helpers/load');

const R = f => fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
const data = load('assets/js/data.js');
const PAGES = ['index.html', 'project.html', ...data.ANQI.products.map(p => p.page)];
const FI = /绯羽|炽翎|玄羽|朱雀四序|桂花金萱|蜜香红茶|岩韵乌龙|hello@anqitea|成都市锦江区/;

test('页面清单 = 首页 + 项目页 + 四款详情页，全部存在', () => {
  assert.deepEqual(PAGES, ['index.html', 'project.html', 'biluochun.html', 'shoumei.html', 'mayu.html', 'dianhong.html']);
  for (const f of PAGES) assert.ok(fs.existsSync(f), `缺页面: ${f}`);
});

for (const f of PAGES) {
  test(`[${f}] 虚构内容清零`, () => {
    assert.doesNotMatch(R(f), FI);
  });

  test(`[${f}] 静态 data-i18n 键 zh/en 齐全`, () => {
    const w = load('assets/js/i18n.js');
    const used = [...R(f).matchAll(/data-i18n="([^"]+)"/g)].map(m => m[1]);
    for (const k of used) {
      assert.ok(w.I18N.zh[k] !== undefined, `缺 zh.${k}`);
      assert.ok(w.I18N.en[k] !== undefined, `缺 en.${k}`);
    }
  });

  test(`[${f}] 本地引用（图片/页面/样式/脚本）全部存在`, () => {
    const refs = [...R(f).matchAll(/(?:src|href)="([^"#][^"]*)"/g)].map(m => m[1].split('#')[0])
      .filter(u => u && !/^https?:/.test(u));
    assert.ok(refs.length > 0);
    for (const u of new Set(refs))
      assert.ok(fs.existsSync(u), `引用不存在: ${u}`);
  });

  test(`[${f}] 无 ES module / 无内联大脚本（file:// 直开约束）`, () => {
    assert.doesNotMatch(R(f), /type="module"/);
    assert.doesNotMatch(R(f), /<script>\n[\s\S]{200,}<\/script>/);
  });
}

test('站内互链闭合：卡片与互跳指向的页面都存在', () => {
  for (const f of PAGES) {
    const links = [...R(f).matchAll(/href="([a-z]+\.html[^"]*)"/g)].map(m => m[1].split('#')[0]);
    for (const l of new Set(links))
      assert.ok(fs.existsSync(l), `${f} 链接的页面不存在: ${l}`);
  }
});

test('渲染产物双语完整：每款产品 zh/en 两版渲染均含关键事实', () => {
  const w = load(['assets/js/data.js', 'assets/js/i18n.js', 'assets/js/render.js']);
  for (const p of data.ANQI.products) {
    for (const lang of ['zh', 'en']) {
      const out = w.ANQI.renderProduct(p, lang);
      assert.match(out, /EST\. 2025/, `${p.slug}/${lang} 缺年份`);
      assert.match(out, lang === 'zh' ? /48–58/ : /¥48–58/, `${p.slug}/${lang} 缺价格`);
      assert.match(out, /48–58|¥48–58/);
      assert.match(out, lang === 'zh' ? /每桶 10 杯/ : /10 cups per tube/, `${p.slug}/${lang} 缺规格`);
      assert.match(out, /index\.html/);
      assert.doesNotMatch(out, /undefined|\[object/);
    }
  }
});

test('共享脚本四处求值安全：首页路径与详情页路径互不污染', () => {
  // main.js 在无 DOM 的沙箱（Node）中必须可安全求值
  for (const f of ['assets/js/main.js', 'assets/js/render.js'])
    assert.ok(load(f), `${f} 沙箱求值失败`);
});
