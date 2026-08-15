/* 在 Node 中加载站点使用的普通 <script>（非 module），返回其 window 沙箱。
   站点侧同一文件在浏览器直接可用 —— 单一事实来源。 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

module.exports = function load(rel) {
  const p = path.join(__dirname, '..', rel);
  if (!fs.existsSync(p)) return null;
  const sandbox = { console, document: undefined };
  sandbox.window = sandbox;
  vm.runInNewContext(fs.readFileSync(p, 'utf8'), sandbox, { filename: rel });
  return sandbox.window;
};
