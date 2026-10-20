/* Team-only editorial copy and directory navigation. Member facts stay in HTML. */
(() => {
  const root = document.querySelector('#team-main');
  if (!root) return;
  const copy = {
    zh: {
      eyebrow: '研究 · 工程 · 协作',
      title: '干将项目团队',
      mission: '连接材料科学、<br /><em>人工智能与工程实践。</em>',
      intro: '团队由<a href="https://www.caobin.asia/" target="_blank" rel="noopener noreferrer">曹斌博士</a>领衔，依托通用决策智能研究所，汇聚产业研究机构与高校的研究力量，聚焦粉末 X 射线衍射中的物相识别、多相分解与结构精修，推进科学智能体研究与工程实现。',
      meet: '认识团队', contactLink: '与我们联系',
      coverCaption: '从衍射信号，到结构洞察。', coverLink: '探索研究案例', basedAt: '依托研究机构',
      discipline1: '材料科学', discipline2: '人工智能', discipline3: '工程实践',
      directory: '团队成员',
      leadNote: '连接研究问题与项目实践。',
      coreNote: '推进干将的学术研究与分析方法创新。',
      advisorsNote: '以学术视野，支持持续探索。',
      engineeringNote: '支持干将的技术研发与工具实现。',
      testingNote: '通过测试与反馈，持续改善使用体验。',
      operationsNote: '连接项目进展、用户与合作机会。',
      contactTitle: '从一次交流，<br />开始新的合作。',
      contactIntro: '了解干将、咨询产品，或讨论合作机会，欢迎与我们的团队联系。',
      tryLink: '了解体验方式'
    },
    en: {
      eyebrow: 'Research · Engineering · Collaboration',
      title: 'Gan Jiang Project Team',
      mission: 'Connecting materials science,<br /><em>AI and engineering.</em>',
      intro: 'Led by <a href="https://www.caobin.asia/" target="_blank" rel="noopener noreferrer">Dr. Bin Cao</a> and based at AI Lab, The Yangtze River Delta, our team brings together researchers from industry labs and universities. We develop scientific agents for phase identification, multiphase decomposition and structural refinement in powder X-ray diffraction, combining research with engineering implementation.',
      meet: 'Meet the team', contactLink: 'Get in touch',
      coverCaption: 'From diffraction to structural insight.', coverLink: 'Explore the research', basedAt: 'Based at',
      discipline1: 'Materials science', discipline2: 'Artificial intelligence', discipline3: 'Engineering',
      directory: 'Team directory',
      leadNote: 'Connecting research questions with project development.',
      coreNote: 'Advancing Gan Jiang’s academic research and analytical methods.',
      advisorsNote: 'Academic perspectives that support continued exploration.',
      engineeringNote: 'Contributing to Gan Jiang’s technology and tool development.',
      testingNote: 'Improving the user experience through testing and feedback.',
      operationsNote: 'Connecting the project, its users and future collaborators.',
      contactTitle: 'A conversation.<br />A new collaboration.',
      contactIntro: 'To learn about Gan Jiang, ask about the product or explore a collaboration, get in touch with our team.',
      tryLink: 'Explore access options'
    }
  };
  const richCopy = new Set(['mission', 'intro', 'contactTitle']);
  function translate() {
    const c = copy[document.documentElement.lang === 'en' ? 'en' : 'zh'];
    root.querySelectorAll('[data-team-copy]').forEach(element => {
      const key = element.dataset.teamCopy;
      if (richCopy.has(key)) element.innerHTML = c[key];
      else element.textContent = c[key];
    });
    updateIndex();
  }

  const links = [...root.querySelectorAll('.people-index nav a')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href')));
  const contact = root.querySelector('#sales-contact');
  let pending = false;
  function updateIndex() {
    pending = false;
    const marker = document.querySelector('.site-header').getBoundingClientRect().bottom + 100;
    let active = -1;
    sections.forEach((section, i) => {
      if (section.getBoundingClientRect().top <= marker) active = i;
    });
    if (contact.getBoundingClientRect().top <= marker) active = -1;
    links.forEach((link, i) => {
      if (i === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  function requestIndexUpdate() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(updateIndex);
  }
  addEventListener('scroll', requestIndexUpdate, { passive: true });
  addEventListener('resize', requestIndexUpdate, { passive: true });
  new MutationObserver(translate).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  // Images and translated headings can move section boundaries after first paint.
  addEventListener('load', updateIndex, { once: true });
  translate();
})();
