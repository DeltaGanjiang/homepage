/* A lightweight, bilingual introduction to the measured Egyptian case. */
(() => {
  const root = document.querySelector('#egypt-story');
  if (!root) return;
  const copy = {
    zh: {
      era: '约三千年前',
      sceneTitle: '从古埃及眼妆到晶体结构与衍射图谱',
      sceneDesc: '金色埃及眼纹与化妆容器，矿物颗粒流向晶格示意，下方呈现样品实测衍射曲线。',
      kohl: '眼妆 · 矿物之美', lattice: '晶格示意', measurement: '样品实测衍射信号',
      artNote: '器物与晶格为艺术示意；曲线来自本页样品。',
      eyebrow: '古老的眼妆，今天的科学问题',
      title: '一抹眼妆，<br />跨越三千年的<br /><em>材料科学。</em>',
      lead: '古埃及人留下了化妆粉，也留下了关于材料的谜题：用了什么矿物？如何配比？天然研磨，还是化学合成？',
      chapter0: '一抹眼妆', chapter1: '五种矿物', chapter2: '现代科学',
      cta: '让干将读出这份配方', valueHeading: '从理解古代工艺，到分析今天的材料',
      value1Title: '让配方成为证据',
      value1Body: '识别矿物、定量配比，把古老粉末转化为可核查的组成信息，为文物材料研究提供依据。',
      value2Title: '追溯化学工艺',
      value2Body: '研究者在古埃及化妆粉中发现含氯铅化合物，为古人掌握湿化学合成提供了证据。',
      value3Title: '回应现代材料难题',
      value3Body: '多相共存、衍射峰重叠、定量验证，也是现代材料表征的问题。这个案例呈现了干将从复杂信号提取可审阅结论的分析流程。',
      sources: '历史研究参考', sourceNote: '本页五相结果来自干将案例报告。',
      pause: '暂停动效 Ⅱ', play: '播放动效 ▷',
      captions: [
        '从眼线的色泽与质感，追问一份古老粉末的矿物组成。',
        '石膏、碳氯铅矿、白铅矿、方铅矿、氯羟铅矿：五种矿物，在同一张图谱中留下线索。',
        '从物相识别到定量验证，让三千年前的材料成为今天可以检验的科学问题。'
      ]
    },
    en: {
      era: 'About 3,000 years ago',
      sceneTitle: 'From Egyptian eye make-up to crystal structure and diffraction',
      sceneDesc: 'A golden Egyptian eye and cosmetic vessel, mineral grains leading to a schematic lattice, and the measured diffraction pattern below.',
      kohl: 'KOHL · MINERAL BEAUTY', lattice: 'Schematic lattice', measurement: 'Measured sample diffraction',
      artNote: 'Vessel and lattice are illustrations; trace from this sample.',
      eyebrow: 'Ancient make-up. A present-day scientific question.',
      title: 'Ancient beauty.<br />3,000 years of<br /><em>materials science.</em>',
      lead: 'Ancient Egyptian cosmetics left us a materials puzzle. Which minerals? In what proportions? Ground from natural ores, or made through chemical synthesis?',
      chapter0: 'Eye make-up', chapter1: 'Five minerals', chapter2: 'Science today',
      cta: 'Decode the recipe with Gan Jiang', valueHeading: 'From ancient craft to materials research today',
      value1Title: 'Turn a recipe into evidence',
      value1Body: 'Identify minerals and quantify their proportions, turning an ancient powder into verifiable composition data for cultural heritage research.',
      value2Title: 'Trace chemical craftsmanship',
      value2Body: 'Researchers found lead chloride compounds in ancient Egyptian cosmetics, providing evidence for the use of wet chemical synthesis.',
      value3Title: 'Address modern materials questions',
      value3Body: 'Coexisting phases, overlapping peaks and quantitative validation also challenge modern materials analysis. This case shows how Gan Jiang turns complex signals into reviewable conclusions.',
      sources: 'Historical research', sourceNote: 'Five-phase results on this page come from the Gan Jiang case report.',
      pause: 'Pause motion Ⅱ', play: 'Play motion ▷',
      captions: [
        'From the colour and texture of eye make-up to the minerals hidden in an ancient powder.',
        'Gypsum, phosgenite, cerussite, galena and laurionite: five minerals leave their signatures in one pattern.',
        'Phase identification and quantitative validation turn an ancient material into a testable scientific question.'
      ]
    }
  };

  // Reuse the supplied measurements. The illustrated lattice makes no structural claim.
  const data = window.egyptData;
  const traces = root.querySelector('#egypt-feature-traces');
  if (data?.rows?.length) {
    const rows = data.rows;
    const start = rows[0][0], span = rows.at(-1)[0] - start;
    const max = Math.max(...rows.map(row => row[1]));
    const addTrace = (column, color, className, opacity) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', rows.map((row, i) => `${i ? 'L' : 'M'}${(58 + (row[0] - start) / span * 564).toFixed(2)},${(505 - row[column] / max * 85).toFixed(2)}`).join(''));
      path.setAttribute('stroke', color);
      path.setAttribute('stroke-width', '.85');
      path.setAttribute('opacity', opacity);
      path.setAttribute('pathLength', '1');
      path.classList.add(className);
      traces.append(path);
    };
    data.phases.forEach((phase, i) => addTrace(i + 4, phase.color, 'egypt-component', '.5'));
    addTrace(1, '#ead3a0', 'egypt-measured', '.95');
  }

  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const play = root.querySelector('#egypt-motion');
  const chapters = root.querySelector('.egypt-chapters');
  const buttons = [...chapters.querySelectorAll('button')];
  const caption = root.querySelector('#egypt-stage-caption');
  const duration = 5000;
  let stage = 0, elapsed = 0, playing = !motion.matches, visible = false;
  let frame = null, previousTime = null;
  const language = () => document.documentElement.lang === 'en' ? 'en' : 'zh';

  function renderStage() {
    const c = copy[language()];
    root.dataset.stage = String(stage);
    buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === stage)));
    caption.setAttribute('aria-live', playing ? 'off' : 'polite');
    caption.textContent = c.captions[stage];
    play.textContent = playing ? c.pause : c.play;
    root.style.setProperty('--egypt-progress', playing ? String(elapsed / duration) : '1');
  }

  function translate() {
    const c = copy[language()];
    root.querySelectorAll('[data-egypt-copy]').forEach(element => {
      const key = element.dataset.egyptCopy;
      if (key === 'title') element.innerHTML = c[key];
      else element.textContent = c[key];
    });
    renderStage();
  }

  function tick(now) {
    if (previousTime !== null) elapsed += now - previousTime;
    previousTime = now;
    if (elapsed >= duration) {
      stage = (stage + 1) % buttons.length;
      elapsed %= duration;
      renderStage();
    }
    root.style.setProperty('--egypt-progress', String(elapsed / duration));
    frame = requestAnimationFrame(tick);
  }

  function schedule() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    previousTime = null;
    const running = playing && visible && !document.hidden;
    root.classList.toggle('is-running', running);
    if (running) frame = requestAnimationFrame(tick);
  }

  buttons.forEach((button, i) => button.addEventListener('click', () => {
    stage = i;
    elapsed = 0;
    playing = false;
    renderStage();
    schedule();
  }));
  play.addEventListener('click', () => {
    playing = !playing;
    renderStage();
    schedule();
  });
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    schedule();
  }, { threshold: .2 }).observe(root.querySelector('.egypt-feature'));
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', () => {
    if (motion.matches) {
      playing = false;
      renderStage();
      schedule();
    }
  });
  new MutationObserver(translate).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  chapters.hidden = false;
  play.hidden = false;
  translate();
})();
