/* =========================================================
   Youssef Gadiri — store logic (vanilla JS, no dependencies)
   To edit products / prices: change PRODUCTS below.
   ========================================================= */
(() => {
  'use strict';

  /* ---------------- CONFIG ---------------- */
  const CONFIG = {
    whatsapp: '212602026088',          // order destination (international format, no +)
    brand: 'Youssef Gadiri',
    currency: 'درهم',
    storageKey: 'yg_cart_v1',
  };

  const COLORS = {
    black: { name: 'أسود', hex: '#141414' },
    brown: { name: 'بني غامق', hex: '#4a2c1d' },
    camel: { name: 'كاميل', hex: '#a3622f' },
    olive: { name: 'زيتوني', hex: '#4c5737' },
    beige: { name: 'بيج', hex: '#bba98a' },
    choco: { name: 'شوكولا', hex: '#4b3122' },
  };

  const MEN = [39, 40, 41, 42, 43, 44, 45];
  const WOMEN = [36, 37, 38, 39, 40, 41];
  const CAT = { men: 'رجال', women: 'نساء' };

  const CLASSIC_DESC = 'بوط كلاسيك مصنوع من الجلد الطبيعي 100%، ضد الماء، بنعل سميك ومريح كيشد مزيان فالأرض. مناسب للخدمة، للسفر ولفصل الشتا.';

  const PRODUCTS = [
    { id: 'classic-black', group: 'classic', cat: 'men', color: 'black', price: 350,
      title: 'بوط كلاسيك — جلد طبيعي', badges: ['ضد الماء'], sizes: MEN, desc: CLASSIC_DESC,
      img: 'images/p-black.jpg', gallery: ['images/p-black.jpg', 'images/hero-black.jpg', 'images/p-forest.jpg', 'images/hero-forest.jpg'] },
    { id: 'classic-brown', group: 'classic', cat: 'men', color: 'brown', price: 350,
      title: 'بوط كلاسيك — جلد طبيعي', badges: ['ضد الماء'], sizes: MEN, desc: CLASSIC_DESC,
      img: 'images/p-brown.jpg', gallery: ['images/p-brown.jpg', 'images/hero-brown.jpg'] },
    { id: 'classic-camel', group: 'classic', cat: 'men', color: 'camel', price: 350,
      title: 'بوط كلاسيك — جلد طبيعي', badges: ['ضد الماء', 'جديد'], sizes: MEN, desc: CLASSIC_DESC,
      img: 'images/p-camel.jpg', gallery: ['images/p-camel.jpg', 'images/hero-camel.jpg'] },
    { id: 'classic-olive', group: 'classic', cat: 'men', color: 'olive', price: 350,
      title: 'بوط كلاسيك — جلد طبيعي', badges: ['ضد الماء', 'جديد'], sizes: MEN, desc: CLASSIC_DESC,
      img: 'images/p-olive.jpg', gallery: ['images/p-olive.jpg', 'images/hero-olive.jpg'] },
    { id: 'city-black', group: 'city', cat: 'men', color: 'black', price: 350,
      title: 'بوط سيتي — جلد أصلي', badges: ['جلد أصلي'], sizes: MEN,
      desc: 'بوط عصري بجلد أصلي ونعل طبي خفيف. كيجي مع الجينز ومع اللبسة الكلاسيكية، ومريح لنهار كامل ديال المشي.',
      img: 'images/p-city.jpg', gallery: ['images/p-city.jpg'] },
    { id: 'slipon-black', group: 'slipon', cat: 'men', color: 'black', price: 350,
      title: 'سليب أون — جلد طبيعي', badges: ['جديد'], sizes: MEN,
      desc: 'حذاء بلا خيوط، كيتلبس فثانية. جلد طبيعي محبب ونعل مريح — أناقة يومية بلا تعقيد.',
      img: 'images/p-slipon.jpg', gallery: ['images/p-slipon.jpg'] },
    { id: 'mule-black', group: 'mule', cat: 'women', color: 'black', price: 350,
      title: 'ميول سويد', badges: ['نسائي'], sizes: WOMEN,
      desc: 'ميول من السويد الناعم، خفيف ومريح، كيتلبس بسهولة ومناسب للخرجات اليومية.',
      img: 'images/p-moc-black.jpg', gallery: ['images/p-moc-black.jpg', 'images/p-moc-all.jpg'] },
    { id: 'mule-beige', group: 'mule', cat: 'women', color: 'beige', price: 350,
      title: 'ميول سويد', badges: ['نسائي'], sizes: WOMEN,
      desc: 'ميول من السويد الناعم، خفيف ومريح، كيتلبس بسهولة ومناسب للخرجات اليومية.',
      img: 'images/p-moc-beige.jpg', gallery: ['images/p-moc-beige.jpg', 'images/p-moc-all.jpg'] },
    { id: 'mule-choco', group: 'mule', cat: 'women', color: 'choco', price: 350,
      title: 'ميول سويد', badges: ['نسائي'], sizes: WOMEN,
      desc: 'ميول من السويد الناعم، خفيف ومريح، كيتلبس بسهولة ومناسب للخرجات اليومية.',
      img: 'images/p-moc-brown.jpg', gallery: ['images/p-moc-brown.jpg', 'images/p-moc-all.jpg'] },
  ];

  const HERO_SLIDES = [
    { id: 'classic-black', img: 'images/hero-black.jpg' },
    { id: 'classic-brown', img: 'images/hero-brown.jpg' },
    { id: 'classic-camel', img: 'images/hero-camel.jpg' },
    { id: 'classic-olive', img: 'images/hero-olive.jpg' },
  ];

  /* ---------------- helpers ---------------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const byId = (id) => PRODUCTS.find((p) => p.id === id);
  const money = (n) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ${CONFIG.currency}`;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const waLink = (text) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
  const store = {
    get() { try { return JSON.parse(localStorage.getItem(CONFIG.storageKey)) || []; } catch { return []; } },
    set(v) { try { localStorage.setItem(CONFIG.storageKey, JSON.stringify(v)); } catch { /* private mode */ } },
  };

  /* =========================================================
     LOADER — real preload + cinematic reveal
     ========================================================= */
  const loader = $('#loader');
  const bar = $('#loaderBar');
  const count = $('#loaderCount');
  const assets = [...new Set([...HERO_SLIDES.map((s) => s.img), ...PRODUCTS.map((p) => p.img), 'images/hero-forest.jpg', 'images/p-slipon.jpg'])];
  let loaded = 0;
  let shown = 0;
  const started = performance.now();
  const MIN_TIME = 3300; // lets the crown + name animation finish before the curtains open

  let last = performance.now();
  // time-based (not frame-based) so the loader feels the same on a 30 fps phone and a 144 Hz screen
  const tickCounter = (now = performance.now()) => {
    const dt = Math.min(500, now - last);
    last = now;
    const target = (loaded / assets.length) * 100;
    const timeCap = Math.min(100, ((now - started) / MIN_TIME) * 100);
    const goal = Math.min(target, timeCap);
    if (shown < goal) shown = Math.min(goal, shown + Math.max(dt * 0.03, (goal - shown) * (1 - Math.exp(-dt / 180))));
    const v = Math.min(100, Math.round(shown));
    count.textContent = v;
    bar.style.width = v + '%';
    if (v >= 100) return finishLoading();
    requestAnimationFrame(tickCounter);
  };
  assets.forEach((src) => {
    const im = new Image();
    im.onload = im.onerror = () => { loaded++; };
    im.src = src;
  });
  requestAnimationFrame(tickCounter);

  let finished = false;
  function finishLoading() {
    if (finished) return;
    finished = true;
    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
    Promise.race([fontsReady, new Promise((r) => setTimeout(r, 500))]).then(() => {
      loader.classList.add('is-done');
      setTimeout(() => {
        document.body.classList.remove('is-loading');
        document.body.classList.add('is-ready');
        startCounters();
      }, 350);
      setTimeout(() => loader.classList.add('is-gone'), 1500);
    });
  }
  setTimeout(() => { loaded = assets.length; }, 7000); // safety net on slow networks
  loader.addEventListener('click', () => { if (performance.now() - started > 1200) { loaded = assets.length; shown = 100; } });

  /* =========================================================
     HEADER, MENU, SCROLL
     ========================================================= */
  const header = $('#header');
  const progress = $('#scrollProgress');
  const toTop = $('#toTop');
  const craftBg = $('[data-parallax]');
  const onScroll = () => {
    const y = scrollY;
    header.classList.toggle('is-solid', y > 20);
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    toTop.classList.toggle('is-on', y > innerHeight * 1.2);
    if (craftBg && !reduced) {
      const r = craftBg.parentElement.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) {
        const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        craftBg.style.transform = `translate3d(0, ${p * -80}px, 0) scale(1.05)`;
      }
    }
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  const burger = $('#burger');
  const mmenu = $('#mmenu');
  const setMenu = (open) => {
    burger.classList.toggle('is-open', open);
    mmenu.classList.toggle('is-open', open);
    document.body.classList.toggle('lock', open);
  };
  burger.addEventListener('click', () => setMenu(!mmenu.classList.contains('is-open')));
  $$('a', mmenu).forEach((a) => a.addEventListener('click', () => setMenu(false)));

  // duplicate ticker content so the loop is seamless on mobile
  const tb = $('.topbar__track');
  [...tb.children].forEach((c) => { const d = c.cloneNode(true); d.classList.add('dup'); tb.appendChild(d); });
  const dupStyle = document.createElement('style');
  dupStyle.textContent = '@media (min-width: 901px){.topbar__track .dup{display:none}}';
  document.head.appendChild(dupStyle);

  $('#year').textContent = new Date().getFullYear();

  /* ---------------- reveal on scroll ---------------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach((el) => io.observe(el));

  /* ---------------- counters ---------------- */
  function startCounters() {
    $$('[data-count]').forEach((el) => {
      const to = +el.dataset.count;
      const t0 = performance.now();
      const step = (t) => {
        const k = Math.min(1, (t - t0) / 1600);
        el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(step);
      };
      setTimeout(() => requestAnimationFrame(step), 900);
    });
  }

  /* ---------------- magnetic buttons ---------------- */
  if (finePointer && !reduced) {
    $$('.magnetic').forEach((b) => {
      b.addEventListener('mousemove', (e) => {
        const r = b.getBoundingClientRect();
        b.style.setProperty('--bx', ((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1) + 'px');
        b.style.setProperty('--by', ((e.clientY - r.top - r.height / 2) * 0.25).toFixed(1) + 'px');
      });
      b.addEventListener('mouseleave', () => { b.style.setProperty('--bx', '0px'); b.style.setProperty('--by', '0px'); });
    });
  }

  /* =========================================================
     HERO — color switcher slideshow + 3D tilt + gold dust
     ========================================================= */
  const heroMedia = $('#heroMedia');
  const heroSw = $('#heroSwatches');
  const frame = $('#heroFrame');
  let heroIdx = 0;
  let heroTimer;
  HERO_SLIDES.forEach((s, i) => {
    const p = byId(s.id);
    const img = new Image();
    img.src = s.img; img.alt = `${p.title} — ${COLORS[p.color].name}`;
    if (i === 0) img.className = 'is-active';
    heroMedia.appendChild(img);
    const b = document.createElement('button');
    b.className = 'swatch' + (i === 0 ? ' is-active' : '');
    b.style.background = COLORS[p.color].hex;
    b.setAttribute('aria-label', COLORS[p.color].name);
    b.innerHTML = `<span class="swatch__tip">${COLORS[p.color].name}</span>`;
    b.addEventListener('click', () => { showHero(i); restartHero(); });
    heroSw.appendChild(b);
  });
  function showHero(i) {
    if (i === heroIdx) return;
    const imgs = $$('img', heroMedia);
    const sws = $$('.swatch', heroSw);
    imgs[heroIdx].classList.remove('is-active');
    imgs[heroIdx].classList.add('is-leaving');
    const prev = imgs[heroIdx];
    setTimeout(() => prev.classList.remove('is-leaving'), 1300);
    sws[heroIdx].classList.remove('is-active');
    heroIdx = i;
    imgs[i].classList.add('is-active');
    sws[i].classList.add('is-active');
  }
  function restartHero() {
    clearInterval(heroTimer);
    heroTimer = setInterval(() => showHero((heroIdx + 1) % HERO_SLIDES.length), 4800);
  }
  restartHero();
  frame.addEventListener('click', () => openProduct(HERO_SLIDES[heroIdx].id));
  frame.style.cursor = 'pointer';
  if (finePointer && !reduced) {
    const vis = $('.hero__visual');
    vis.addEventListener('mousemove', (e) => {
      const r = frame.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      frame.style.setProperty('--ry', (x * 12).toFixed(2) + 'deg');
      frame.style.setProperty('--rx', (y * -10).toFixed(2) + 'deg');
      frame.style.setProperty('--mx', ((x + 0.5) * 100).toFixed(0) + '%');
      frame.style.setProperty('--my', ((y + 0.5) * 100).toFixed(0) + '%');
    });
    vis.addEventListener('mouseleave', () => { frame.style.setProperty('--rx', '0deg'); frame.style.setProperty('--ry', '0deg'); });
  }

  // gold dust particles
  (() => {
    const cv = $('#dust');
    if (!cv || reduced) return;
    const ctx = cv.getContext('2d');
    let W, H, parts, running = true;
    const DPR = Math.min(2, devicePixelRatio || 1);
    const resize = () => {
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * DPR; cv.height = H * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const n = Math.round(Math.min(90, (W * H) / 16000));
      parts = Array.from({ length: n }, () => spawn(true));
    };
    const spawn = (any) => ({
      x: Math.random() * W, y: any ? Math.random() * H : H + 10,
      r: Math.random() * 1.6 + 0.3, vy: -(Math.random() * 0.35 + 0.08), vx: (Math.random() - 0.5) * 0.15,
      a: Math.random() * 0.6 + 0.2, t: Math.random() * Math.PI * 2,
    });
    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy; p.t += 0.03;
        if (p.y < -10) Object.assign(p, spawn(false));
        const tw = p.a * (0.6 + 0.4 * Math.sin(p.t));
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 198, 128, ${tw})`;
        ctx.shadowBlur = 8; ctx.shadowColor = 'rgba(217,180,106,.8)';
        ctx.fill();
      }
      requestAnimationFrame(draw);
    };
    resize(); addEventListener('resize', resize);
    new IntersectionObserver(([e]) => { const was = running; running = e.isIntersecting; if (running && !was) draw(); }).observe(cv);
    draw();
  })();

  /* =========================================================
     COLLECTION GRID + FILTERS
     ========================================================= */
  const grid = $('#grid');
  const iconBag = '<svg viewBox="0 0 24 24"><path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>';
  const siblings = (p) => PRODUCTS.filter((q) => q.group === p.group);

  grid.innerHTML = PRODUCTS.map((p) => `
    <article class="card" data-id="${p.id}" data-cat="${p.cat}" tabindex="0" aria-label="${p.title} — ${COLORS[p.color].name}">
      <div class="card__media">
        <img src="${p.img}" alt="${p.title} — ${COLORS[p.color].name}" loading="lazy" />
        <div class="card__badges">${p.badges.map((b, i) => `<span class="badge${i === 0 ? ' badge--solid' : ''}">${b}</span>`).join('')}</div>
        <button class="card__quick" data-quick>${iconBag}<span>اختار المقاس وزيد للسلة</span></button>
      </div>
      <div class="card__body">
        <div class="card__cat">${CAT[p.cat]} · ${COLORS[p.color].name}</div>
        <h3 class="card__title">${p.title}</h3>
        <div class="card__row">
          <div class="card__price">${p.price}<small>${CONFIG.currency}</small></div>
          <div class="dots">${siblings(p).length > 1 ? siblings(p).map((s) => `<button class="dot${s.id === p.id ? ' is-on' : ''}" style="background:${COLORS[s.color].hex}" data-variant="${s.id}" aria-label="${COLORS[s.color].name}"></button>`).join('') : ''}</div>
        </div>
      </div>
    </article>`).join('');

  $$('.card', grid).forEach((card) => {
    const img = $('img', card);
    const own = img.getAttribute('src');
    card.addEventListener('click', (e) => {
      const v = e.target.closest('[data-variant]');
      openProduct(v ? v.dataset.variant : card.dataset.id);
    });
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter') openProduct(card.dataset.id); });
    $$('[data-variant]', card).forEach((d) => {
      d.addEventListener('mouseenter', () => { img.src = byId(d.dataset.variant).img; });
      d.addEventListener('mouseleave', () => { img.src = own; });
    });
  });

  const counts = { all: PRODUCTS.length, men: PRODUCTS.filter((p) => p.cat === 'men').length, women: PRODUCTS.filter((p) => p.cat === 'women').length };
  Object.entries(counts).forEach(([k, v]) => { $('#cnt-' + k).textContent = v; });

  const ink = $('#filtersInk');
  const moveInk = () => {
    const a = $('.filter.is-active');
    ink.style.left = a.offsetLeft + 'px';
    ink.style.width = a.offsetWidth + 'px';
  };
  function applyFilter(f) {
    $$('.filter').forEach((b) => b.classList.toggle('is-active', b.dataset.filter === f));
    moveInk();
    let i = 0;
    $$('.card', grid).forEach((c) => {
      const show = f === 'all' || c.dataset.cat === f;
      c.classList.toggle('is-hidden', !show);
      c.classList.remove('pop');
      if (show) { void c.offsetWidth; c.style.setProperty('--i', (i++ * 0.06) + 's'); c.classList.add('pop'); }
    });
  }
  $$('.filter').forEach((b) => b.addEventListener('click', () => applyFilter(b.dataset.filter)));
  $$('[data-filter-link]').forEach((a) => a.addEventListener('click', () => applyFilter(a.dataset.filterLink)));
  addEventListener('resize', moveInk);
  moveInk();
  if (document.fonts) document.fonts.ready.then(moveInk);

  // animate cards the first time the grid scrolls into view
  new IntersectionObserver(([e], obs) => {
    if (e.isIntersecting) { applyFilter($('.filter.is-active').dataset.filter); obs.disconnect(); }
  }, { threshold: 0.05 }).observe(grid);

  /* =========================================================
     OVERLAYS (modal / drawer / search) — shared open/close
     ========================================================= */
  const stack = [];
  function openLayer(el) {
    el.classList.add('is-open');
    el.setAttribute('aria-hidden', 'false');
    if (!stack.includes(el)) stack.push(el);
    document.body.classList.add('lock');
  }
  function closeLayer(el) {
    el.classList.remove('is-open');
    el.setAttribute('aria-hidden', 'true');
    const i = stack.indexOf(el);
    if (i > -1) stack.splice(i, 1);
    if (!stack.length && !mmenu.classList.contains('is-open')) document.body.classList.remove('lock');
  }
  $$('.modal, .drawer, .search').forEach((el) => {
    el.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) closeLayer(el); });
  });
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (stack.length) closeLayer(stack[stack.length - 1]);
      else if (mmenu.classList.contains('is-open')) setMenu(false);
    }
  });

  /* =========================================================
     PRODUCT MODAL
     ========================================================= */
  const pm = $('#productModal');
  const pmMain = $('#pmMain');
  let cur = null;
  let curSize = null;
  let curQty = 1;

  function openProduct(id) {
    cur = byId(id);
    if (!cur) return;
    curSize = null; curQty = 1;
    $('#pmCat').textContent = `${CAT[cur.cat]} · Youssef Gadiri`;
    $('#pmTitle').textContent = cur.title;
    $('#pmPrice').textContent = cur.price;
    $('#pmDesc').textContent = cur.desc;
    $('#pmColorName').textContent = COLORS[cur.color].name;
    $('#pmSizeName').textContent = 'اختار المقاس';
    $('#pmSizeErr').classList.remove('on');
    $('#pmQty span').textContent = '1';
    setMainImg(cur.gallery[0]);
    $('#pmThumbs').innerHTML = cur.gallery.length > 1 ? cur.gallery.map((g, i) => `<button class="${i === 0 ? 'is-on' : ''}" data-src="${g}"><img src="${g}" alt="" /></button>`).join('') : '';
    $('#pmColors').innerHTML = siblings(cur).map((s) => `<button class="${s.id === cur.id ? 'is-on' : ''}" style="background:${COLORS[s.color].hex}" data-variant="${s.id}" aria-label="${COLORS[s.color].name}" title="${COLORS[s.color].name}"></button>`).join('');
    $('#pmSizes').innerHTML = cur.sizes.map((s) => `<button data-size="${s}">${s}</button>`).join('');
    $('#pmWa').href = waLink(`السلام عليكم، عندي سؤال على «${cur.title}» — اللون ${COLORS[cur.color].name}.`);
    $('#pmWa').target = '_blank';
    if (!pm.classList.contains('is-open')) openLayer(pm);
  }
  function setMainImg(src) {
    pmMain.classList.remove('is-zoom');
    pmMain.innerHTML = `<img src="${src}" alt="${cur.title}" />`;
  }
  $('#pmThumbs').addEventListener('click', (e) => {
    const b = e.target.closest('[data-src]');
    if (!b) return;
    $$('#pmThumbs button').forEach((x) => x.classList.toggle('is-on', x === b));
    setMainImg(b.dataset.src);
  });
  $('#pmColors').addEventListener('click', (e) => {
    const b = e.target.closest('[data-variant]');
    if (b) { const keep = curSize; openProduct(b.dataset.variant); if (keep) selectSize(keep); }
  });
  function selectSize(s) {
    const btn = $(`#pmSizes [data-size="${s}"]`);
    if (!btn) return;
    curSize = s;
    $$('#pmSizes button').forEach((x) => x.classList.toggle('is-on', x === btn));
    $('#pmSizeName').textContent = s;
    $('#pmSizeErr').classList.remove('on');
  }
  $('#pmSizes').addEventListener('click', (e) => { const b = e.target.closest('[data-size]'); if (b) selectSize(+b.dataset.size); });
  $('#pmQty').addEventListener('click', (e) => {
    const b = e.target.closest('[data-q]');
    if (!b) return;
    curQty = Math.max(1, Math.min(10, curQty + +b.dataset.q));
    $('#pmQty span').textContent = curQty;
  });
  pmMain.addEventListener('mousemove', (e) => {
    const r = pmMain.getBoundingClientRect();
    pmMain.style.setProperty('--zx', ((e.clientX - r.left) / r.width * 100) + '%');
    pmMain.style.setProperty('--zy', ((e.clientY - r.top) / r.height * 100) + '%');
  });
  pmMain.addEventListener('click', () => pmMain.classList.toggle('is-zoom'));
  pmMain.addEventListener('mouseleave', () => pmMain.classList.remove('is-zoom'));

  function needSize() {
    if (curSize) return false;
    const s = $('#pmSizes');
    $('#pmSizeErr').classList.add('on');
    s.classList.remove('shake'); void s.offsetWidth; s.classList.add('shake');
    return true;
  }
  $('#pmAdd').addEventListener('click', () => {
    if (needSize()) return;
    addToCart(cur.id, curSize, curQty);
    flyToCart($('img', pmMain));
    toast(cur.img, `تزاد للسلة — مقاس ${curSize}`);
    setTimeout(() => closeLayer(pm), 450);
  });
  $('#pmBuy').addEventListener('click', () => {
    if (needSize()) return;
    addToCart(cur.id, curSize, curQty);
    closeLayer(pm);
    openCheckout();
  });

  /* =========================================================
     CART
     ========================================================= */
  let cart = store.get().filter((i) => byId(i.id));
  const cartEl = $('#cart');
  const subtotal = () => cart.reduce((s, i) => s + byId(i.id).price * i.qty, 0);
  const itemsCount = () => cart.reduce((s, i) => s + i.qty, 0);

  function addToCart(id, size, qty) {
    const key = `${id}|${size}`;
    const ex = cart.find((i) => i.key === key);
    if (ex) ex.qty = Math.min(10, ex.qty + qty);
    else cart.push({ key, id, size, qty });
    saveCart();
  }
  function saveCart() {
    store.set(cart);
    renderCart();
  }
  function renderCart() {
    const n = itemsCount();
    const c = $('#cartCount');
    c.textContent = n;
    c.classList.toggle('has', n > 0);
    $('#cartHeadCount').textContent = n ? `(${n})` : '';
    const box = $('#cartItems');
    if (!cart.length) {
      box.innerHTML = `<div class="cart-empty">${iconBag}<p>السلة خاوية دابا</p><a href="#collection" class="btn btn--gold" data-close>تسوق المجموعة</a></div>`;
      $('#cartFoot').classList.add('is-hidden');
      return;
    }
    $('#cartFoot').classList.remove('is-hidden');
    box.innerHTML = cart.map((i) => {
      const p = byId(i.id);
      return `<div class="citem" data-key="${i.key}">
        <img src="${p.img}" alt="" />
        <div>
          <div class="citem__t">${p.title}</div>
          <div class="citem__m">${COLORS[p.color].name} · مقاس ${i.size}</div>
          <div class="qty"><button data-cq="-1" aria-label="نقص">−</button><span>${i.qty}</span><button data-cq="1" aria-label="زيد">+</button></div>
        </div>
        <div class="citem__side"><div class="citem__p">${p.price * i.qty}</div><button class="citem__rm" data-rm>حيد</button></div>
      </div>`;
    }).join('');
    $('#cartSub').textContent = money(subtotal());
    $('#cartTotal').textContent = money(subtotal());
  }
  $('#cartItems').addEventListener('click', (e) => {
    const row = e.target.closest('.citem');
    if (!row) return;
    const it = cart.find((i) => i.key === row.dataset.key);
    if (e.target.closest('[data-rm]')) cart = cart.filter((i) => i !== it);
    const q = e.target.closest('[data-cq]');
    if (q) { it.qty += +q.dataset.cq; if (it.qty < 1) cart = cart.filter((i) => i !== it); if (it.qty > 10) it.qty = 10; }
    saveCart();
  });
  $('#openCart').addEventListener('click', () => openLayer(cartEl));
  $('#toCheckout').addEventListener('click', () => { closeLayer(cartEl); openCheckout(); });
  renderCart();

  function flyToCart(src) {
    if (!src || reduced) return bump();
    const from = src.getBoundingClientRect();
    const to = $('#openCart').getBoundingClientRect();
    const f = document.createElement('img');
    f.src = src.src; f.className = 'fly';
    f.style.left = from.left + from.width / 2 - 35 + 'px';
    f.style.top = from.top + from.height / 2 - 35 + 'px';
    document.body.appendChild(f);
    requestAnimationFrame(() => {
      f.style.transform = `translate(${to.left + to.width / 2 - (from.left + from.width / 2)}px, ${to.top + to.height / 2 - (from.top + from.height / 2)}px) scale(.2) rotate(-20deg)`;
      f.style.opacity = '.3';
    });
    setTimeout(() => { f.remove(); bump(); }, 900);
  }
  function bump() {
    const b = $('#openCart');
    b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump');
  }

  let toastT;
  function toast(img, text) {
    const t = $('#toast');
    t.innerHTML = `${img ? `<img src="${img}" alt="" />` : ''}<span>${text}</span>`;
    t.classList.add('on');
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove('on'), 2600);
  }

  /* =========================================================
     CHECKOUT → WhatsApp order
     ========================================================= */
  const co = $('#checkout');
  const form = $('#orderForm');
  function openCheckout() {
    if (!cart.length) { toast(null, 'السلة خاوية'); return; }
    $('#coForm').hidden = false;
    $('#coDone').hidden = true;
    $('#coSummary').innerHTML = cart.map((i) => {
      const p = byId(i.id);
      return `<div class="row"><span>${p.title} — ${COLORS[p.color].name} — مقاس ${i.size} × ${i.qty}</span><b>${money(p.price * i.qty)}</b></div>`;
    }).join('') + `<div class="row"><span>التوصيل</span><b style="color:var(--ok)">مجاني</b></div><div class="row row--t"><span>المجموع</span><b>${money(subtotal())}</b></div>`;
    openLayer(co);
  }
  const PHONE_RE = /^0[567]\d{8}$/;
  function validate() {
    let ok = true;
    const set = (name, bad) => { form.elements[name].closest('.field').classList.toggle('err', bad); if (bad) ok = false; };
    const phone = form.elements.phone.value.replace(/[\s.-]/g, '').replace(/^\+?212/, '0');
    set('name', form.elements.name.value.trim().length < 3);
    set('phone', !PHONE_RE.test(phone));
    set('city', !form.elements.city.value);
    set('address', form.elements.address.value.trim().length < 4);
    return ok ? phone : null;
  }
  form.addEventListener('input', (e) => { const f = e.target.closest('.field'); if (f) f.classList.remove('err'); });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const phone = validate();
    if (!phone) { const f = $('.field.err input, .field.err select', form); if (f) f.focus(); return; }
    const id = 'YG-' + Date.now().toString(36).slice(-5).toUpperCase();
    const lines = cart.map((i, k) => {
      const p = byId(i.id);
      return `${k + 1}) ${p.title} — ${COLORS[p.color].name} — مقاس ${i.size} × ${i.qty} = ${p.price * i.qty} ${CONFIG.currency}`;
    });
    const el = form.elements;
    const msg = [
      `🛍️ طلب جديد — ${CONFIG.brand}`,
      `رقم الطلب: ${id}`,
      '',
      `👤 الاسم: ${el.name.value.trim()}`,
      `📞 الهاتف: ${phone}`,
      `🏙️ المدينة: ${el.city.value}`,
      `📍 العنوان: ${el.address.value.trim()}`,
      el.note.value.trim() ? `📝 ملاحظة: ${el.note.value.trim()}` : '',
      '',
      '— المنتجات —',
      ...lines,
      '',
      `💰 المجموع: ${subtotal()} ${CONFIG.currency} (التوصيل مجاني)`,
      '💵 الدفع عند الاستلام',
    ].filter((l, i, a) => !(l === '' && a[i - 1] === '')).join('\n');
    const url = waLink(msg);
    $('#orderId').textContent = id;
    $('#waConfirm').href = url;
    $('#coForm').hidden = true;
    $('#coDone').hidden = false;
    window.open(url, '_blank', 'noopener');
    cart = [];
    saveCart();
    form.reset();
  });

  /* =========================================================
     SEARCH
     ========================================================= */
  const search = $('#search');
  const sIn = $('#searchInput');
  const sRes = $('#searchResults');
  const norm = (s) => s.toLowerCase().replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي');
  function runSearch() {
    const q = norm(sIn.value.trim());
    const list = PRODUCTS.filter((p) => !q || norm(`${p.title} ${COLORS[p.color].name} ${CAT[p.cat]} ${p.badges.join(' ')}`).includes(q));
    sRes.innerHTML = list.length
      ? list.map((p, i) => `<button class="sres" data-id="${p.id}" style="animation-delay:${i * 0.04}s"><img src="${p.img}" alt="" /><div><b>${p.title}</b><small style="color:var(--muted)">${CAT[p.cat]} · ${COLORS[p.color].name}</small><br><span>${money(p.price)}</span></div></button>`).join('')
      : '<div class="search__empty">ما لقينا والو — جرب كلمة أخرى ولا سولنا فالواتساب.</div>';
  }
  $('#openSearch').addEventListener('click', () => { openLayer(search); runSearch(); setTimeout(() => sIn.focus(), 200); });
  sIn.addEventListener('input', runSearch);
  sRes.addEventListener('click', (e) => { const b = e.target.closest('[data-id]'); if (b) { closeLayer(search); openProduct(b.dataset.id); } });

  /* =========================================================
     MISC: WhatsApp links, size guide, FAQ accordion
     ========================================================= */
  $$('[data-wa]').forEach((a) => {
    a.href = waLink(`السلام عليكم، بغيت نسول على الصبابط ديال ${CONFIG.brand}.`);
    a.target = '_blank';
    a.rel = 'noopener';
  });
  document.addEventListener('click', (e) => {
    const s = e.target.closest('[data-open-size]');
    if (s) { e.preventDefault(); openLayer($('#sizeModal')); }
  });
  // only one FAQ open at a time
  $$('.qa').forEach((d) => d.addEventListener('toggle', () => {
    if (d.open) $$('.qa').forEach((o) => { if (o !== d) o.open = false; });
  }));
})();
