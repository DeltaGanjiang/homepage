/* Public summaries and 18 real reference patterns. Full searches live in GanJiang. */
(() => {
  const section = document.querySelector('[data-gj-pdf]');
  if (!section) return;
  const data = window.gjPdfV1;
  const structures = window.gjPdfStructures;
  const copy = {
    zh: {
      homeStatement: '面向关键物相判断的自主衍射数据资产', homeIntro: '207,146 个结构条目，89 种元素，支持 Cu、Co、Mo、Cr、Fe、Ag 六种靶材。', homeLink: '探索 GJ-PDF-V1', homePrice: '数据库独立订阅 · 3 万元 / 年；干将 App 已内置',
      navData: '数据规模', navQuality: '数据品质', navPreview: '多靶材预览', navSubscribe: '数据库订阅',
      statement: '从团队独立计算的稳定结构', statementTwo: '到每一次物相判断的依据', intro: '207,146 个结构条目，全部由团队独立计算，并经弛豫得到稳定结构，再建立六种靶材下的衍射参考。把独立计算与弛豫后的结构、谱峰与检索索引连成一体，为物相判断提供统一依据。',
      view: '探索真实数据', subscribeCta: '了解数据库独立订阅', tagStructures: '团队独立计算', tagRelaxed: '稳定结构建库', tagTargets: '六靶材参考', heroStructures: '个结构条目 · 同一套参考体系', artAlt: '有序晶体点阵与衍射光线的艺术示意',
      appIncluded: '干将 App 已内置本数据库。', appLink: '体验干将 App',
      dataTitle: '规模，看得见', dataTitleTwo: '价值，经得起逐条核对', dataIntro: '跨越元素、化学体系与晶体对称性，建立可检索、可比对的自主参考底座。每一种靶材，都有对应的衍射数据。', structures: '个结构条目', structureNote: '统一 GJ 编号，关联组成、空间群与衍射峰', elements: '种元素', systems: '类元素组合', spacegroups: '个空间群编号',
      coverageTitle: '你的材料体系，在覆盖范围内吗？', coverageIntro: '选择元素，查看包含该元素的结构条目数。', elementEntries: '个结构条目包含此元素', atomicNumber: '原子序数', coverageNote: '绿色为已收录元素；单个结构可包含多种元素，各元素条目数不作加总。', elementLabel: '数据库覆盖元素', elementButton: (symbol, count) => `${symbol}，${count} 个结构条目`, elementMissing: symbol => `${symbol}，未收录`,
      qualityTitle: '数据的功夫', qualityTitleTwo: '做在你开始检索之前', qualityIntro: '全部结构均由团队独立计算，并经弛豫得到稳定结构，再生成六种靶材的衍射参考。将结构计算、衍射建库与数据完整性核验衔接起来，为每条参考建立可复查的依据。',
      qualityStructureTitle: '独立计算，结构弛豫', qualityStructureBody: '207,146 个结构条目均由团队独立计算，并经弛豫得到稳定结构，以此建立自主数据库。每个条目关联化学式、元素组成、原子数、空间群与统一 GJ 编号，将结构计算的成果落实到衍射参考。', qualityStructureEvidence: '个团队独立计算的稳定结构条目',
      qualityCalculationTitle: '六种靶材，分别计算', qualityCalculationBody: '基于同一套结构，按 Cu、Co、Mo、Cr、Fe、Ag 的波长分别生成衍射参考。峰位与相对强度随靶材对应，支持跨实验条件的物相比对。', qualityCalculationEvidence: '种靶材 · Kα 加权平均波长',
      qualityIntegrityTitle: '完整性，逐项核验', qualityIntegrityBody: '检查编号唯一性、必要字段、谱峰数组长度、数值有效性与索引引用，排查空字段、峰表错位与失效索引，让数据在检索和读取时保持完整。', qualityIntegrityNumber: '逐条', qualityIntegrityEvidence: '核验结构条目与关联谱峰', qualityStripTitle: '从结构到谱峰，保留可复查的联系', fieldFormula: '化学式', fieldSpacegroup: '空间群',
      previewTitle: '换一种靶材', previewTitleTwo: '亲眼看见数据的不同', previewIntro: '选择靶材与示例结构，直接查看库内参考峰、波长和晶面信息。这里的每一个峰，都来自对应靶材的实际数据快照。', copper: '铜', cobalt: '钴', molybdenum: '钼', chromium: '铬', iron: '铁', silver: '银', targetStructures: '个结构条目', targetPeaks: '条特征峰', samplePrompt: '选择示例结构', composition: '元素组成', spacegroup: '空间群', peakCount: '收录特征峰', peakUnit: '条', rawFormula: '化学式与晶面信息按库内原始条目展示。',
      chartCaption: '库内计算参考峰 · 相对强度归一化至 100', details: '查看峰位、d 间距与晶面指数', tableCaption: '当前条目中相对强度最高的 6 条特征峰', intensity: '相对强度', previewNote: '每种靶材展示 3 个示例结构。参考峰为计算数据，非实测图谱；完整数据库检索请在干将中体验。', totalPeaksLabel: '条特征峰，覆盖六种靶材', countNote: '结构条目按统一 GJ 编号计数；峰数为六靶材累计，每条记录最多保留 30 条峰。', sampleLabel: '选择参考条目', targetLabel: '选择 X 射线靶材', tableLabel: '参考峰数据', plotTitle: '参考衍射峰', plotDescription: (entry, target) => `条目 ${entry.id}，${target.symbol} 靶，波长 ${target.wavelength} Å。横轴 2θ 为 10–90°，纵轴为相对强度 0–100。`, peakDescription: peak => `2θ ${peak.position.toFixed(3)}°；相对强度 ${peak.intensity.toFixed(2)}；d ${peak.d.toFixed(4)} Å`,
      subscriptionTitle: '数据库独立订阅', subscriptionIntro: '从 207,146 个由团队独立计算与弛豫得到的稳定结构，到六种靶材的衍射参考、关联索引与完整性核验，GJ-PDF-V1 将系统计算与建库成果转化为可持续使用的科研数据资产。', valueCoverageTitle: '面向更广的材料问题', valueCoverageBody: '89 种元素、46,627 类元素组合，为新体系与复杂样品保留更多候选。', valueReuseTitle: '让每次比对有共同依据', valueReuseBody: '统一编号、标准字段与双层元素索引，让数据接入、候选筛选与结论复查更有章可循。',
      annualPlan: '数据库独立订阅', priceUnit: '人民币 / 年 · 数据库独立订阅价格', includedTitle: '干将 App 已内置本数据库', includedBody: '本页报价适用于单独订阅 GJ-PDF-V1 数据库。通过干将 App 使用内置数据库，无需另行购买本页的独立数据库订阅。', planStatement: '一套自主数据底座，支撑持续的科研判断。', planStructures: '207,146 个团队独立计算的稳定结构的衍射参考', planTargets: 'Cu / Co / Mo / Cr / Fe / Ag 六靶材数据', planEvidence: '峰位、相对强度、d 间距与 hkl 关联', planIndexes: '元素组合索引与单元素倒排索引', planIntegrity: '条目、谱峰与索引完整性核验', contactSales: '咨询数据库独立订阅',
      pageTitle: 'GJ-PDF-V1 — 干将自主粉末衍射数据库', pageDescription: 'GJ-PDF-V1：207,146 个结构条目、89 种元素、六靶材衍射参考。全部结构均由团队独立计算，并经弛豫得到稳定结构，建立六靶材衍射参考。数据库独立订阅 3 万元 / 年；干将 App 已内置本数据库。'
    },
    en: {
      homeStatement: 'An independent diffraction data foundation for materials research.', homeIntro: '207,146 structure entries. 89 elements. Six X-ray targets: Cu, Co, Mo, Cr, Fe and Ag.', homeLink: 'Explore GJ-PDF-V1', homePrice: 'Standalone database · RMB 30,000 / year; built into the GanJiang app',
      navData: 'Coverage', navQuality: 'Data quality', navPreview: 'Six-target preview', navSubscribe: 'Database subscription',
      statement: 'From stable structures computed by our team', statementTwo: 'to evidence for every phase decision', intro: 'All 207,146 structure entries are independently computed by our team and relaxed to obtain stable structures. From these structures, we build diffraction references for six X-ray targets, linking structure calculations, peaks and search indexes in one framework.',
      view: 'Explore real data', subscribeCta: 'Standalone database subscription', tagStructures: 'Structures computed by our team', tagRelaxed: 'Stable structure database', tagTargets: 'Six X-ray targets', heroStructures: 'structure entries · one reference framework', artAlt: 'An artistic ordered crystal lattice and diffracted X-ray beams', appIncluded: 'This database is built into the GanJiang app.', appLink: 'Explore the GanJiang app',
      dataTitle: 'Coverage you can measure.', dataTitleTwo: 'References you can inspect.', dataIntro: 'A searchable, comparable foundation across elements, chemical systems and crystal symmetries, with diffraction data for each supported X-ray target.', structures: 'structure entries', structureNote: 'Unified GJ IDs link composition, space groups and peaks', elements: 'elements', systems: 'chemical systems', spacegroups: 'space-group identifiers',
      coverageTitle: 'Is your chemistry covered?', coverageIntro: 'Select an element to see how many structure entries contain it.', elementEntries: 'structure entries contain this element', atomicNumber: 'Atomic number', coverageNote: 'Green indicates covered elements. A structure can contain several elements; these counts are not additive.', elementLabel: 'Elements covered by the database', elementButton: (symbol, count) => `${symbol}, ${count} structure entries`, elementMissing: symbol => `${symbol}, not covered`,
      qualityTitle: 'The work behind the data.', qualityTitleTwo: 'Done before your search begins.', qualityIntro: 'Our team independently computes every structure and relaxes it to obtain a stable structure, then generates diffraction references for six targets. Structure calculations, diffraction data and integrity checks form one reviewable reference framework.',
      qualityStructureTitle: 'Independent calculations and relaxation', qualityStructureBody: 'All 207,146 structures are independently computed by our team and relaxed to obtain stable structures. We build the database from these structures. Formulas, elements, atom counts, space groups and unified GJ IDs connect these structure calculations to diffraction references.', qualityStructureEvidence: 'stable structure entries computed by our team',
      qualityCalculationTitle: 'Calculated for six targets', qualityCalculationBody: 'Generate references from the same structures at the wavelengths of Cu, Co, Mo, Cr, Fe and Ag. Target-specific peak positions and intensities support phase comparisons across experimental conditions.', qualityCalculationEvidence: 'targets · weighted-mean Kα wavelengths',
      qualityIntegrityTitle: 'Check the connections', qualityIntegrityBody: 'Check unique IDs, required fields, matching peak-array lengths, finite values and index references to catch empty fields, misaligned peak tables and broken lookups.', qualityIntegrityNumber: 'Every entry', qualityIntegrityEvidence: 'structure records and associated peaks checked', qualityStripTitle: 'Keep the path from structure to peak reviewable', fieldFormula: 'Formula', fieldSpacegroup: 'Space group',
      previewTitle: 'Change the X-ray target.', previewTitleTwo: 'See the reference change.', previewIntro: 'Choose a target and example structure to inspect actual database peaks, wavelengths and Miller indices. Every displayed peak comes from the corresponding target snapshot.', copper: 'Copper', cobalt: 'Cobalt', molybdenum: 'Molybdenum', chromium: 'Chromium', iron: 'Iron', silver: 'Silver', targetStructures: 'structure entries', targetPeaks: 'peak records', samplePrompt: 'Choose an example structure', composition: 'Elements', spacegroup: 'Space group', peakCount: 'Stored peaks', peakUnit: 'peaks', rawFormula: 'Formula and Miller indices shown as stored in the database.', chartCaption: 'Calculated reference peaks · Relative intensity normalized to 100', details: 'Inspect peak positions, d-spacings and Miller indices', tableCaption: 'The six highest-intensity peaks in this entry', intensity: 'Rel. intensity', previewNote: 'Three example structures per target. Peaks are calculated references, not measured patterns. Use GanJiang for full-database searches.', totalPeaksLabel: 'peak records across six X-ray targets', countNote: 'Structures are counted by unified GJ ID. Peak records are summed across six targets, with up to 30 peaks per entry.', sampleLabel: 'Choose a reference entry', targetLabel: 'Choose an X-ray target', tableLabel: 'Reference peak data', plotTitle: 'reference diffraction peaks', plotDescription: (entry, target) => `Entry ${entry.id}, ${target.symbol} target, wavelength ${target.wavelength} Å. Horizontal axis: 2θ, 10–90°. Vertical axis: relative intensity, 0–100.`, peakDescription: peak => `2θ ${peak.position.toFixed(3)}°; relative intensity ${peak.intensity.toFixed(2)}; d ${peak.d.toFixed(4)} Å`,
      subscriptionTitle: 'Standalone database subscription', subscriptionIntro: 'From 207,146 stable structures independently computed and relaxed by our team to six-target diffraction references, linked indexes and integrity checks, GJ-PDF-V1 turns systematic computation and database construction into a reusable research data asset.', valueCoverageTitle: 'Room for more materials questions', valueCoverageBody: '89 elements and 46,627 chemical systems expand the candidate space for unfamiliar chemistries and complex samples.', valueReuseTitle: 'A shared basis for every comparison', valueReuseBody: 'Unified IDs, consistent fields and two element indexes support data integration, candidate screening and reviewable conclusions.',
      annualPlan: 'Standalone database', priceUnit: 'RMB / year · Standalone database subscription', includedTitle: 'Already built into the GanJiang app', includedBody: 'This price is for a separate GJ-PDF-V1 database subscription. Using the built-in database through the GanJiang app does not require this standalone subscription.', planStatement: 'An independent data foundation for ongoing research.', planStructures: 'Diffraction references from 207,146 stable structures computed by our team', planTargets: 'Six targets: Cu / Co / Mo / Cr / Fe / Ag', planEvidence: 'Linked peak positions, intensities, d-spacings and hkl', planIndexes: 'Chemical-system and element inverted indexes', planIntegrity: 'Entry, peak and index integrity checks', contactSales: 'Enquire about the standalone database',
      pageTitle: 'GJ-PDF-V1 — GanJiang Powder Diffraction Database', pageDescription: '207,146 structure entries, 89 elements and six X-ray targets. All structures independently computed and relaxed by our team to obtain stable structures, with six-target diffraction references. Standalone database: RMB 30,000 / year. Already built into the GanJiang app.'
    }
  };
  Object.assign(copy.zh, {
    structureViewTitle: '晶体结构', structureReset: '重置视角', structureCaption: '真实原子坐标 · 单晶胞视图 · 拖动旋转', structureContactNote: '连线为晶胞内近邻示意，球体大小用于显示。', structureControls: '晶体结构，拖动或使用方向键旋转，Home 键重置视角',
    structureDescription: model => `条目 ${model.id}，${model.formula}，${model.atoms.length} 个原子。按数据库真实晶胞和原子坐标绘制；连线为晶胞内近邻示意。`
  });
  Object.assign(copy.en, {
    structureViewTitle: 'Crystal structure', structureReset: 'Reset view', structureCaption: 'Database coordinates · One cell · Drag to rotate', structureContactNote: 'Lines show in-cell neighbour contacts; sphere sizes are illustrative.', structureControls: 'Crystal structure. Drag or use arrow keys to rotate; Home resets the view.',
    structureDescription: model => `Entry ${model.id}, ${model.formula}, ${model.atoms.length} atoms. Drawn from the database cell and atomic coordinates; lines show in-cell neighbour contacts.`
  });
  const language = () => document.documentElement.lang === 'en' ? 'en' : 'zh';
  const format = value => Number(value).toLocaleString('en-US');
  const subscript = value => value.replace(/\d/g, digit => '₀₁₂₃₄₅₆₇₈₉'[Number(digit)]);
  const setText = (selector, value) => { const node = section.querySelector(selector); if (node) node.textContent = value; };
  const elementSymbols = 'H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu'.split(' ');
  const elementNamesZh = '氢 氦 锂 铍 硼 碳 氮 氧 氟 氖 钠 镁 铝 硅 磷 硫 氯 氩 钾 钙 钪 钛 钒 铬 锰 铁 钴 镍 铜 锌 镓 锗 砷 硒 溴 氪 铷 锶 钇 锆 铌 钼 锝 钌 铑 钯 银 镉 铟 锡 锑 碲 碘 氙 铯 钡 镧 铈 镨 钕 钷 钐 铕 钆 铽 镝 钬 铒 铥 镱 镥 铪 钽 钨 铼 锇 铱 铂 金 汞 铊 铅 铋 钋 砹 氡 钫 镭 锕 钍 镤 铀 镎 钚'.split(' ');
  const elementNamesEn = 'Hydrogen Helium Lithium Beryllium Boron Carbon Nitrogen Oxygen Fluorine Neon Sodium Magnesium Aluminum Silicon Phosphorus Sulfur Chlorine Argon Potassium Calcium Scandium Titanium Vanadium Chromium Manganese Iron Cobalt Nickel Copper Zinc Gallium Germanium Arsenic Selenium Bromine Krypton Rubidium Strontium Yttrium Zirconium Niobium Molybdenum Technetium Ruthenium Rhodium Palladium Silver Cadmium Indium Tin Antimony Tellurium Iodine Xenon Cesium Barium Lanthanum Cerium Praseodymium Neodymium Promethium Samarium Europium Gadolinium Terbium Dysprosium Holmium Erbium Thulium Ytterbium Lutetium Hafnium Tantalum Tungsten Rhenium Osmium Iridium Platinum Gold Mercury Thallium Lead Bismuth Polonium Astatine Radon Francium Radium Actinium Thorium Protactinium Uranium Neptunium Plutonium'.split(' ');
  const targetButtons = [...section.querySelectorAll('[data-pdf-target]')];
  const sampleButtons = [...section.querySelectorAll('[data-pdf-sample]')];
  let selected = 0;
  let selectedTarget = 'Cu';
  let selectedElement = 'O';
  let activeStructure;
  let structureYaw = -.65;
  let structurePitch = .35;
  const structurePalette = {Ti: '#9faecc', O: '#e86a76', Si: '#dcb98e', Li: '#b9a0e1', Fe: '#df946c', P: '#edb352'};
  const svgNode = (tag, attributes = {}, text) => {
    const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
    if (text !== undefined) node.textContent = text;
    return node;
  };

  function drawStructure() {
    const scene = section.querySelector('[data-pdf-structure-scene]');
    if (!activeStructure || !scene) return;
    const model = activeStructure;
    const center = [0, 1, 2].map(j => model.cell.reduce((sum, axis) => sum + axis[j] / 2, 0));
    const radius = Math.max(...model.corners.map(position => Math.hypot(...position.map((v, j) => v - center[j]))));
    const rotate = ([x, y, z]) => {
      const u = x * Math.cos(structureYaw) + z * Math.sin(structureYaw);
      const v = -x * Math.sin(structureYaw) + z * Math.cos(structureYaw);
      return [u, y * Math.cos(structurePitch) - v * Math.sin(structurePitch), y * Math.sin(structurePitch) + v * Math.cos(structurePitch)];
    };
    const rotatedCorners = model.corners.map(position => rotate(position.map((value, j) => value - center[j])));
    const bounds = [0, 1].map(axis => [Math.min(...rotatedCorners.map(p => p[axis])), Math.max(...rotatedCorners.map(p => p[axis]))]);
    const scale = Math.min(278 / Math.max(1e-6, bounds[0][1] - bounds[0][0]), 228 / Math.max(1e-6, bounds[1][1] - bounds[1][0]));
    const midpoint = bounds.map(([low, high]) => (low + high) / 2);
    const project = position => {
      const [x, y, z] = rotate(position.map((value, j) => value - center[j]));
      return {x: 180 + (x - midpoint[0]) * scale, y: 142 - (y - midpoint[1]) * scale, z};
    };
    const atoms = model.atoms.map(atom => ({...atom, ...project(atom.position)}));
    const corners = model.corners.map(project);
    const fragment = document.createDocumentFragment();
    const cell = svgNode('g', {class: 'pdf-structure-edges'});
    model.edges.forEach(([i, j]) => cell.append(svgNode('line', {x1: corners[i].x, y1: corners[i].y, x2: corners[j].x, y2: corners[j].y})));
    fragment.append(cell);
    const items = atoms.map(atom => ({type: 'atom', z: atom.z, atom}));
    model.bonds.forEach(([i, j]) => items.push({type: 'contact', z: (atoms[i].z + atoms[j].z) / 2, a: atoms[i], b: atoms[j]}));
    items.sort((a, b) => a.z - b.z).forEach(item => {
      if (item.type === 'contact') {
        fragment.append(svgNode('line', {x1: item.a.x, y1: item.a.y, x2: item.b.x, y2: item.b.y, class: 'pdf-structure-contact', 'stroke-width': 2.4, opacity: .65 + item.z / radius * .16}));
      } else {
        const atom = item.atom;
        const sphere = svgNode('circle', {cx: atom.x, cy: atom.y, r: Math.max(4.7, Math.min(10, scale * (atom.element === 'O' ? .37 : .49))), fill: `url(#pdf-atom-${atom.element})`, stroke: structurePalette[atom.element], 'stroke-width': .5});
        sphere.append(svgNode('title', {}, `${atom.element} · (${atom.position.map(v => v.toFixed(3)).join(', ')}) Å`));
        fragment.append(sphere);
      }
    });
    const axes = svgNode('g', {class: 'pdf-structure-axes'});
    model.cell.forEach((axis, index) => {
      const length = Math.hypot(...axis);
      const [x, y] = rotate(axis.map(v => v / length * 22));
      axes.append(svgNode('line', {x1: 29, y1: 272, x2: 29 + x, y2: 272 - y}));
      axes.append(svgNode('text', {x: 29 + x + 3, y: 272 - y - 3}, 'abc'[index]));
    });
    fragment.append(axes);
    scene.replaceChildren(fragment);
  }

  function renderStructure(entry) {
    const figure = section.querySelector('[data-pdf-structure]');
    const model = structures?.find(item => item.id === entry.id);
    if (!figure || !model) return;
    if (activeStructure?.id !== model.id) {
      activeStructure = model;
      structureYaw = -.65;
      structurePitch = .35;
      const definitions = document.createDocumentFragment();
      const legend = document.createDocumentFragment();
      [...new Set(model.atoms.map(atom => atom.element))].forEach(element => {
        const gradient = svgNode('radialGradient', {id: `pdf-atom-${element}`, cx: '32%', cy: '28%', r: '72%'});
        gradient.append(svgNode('stop', {offset: '0%', 'stop-color': '#fff4e9'}), svgNode('stop', {offset: '32%', 'stop-color': structurePalette[element]}), svgNode('stop', {offset: '100%', 'stop-color': '#283749'}));
        definitions.append(gradient);
        const label = document.createElement('span');
        label.style.setProperty('--atom-color', structurePalette[element]);
        label.textContent = element;
        legend.append(label);
      });
      section.querySelector('[data-pdf-structure-defs]').replaceChildren(definitions);
      section.querySelector('[data-pdf-structure-legend]').replaceChildren(legend);
    }
    const c = copy[language()];
    setText('#pdf-structure-title', `${entry.formula} · ${entry.id} · ${c.structureViewTitle}`);
    setText('#pdf-structure-description', c.structureDescription(model));
    setText('[data-pdf-structure-cell]', model.cellLengths.map((value, index) => `${'abc'[index]} ${value.toFixed(3)}`).join(' · ') + ' Å');
    setText('[data-pdf-structure-angles]', model.cellAngles.map((value, index) => `${'αβγ'[index]} ${value.toFixed(1)}°`).join(' · '));
    section.querySelector('[data-pdf-structure-viewport]').setAttribute('aria-label', c.structureControls);
    figure.hidden = false;
    figure.parentElement.classList.add('has-structure');
    drawStructure();
  }

  function renderEntry() {
    const target = data?.targets?.find(item => item.symbol === selectedTarget);
    if (!target || !section.querySelector('#pdf-reference')) return;
    const entry = target.examples[selected];
    if (!entry) return;
    const c = copy[language()];
    const [low, high] = target.twoThetaRange;
    setText('[data-pdf-active-target]', `${target.symbol} Kα`);
    setText('[data-pdf-wavelength]', target.wavelength.toFixed(4));
    setText('[data-pdf-target-entries]', format(target.stats.entries));
    setText('[data-pdf-target-peaks]', format(target.stats.peaks));
    setText('[data-pdf-chart-condition]', `${target.symbol} Kα / ${low}–${high}°`);
    setText('[data-pdf-entry-id]', entry.id);
    setText('[data-pdf-formula]', subscript(entry.formula));
    setText('[data-pdf-elements]', entry.elements.join(' · '));
    setText('[data-pdf-spacegroup]', `${entry.spacegroup.replace(/_(\d+)/g, (_, digits) => subscript(digits))} · #${entry.spacegroupNumber}`);
    setText('[data-pdf-peak-count]', entry.peaks.length);
    setText('#gj-pdf-plot-title', `${entry.formula} / ${target.symbol} Kα ${c.plotTitle}`);
    setText('#gj-pdf-plot-description', c.plotDescription(entry, target));
    targetButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.pdfTarget === selectedTarget)));
    sampleButtons.forEach((button, index) => button.setAttribute('aria-pressed', String(index === selected)));
    const sticks = document.createDocumentFragment();
    entry.peaks.forEach(peak => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const x = 48 + (peak.position - low) / (high - low) * 652;
      const y = 224 - peak.intensity / 100 * 188;
      path.setAttribute('d', `M${x.toFixed(3)} 224V${y.toFixed(3)}`);
      const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
      title.textContent = c.peakDescription(peak);
      path.append(title);
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
    renderStructure(entry);
  }

  function renderElement() {
    if (!data?.elementCounts) return;
    const c = copy[language()];
    setText('[data-pdf-element-symbol]', selectedElement);
    setText('[data-pdf-element-count]', format(data.elementCounts[selectedElement]));
    const elementIndex = elementSymbols.indexOf(selectedElement);
    setText('[data-pdf-element-logo-symbol]', selectedElement);
    setText('[data-pdf-element-name]', language() === 'zh' ? elementNamesZh[elementIndex] : elementNamesEn[elementIndex]);
    setText('[data-pdf-element-english]', language() === 'zh' ? elementNamesEn[elementIndex].toUpperCase() : selectedElement);
    setText('[data-pdf-element-number]', elementIndex + 1);
    section.querySelectorAll('[data-pdf-element]').forEach(button => {
      const symbol = button.dataset.pdfElement;
      const count = data.elementCounts[symbol];
      button.setAttribute('aria-label', count ? c.elementButton(symbol, format(count)) : c.elementMissing(symbol));
      if (!button.disabled) button.setAttribute('aria-pressed', String(symbol === selectedElement));
    });
  }

  function buildPeriodicTable() {
    const grid = section.querySelector('[data-pdf-periodic]');
    if (!grid || !data?.elementCounts) return;
    const periods = [
      ['H', 1], ['He', 18],
      ['Li Be', 1], ['B C N O F Ne', 13],
      ['Na Mg', 1], ['Al Si P S Cl Ar', 13],
      ['K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr', 1],
      ['Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe', 1],
      ['Cs Ba La Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn', 1],
      ['Fr Ra Ac Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og', 1],
      ['Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu', 4],
      ['Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr', 4]
    ];
    const rowNumbers = [1, 1, 2, 2, 3, 3, 4, 5, 6, 7, 9, 10];
    periods.forEach(([symbols, firstColumn], periodIndex) => {
      symbols.split(' ').forEach((symbol, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = symbol;
        button.dataset.pdfElement = symbol;
        button.style.setProperty('--column', firstColumn + index);
        button.style.setProperty('--row', rowNumbers[periodIndex]);
        button.disabled = !data.elementCounts[symbol];
        button.addEventListener('click', () => { selectedElement = symbol; renderElement(); });
        grid.append(button);
      });
    });
    section.querySelector('[data-pdf-coverage]').hidden = false;
  }

  function translate() {
    const c = copy[language()];
    section.querySelectorAll('[data-pdf-copy]').forEach(node => {
      const value = c[node.dataset.pdfCopy];
      if (typeof value !== 'string') return;
      const phrases = language() === 'zh' ? ['经弛豫得到稳定结构'] : ['relaxed to obtain stable structures', 'relaxes it to obtain a stable structure'];
      const phrase = phrases.find(item => value.includes(item));
      if (!phrase) { node.textContent = value; return; }
      const offset = value.indexOf(phrase);
      const emphasis = document.createElement('strong');
      emphasis.className = 'pdf-structure-emphasis';
      emphasis.textContent = phrase;
      node.replaceChildren(document.createTextNode(value.slice(0, offset)), emphasis, document.createTextNode(value.slice(offset + phrase.length)));
    });
    section.querySelector('[data-pdf-periodic]')?.setAttribute('aria-label', c.elementLabel);
    section.querySelector('.gj-pdf-samples')?.setAttribute('aria-label', c.sampleLabel);
    section.querySelector('[data-pdf-targets]')?.setAttribute('aria-label', c.targetLabel);
    section.querySelector('.pdf-table-scroll')?.setAttribute('aria-label', c.tableLabel);
    section.querySelector('[data-pdf-art]')?.setAttribute('alt', c.artAlt);
    if (document.body.classList.contains('gj-pdf-page')) {
      document.title = c.pageTitle;
      document.querySelectorAll('meta[property="og:title"], meta[name="twitter:title"]').forEach(node => { node.content = c.pageTitle; });
      document.querySelectorAll('meta[name="description"], meta[property="og:description"], meta[name="twitter:description"]').forEach(node => { node.content = c.pageDescription; });
    }
    renderEntry();
    renderElement();
  }

  if (data?.stats) section.querySelectorAll('[data-pdf-stat]').forEach(node => {
    const value = data.stats[node.dataset.pdfStat];
    if (Number.isFinite(value)) node.textContent = format(value);
  });
  if (data?.targets?.length) {
    targetButtons.forEach(button => {
      const target = data.targets.find(item => item.symbol === button.dataset.pdfTarget);
      if (target) button.querySelector('.pdf-tab-wave').textContent = `${target.wavelength.toFixed(4)} Å`;
      button.addEventListener('click', () => { selectedTarget = button.dataset.pdfTarget; renderEntry(); });
    });
    sampleButtons.forEach((button, index) => button.addEventListener('click', () => { selected = index; renderEntry(); }));
    const targets = section.querySelector('[data-pdf-targets]');
    const samples = section.querySelector('.gj-pdf-samples');
    if (targets) targets.hidden = false;
    if (samples) samples.hidden = false;
  }
  const structureViewport = section.querySelector('[data-pdf-structure-viewport]');
  if (structureViewport) {
    let drag;
    let drawQueued = false;
    const queueDraw = () => {
      if (drawQueued) return;
      drawQueued = true;
      requestAnimationFrame(() => { drawQueued = false; drawStructure(); });
    };
    const resetView = () => { structureYaw = -.65; structurePitch = .35; queueDraw(); };
    structureViewport.addEventListener('pointerdown', event => {
      if (event.button !== 0) return;
      drag = {id: event.pointerId, x: event.clientX, y: event.clientY};
      structureViewport.setPointerCapture(event.pointerId);
      structureViewport.classList.add('is-rotating');
    });
    structureViewport.addEventListener('pointermove', event => {
      if (!drag || event.pointerId !== drag.id) return;
      structureYaw += (event.clientX - drag.x) * .012;
      structurePitch = Math.max(-1.45, Math.min(1.45, structurePitch + (event.clientY - drag.y) * .012));
      drag.x = event.clientX;
      drag.y = event.clientY;
      queueDraw();
    });
    const endDrag = () => { drag = null; structureViewport.classList.remove('is-rotating'); };
    structureViewport.addEventListener('lostpointercapture', endDrag);
    structureViewport.addEventListener('pointerup', endDrag);
    structureViewport.addEventListener('pointercancel', endDrag);
    structureViewport.addEventListener('keydown', event => {
      if (event.key === 'Home') { event.preventDefault(); resetView(); return; }
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
      event.preventDefault();
      structureYaw += event.key === 'ArrowLeft' ? -.12 : event.key === 'ArrowRight' ? .12 : 0;
      structurePitch = Math.max(-1.45, Math.min(1.45, structurePitch + (event.key === 'ArrowUp' ? -.12 : event.key === 'ArrowDown' ? .12 : 0)));
      queueDraw();
    });
    section.querySelector('[data-pdf-structure-reset]').addEventListener('click', resetView);
  }
  buildPeriodicTable();
  translate();
  new MutationObserver(translate).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();
