/* ============================================================
   安祺与茶 · 产品详情页渲染器（普通 script，file:// 可用）
   依赖顺序：data.js → i18n.js → render.js → main.js
   renderProduct(p, lang) 为纯函数（返回 HTML 字符串）；
   mountProduct(lang) 负责浏览器挂载与标题，main.js 切语言时回调。
   ============================================================ */
(function (g) {
  var A = g.ANQI = g.ANQI || {};

  A.renderProduct = function (p, lang) {
    var L = lang === 'en';
    var T = (g.I18N && g.I18N[lang]) || {};
    var b = A.brand;
    var name = L ? p.nameEn : p.nameZh;
    var tea = L ? p.teaEn : p.teaZh;
    var desc = L ? p.descEn : p.descZh;
    var story = L ? p.storyEn : p.storyZh;
    var origin = L ? p.originEn : p.originZh;
    var liquor = L ? p.liquorEn : p.liquorZh;
    var aroma = L ? p.aromaEn : p.aromaZh;
    var taste = L ? p.tasteEn : p.tasteZh;
    var brew = L ? p.brewEn : p.brewZh;
    var price = L ? b.priceEn : b.priceZh;
    var pack = L ? '10 cups per tube' : '每桶 10 杯';
    var series = L ? b.seriesEn : b.seriesZh;
    var method = L ? 'Hot water straight onto the leaves. That is all.' : '热水直冲杯底原叶——就这么简单。';
    /* EN 模式下 h2 与 small 不再重复：小字反显中文标签（双语倒置） */
    var Z = (g.I18N && g.I18N.zh) || {};
    function subLabel(key, en) { return L ? (Z[key] || en) : en; }

    /* 马跃新程：双口味块 */
    var brewBlock = '';
    if (p.flavors && p.flavors.length) {
      brewBlock = p.flavors.map(function (f) {
        return '<div class="pd-flavor">' +
          '<h3>' + (L ? f.nameEn : f.nameZh) + '<small>' + (L ? f.originEn : f.originZh) + '</small></h3>' +
          '<p>' + (L ? f.brewEn : f.brewZh) + '</p>' +
          '</div>';
      }).join('');
    } else {
      brewBlock = '<div class="pd-flavor"><h3>' + tea + '<small>' + origin + '</small></h3><p>' + brew + '</p></div>';
    }

    /* 沿汤色由浅到深的线性旅程：上一盏 / 色带轨 / 下一盏（四站全部可跳） */
    var idx = A.products.indexOf(p);
    var prev = A.products[(idx + A.products.length - 1) % A.products.length];
    var next = A.products[(idx + 1) % A.products.length];
    function navCard(o, cls, label, arrow) {
      return '<a class="pd-nav ' + cls + ' reveal" href="' + o.page + '" style="--tint:' + o.tint + '">' +
        '<span class="pd-nav-txt"><small>' + label + '</small>' +
        '<b>' + (L ? o.nameEn : o.nameZh) + '</b>' +
        '<i>' + (L ? o.teaEn : o.teaZh) + '</i></span>' +
        '<em class="pd-nav-arrow" aria-hidden="true">' + arrow + '</em>' +
        '<img src="' + o.img + '" alt="' + (L ? o.nameEn : o.nameZh) + '" loading="lazy" style="view-transition-name:cup-' + o.slug + '">' +
        '</a>';
    }
    var rail = A.products.map(function (o) {
      return '<li' + (o.slug === p.slug ? ' class="cur"' : '') + ' style="--tint:' + o.tint + '">' +
        '<a href="' + o.page + '"><i aria-hidden="true"></i><span>' + (L ? o.nameEn : o.nameZh) + '</span></a></li>';
    }).join('');
    var pager =
      '<div class="pd-pager reveal">' +
        navCard(prev, 'prev', T['dt.prev'], '←') +
        '<div class="pd-rail" role="navigation" aria-label="' + T['dt.railT'] + '">' +
          '<span class="pd-rail-t">' + T['dt.railT'] + '</span>' +
          '<ol>' + rail + '</ol>' +
        '</div>' +
        navCard(next, 'next', T['dt.next'], '→') +
      '</div>';

    return (
      '<section class="pd-hero" style="--tint:' + p.tint + '">' +
        '<nav class="crumbs" aria-label="Breadcrumb">' +
          '<a href="index.html">' + T['nav.home'] + '</a><i aria-hidden="true">/</i>' +
          '<a href="index.html#curated">' + T['nav.curated'] + '</a><i aria-hidden="true">/</i>' +
          '<b aria-current="page">' + name + '</b>' +
        '</nav>' +
        '<p class="pd-kicker">' + series + ' · EST. 2025</p>' +
        '<h1 class="pd-title">' + name + '</h1>' +
        '<p class="pd-tea">' + tea + '</p>' +
        '<p class="pd-desc">' + desc + '</p>' +
        '<figure class="pd-hero-img"><img src="' + p.img + '" alt="' + name + '" loading="eager" style="view-transition-name:cup-' + p.slug + '"></figure>' +
      '</section>' +

      '<section class="section pd-sec" style="--tint:' + p.tint + '">' +
        '<div class="section-head"><span class="vlabel">' + T['dt.storyT'] + '</span>' +
        '<h2 class="section-title">' + name + '<small>' + (L ? p.nameZh : p.nameEn) + '</small></h2></div>' +
        '<div class="pd-story">' +
          '<figure class="pd-story-card"><img src="' + p.story + '" alt="' + name + ' story card" loading="lazy"></figure>' +
          '<p class="pd-story-text">' + story + '</p>' +
        '</div>' +
      '</section>' +

      '<section class="section pd-sec pd-tintbg">' +
        '<div class="section-head"><span class="vlabel">' + T['dt.senseV'] + '</span>' +
        '<h2 class="section-title">' + T['dt.tasteT'] + '<small>' + subLabel('dt.tasteT', 'TASTING') + '</small></h2></div>' +
        '<div class="pd-taste-grid">' +
          '<div class="pd-taste"><i>' + T['dt.liquor'] + '</i><b>' + liquor + '</b></div>' +
          '<div class="pd-taste"><i>' + T['dt.aroma'] + '</i><b>' + aroma + '</b></div>' +
          '<div class="pd-taste"><i>' + T['dt.taste'] + '</i><b>' + taste + '</b></div>' +
        '</div>' +
      '</section>' +

      '<section class="section pd-sec">' +
        '<div class="section-head"><span class="vlabel">' + T['dt.brewV'] + '</span>' +
        '<h2 class="section-title">' + T['dt.brewT'] + '<small>' + subLabel('dt.brewT', 'HOW TO BREW') + '</small></h2></div>' +
        '<div class="pd-brew">' + brewBlock + '</div>' +
        '<p class="pd-method">' + method + '</p>' +
      '</section>' +

      '<section class="section pd-sec pd-tintbg">' +
        '<div class="section-head"><span class="vlabel">' + T['dt.specV'] + '</span>' +
        '<h2 class="section-title">' + T['dt.specT'] + '<small>' + subLabel('dt.specT', 'AT A GLANCE') + '</small></h2></div>' +
        '<dl class="pd-spec">' +
          '<div><dt>' + T['dt.type'] + '</dt><dd>' + tea + '</dd></div>' +
          '<div><dt>' + T['dt.origin'] + '</dt><dd>' + origin + '</dd></div>' +
          '<div><dt>' + T['dt.liquor'] + '</dt><dd>' + liquor + '</dd></div>' +
          '<div><dt>' + T['dt.pack'] + '</dt><dd>' + pack + '</dd></div>' +
          '<div><dt>' + T['dt.price'] + '</dt><dd>' + price + '</dd></div>' +
        '</dl>' +
      '</section>' +

      '<section class="section pd-sec">' +
        '<div class="section-head"><span class="vlabel">' + T['dt.moreV'] + '</span>' +
        '<h2 class="section-title">' + T['dt.moreT'] + '<small>' + subLabel('dt.moreT', 'KEEP EXPLORING') + '</small></h2></div>' +
        pager +
        '<div class="pd-back"><a class="btn btn-ghost" href="index.html#curated">' + T['dt.back'] + '</a></div>' +
      '</section>'
    );
  };

  A.mountProduct = function (lang) {
    if (typeof document === 'undefined') return;
    var slug = document.body && document.body.dataset.page;
    if (!slug || slug === 'home') return;
    var p = A.products.filter(function (x) { return x.slug === slug; })[0];
    var el = document.getElementById('product');
    if (!p || !el) return;
    el.innerHTML = A.renderProduct(p, lang);
    document.title = lang === 'en'
      ? p.nameEn + ' · Yunque Xiao Cup Tea · Anqi Tea'
      : p.nameZh + ' · 雲鹊晓杯茶 · 安祺与茶';
  };

  if (typeof document !== 'undefined') {
    var saved = 'zh';
    try { saved = localStorage.getItem('anqi-lang') || 'zh'; } catch (e) {}
    A.mountProduct(saved);
  }
})(typeof window !== 'undefined' ? window : globalThis);
