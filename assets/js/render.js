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
    var origin = L ? p.originEn : p.originEn && p.originZh;
    origin = L ? p.originEn : p.originZh;
    var liquor = L ? p.liquorEn : p.liquorZh;
    var aroma = L ? p.aromaEn : p.aromaZh;
    var taste = L ? p.tasteEn : p.tasteZh;
    var brew = L ? p.brewEn : p.brewZh;
    var price = L ? b.priceEn : b.priceZh;
    var pack = L ? '10 cups per tube' : '每桶 10 杯';
    var series = L ? b.seriesEn : b.seriesZh;
    var method = L ? 'Hot water straight onto the leaves — that is all.' : '热水直冲杯底原叶——就这么简单。';

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

    /* 互跳其余三款 */
    var more = A.products.filter(function (o) { return o.slug !== p.slug; }).map(function (o) {
      return '<a class="pd-more-card reveal d1" href="' + o.page + '">' +
        '<img src="' + o.img + '" alt="' + (L ? o.nameEn : o.nameZh) + '" loading="lazy">' +
        '<span><b>' + (L ? o.nameEn : o.nameZh) + '</b><i>' + (L ? o.teaEn : o.teaZh) + '</i></span>' +
        '</a>';
    }).join('');

    return (
      '<section class="pd-hero" style="--tint:' + p.tint + '">' +
        '<p class="pd-kicker">' + series + ' · EST. 2025</p>' +
        '<h1 class="pd-title">' + name + '</h1>' +
        '<p class="pd-tea">' + tea + '</p>' +
        '<p class="pd-desc">' + desc + '</p>' +
        '<figure class="pd-hero-img"><img src="' + p.img + '" alt="' + name + '" loading="eager"></figure>' +
      '</section>' +

      '<section class="section pd-sec">' +
        '<div class="section-head"><span class="vlabel">' + T['dt.storyT'] + '</span>' +
        '<h2 class="section-title">' + name + '<small>' + (L ? p.nameZh : p.nameEn) + '</small></h2></div>' +
        '<div class="pd-story">' +
          '<figure class="pd-story-card"><img src="' + p.story + '" alt="' + name + ' story card" loading="lazy"></figure>' +
          '<p class="pd-story-text">' + story + '</p>' +
        '</div>' +
      '</section>' +

      '<section class="section pd-sec pd-tintbg">' +
        '<div class="section-head"><span class="vlabel">' + T['dt.tasteT'] + '</span>' +
        '<h2 class="section-title">' + T['dt.tasteT'] + '<small>TASTING</small></h2></div>' +
        '<div class="pd-taste-grid">' +
          '<div class="pd-taste"><i>' + T['dt.liquor'] + '</i><b>' + liquor + '</b></div>' +
          '<div class="pd-taste"><i>' + T['dt.aroma'] + '</i><b>' + aroma + '</b></div>' +
          '<div class="pd-taste"><i>' + T['dt.taste'] + '</i><b>' + taste + '</b></div>' +
        '</div>' +
      '</section>' +

      '<section class="section pd-sec">' +
        '<div class="section-head"><span class="vlabel">' + T['dt.brewT'] + '</span>' +
        '<h2 class="section-title">' + T['dt.brewT'] + '<small>HOW TO BREW</small></h2></div>' +
        '<div class="pd-brew">' + brewBlock + '</div>' +
        '<p class="pd-method">' + method + '</p>' +
      '</section>' +

      '<section class="section pd-sec pd-tintbg">' +
        '<div class="section-head"><span class="vlabel">' + T['dt.specT'] + '</span>' +
        '<h2 class="section-title">' + T['dt.specT'] + '<small>AT A GLANCE</small></h2></div>' +
        '<dl class="pd-spec">' +
          '<div><dt>' + T['dt.type'] + '</dt><dd>' + tea + '</dd></div>' +
          '<div><dt>' + T['dt.origin'] + '</dt><dd>' + origin + '</dd></div>' +
          '<div><dt>' + T['dt.liquor'] + '</dt><dd>' + liquor + '</dd></div>' +
          '<div><dt>' + T['dt.pack'] + '</dt><dd>' + pack + '</dd></div>' +
          '<div><dt>' + T['dt.price'] + '</dt><dd>' + price + '</dd></div>' +
        '</dl>' +
      '</section>' +

      '<section class="section pd-sec">' +
        '<div class="section-head"><span class="vlabel">' + T['dt.moreT'] + '</span>' +
        '<h2 class="section-title">' + T['dt.moreT'] + '<small>KEEP EXPLORING</small></h2></div>' +
        '<div class="pd-more">' + more + '</div>' +
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
      ? p.nameEn + ' · Yunque Xiao Cup Tea — Anqi Tea'
      : p.nameZh + ' · 雲鹊晓杯茶 — 安祺与茶';
  };

  if (typeof document !== 'undefined') {
    var saved = 'zh';
    try { saved = localStorage.getItem('anqi-lang') || 'zh'; } catch (e) {}
    A.mountProduct(saved);
  }
})(typeof window !== 'undefined' ? window : globalThis);
