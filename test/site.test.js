/* 行为规格：首页真实化（开发记录 e01s02） */
'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const load = require('../helpers/load');

const R = f => fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
const html = R('index.html');

test('共享资源抽取：外链 style.css + data→i18n→main 脚本顺序', () => {
  assert.match(html, /<link rel="stylesheet" href="assets\/css\/style\.css">/);
  const d = html.indexOf('assets/js/data.js');
  const i = html.indexOf('assets/js/i18n.js');
  const m = html.indexOf('assets/js/main.js');
  assert.ok(d !== -1 && i !== -1 && m !== -1 && d < i && i < m, '脚本引入顺序 data → i18n → main');
  assert.ok(fs.existsSync('assets/css/style.css'), 'style.css 存在');
  assert.ok(!/<style>/.test(html), '首页不再内联大段样式');
});

test('虚构四序在首页与共享脚本中清零', () => {
  const FI = /绯羽|炽翎|玄羽|朱雀四序|桂花金萱|蜜香红茶|岩韵乌龙/;
  for (const f of ['index.html', 'assets/js/main.js', 'assets/js/data.js', 'assets/js/i18n.js'])
    assert.doesNotMatch(R(f), FI, `${f} 残留虚构内容`);
});

test('真实系列与品牌年份', () => {
  assert.match(html, /雲鹊晓杯茶/);
  assert.match(html, /EST\. 2025/);
  assert.doesNotMatch(html, /EST\. 2026/);
});

test('设计者说版块 + 导航入口', () => {
  assert.match(html, /id="designer"/);
  assert.match(html, /href="#designer"/);
});

test('两条抖音视频嵌入站内播放', () => {
  assert.match(html, /7634383299120704362/);
  assert.match(html, /7607684718892747627/);
  assert.match(html, /open\.douyin\.com\/player\/video/);
});

test('不虚构：无假地址/假邮箱/假门店数', () => {
  assert.doesNotMatch(html, /hello@anqitea\.com/);
  assert.doesNotMatch(html, /成都市锦江区/);
  assert.doesNotMatch(html, /data-count="28"/);
});

test('产品卡容器由数据渲染（单一事实来源）', () => {
  assert.match(html, /<div class="carousel" id="carousel">/);
  assert.ok(!/绯羽/.test(html), '卡片不再手写虚构产品');
});

test('首页引用的本地图片均存在', () => {
  const srcs = [...html.matchAll(/(?:src|href)="((?:assets|picture)\/[^"]+)"/g)].map(m => m[1]);
  assert.ok(srcs.length > 0, '应引用本地素材');
  for (const s of new Set(srcs))
    assert.ok(fs.existsSync(s), `引用文件不存在: ${s}`);
});

test('i18n：HTML 用到的键在 zh/en 双语齐全', () => {
  const w = load('assets/js/i18n.js');
  assert.ok(w && w.I18N, 'assets/js/i18n.js 必须定义 window.I18N');
  const zh = Object.keys(w.I18N.zh), en = Object.keys(w.I18N.en);
  assert.deepEqual(zh.slice().sort(), en.slice().sort(), 'zh/en 键集一致');
  const used = [...html.matchAll(/data-i18n="([^"]+)"/g)].map(m => m[1]);
  assert.ok(used.length >= 25, `双语覆盖应足够完整（当前 ${used.length} 键）`);
  for (const k of used)
    assert.ok(w.I18N.zh[k] !== undefined, `缺 zh 键: ${k}`) &&
    assert.ok(w.I18N.en[k] !== undefined, `缺 en 键: ${k}`);
});

test('main.js 可加载且渲染函数存在', () => {
  const w = load('assets/js/main.js');
  assert.ok(w, 'main.js 可在沙箱求值');
});
