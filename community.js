/* Native dialogs provide keyboard focus containment and Escape dismissal. */
(() => {
  const dialogs = document.querySelectorAll('.community-dialog');
  const openers = new WeakMap();

  document.querySelectorAll('[data-community-open]').forEach(button => {
    const dialog = document.getElementById(button.dataset.communityOpen);
    if (!dialog) return;
    button.addEventListener('click', () => {
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
