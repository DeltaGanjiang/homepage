/* The adopted film is user-started with sound, like the homepage explainer. */
(() => {
  const video = document.getElementById('product-film-video');
  const cover = document.querySelector('.product-film-cover');
  const status = document.getElementById('product-film-status');
  const chapters = document.querySelector('.product-film-chapters');
  if (!video || !cover || !chapters) return;
  const t = value => window.GanJiangI18n.t(value);
  const buttons = Array.from(chapters.querySelectorAll('[data-film-time]'));
  let started = false;
  let pendingSeek = null;
  let failed = false;
  function updateCopy() {
    cover.querySelector('[data-film-play-label]').textContent = t(started ? '再次播放' : '播放短片');
    if (failed) status.textContent = t('视频暂时无法播放，请在 YouTube 观看。');
    const manual = document.querySelector('[data-download-manual]');
    if (manual) manual.href = window.GanJiangI18n.language === 'en' ? '../booklet/en.html' : '../booklet/index.html';
  }
  function showError() {
    failed = true;
    status.hidden = false;
    cover.hidden = false;
    video.controls = true;
    updateCopy();
  }
  async function playAt(time) {
    failed = false;
    status.hidden = true;
    if (typeof time === 'number') {
      if (video.readyState >= 1) video.currentTime = Math.min(time, video.duration || time);
      else pendingSeek = time;
    } else if (video.ended) video.currentTime = 0;
    video.controls = true;
    cover.hidden = true;
    try {
      await video.play();
      video.focus({ preventScroll: true });
    } catch (error) {
      if (error.name !== 'AbortError') showError();
    }
  }
  cover.addEventListener('click', () => playAt());
  buttons.forEach(button => button.addEventListener('click', () => playAt(Number(button.dataset.filmTime))));
  video.addEventListener('loadedmetadata', () => {
    if (pendingSeek !== null) { video.currentTime = Math.min(pendingSeek, video.duration); pendingSeek = null; }
  });
  video.addEventListener('play', () => { started = true; cover.hidden = true; video.controls = true; });
  video.addEventListener('ended', () => { cover.hidden = false; updateCopy(); });
  video.addEventListener('timeupdate', () => {
    buttons.forEach((button, index) => {
      const active = video.currentTime >= Number(button.dataset.filmTime) &&
        (!buttons[index + 1] || video.currentTime < Number(buttons[index + 1].dataset.filmTime));
      if (active) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
  });
  video.addEventListener('error', showError);
  video.querySelector('source').addEventListener('error', showError);
  document.addEventListener('visibilitychange', () => { if (document.hidden) video.pause(); });
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting && !video.paused && !document.fullscreenElement) video.pause();
  }).observe(video);
  window.addEventListener('ganjiang:languagechange', updateCopy);
  video.controls = false;
  cover.hidden = false;
  chapters.hidden = false;
  updateCopy();
})();
