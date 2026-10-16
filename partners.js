/* Shared partner marquee. Original logo assets: https://www.yangtzeailab.com/ */
(function () {
  'use strict';
  var section = document.querySelector('[data-partners]');
  if (!section) return;

  var copy = {
    zh: {
      title: '全球合作伙伴', academic: '学术机构', industry: '产业伙伴',
      pause: '暂停滚动', resume: '继续滚动',
      cuhk: '香港中文大学（深圳）', sjtu: '上海交通大学', hkust: '香港科技大学',
      ustc: '中国科学技术大学', hkustgz: '香港科技大学（广州）', cas: '中国科学院',
      bgi: '华大基因', li: '理想汽车', vnet: '世纪互联', genequantum: '启德医药'
    },
    en: {
      title: 'Global partners', academic: 'Academic institutions', industry: 'Industry partners',
      pause: 'Pause scrolling', resume: 'Resume scrolling',
      cuhk: 'The Chinese University of Hong Kong, Shenzhen', sjtu: 'Shanghai Jiao Tong University',
      hkust: 'Hong Kong University of Science and Technology', ustc: 'University of Science and Technology of China',
      hkustgz: 'Hong Kong University of Science and Technology (Guangzhou)', cas: 'Chinese Academy of Sciences',
      bgi: 'BGI', li: 'Li Auto', vnet: 'VNET', genequantum: 'GeneQuantum Healthcare'
    }
  };
  var button = section.querySelector('[data-partners-toggle]');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var paused = false;

  section.querySelectorAll('.partners-track').forEach(function (track) {
    var list = track.querySelector('.partners-list');
    // Six cards fill the widest layout. Repeat the shorter industry row so
    // both halves of the loop remain wider than the viewport at every size.
    if (list.children.length < 6) {
      Array.from(list.children).forEach(function (item) {
        var extra = item.cloneNode(true);
        extra.setAttribute('aria-hidden', 'true');
        extra.dataset.partnerRepeat = '';
        list.append(extra);
      });
    }
    var duplicate = list.cloneNode(true);
    duplicate.setAttribute('aria-hidden', 'true');
    duplicate.inert = true;
    track.append(duplicate);
  });

  function translate() {
    var text = copy[document.documentElement.lang === 'en' ? 'en' : 'zh'];
    section.querySelectorAll('[data-partner-copy]').forEach(function (node) {
      node.textContent = text[node.dataset.partnerCopy];
    });
    button.querySelector('span').textContent = text[paused ? 'resume' : 'pause'];
  }
  function updateMotion() {
    button.hidden = reducedMotion.matches;
    section.classList.toggle('partners-paused', paused || document.hidden);
    button.setAttribute('aria-pressed', String(paused));
    translate();
  }
  button.addEventListener('click', function () {
    paused = !paused;
    updateMotion();
  });
  reducedMotion.addEventListener('change', updateMotion);
  document.addEventListener('visibilitychange', updateMotion);
  new MutationObserver(translate).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      section.classList.toggle('partners-visible', entries[0].isIntersecting);
    }).observe(section);
  } else {
    section.classList.add('partners-visible');
  }
  section.classList.add('partners-ready');
  updateMotion();
})();
