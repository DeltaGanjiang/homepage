/* A small, static reference preview. Full database search lives in GanJiang. */
(() => {
  const section = document.querySelector('[data-gj-pdf]');
  const data = window.gjPdfV1;
  if (!section) return;

  const copy = {
    zh: {
      valueTitle: '数据建设的门槛', valueTitleTwo: '藏在每一条参考里', valueIntro: '一套有价值的衍射数据库，需要把广泛的化学覆盖、相互关联的晶体学信息与可用的检索体系同时建立起来。数据的珍贵，体现在它能够反复支撑新的材料问题。', valuePeakLabel: '条特征峰数据，组成可反复查阅的衍射参考',
      valueCoverageTitle: '跨体系覆盖，需要系统积累', valueCoverageBody: '89 种元素、46,627 类元素组合、228 个空间群。把广阔的化学空间纳入同一参考框架，为新体系与复杂样品保留更多候选可能。',
      valueContextTitle: '让峰有归属，让判断有上下文', valueContextBody: '从化学组成到空间群，从峰位、强度到晶面指数与晶面间距，多维信息在同一条目中对应。研究者能沿着参考记录，逐项核对匹配依据。',
      valueReuseTitle: '一次系统组织，服务反复探索', valueReuseBody: '统一 GJ 编号、标准化字段与双层元素索引，让海量记录形成可机读、可检索、可复用的数据资产，为干将的物相分析提供持续可用的参考底座。',
      homeStatement: '面向关键物相判断的自主衍射数据资产', homeIntro: '207,146 条参考记录，89 种元素，支持 Cu、Co、Mo、Cr、Fe、Ag 六种靶材。', homeLink: '探索 GJ-PDF-V1', homePrice: '年度订阅 · 30 万元人民币',
      navData: '数据底座', navTargets: '支持靶材', navPreview: '数据预览', navSubscribe: '年度订阅',
      foundationTitle: '20 万余条参考，构筑科研数据底座', foundationIntro: '从一条物相记录，到一套把数据积累成资产。GJ-PDF-V1 用统一编号与标准化字段，把化学组成、晶体学信息和衍射特征连接起来，为材料研究提供可检索、可比对、可追溯的参考。',
      subscribeCta: '了解年度订阅', annualLabel: '年度订阅', perYear: '人民币 / 年', artAlt: '晶体、内部有序点阵与衍射光线的艺术示意',
      targetsTitle: '六种靶材，拓宽研究边界', targetsIntro: '支持铜、钴、钼、铬、铁和银六种 X 射线靶材，让自主衍射数据底座适配更多实验条件与材料研究场景。',
      copper: '铜', cobalt: '钴', molybdenum: '钼', chromium: '铬', iron: '铁', silver: '银',
      subscriptionTitle: '让系统的数据积累', subscriptionTitleTwo: '成为持续的科研支撑', subscriptionIntro: '订阅 GJ-PDF-V1，将海量参考记录、晶体学关联与元素索引带入日常研究。把更多时间留给材料问题，让每一次比对都有统一的数据依据。',
      annualPlan: '年度订阅', priceUnit: '人民币 / 年 · RMB / YEAR', planDatabase: '自主粉末衍射数据库', planEntries: '207,146 条参考记录 · 89 种元素', planTargets: '支持 Cu / Co / Mo / Cr / Fe / Ag 六种靶材', contactSales: '咨询年度订阅',
      pageTitle: 'GJ-PDF-V1 — 干将自主粉末衍射数据库', pageDescription: 'GJ-PDF-V1，干将自主构建的粉末衍射数据库。207,146 条参考记录，89 种元素，支持 Cu、Co、Mo、Cr、Fe、Ag 六种靶材。年度订阅 30 万元人民币。',
      statement: '把数据积累成资产', statementTwo: '让关键判断有底气',
      intro: '干将自主构建的粉末衍射数据库。207,146 条参考记录、6,125,958 条特征峰数据，连接化学组成与晶体学证据，为每一次候选检索、物相比对与结论复查提供坚实支撑。',
      try: '在干将中探索', view: '查看真实条目', entries: '条衍射参考记录', entryNote: '统一 GJ 编号，连接组成、结构与谱峰',
      elements: '种元素', systems: '类元素组合', spacegroups: '个空间群',
      ownTitle: '广泛覆盖，拓展候选空间', ownBody: '跨越 46,627 类元素组合，将分属不同化学体系的参考记录纳入统一数据框架，为陌生样品与复杂组成提供更广的候选视野。',
      filterTitle: '双层索引，让检索更聚焦', filterBody: '元素组合索引与单元素倒排索引相互配合，将成分信息转化为筛选条件，让研究者把比对精力集中在相关候选上。',
      evidenceTitle: '多维证据，支撑逐项核查', evidenceBody: '在同一条记录中关联峰位、相对强度、hkl、d 间距与空间群。从一个匹配结果回到具体晶面，为科研判断保留可复查的依据。',
      previewKicker: '数据库一瞥', previewTitle: '让数据，自己说话', composition: '元素组成', spacegroup: '空间群', peakCount: '收录特征峰', peakUnit: '条',
      rawFormula: '化学式按库内原始条目展示。', chartCaption: '库内参考峰 · 相对强度归一化至 100',
      details: '查看峰位与晶面信息', tableCaption: '当前条目中相对强度最高的 6 条特征峰', intensity: '相对强度',
      previewNote: '选取 V1 中的 3 条记录展示，参考峰不代表实测图谱；完整数据库的物相检索请在干将中体验。',
      footnote: 'V1 数据快照 · 6,125,958 条特征峰数据 · 每条记录最多保留 30 条特征峰', collaborate: '共建下一代衍射数据底座',
      sampleLabel: '选择参考条目', tableLabel: '参考峰数据', plotTitle: '参考衍射峰',
      plotDescription: entry => `库内条目 ${entry.id} 的参考棒图，横轴为 2θ（10–90°），纵轴为相对强度（0–100）。`
    },
    en: {
      valueTitle: 'Building a database takes depth.', valueTitleTwo: 'Every reference carries the work.', valueIntro: 'A valuable diffraction database brings broad chemistry, connected crystallographic information and a usable search framework together. Its value grows through its ability to support new materials questions, again and again.', valuePeakLabel: 'peak records form a reusable diffraction reference',
      valueCoverageTitle: 'Systematic coverage across chemistry', valueCoverageBody: '89 elements, 46,627 chemical systems and 228 space groups share a common reference framework, opening more candidate possibilities for unfamiliar systems and complex samples.',
      valueContextTitle: 'Every peak, in context', valueContextBody: 'Composition, space groups, peak positions, intensities, Miller indices and d-spacings remain connected within each entry, allowing researchers to inspect the evidence behind a match.',
      valueReuseTitle: 'Organized once. Used across new questions.', valueReuseBody: 'Unified GJ IDs, consistent fields and two element indexes turn extensive records into a machine-readable, searchable and reusable data asset for phase analysis in GanJiang.',
      homeStatement: 'Our powder diffraction database. Give every decision a stronger foundation.', homeIntro: '207,146 reference entries. 89 elements. Six X-ray targets: Cu, Co, Mo, Cr, Fe and Ag.', homeLink: 'Explore GJ-PDF-V1', homePrice: 'Annual subscription · RMB 300,000',
      navData: 'The database', navTargets: 'X-ray targets', navPreview: 'Data preview', navSubscribe: 'Subscribe',
      foundationTitle: 'Over 200,000 references. A foundation for research.', foundationIntro: 'Across 89 elements, 46,627 chemical systems and 228 space groups, GJ-PDF-V1 organizes broad chemical coverage into a searchable, comparable reference framework for materials research.',
      subscribeCta: 'Explore annual subscription', annualLabel: 'Annual subscription', perYear: 'RMB / year', artAlt: 'An artistic crystalline form with an ordered internal lattice and scattered X-ray beams',
      targetsTitle: 'Six targets. Broader possibilities.', targetsIntro: 'Support for copper, cobalt, molybdenum, chromium, iron and silver X-ray targets brings the database to a wider range of experimental conditions and materials research.',
      copper: 'Copper', cobalt: 'Cobalt', molybdenum: 'Molybdenum', chromium: 'Chromium', iron: 'Iron', silver: 'Silver',
      subscriptionTitle: 'Put a systematic data foundation', subscriptionTitleTwo: 'to work in your research', subscriptionIntro: 'Bring extensive reference data, crystallographic relationships and element indexes into everyday research. Keep a common foundation for comparisons, and more time for your materials questions.',
      annualPlan: 'Annual subscription', priceUnit: 'RMB / YEAR', planDatabase: 'Powder diffraction database built by GanJiang', planEntries: '207,146 reference entries · 89 elements', planTargets: 'Six targets: Cu / Co / Mo / Cr / Fe / Ag', contactSales: 'Enquire about a subscription',
      pageTitle: 'GJ-PDF-V1 — GanJiang Powder Diffraction Database', pageDescription: 'GJ-PDF-V1: a powder diffraction database built by GanJiang. 207,146 reference entries, 89 elements and six X-ray targets: Cu, Co, Mo, Cr, Fe and Ag. Annual subscription: RMB 300,000.',
      statement: 'Build on a valuable data asset.', statementTwo: 'Give every decision a stronger foundation.',
      intro: 'A powder diffraction database built by GanJiang. 207,146 reference entries and 6,125,958 peak records connect chemical composition with crystallographic evidence, supporting candidate searches, phase comparisons and reviewable conclusions.',
      try: 'Explore in GanJiang', view: 'See real entries', entries: 'diffraction reference entries', entryNote: 'Unified GJ IDs connect composition, structure and peaks',
      elements: 'elements', systems: 'chemical systems', spacegroups: 'space groups',
      ownTitle: 'Broader coverage. More candidates.', ownBody: 'References across 46,627 chemical systems share a consistent data framework, expanding the candidate space for unfamiliar samples and complex compositions.',
      filterTitle: 'Two indexes. A more focused search.', filterBody: 'Chemical-system and element-level inverted indexes turn composition into useful constraints, helping researchers concentrate their comparisons on relevant candidates.',
      evidenceTitle: 'Connected evidence. Closer inspection.', evidenceBody: 'Peak positions, relative intensities, hkl, d-spacings and space groups remain linked within each entry, keeping the crystallographic context available for review.',
      previewKicker: 'INSIDE THE DATABASE', previewTitle: 'Let the data speak.', composition: 'Elements', spacegroup: 'Space group', peakCount: 'Stored peaks', peakUnit: 'peaks',
      rawFormula: 'Formula shown as stored in the database.', chartCaption: 'Reference peaks · Relative intensity normalized to 100',
      details: 'Inspect peak positions and Miller indices', tableCaption: 'The 6 highest-intensity peaks in this entry', intensity: 'Rel. intensity',
      previewNote: 'A preview of 3 V1 entries. Reference peaks are not measured patterns. Explore full-database phase searches in GanJiang.',
      footnote: 'V1 snapshot · 6,125,958 peak records · Up to 30 characteristic peaks per entry', collaborate: 'Build the next diffraction data foundation with us',
      sampleLabel: 'Choose a reference entry', tableLabel: 'Reference peak data', plotTitle: 'reference diffraction peaks',
      plotDescription: entry => `Reference stick pattern for database entry ${entry.id}. The horizontal axis is 2θ (10–90°); the vertical axis is relative intensity (0–100).`
    }
  };
  let selected = 0;
  const buttons = [...section.querySelectorAll('[data-pdf-sample]')];
  const subscript = value => value.replace(/\d/g, digit => '₀₁₂₃₄₅₆₇₈₉'[Number(digit)]);
  const language = () => document.documentElement.lang === 'en' ? 'en' : 'zh';
  const setText = (selector, value) => { section.querySelector(selector).textContent = value; };

  function renderEntry() {
    if (!data?.examples?.length || !section.querySelector('#gj-pdf-entry')) return;
    const entry = data.examples[selected];
    const c = copy[language()];
    setText('[data-pdf-entry-id]', entry.id);
    setText('[data-pdf-formula]', subscript(entry.formula));
    setText('[data-pdf-elements]', entry.elements.join(' · '));
    setText('[data-pdf-spacegroup]', `${entry.spacegroup.replace(/_(\d+)/g, (_, digits) => subscript(digits))} · #${entry.spacegroupNumber}`);
    setText('[data-pdf-peak-count]', entry.peaks.length);
    setText('#gj-pdf-plot-title', `${entry.formula} ${c.plotTitle}`);
    setText('#gj-pdf-plot-description', c.plotDescription(entry));
    buttons.forEach((button, index) => button.setAttribute('aria-pressed', String(index === selected)));

    const sticks = document.createDocumentFragment();
    entry.peaks.forEach(peak => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const x = 42 + (peak.position - 10) / 80 * 618;
      const y = 190 - peak.intensity / 100 * 158;
      path.setAttribute('d', `M${x.toFixed(3)} 190V${y.toFixed(3)}`);
      sticks.append(path);
    });
    section.querySelector('[data-pdf-peaks]').replaceChildren(sticks);

    const rows = document.createDocumentFragment();
    [...entry.peaks].sort((a, b) => b.intensity - a.intensity).slice(0, 6).forEach(peak => {
      const row = document.createElement('tr');
      [peak.position.toFixed(3), peak.intensity.toFixed(2), peak.d.toFixed(4), peak.hkl.map(indices => `(${indices.join(' ')})`).join(' · ')].forEach(value => {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.append(cell);
      });
      rows.append(row);
    });
    section.querySelector('[data-pdf-peak-rows]').replaceChildren(rows);
  }

  function translate() {
    const c = copy[language()];
    section.querySelectorAll('[data-pdf-copy]').forEach(node => { node.textContent = c[node.dataset.pdfCopy]; });
    section.querySelector('.gj-pdf-samples')?.setAttribute('aria-label', c.sampleLabel);
    section.querySelector('.gj-pdf-table-scroll')?.setAttribute('aria-label', c.tableLabel);
    section.querySelector('[data-pdf-art]')?.setAttribute('alt', c.artAlt);
    if (document.body.classList.contains('gj-pdf-page')) {
      document.title = c.pageTitle;
      document.querySelectorAll('meta[property="og:title"], meta[name="twitter:title"]').forEach(node => { node.content = c.pageTitle; });
      document.querySelectorAll('meta[name="description"], meta[property="og:description"], meta[name="twitter:description"]').forEach(node => { node.content = c.pageDescription; });
    }
    renderEntry();
  }

  buttons.forEach((button, index) => button.addEventListener('click', () => { selected = index; renderEntry(); }));
  translate();
  if (data?.examples?.length && section.querySelector('.gj-pdf-samples')) section.querySelector('.gj-pdf-samples').hidden = false;
  new MutationObserver(translate).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();
