/* 行为规格：雲鹊晓杯茶产品数据（站点唯一事实来源 assets/js/data.js） */
'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const load = require('../helpers/load');

const win = load('assets/js/data.js');
const A = win && win.ANQI;

test('data.js 存在并暴露 window.ANQI', () => {
  assert.ok(A, 'assets/js/data.js 必须定义 window.ANQI');
});

test('四款产品，按茶汤浅→深排序：碧螺春→寿眉→马跃新程→滇红', () => {
  assert.equal(A.products.length, 4);
  assert.deepEqual(
    A.products.map(p => p.slug),
    ['biluochun', 'shoumei', 'mayu', 'dianhong']
  );
});

test('产品为真实的雲鹊晓杯茶命名', () => {
  assert.deepEqual(
    A.products.map(p => p.nameZh),
    ['碧蕴藏灵', '百福白茶', '马跃新程', '金鹊祥雲']
  );
  assert.equal(A.brand.seriesZh, '雲鹊晓杯茶');
});

test('茶类正确：绿/白/乌龙+普洱/红', () => {
  assert.match(A.products[0].teaZh, /绿茶/);
  assert.match(A.products[1].teaZh, /白茶/);
  assert.match(A.products[2].teaZh, /大红袍/);
  assert.match(A.products[2].teaZh, /普洱/);
  assert.match(A.products[3].teaZh, /红茶/);
});

test('产地为用户确认的真实产地', () => {
  assert.match(A.products[0].originZh, /云南/);          // 碧螺春：云南大叶种鲜叶
  assert.match(A.products[1].originZh, /福鼎/);          // 寿眉：福建福鼎
  const f = A.products[2].flavors;
  assert.ok(Array.isArray(f) && f.length === 2, '马跃新程双口味');
  assert.match(f[0].originZh, /武夷山/);                 // 大红袍：武夷山
  assert.match(f[1].originZh, /云南/);                   // 普洱：云南
  assert.match(A.products[3].originZh, /凤庆/);          // 滇红：云南凤庆
});

test('虚构四序内容在数据中清零', () => {
  assert.doesNotMatch(JSON.stringify(A), /绯羽|炽翎|玄羽|朱雀四序|桂花金萱|蜜香红茶|岩韵乌龙/);
});

test('品牌事实：2025 创立 / 价格区间 / 每桶 10 杯', () => {
  assert.equal(A.brand.est, 2025);
  assert.match(A.brand.priceZh, /48/);
  assert.match(A.brand.priceZh, /58/);
  assert.match(A.brand.priceZh, /10/);
});

test('抖音视频两条，vid 与开发记录一致', () => {
  const vids = A.brand.douyin.videos.map(v => v.vid);
  assert.deepEqual(vids, ['7634383299120704362', '7607684718892747627']);
});

test('每款产品：双语字段/冲泡建议/图片文件真实存在', () => {
  for (const p of A.products) {
    for (const k of ['nameZh','nameEn','teaZh','teaEn','descZh','descEn','originZh','originEn','brewZh','brewEn','img','story','page'])
      assert.ok(p[k] && p[k].length, `${p.slug}.${k} 缺失`);
    for (const img of [p.img, p.story])
      assert.ok(fs.existsSync(path.join(__dirname, '..', img)), `图片不存在: ${img}`);
    assert.match(p.page, /\.html$/);
  }
});
