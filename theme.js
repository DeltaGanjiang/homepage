/* Run in the head so the saved theme is applied before the first paint. */
(() => {
  const storageKey = 'gan-jiang-theme';
  const root = document.documentElement;
  let toggle;

  function readTheme() {
    try { return localStorage.getItem(storageKey) === 'light' ? 'light' : 'dark'; }
    catch (_) { return root.dataset.theme || 'dark'; }
  }

  function updateToggle() {
    if (!toggle) return;
    const light = root.dataset.theme === 'light';
    const english = root.lang === 'en';
    toggle.setAttribute('aria-checked', String(light));
    toggle.setAttribute('aria-label', english ? 'Light theme' : '亮色模式');
    toggle.title = english
      ? (light ? 'Switch to dark theme' : 'Switch to light theme')
      : (light ? '切换到深色模式' : '切换到亮色模式');
  }

  function applyTheme(theme) {
    const previous = root.dataset.theme;
    root.dataset.theme = theme === 'light' ? 'light' : 'dark';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',
      root.dataset.theme === 'light' ? '#ffffff' : '#060918');
    updateToggle();
    if (previous !== root.dataset.theme) {
      window.dispatchEvent(new CustomEvent('ganjiang:themechange', { detail: { theme: root.dataset.theme } }));
    }
  }

  applyTheme(readTheme());

  function mountToggle() {
    const actions = document.querySelector('.header-actions');
    if (!actions) return;
    toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'theme-toggle';
    toggle.setAttribute('role', 'switch');
    toggle.innerHTML = '<svg class="theme-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg><svg class="theme-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 13.3A9 9 0 0 1 10.7 3.2 9 9 0 1 0 20.8 13.3Z"/></svg>';
    toggle.addEventListener('click', () => {
      const theme = root.dataset.theme === 'light' ? 'dark' : 'light';
      applyTheme(theme);
      try { localStorage.setItem(storageKey, theme); }
      catch (_) { /* Theme switching also works when storage is unavailable. */ }
    });
    actions.insertBefore(toggle, actions.querySelector('.language-toggle'));
    new MutationObserver(updateToggle).observe(root, { attributes: true, attributeFilter: ['lang'] });
    updateToggle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountToggle, { once: true });
  } else {
    mountToggle();
  }
  window.addEventListener('storage', event => {
    if (event.key === storageKey || event.key === null) applyTheme(readTheme());
  });
  window.addEventListener('pageshow', () => applyTheme(readTheme()));
})();
