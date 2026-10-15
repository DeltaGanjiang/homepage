/* Keep the full-resolution measurements out of the entrance scene's requests. */
(() => {
  const sections = document.querySelectorAll('#home, #egypt-story, #phase-story, #benchmarks');
  if (!sections.length) return;
  let pending = false;
  let requested = false;
  let observer;

  function load() {
    if (pending || window.egyptData || document.documentElement.classList.contains('intro-scene')) return;
    pending = requested = true;
    const script = document.createElement('script');
    script.src = 'assets/science/egypt-data.js';
    script.addEventListener('load', () => {
      pending = false;
      observer?.disconnect();
      window.dispatchEvent(new Event('egyptdataready'));
    });
    script.addEventListener('error', () => {
      pending = false;
      script.remove();
    });
    document.head.append(script);
  }

  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting && entry.boundingClientRect.width > 0 && entry.boundingClientRect.height > 0)) load();
    }, { rootMargin: '600px 0px' });
    sections.forEach(section => observer.observe(section));
  } else {
    load();
  }
  // Retry a failed request on reconnect or another visit to the research sections.
  window.addEventListener('online', () => { if (requested) load(); });
  document.addEventListener('click', event => {
    if (event.target.closest('a[href="#home"], a[href="#egypt-story"], a[href="#phase-story"], a[href="#benchmarks"]')) load();
  });
})();
