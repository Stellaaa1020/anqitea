/* 在共享沙箱中按序加载站点普通 <script>（非 module），返回其 window。
   站点侧同一批文件在浏览器直接可用 —— 单一事实来源。 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

module.exports = function load(rel) {
  const files = Array.isArray(rel) ? rel : [rel];
  const sandbox = { console, document: undefined };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  for (const f of files) {
    const p = path.join(__dirname, '..', f);
    if (!fs.existsSync(p)) return null;
    vm.runInContext(fs.readFileSync(p, 'utf8'), sandbox, { filename: f });
  }
  return sandbox.window;
};
