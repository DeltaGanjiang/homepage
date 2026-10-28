(() => {
  'use strict';

  const en = document.documentElement.lang === 'en';
  const copy = (zh, english) => en ? english : zh;
  const menu = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#site-nav');
  const contents = document.querySelector('.contents');
  const mobile = window.matchMedia('(max-width: 800px)');
  const chapterLinks = Array.from(document.querySelectorAll('[data-section]'));
  const chapterGroups = Array.from(document.querySelectorAll('.contents-group'));
  const sections = chapterLinks.map(link => document.getElementById(link.dataset.section));
  const search = document.querySelector('#chapter-search');
  const searchStatus = document.querySelector('.search-status');
  const languageLink = document.querySelector('.language-toggle');
  const toast = document.querySelector('.toast');
  let toastTimer;

  function closeMenu() {
    navigation.classList.remove('is-open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', copy('打开导航', 'Open navigation'));
    menu.textContent = copy('菜单', 'Menu');
  }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    navigation.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? copy('关闭导航', 'Close navigation') : copy('打开导航', 'Open navigation'));
    menu.textContent = open ? copy('关闭', 'Close') : copy('菜单', 'Menu');
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.shared-header')) closeMenu();
  });

  // Each language is a complete static document, including when JavaScript is off.
  function updateLanguageLink() {
    languageLink.href = (en ? 'index.html' : 'en.html') + window.location.hash;
  }
  updateLanguageLink();
  window.addEventListener('hashchange', updateLanguageLink);
  languageLink.addEventListener('click', () => {
    try { localStorage.setItem('gan-jiang-language', en ? 'zh' : 'en'); } catch (_) { /* Reading also works with storage disabled. */ }
  });

  function updateContentsLayout() {
    contents.open = !mobile.matches;
    closeMenu();
  }
  updateContentsLayout();
  mobile.addEventListener('change', updateContentsLayout);
  chapterLinks.forEach(link => link.addEventListener('click', () => {
    if (mobile.matches) contents.open = false;
  }));

  // Search the visible manual text and return matching chapter links.
  const normalize = value => value.normalize('NFKC').toLocaleLowerCase().replace(/\s+/g, ' ').trim();
  const chapterText = sections.map(section => normalize(section.textContent));
  document.querySelector('.search-box').hidden = false;
  search.addEventListener('input', () => {
    const terms = normalize(search.value).split(' ').filter(Boolean);
    let count = 0;
    chapterLinks.forEach((link, index) => {
      const match = terms.every(term => chapterText[index].includes(term));
      link.hidden = !match;
      if (match) count += 1;
    });
    chapterGroups.forEach(group => {
      group.hidden = !Array.from(group.querySelectorAll('[data-section]')).some(link => !link.hidden);
    });
    searchStatus.hidden = terms.length === 0;
    searchStatus.textContent = count
      ? copy(`找到 ${count} 个章节，点击跳转`, `${count} matching chapters — select to jump`)
      : copy('没有找到相关章节，请尝试其他关键词。', 'No matching chapters. Try another keyword.');
  });
  document.addEventListener('keydown', event => {
    const editing = event.target instanceof Element && event.target.closest('input, textarea, select, [contenteditable="true"]');
    if (event.key === '/' && !editing && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      contents.open = true;
      search.focus();
    }
    if (event.key === 'Escape') {
      const wasOpen = menu.getAttribute('aria-expanded') === 'true';
      closeMenu();
      if (wasOpen) menu.focus();
      if (document.activeElement === search) {
        search.value = '';
        search.dispatchEvent(new Event('input'));
      }
    }
  });

  function showToast(message) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    toastTimer = setTimeout(() => { toast.hidden = true; }, 4000);
  }
  document.querySelectorAll('[data-copy]').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', async () => {
      const source = document.getElementById(button.dataset.copy);
      try {
        if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(source.textContent);
        showToast(copy('示例已复制，请替换方括号中的实际条件。', 'Request copied. Replace the values in square brackets.'));
      } catch (_) {
        // Local files or denied clipboard permission still allow manual copying.
        const range = document.createRange();
        range.selectNodeContents(source);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        showToast(copy('已选中示例，请按 Ctrl+C / ⌘C 复制。', 'Request selected. Press Ctrl+C / ⌘C to copy.'));
      }
    });
  });
  const printButton = document.querySelector('[data-print]');
  printButton.hidden = false;
  printButton.addEventListener('click', () => window.print());

  // Keep the index and progress in sync after scrolling, image loads and resizing.
  let frame = 0;
  let headerHeight = 72;
  function updateReadingPosition() {
    frame = 0;
    const offset = headerHeight + 95;
    let active = '';
    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= offset) active = section.id;
    });
    chapterLinks.forEach(link => {
      if (link.dataset.section === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    const start = sections[0].getBoundingClientRect().top + window.scrollY - headerHeight;
    const last = sections[sections.length - 1];
    const end = last.getBoundingClientRect().bottom + window.scrollY - window.innerHeight;
    const progress = Math.min(1, Math.max(0, (window.scrollY - start) / Math.max(1, end - start)));
    document.documentElement.style.setProperty('--reading-progress', progress.toFixed(4));
  }
  function scheduleReadingUpdate() {
    if (!frame) frame = requestAnimationFrame(updateReadingPosition);
  }
  function measureHeader() {
    headerHeight = document.querySelector('.shared-header').getBoundingClientRect().height;
    scheduleReadingUpdate();
  }
  window.addEventListener('scroll', scheduleReadingUpdate, { passive: true });
  window.addEventListener('resize', measureHeader, { passive: true });
  window.addEventListener('load', measureHeader, { once: true });
  document.querySelectorAll('.manual-content img').forEach(img => img.addEventListener('load', scheduleReadingUpdate, { once: true }));
  measureHeader();
})();
