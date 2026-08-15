# 把网站发布到网上 · 小白版指南

目标：让全世界（包括招生官）通过 **anqitea.com** 打开你的网站。
全程免费，约 15 分钟。分两大步：① 传网站 → ② 绑域名。

---

## 第一步：把网站传到 Netlify（免费托管）

1. 打开浏览器，进入 **https://app.netlify.com/signup**
2. 点 **Sign up with email**（邮箱注册。建议用你申请大学用的那个邮箱，显得专业）
   - 需要验证邮箱，去收一封 Netlify 的邮件点确认
3. 登录后，你会看到一个页面，中间有一块虚线区域，写着
   **"Drag and drop your site output folder here"**（把网站文件夹拖到这里）
4. 打开"访达"（Finder），进入 `anqi-tea` 文件夹，**把以下东西全选**后拖进那块虚线区域：
   - `index.html`、`biluochun.html`、`shoumei.html`、`mayu.html`、`dianhong.html`（5 个网页文件）
   - `assets` 文件夹（图片/样式/脚本）
   - ⚠️ **不要拖** `picture`、`specs`、`scripts`、`test` 这些文件夹（内部素材和开发档案，不用上传）
   - 小技巧：在 `anqi-tea` 里新建一个文件夹叫 `site`，把上面要传的 6 样复制进去，然后整个 `site` 拖到 Netlify
5. 拖上去后等 10 秒左右，Netlify 会给你一个网址，长得像
   `https://你的随机名字.netlify.app` —— **点开看看，这就是你的网站上线了！**
   （手机也发给别人试试）

> 以后每次改了网站怎么更新？重复第 4 步：把新的文件拖到同一个站点上即可覆盖更新。

---

## 第二步：绑上你的域名 anqitea.com

前提：第一部的网站已经能通过 `xxx.netlify.app` 打开。

### A. 在 Netlify 里添加域名

1. 进入你的站点页面，点顶部 **Domain settings**（域名设置）
2. 点 **Add a domain**（添加域名），输入 `anqitea.com`，确认
3. Netlify 会显示一段提示，说需要去域名商修改 DNS 记录，并给你 **两个网址**，长得像：
   - `xxx.ns.netlify.com`
   - `yyy.ns.netlify.com`
   把这两行**复制**下来（这就是 Netlify 的"门牌号"）

### B. 回阿里云改"门牌号"（DNS 解析）

1. 打开 **https://dc.console.aliyun.com/next/index#/domain-list/all**
   （阿里云万网域名列表，登录你家的阿里云账号）
2. 找到 `anqitea.com` 这一行，点右边的 **解析**（或"DNS 解析"）
3. 先看看里面有没有别的记录：
   - 如果有，问一下爸妈是不是有别的用途；一般新注册的域名只有默认记录
4. 点 **修改 DNS 服务器**（或 DNS 服务器 / DNS Servers）
   - 把原来的 DNS 服务器**替换**成 Netlify 给你的那两个 `xxx.ns.netlify.com`
   - 保存
5. 等待生效：国内注册商转出解析一般 **几分钟到 24 小时**。回 Netlify 的
   Domain settings 页面看，显示绿色 **"anqitea.com"** 和一把小锁（HTTPS）就成了

### C. 完成后自测

- 电脑浏览器打开 `https://anqitea.com` → 能看到首页
- 点产品卡片 → 能进详情页
- 手机开流量（不连 WiFi）打开 → 也要能看
- 把网址发给你朋友：直接能打开，就是成功

---

## 常见问题

- **Q: 拖上去之后样式乱了/图不显示？**
  A: 多半是漏拖了 `assets` 文件夹。整个 `assets` 必须和网页文件在同一层。
- **Q: 域名等了一天还没生效？**
  A: 正常。DNS 生效最长 24~48 小时，Netlify 页面没变绿就再等等。
- **Q: 会被墙吗？别人在国内打不开怎么办？**
  A: Netlify 在国内大部分网络可以打开，偶尔慢。你的主观众（招生官）在国外，
  速度完全没问题。家里如果要看，`xxx.netlify.app` 或本地双击文件都行。
- **Q: 要花钱吗？**
  A: 不用。Netlify 免费额度对这种小站绰绰有余，域名你已经买过了。

---

## 上线清单（给我汇报用）

- [ ] 网站已在 `xxx.netlify.app` 打开正常
- [ ] anqitea.com 已能打开首页
- [ ] 手机流量下可打开
- [ ] 四个详情页 + 两个抖音视频正常
