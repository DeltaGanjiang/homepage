/* Native dialogs provide keyboard focus containment and Escape dismissal. */
(() => {
  const dialogs = document.querySelectorAll('.community-dialog');
  const openers = new WeakMap();
  const qrLoaders = new WeakMap();

  dialogs.forEach(dialog => {
    const frame = dialog.querySelector('.community-qr');
    if (!frame) return;
    const image = frame.querySelector('img');
    const loading = frame.querySelector('[data-qr-loading]');
    const error = frame.querySelector('[data-qr-error]');
    const retry = frame.querySelector('[data-qr-retry]');
    const setState = state => {
      frame.dataset.qrState = state;
      frame.setAttribute('aria-busy', String(state === 'loading'));
      loading.hidden = state !== 'loading';
      error.hidden = state !== 'error';
      retry.hidden = state !== 'error';
    };
    const load = (priority = 'low', retryFailed = false) => {
      if (priority === 'high' || frame.dataset.qrState === 'idle') image.fetchPriority = priority;
      if (frame.dataset.qrState !== 'idle' &&
          !(retryFailed && frame.dataset.qrState === 'error')) return;
      setState('loading');
      // Keep the source available so failed preloads can be retried on opening.
      image.src = image.dataset.src;
    };
    image.addEventListener('load', () => setState('ready'));
    image.addEventListener('error', () => setState('error'));
    retry.addEventListener('click', () => {
      // Keep keyboard focus visible when the retry button disappears.
      dialog.querySelector('[data-community-close]').focus({ preventScroll: true });
      load('high', true);
    });
    qrLoaders.set(dialog, load);
  });

  // Start downloads before the cards arrive on screen, without loading them at entry.
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return;
      qrLoaders.get(document.getElementById(target.dataset.communityOpen))?.();
      observer.unobserve(target);
    });
  }, { rootMargin: '1200px 0px' }) : null;

  document.querySelectorAll('[data-community-open]').forEach(button => {
    const dialog = document.getElementById(button.dataset.communityOpen);
    if (!dialog) return;
    const load = qrLoaders.get(dialog);
    if (load) {
      if (observer) observer.observe(button);
      else load();
      ['pointerenter', 'focus', 'pointerdown'].forEach(event => {
        button.addEventListener(event, () => load('high'));
      });
    }
    button.addEventListener('click', () => {
      load?.('high', true);
      openers.set(dialog, button);
      dialog.showModal();
      document.documentElement.classList.add('community-modal-open');
    });
  });

  dialogs.forEach(dialog => {
    let startedOutside = false;
    const isOutside = event => {
      const rect = dialog.getBoundingClientRect();
      return event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom;
    };
    dialog.querySelector('[data-community-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('pointerdown', event => {
      startedOutside = event.target === dialog && isOutside(event);
    });
    dialog.addEventListener('click', event => {
      if (startedOutside && event.target === dialog && isOutside(event)) dialog.close();
      startedOutside = false;
    });
    dialog.addEventListener('close', () => {
      if (!document.querySelector('.community-dialog[open]')) {
        document.documentElement.classList.remove('community-modal-open');
      }
      openers.get(dialog)?.focus({ preventScroll: true });
    });
  });
})();
