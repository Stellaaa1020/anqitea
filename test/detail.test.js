/* 行为规格：四款产品详情页（开发记录 e01s03）
   通过公开接口验证：页面骨架 + ANQI.renderProduct(pure) 渲染契约 */
'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const load = require('../helpers/load');

const R = f => fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
const FI = /绯羽|炽翎|玄羽|朱雀四序|桂花金萱|蜜香红茶|岩韵乌龙/;

const data = load('assets/js/data.js');
const P = data.ANQI.products;

/* ---------- 页面骨架 ---------- */
for (const p of P) {
  test(`[${p.slug}] 页面存在、data-page 标记、脚本序 data<render<i18n<main`, () => {
    const h = R(p.page);
    assert.match(h, new RegExp(`data-page="${p.slug}"`));
    assert.match(h, /assets\/css\/style\.css/);
    const d = h.indexOf('assets/js/data.js'),
          i = h.indexOf('assets/js/i18n.js'),
          r = h.indexOf('assets/js/render.js'),
          m = h.indexOf('assets/js/main.js');
    assert.ok(d !== -1 && r !== -1 && i !== -1 && m !== -1 && d < i && i < r && r < m,
              '脚本顺序 data → i18n → render → main');
    assert.doesNotMatch(h, FI);
  });

  test(`[${p.slug}] 挂载点 + 返回首页`, () => {
    const h = R(p.page);
    assert.match(h, /id="product"/);
    assert.match(h, /href="index\.html/);
  });
}

test('详情页渲染器为纯函数（无 DOM 也可求值）', () => {
  const w = load(['assets/js/data.js', 'assets/js/i18n.js', 'assets/js/render.js']);
  assert.equal(typeof w.ANQI.renderProduct, 'function');
});

for (const p of P) {
  test(`[${p.slug}] 渲染含：双语名/茶类/产地/价格/互跳其余三款/图片存在`, () => {
    const w = load(['assets/js/data.js', 'assets/js/i18n.js', 'assets/js/render.js']);
    const zh = w.ANQI.renderProduct(p, 'zh');
    const en = w.ANQI.renderProduct(p, 'en');
    assert.match(zh, new RegExp(p.nameZh));
    assert.match(en, new RegExp(p.nameEn));
    assert.match(zh, /48–58/);                       // 价格（开发记录决策 12）
    assert.match(zh, /10 杯/);                       // 每桶 10 杯
    assert.match(zh, new RegExp(p.originZh.split(' · ')[0])); // 产地
    assert.match(zh, new RegExp(p.liquorZh));        // 汤色
    // 互跳：链接到其余三款
    for (const o of P) if (o.slug !== p.slug)
      assert.ok(zh.includes(o.page), `缺互跳 ${o.page}`);
    assert.match(zh, /index\.html/);                 // 返回首页
    assert.doesNotMatch(zh, FI);
    // 图片真实存在
    for (const img of [p.img, p.story])
      assert.ok(fs.existsSync(path.join(__dirname, '..', img)));
  });
}

test('马跃新程：一页双味，大红袍与普洱各自冲泡建议', () => {
  const w = load(['assets/js/data.js', 'assets/js/i18n.js', 'assets/js/render.js']);
  const mayu = P.find(x => x.slug === 'mayu');
  const zh = w.ANQI.renderProduct(mayu, 'zh');
  assert.match(zh, /大红袍/);
  assert.match(zh, /普洱/);
  assert.match(zh, /武夷山/);
  assert.match(zh, /95°C/);       // 大红袍冲泡
  assert.match(zh, /润茶/);       // 普洱冲泡
});

test('详情页静态标签双语齐全（I18N dt.* 键）', () => {
  const w = load('assets/js/i18n.js');
  const keys = ['dt.back', 'dt.storyT', 'dt.tasteT', 'dt.brewT', 'dt.specT', 'dt.moreT',
                'dt.price', 'dt.origin', 'dt.type', 'dt.pack', 'dt.liquor', 'dt.aroma', 'dt.taste'];
  for (const k of keys) {
    assert.ok(w.I18N.zh[k], `缺 zh.${k}`);
    assert.ok(w.I18N.en[k], `缺 en.${k}`);
  }
});

test('每款产品数据含品鉴字段（香气/滋味 双语）', () => {
  for (const p of P) {
    for (const k of ['aromaZh', 'aromaEn', 'tasteZh', 'tasteEn', 'storyZh', 'storyEn'])
      assert.ok(p[k] && p[k].length >= 8, `${p.slug}.${k} 缺失或过短`);
  }
});
