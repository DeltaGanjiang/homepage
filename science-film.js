/* Narrated films start with sound on a click; ambient previews autoplay muted. */
(() => {
  const video = document.getElementById('science-film-video');
  const button = document.getElementById('science-film-toggle');
  const soundButton = document.getElementById('science-film-sound');
  if (!video || !button) return;
  const narrated = video.hasAttribute('data-narrated');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  const copy = {
    zh: {
      eyebrow: 'GanJiang Agent · 材料智能', title: '读懂图谱，<br />看清材料。',
      body: '从复杂的 XRD 信号，到可审阅的物相、含量与精修证据。用一段短片，走进干将的分析过程。',
      note: '真实案例可视化；晶体画面为概念示意。', download: '下载宣传片', watchFull: '观看完整视频', playFull: '播放完整视频',
      label: 'GanJiang Agent 英文宣传片：从 XRD 图谱到材料分析',
      play: '播放短片 ▷', pause: '暂停短片 Ⅱ', soundOn: '开启声音', soundOff: '关闭声音',
      error: '短片暂时无法播放，当前显示封面。'
    },
    en: {
      eyebrow: 'GanJiang Agent · Material intelligence', title: 'Read the pattern.<br />Understand the material.',
      body: 'From complex XRD signals to reviewable phases, fractions and refinement evidence. Step inside the GanJiang analysis workflow.',
      note: 'Case study visualization; crystal artwork is illustrative.', download: 'Download film', watchFull: 'Watch the full film', playFull: 'Play the full film',
      label: 'GanJiang Agent promotional film: from XRD patterns to material analysis, with English titles',
      play: 'Play film ▷', pause: 'Pause film Ⅱ', soundOn: 'Sound on', soundOff: 'Sound off',
      error: 'The film is unavailable. Showing its cover.'
    }
  };
  if (narrated) {
    Object.assign(copy.zh, {
      body: '用 58 秒了解原子排列如何影响材料，XRD 如何揭示结构，以及干将如何连接分析工具、检验结果并积累经验。',
      note: '英文 AI 配音 · 英文字幕 · 真实晶体与案例数据。',
      label: '干将 58 秒说明短片：晶体结构的意义与干将的贡献，含英文配音和字幕'
    });
    Object.assign(copy.en, {
      body: 'In 58 seconds, discover how atomic arrangements shape materials, how XRD reveals structure, and how Gan Jiang connects tools, checks evidence and learns from experience.',
      note: 'English AI narration and captions · Real crystal and case data.',
      label: 'Gan Jiang: a 58-second introduction to crystal structures and our contribution, with English narration and captions'
    });
  }
  let visible = false;
  let wanted = !narrated && !reducedMotion.matches && !connection?.saveData;
  let pending = false;
  let resyncAfterPlay = false;
  let failed = false;
  const language = () => copy[document.documentElement.lang === 'en' ? 'en' : 'zh'];
  const shouldPlay = () => wanted && visible && !document.hidden && !failed;
  function updateButton() {
    button.textContent = language()[!video.paused || (pending && wanted) ? 'pause' : 'play'];
    if (soundButton) {
      soundButton.textContent = language()[video.muted ? 'soundOn' : 'soundOff'];
      soundButton.setAttribute('aria-pressed', String(!video.muted));
    }
  }
  function translate() {
    const text = language();
    document.querySelectorAll('[data-film-copy]').forEach(el => { el.innerHTML = text[el.dataset.filmCopy]; });
    video.setAttribute('aria-label', text.label);
    if (failed) document.getElementById('science-film-note').textContent = text.error;
    updateButton();
  }
  async function syncPlayback() {
    if (!shouldPlay()) { video.pause(); updateButton(); return; }
    if (pending) { resyncAfterPlay = true; return; }
    if (!video.paused) return;
    pending = true;
    resyncAfterPlay = false;
    updateButton();
    let aborted = false;
    try {
      await video.play();
      if (!shouldPlay()) video.pause();
    } catch (error) {
      // A visibility change can cancel a pending play; a rejected autoplay waits for a click.
      if (error.name !== 'AbortError') wanted = false;
      else aborted = true;
    } finally {
      pending = false;
      updateButton();
      if ((aborted || resyncAfterPlay) && shouldPlay() && video.paused) syncPlayback();
    }
  }
  button.addEventListener('click', () => {
    wanted = !(!video.paused || (pending && wanted));
    syncPlayback();
  });
  video.addEventListener('play', () => { if (narrated) wanted = true; });
  video.addEventListener('playing', updateButton);
  video.addEventListener('pause', () => {
    if (narrated && visible && !document.hidden && !pending) wanted = false;
    updateButton();
  });
  video.addEventListener('ended', () => { wanted = false; updateButton(); });
  soundButton?.addEventListener('click', () => { video.muted = !video.muted; updateButton(); });
  video.addEventListener('volumechange', updateButton);
  function onError() {
    failed = true;
    wanted = false;
    video.pause();
    button.hidden = true;
    if (soundButton) soundButton.hidden = true;
    translate();
  }
  video.addEventListener('error', onError);
  video.querySelector('source').addEventListener('error', onError);
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    syncPlayback();
  }, { threshold: 0 }).observe(video);
  document.addEventListener('visibilitychange', syncPlayback);
  function respectPreferences() {
    if (reducedMotion.matches || connection?.saveData) { wanted = false; syncPlayback(); }
  }
  reducedMotion.addEventListener('change', respectPreferences);
  connection?.addEventListener('change', respectPreferences);
  new MutationObserver(translate).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  video.muted = !narrated;
  video.controls = narrated;
  button.hidden = false;
  if (soundButton) soundButton.hidden = false;
  translate();
})();
