/* The deck is rendered at build time. Browsing only requests local slide images. */
(() => {
  'use strict';
  const viewer = document.querySelector('[data-presentation]');
  if (!viewer) return;

  const mount = viewer.parentElement;
  const dialog = document.querySelector('#presentation-dialog');
  const stage = viewer.querySelector('.presentation-stage');
  const image = stage.querySelector('img');
  const previous = viewer.querySelector('[data-presentation-prev]');
  const next = viewer.querySelector('[data-presentation-next]');
  const expand = viewer.querySelector('[data-presentation-expand]');
  const close = viewer.querySelector('[data-presentation-close]');
  const counter = viewer.querySelector('.presentation-counter');
  const feedback = viewer.querySelector('.presentation-feedback');
  const status = feedback.querySelector('[role="status"]');
  const retry = viewer.querySelector('[data-presentation-retry]');
  const count = Number(viewer.dataset.slideCount);
  const base = viewer.dataset.slideBase;
  const canExpand = typeof dialog?.showModal === 'function';
  const cache = new Map();
  let current = 0;
  let requested = 0;
  let requestId = 0;
  let state = 'ready';
  let visible = false;
  let returnFocus;
  let touchStart;
  let suppressClickUntil = 0;

  const copy = {
    zh: {
      previous: '上一页', next: '下一页', expand: '放大查看', close: '关闭', retry: '重新加载',
      region: '项目介绍幻灯片', dialog: '项目介绍幻灯片大图', open: '查看幻灯片大图',
      loading: '正在加载幻灯片…', error: '此页图片加载失败，请重试，或下载 PPT 查看。',
      slide: page => `干将项目介绍，第 ${page} 页，共 ${count} 页`
    },
    en: {
      previous: 'Previous', next: 'Next', expand: 'Enlarge', close: 'Close', retry: 'Retry',
      region: 'Project presentation', dialog: 'Enlarged project presentation', open: 'Open full-size slide',
      loading: 'Loading slide…', error: 'This slide could not load. Retry or download the PPT.',
      slide: page => `Gan Jiang presentation, slide ${page} of ${count}`
    }
  };

  const source = index => `${base}slide-${String(index + 1).padStart(2, '0')}.webp`;
  const language = () => copy[document.documentElement.lang === 'en' ? 'en' : 'zh'];

  function update() {
    const text = language();
    viewer.querySelectorAll('[data-presentation-copy]').forEach(node => {
      node.textContent = text[node.dataset.presentationCopy];
    });
    viewer.setAttribute('aria-label', text.region);
    dialog?.setAttribute('aria-label', text.dialog);
    stage.setAttribute('aria-label', text.open);
    image.alt = text.slide(current + 1);
    counter.textContent = `${current + 1} / ${count}`;
    counter.setAttribute('aria-label', text.slide(current + 1));
    previous.disabled = requested === 0;
    next.disabled = requested === count - 1;
    stage.setAttribute('aria-busy', String(state === 'loading'));
    feedback.hidden = state === 'ready';
    status.textContent = state === 'ready' ? '' : text[state];
    retry.hidden = state !== 'error';
  }

  function load(index) {
    if (cache.has(index)) return cache.get(index);
    const promise = new Promise((resolve, reject) => {
      const slide = new Image();
      const timeout = setTimeout(() => reject(new Error('Slide image timed out')), 15000);
      slide.decoding = 'async';
      slide.onload = () => { clearTimeout(timeout); resolve(slide); };
      slide.onerror = () => { clearTimeout(timeout); reject(new Error('Slide image unavailable')); };
      slide.src = source(index);
    });
    cache.set(index, promise);
    promise.catch(() => cache.delete(index));
    return promise;
  }

  function preloadNext() {
    const connection = navigator.connection;
    if (!visible || connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || '')) return;
    if (current + 1 < count) load(current + 1).catch(() => {});
  }

  async function show(index) {
    requested = Math.max(0, Math.min(count - 1, index));
    const destination = requested;
    const id = ++requestId;
    state = 'loading';
    update();
    try {
      const slide = await load(destination);
      if (id !== requestId) return;
      current = destination;
      image.src = slide.src;
      stage.href = source(current);
      state = 'ready';
      update();
      preloadNext();
    } catch {
      if (id !== requestId) return;
      state = 'error';
      update();
    }
  }

  function open() {
    if (!canExpand || dialog.open) return;
    returnFocus = document.activeElement;
    // Keep the section's height while the same viewer moves into the modal.
    mount.style.minHeight = `${mount.getBoundingClientRect().height}px`;
    expand.hidden = true;
    close.hidden = false;
    dialog.append(viewer);
    dialog.showModal();
    document.documentElement.classList.add('presentation-modal-open');
    close.focus({ preventScroll: true });
  }

  previous.addEventListener('click', () => show(requested - 1));
  next.addEventListener('click', () => show(requested + 1));
  retry.addEventListener('click', () => show(requested));
  expand.addEventListener('click', open);
  close.addEventListener('click', () => dialog.close());
  stage.addEventListener('click', event => {
    if (Date.now() < suppressClickUntil) { event.preventDefault(); return; }
    if (!canExpand || dialog.open || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    open();
  });
  dialog?.addEventListener('close', () => {
    mount.prepend(viewer);
    mount.style.minHeight = '';
    expand.hidden = !canExpand;
    close.hidden = true;
    document.documentElement.classList.remove('presentation-modal-open');
    returnFocus?.focus({ preventScroll: true });
  });
  dialog?.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });

  viewer.addEventListener('keydown', event => {
    const index = {
      ArrowLeft: requested - 1, ArrowRight: requested + 1,
      PageUp: requested - 1, PageDown: requested + 1, Home: 0, End: count - 1
    }[event.key];
    if (index === undefined || event.altKey || event.ctrlKey || event.metaKey) return;
    event.preventDefault();
    event.stopPropagation();
    show(index);
  });

  stage.addEventListener('touchstart', event => {
    touchStart = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
  }, { passive: true });
  stage.addEventListener('touchend', event => {
    if (!touchStart || event.touches.length) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      suppressClickUntil = Date.now() + 500;
      show(requested + (dx < 0 ? 1 : -1));
    }
  }, { passive: true });
  stage.addEventListener('touchcancel', () => { touchStart = null; }, { passive: true });

  image.addEventListener('load', preloadNext);
  image.addEventListener('error', () => { state = 'error'; update(); });
  new MutationObserver(update).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && image.complete && image.naturalWidth) preloadNext();
    }, { rootMargin: '100px' }).observe(mount);
  }
  if (image.complete && !image.naturalWidth) state = 'error';
  viewer.querySelector('.presentation-toolbar').hidden = false;
  expand.hidden = !canExpand;
  update();
})();
