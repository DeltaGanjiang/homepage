/* Full project film: deliberate playback with narration, separate from the looping short clip. */
(() => {
  const video = document.getElementById('full-film-video');
  if (!video) return;
  const copy = {
    zh: {
      eyebrow: 'GAN JIANG · 项目介绍', title: '走近干将。',
      intro: '从一张衍射图谱，到材料的结构与变化。用一部完整短片，了解干将的分析流程、研究案例与评测结果。',
      language: '英文配音 · 英文字幕', openVideo: '打开完整视频', download: '下载完整视频', team: '认识团队',
      nextEyebrow: '继续探索', nextTitle: '从介绍，走向研究。', research: '探索研究案例', try: '体验干将',
      error: '视频暂时无法播放，请通过下方链接直接打开或下载。',
      pageTitle: '了解干将 — 完整视频',
      description: '用 9 分 42 秒，了解干将的分析流程、研究案例与评测结果。英文配音与字幕。'
    },
    en: {
      eyebrow: 'GAN JIANG · THE PROJECT FILM', title: 'Get to know Gan Jiang.',
      intro: 'A self-learning scientific agent for X-ray diffraction. Discover Gan Jiang’s analytical workflow, research case studies and benchmark results in the full project film.',
      language: 'English narration · English subtitles', openVideo: 'Open the full film', download: 'Download the full film', team: 'Meet the team',
      nextEyebrow: 'KEEP EXPLORING', nextTitle: 'From the film to the research.', research: 'Explore the research', try: 'Try Gan Jiang',
      error: 'The video could not be loaded. Use the link below to open or download the full film.',
      pageTitle: 'Gan Jiang: A self-learning scientific agent for X-ray diffraction',
      description: 'Discover Gan Jiang’s analytical workflow, research case studies and benchmark results in a 9-minute, 42-second film with English narration and subtitles.'
    }
  };
  function translate() {
    const text = copy[document.documentElement.lang === 'en' ? 'en' : 'zh'];
    document.querySelectorAll('[data-full-film-copy]').forEach(el => { el.textContent = text[el.dataset.fullFilmCopy]; });
    document.title = text.pageTitle;
    document.querySelectorAll('meta[property="og:title"], meta[name="twitter:title"]').forEach(el => { el.content = text.pageTitle; });
    document.querySelectorAll('meta[name="description"], meta[property="og:description"], meta[name="twitter:description"]').forEach(el => { el.content = text.description; });
  }
  function showError() { document.getElementById('full-film-error').hidden = false; }
  video.addEventListener('error', showError);
  video.querySelector('source').addEventListener('error', showError);
  new MutationObserver(translate).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  translate();
})();
