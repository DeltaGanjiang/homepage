/* GanJiang's unified framework for scientific discovery. */
(() => {
  'use strict';
  const section = document.getElementById('vision');
  if (!section) return;
  const map = section.querySelector('.vision-map');
  const buttons = [...section.querySelectorAll('[data-vision-select]')];
  let selected = 'characterize';
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const play = section.querySelector('[data-vision-play]');
  const detail = section.querySelector('#vision-detail');
  const connections = section.querySelector('.vision-connections');
  const stages = ['characterize', 'predict', 'design', 'experiment'];
  let playing = !motion.matches;
  let visible = false;
  let timer;
  const copy = {
    zh: {
      title: '从理解物质<br /><em>到创造下一代材料</em>',
      horizon: '物演AI 的科学智能理念 · 干将从表征出发',
      intro: '干将是物演AI（PhyEvo AI）科学智能框架中的表征智能体。物演AI 的愿景，是让表征、预测、设计与实验在同一框架中持续学习，连接从理解材料到创造材料的每一步。',
      heroCaption: '从理解结构，走向下一次科学发现。',
      visionLink: '探索物演AI理念', leadRole: '项目负责人', leadName: '曹斌', leadOrg: '诺亚方舟伦敦研究院', leadProfile: '个人主页',
      imageNote: '材料与实验场景为概念视觉',
      mapTitle: '材料发现的科学智能闭环', mapHint: '选择环节，探索决策如何流动',
      edgeTop: '结构证据支撑性能推演', edgeRight: '目标牵引设计',
      edgeBottom: '候选方案进入真实实验', edgeLeft: '实验反馈更新认知',
      coreTitle: '材料科学通用智能', coreText: '科学目标 · 证据 · 持续学习',
      characterize: '表征 · 干将', characterizeSummary: '从实验信号，读懂物相与结构',
      predict: '预测', predictSummary: '从已知结构，推演性能与工艺',
      design: '设计', designSummary: '从目标性能，反向寻找材料与配方',
      experiment: '实验', experimentSummary: '连接仪器与机器人，验证新的可能',
      loopNote: '每一次实验都成为新的证据，让下一轮预测、设计与决策继续进化。',
      frontierTitle: '面向更远的科学前沿', frontierModels: '多模态科学模型',
      frontierPhysics: '物理约束与不确定性', frontierDesign: '主动学习与逆向设计',
      frontierLabs: '自主实验室网络', collaborate: '共同探索材料发现的未来',
      stages: {
        characterize: ['表征 / GanJiang', '让材料的真实结构，成为科学决策的起点。', '以 XRD 为起点，把物相识别、多相分解与结构精修连成可审阅的分析过程，为性能推演与材料设计提供结构证据。', '信号输入 / 物相与结构 / 可追溯证据'],
        predict: ['预测 / PREDICT', '在真实合成之前，推演材料的更多可能。', '联合建模结构、成分与工艺，推演材料的性能、稳定性和可合成性。让物理约束与不确定性参与判断，寻找最值得验证的科学假设。', '结构与成分 / 性能与工艺 / 不确定性评估'],
        design: ['设计 / DESIGN', '从目标性能出发，反向探索未知材料空间。', '以目标性能和现实约束引导逆向设计，连接生成模型、计算筛选与主动学习，探索候选结构、材料配方和实验条件，让每一次选择都服务于下一个科学问题。', '科学目标 / 候选结构与配方 / 下一轮实验选择'],
        experiment: ['实验 / EXPERIMENT', '让数字世界的科学假设，在物理世界获得回答。', '连接仪器、自动化合成与机器人实验室，将科学方案带入真实实验。让成功与失败都回流为证据，推动模型更新与下一轮科学决策。', '仪器与机器人 / 真实实验反馈 / 闭环持续学习']
      }
    },
    en: {
      title: 'Understand matter.<br /><em>Create what comes next.</em>',
      horizon: 'The PhyEvo AI vision / GanJiang starts with characterization',
      intro: 'GanJiang is the characterization agent in the PhyEvo AI scientific intelligence framework. The broader vision connects characterization, prediction, design and experiment in a learning loop, from understanding materials to creating what comes next.',
      heroCaption: 'From structural insight to the next scientific discovery.',
      visionLink: 'The PhyEvo AI vision', leadRole: 'Project lead', leadName: 'Bin Cao', leadOrg: 'Noah’s Ark Lab, London', leadProfile: 'Personal website',
      imageNote: 'Concept imagery of materials and laboratory scenes',
      mapTitle: 'A scientific intelligence loop for materials discovery', mapHint: 'Select a stage to explore the connections',
      edgeTop: 'Structure informs prediction', edgeRight: 'Goals guide design',
      edgeBottom: 'Candidates become experiments', edgeLeft: 'Evidence updates knowledge',
      coreTitle: 'Intelligence for materials science', coreText: 'Scientific goals · Evidence · Learning',
      characterize: 'GanJiang', characterizeSummary: 'Read phases and structures from experimental signals',
      predict: 'Predict', predictSummary: 'Infer properties and processing from structure',
      design: 'Design', designSummary: 'Work back from target properties to materials and recipes',
      experiment: 'Experiment', experimentSummary: 'Connect instruments and robots to test new possibilities',
      loopNote: 'Each experiment brings new evidence, helping the next prediction, design and decision evolve.',
      frontierTitle: 'Toward the next scientific frontiers', frontierModels: 'Multimodal scientific models',
      frontierPhysics: 'Physics and uncertainty', frontierDesign: 'Active learning and inverse design',
      frontierLabs: 'Networks of autonomous labs', collaborate: 'Explore the future of discovery together',
      stages: {
        characterize: ['GanJiang / CHARACTERIZATION', 'Ground scientific decisions in the real structure of matter.', 'Starting with XRD, connect phase identification, multiphase decomposition and structural refinement in a reviewable workflow, providing structural evidence for prediction and design.', 'Experimental signals / Phases and structures / Traceable evidence'],
        predict: ['PREDICT', 'Explore what a material could do before it is synthesized.', 'Jointly model structure, composition and processing to infer properties, stability and synthesizability. Use physical constraints and uncertainty to identify hypotheses worth testing.', 'Structure and composition / Properties and processing / Uncertainty'],
        design: ['DESIGN', 'Explore unknown materials by working back from a scientific goal.', 'Use target properties and practical constraints to guide inverse design. Bring generative models, computational screening and active learning together to explore candidate structures, recipes and experimental conditions.', 'Scientific goals / Candidate structures and recipes / Experiment selection'],
        experiment: ['EXPERIMENT', 'Give digital hypotheses an answer in the physical world.', 'Connect instruments, automated synthesis and robotic laboratories to bring scientific plans into real experiments. Return successes and failures as evidence for model updates and the next scientific decision.', 'Instruments and robots / Experimental feedback / Continuous learning']
      }
    }
  };
  function render() {
    const language = document.documentElement.lang === 'en' ? 'en' : 'zh';
    const text = copy[language];
    const [detailLabel, detailTitle, detailBody, detailOutput] = text.stages[selected];
    const values = { ...text, detailLabel, detailTitle, detailBody, detailOutput };
    document.querySelectorAll('[data-vision-copy]').forEach(node => {
      const key = node.dataset.visionCopy;
      if (key === 'title') { if (node.innerHTML !== values[key]) node.innerHTML = values[key]; }
      else if (node.textContent !== values[key]) node.textContent = values[key];
    });
    map.dataset.visionStage = selected;
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.visionSelect === selected)));
    if (play) {
      play.textContent = language === 'en' ? (playing ? 'Pause the loop' : 'Play the loop') : (playing ? '暂停演示' : '播放闭环');
      play.setAttribute('aria-pressed', String(playing));
    }
  }
  function schedule() {
    clearTimeout(timer);
    const running = playing && visible && !document.hidden && !motion.matches;
    section.classList.toggle('is-running', running);
    if (running) connections?.unpauseAnimations(); else connections?.pauseAnimations();
    detail.setAttribute('aria-live', playing ? 'off' : 'polite');
    if (running) timer = setTimeout(() => {
      selected = stages[(stages.indexOf(selected) + 1) % stages.length];
      render(); schedule();
    }, 5000);
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    playing = false;
    selected = button.dataset.visionSelect;
    schedule(); render();
  }));
  play?.addEventListener('click', () => { playing = !playing; render(); schedule(); });
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) section.classList.add('has-entered');
    schedule();
  }, { threshold: 0.18 }).observe(map);
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', () => { playing = !motion.matches; render(); schedule(); });
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  render(); schedule();
})();
