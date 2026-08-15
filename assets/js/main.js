/* ============================================================
   安祺与茶 · 交互层（多页共享，普通 script，file:// 可用）
   依赖顺序：data.js → i18n.js → main.js
   - 弹簧/lerp 平滑，可随时中断；拖动 1:1 跟踪 + 速度投影 + 松手吸附
   - prefers-reduced-motion 全面降级
   - 所有 DOM 挂点判空：同一份脚本服务首页与详情页
   ============================================================ */
(function () {
  if (typeof document === 'undefined') return; // Node 测试沙箱可安全求值

  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = id => document.getElementById(id);
  const safeStore = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------- 杯茶系列卡片渲染（数据驱动，双语） ---------- */
  function renderSeries(l) {
    const track = $('carousel');
    if (!track || !window.ANQI) return;
    const L = l === 'en';
    track.innerHTML = window.ANQI.products.map(p => `
      <a class="card" href="${p.page}">
        <div class="card-visual card-photo-wrap">
          <img class="card-photo" src="${p.img}" alt="${p.nameZh} · ${p.nameEn}" loading="lazy">
        </div>
        <div class="card-body">
          <h3 class="card-name"><span>${L ? p.nameEn : p.nameZh}</span><small>${L ? p.nameZh : p.nameEn}</small></h3>
          <span class="card-tag" style="background:linear-gradient(120deg, ${p.tint}, var(--cheng))">${L ? p.teaEn : p.teaZh}</span>
          <p class="card-desc">${L ? p.descEn : p.descZh}</p>
        </div>
      </a>`).join('');
  }

  /* ---------- 中英双语 ---------- */
  let lang = safeStore.get('anqi-lang') || 'zh';

  function applyLang() {
    const dict = window.I18N && window.I18N[lang];
    if (dict) {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const v = dict[el.dataset.i18n];
        if (v !== undefined) el.textContent = v;
      });
    }
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    if (document.body.dataset.page === 'home') {
      document.title = lang === 'zh'
        ? '安祺与茶 ANQI TEA · 雲鹊晓杯茶'
        : 'ANQI TEA · Yunque Xiao Cup Tea';
    }
    renderSeries(lang);
    const b = $('langToggle');
    if (b) b.textContent = lang === 'zh' ? 'EN' : '中';
  }

  const langBtn = $('langToggle');
  if (langBtn) langBtn.addEventListener('click', () => {
    lang = lang === 'zh' ? 'en' : 'zh';
    safeStore.set('anqi-lang', lang);
    applyLang();
  });
  applyLang();

  /* ---------- 导航：滚动收缩 + 毛玻璃 ---------- */
  const nav = $('nav');
  if (nav) {
    let navTick = false;
    window.addEventListener('scroll', () => {
      if (navTick) return; navTick = true;
      requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', window.scrollY > 80);
        navTick = false;
      });
    }, { passive: true });
  }

  /* ---------- 首屏：鼠标视差（lerp 弹簧，可中断） ---------- */
  const layers = [
    { el: $('layerFg'),   fx: -30, fy: -20 },
    { el: $('layerBird'), fx: -15, fy: -10 },
    { el: $('layerBg'),   fx: -6,  fy: -4  }
  ].filter(l => l.el);
  if (!RM && layers.length) {
    let tx = 0, ty = 0, cx = 0, cy = 0;
    window.addEventListener('pointermove', e => {
      tx = e.clientX / innerWidth - .5;
      ty = e.clientY / innerHeight - .5;
    }, { passive: true });
    (function parallax() {
      cx += (tx - cx) * .06;
      cy += (ty - cy) * .06;
      layers.forEach(l => {
        l.el.style.transform = `translate3d(${(cx * l.fx).toFixed(2)}px, ${(cy * l.fy).toFixed(2)}px, 0)`;
      });
      requestAnimationFrame(parallax);
    })();
  }

  /* ---------- 首屏退出：穿越感 ---------- */
  const heroContent = $('heroContent');
  const birdLayer = $('layerBird');
  if (!RM && heroContent && birdLayer) {
    let heroTick = false;
    window.addEventListener('scroll', () => {
      if (heroTick) return; heroTick = true;
      requestAnimationFrame(() => {
        const y = window.scrollY, h = innerHeight;
        if (y < h) {
          const p = y / h;
          heroContent.style.transform = `translateY(${(-y * .45).toFixed(1)}px)`;
          heroContent.style.opacity = Math.max(0, 1 - p * 1.6);
          birdLayer.style.transform = `translateY(${(-y * .18).toFixed(1)}px) scale(${(1 + p * .14).toFixed(3)})`;
        }
        heroTick = false;
      });
    }, { passive: true });
  }

  /* ---------- 进场动效 + 数字滚动 + scrollspy ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        if (en.target.dataset.count) countUp(en.target);
        io.unobserve(en.target);
      }
    });
  }, { threshold: .18 });
  document.querySelectorAll('.reveal, .reveal-clip, #storyArt, [data-count]').forEach(el => io.observe(el));

  function countUp(el) {
    const target = +el.dataset.count;
    if (RM) { el.textContent = target; return; }
    const t0 = performance.now(), dur = 1400;
    (function tick(now) {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }

  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        document.querySelectorAll('.nav-links a').forEach(a =>
          a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  document.querySelectorAll('section[id]').forEach(s => spy.observe(s));

  /* ---------- 杯茶系列：拖拽 + 惯性投影 + 弹簧吸附 ---------- */
  (function () {
    const wrap = $('carouselWrap');
    const track = $('carousel');
    if (!wrap || !track) return;
    let x = 0, min = 0, dragging = false, moved = false;
    let startPX = 0, startX = 0, lastX = 0, lastT = 0, vel = 0;
    let raf = null, snapTimer = null;

    function measure() {
      min = Math.min(0, wrap.clientWidth - track.scrollWidth - 8);
      x = Math.max(min, Math.min(0, x));
    }
    measure();
    window.addEventListener('resize', measure);

    function apply() { track.style.transform = `translate3d(${x}px,0,0)`; }

    function rubber(v) {
      if (v > 0) return v * .35;
      if (v < min) return min + (v - min) * .35;
      return v;
    }

    function snapPoints() {
      const card = track.querySelector('.card');
      if (!card) return [0];
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      const step = card.offsetWidth + gap;
      const pts = [];
      for (let i = 0; i < track.children.length; i++) pts.push(-i * step);
      return pts.filter(p => p >= min - 1);
    }

    function springTo(target, v0) {
      cancelAnimationFrame(raf);
      let pos = x, v = v0, last = performance.now();
      const k = 130, c = 2 * Math.sqrt(k) * .92;
      (function step(now) {
        const dt = Math.min((now - last) / 1000, .032); last = now;
        const a = -k * (pos - target) - c * v;
        v += a * dt; pos += v * dt;
        x = pos; apply();
        if (Math.abs(v) > 2 || Math.abs(pos - target) > .5) raf = requestAnimationFrame(step);
        else { x = target; apply(); }
      })(last);
    }

    function settle() {
      if (x > 0) return springTo(0, 0);
      if (x < min) return springTo(min, 0);
      const d = .995;
      const projected = x + vel * d / (1 - d);
      const pts = snapPoints();
      const target = pts.reduce((a, b) => Math.abs(b - projected) < Math.abs(a - projected) ? b : a, pts[0]);
      springTo(Math.max(min, Math.min(0, target)), vel * 1000);
    }

    wrap.addEventListener('pointerdown', e => {
      dragging = true; moved = false;
      cancelAnimationFrame(raf);
      wrap.classList.add('dragging');
      wrap.setPointerCapture(e.pointerId);
      startPX = e.clientX; startX = x;
      lastX = e.clientX; lastT = performance.now(); vel = 0;
    });
    wrap.addEventListener('pointermove', e => {
      if (!dragging) return;
      if (Math.abs(e.clientX - startPX) > 6) moved = true;
      x = rubber(startX + (e.clientX - startPX));
      apply();
      const now = performance.now(), dt = now - lastT;
      if (dt > 0) { vel = .8 * vel + .2 * ((e.clientX - lastX) / dt); lastX = e.clientX; lastT = now; }
    });
    const end = () => {
      if (!dragging) return;
      dragging = false;
      wrap.classList.remove('dragging');
      if (RM) {
        const pts = snapPoints();
        x = pts.reduce((a, b) => Math.abs(b - x) < Math.abs(a - x) ? b : a, pts[0]);
        x = Math.max(min, Math.min(0, x)); apply(); return;
      }
      settle();
    };
    wrap.addEventListener('pointerup', end);
    wrap.addEventListener('pointercancel', end);
    wrap.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);

    wrap.addEventListener('wheel', e => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;
      e.preventDefault();
      cancelAnimationFrame(raf);
      x = rubber(x - delta);
      apply(); vel = 0;
      clearTimeout(snapTimer);
      snapTimer = setTimeout(() => { if (!dragging) settle(); }, 140);
    }, { passive: false });
  })();

  /* ---------- 跑马灯内容复制（无缝循环） ---------- */
  (function () {
    const t = $('marqueeTrack');
    if (t) t.innerHTML += t.innerHTML;
  })();
})();
