(function () {
  'use strict';
  var t = window.GanJiangI18n.t;
  var money = window.GanJiangMoney;
  var numberFormat = new Intl.NumberFormat('zh-CN');
  var format = function (value) { return numberFormat.format(value); };
  var byId = function (id) { return document.getElementById(id); };
  function usdText(credits, other, join) {
    var value = money.formatUsd(credits);
    if (other !== undefined) value += (join === 'or' ? ' ' + t('或') + ' ' : '–') + money.formatUsd(other);
    return '≈ ' + value;
  }
  function renderMoneyReferences() {
    document.querySelectorAll('[data-usd-credits]').forEach(function (element) {
      var other = element.hasAttribute('data-usd-other') ? Number(element.dataset.usdOther) : undefined;
      var amount = usdText(Number(element.dataset.usdCredits), other, element.dataset.usdJoin);
      if (element.tagName === 'OPTION') element.textContent = t(element.dataset.usdLabel) + ' · ' + amount;
      else element.textContent = amount;
    });
    byId('exchange-rate').textContent = '1 USD = ' + money.reference.cnyPerUsd + ' CNY';
  }

  // Only the download-section button opens the external download center.
  var downloadCenter = window.GANJIANG_DOWNLOADS || {};
  var downloadUrl;
  try { downloadUrl = new URL(downloadCenter.url); } catch (_) { /* Keep the HTML fallback. */ }
  if (downloadUrl && ['https:', 'http:'].includes(downloadUrl.protocol) && !downloadUrl.username && !downloadUrl.password) {
    document.querySelectorAll('[data-download]').forEach(function (link) {
      link.href = downloadUrl.href;
      link.removeAttribute('aria-disabled');
      link.classList.remove('is-pending');
      link.querySelector('span').textContent = t('前往下载中心');
    });
  }

  var menuButton = document.querySelector('.menu-toggle');
  var navigation = byId('navigation');
  function updateMenuLabel() {
    var open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.textContent = t(open ? '关闭' : '菜单');
    menuButton.setAttribute('aria-label', t(open ? '关闭导航' : '打开导航'));
  }
  function closeMenu() {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
    updateMenuLabel();
  }
  menuButton.addEventListener('click', function () {
    var open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
    updateMenuLabel();
  });
  navigation.addEventListener('click', function (event) { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('click', function (event) { if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu(); });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); }
  });
  window.matchMedia('(min-width: 801px)').addEventListener('change', function (event) { if (event.matches) closeMenu(); });

  var marquee = byId('tool-marquee');
  var track = marquee.querySelector('.engine-track');
  var toolGroup = track.querySelector('.engine-group');
  var toolCopy = toolGroup.cloneNode(true);
  toolCopy.setAttribute('aria-hidden', 'true');
  toolCopy.removeAttribute('aria-label');
  track.append(toolCopy);
  var marqueeButton = byId('marquee-toggle');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function setMarqueeMotion() {
    marquee.classList.toggle('is-animated', !reducedMotion.matches);
    toolCopy.hidden = reducedMotion.matches;
    marqueeButton.hidden = reducedMotion.matches;
    if (reducedMotion.matches) marquee.setAttribute('tabindex', '0');
    else marquee.removeAttribute('tabindex');
  }
  marqueeButton.addEventListener('click', function () {
    var paused = marqueeButton.getAttribute('aria-pressed') !== 'true';
    marqueeButton.setAttribute('aria-pressed', String(paused));
    document.querySelector('.engine-band').classList.toggle('is-paused', paused);
    marqueeButton.querySelector('span').textContent = t(paused ? '继续滚动' : '暂停滚动');
    marqueeButton.querySelector('path').setAttribute('d', paused ? 'm5 3 7 5-7 5Z' : 'M5 3v10M11 3v10');
  });
  reducedMotion.addEventListener('change', setMarqueeMotion);
  setMarqueeMotion();

  var views = {
    identify: {
      title: '古埃及化妆粉 · 实测图谱', legend: 'Observed',
      heading: '让每一个候选，都有图谱依据',
      copy: '从衍射信号出发，逐步识别与校验候选物相。', value: 'XRD / CIF',
      alt: '古埃及化妆粉的实测 XRD 图谱，以衍射角为横轴、相对强度为纵轴。'
    },
    decompose: {
      title: '五相分量 · 各相独立归一化并错位显示', legend: 'Phase profiles',
      heading: '把混合信号，拆成可理解的物相',
      copy: '该研究案例包含石膏等五种矿物，分量曲线由峰参数重建。', value: '5 PHASES',
      alt: '五种矿物的 XRD 分量曲线，各相独立归一化并沿纵轴错位展示；曲线来自官网案例的导出峰参数。'
    },
    refine: {
      title: '实测与计算对照 · 底部为差值', legend: 'Observed / Fit',
      heading: '用实测信号，检验结构解释',
      copy: '对照计算曲线与残差，回到证据本身。指标仅对应此案例。', value: 'Rwp 13.08%',
      alt: '官网研究案例的实测图谱、计算图谱和差值曲线，案例 Rwp 为 13.08%，并非软件通用精度承诺。'
    }
  };
  var tabs = Array.from(document.querySelectorAll('[data-view]'));
  function selectView(tab) {
    var view = views[tab.dataset.view];
    if (!view) return;
    tabs.forEach(function (item) {
      var selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    byId('analysis-panel').setAttribute('aria-labelledby', tab.id);
    document.querySelector('.workbench').dataset.analysisView = tab.dataset.view;
    var themeSuffix = document.documentElement.dataset.theme === 'light' ? '-light' : '';
    byId('analysis-plot').src = './assets/' + tab.dataset.view + themeSuffix + '.svg';
    byId('analysis-plot').alt = t(view.alt);
    byId('plot-title').textContent = t(view.title);
    byId('plot-legend').replaceChildren();
    byId('plot-legend').append(document.createElement('i'), document.createTextNode(view.legend));
    byId('insight-title').textContent = t(view.heading);
    byId('insight-copy').textContent = t(view.copy);
    byId('insight-value').textContent = view.value;
  }
  tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () { selectView(tab); });
    tab.addEventListener('keydown', function (event) {
      var next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault(); selectView(tabs[next]); tabs[next].focus();
    });
  });

  var form = byId('credit-form');
  function readInput() {
    return {
      task: byId('task').value, quantity: byId('quantity').value, match: byId('match').checked,
      candidates: byId('candidates').value, shifts: byId('shifts').value,
      combinations: byId('combinations').value, baselines: byId('baselines').value,
      refinement: byId('refinement').value, wpemRuns: byId('wpem-runs').value, wpemExtra: byId('wpem-extra').checked
    };
  }
  function updateEstimate() {
    var input = readInput();
    var single = input.task === 'single' || input.task === 'element';
    byId('single-options').hidden = !single;
    byId('multi-options').hidden = input.task !== 'multi';
    byId('candidates').disabled = !input.match;
    byId('shifts').disabled = !input.match;
    var canRefine = input.task === 'refinement' || input.task === 'multi' || (single && input.match);
    document.querySelector('.refinement-field').hidden = !canRefine;
    byId('refinement').querySelector('[value="none"]').disabled = input.task === 'refinement';
    if (input.task === 'refinement' && input.refinement === 'none') {
      byId('refinement').value = 'gsas'; input.refinement = 'gsas';
    }
    byId('wpem-options').hidden = !canRefine || input.refinement !== 'wpem';
    byId('refinement-hint').hidden = !canRefine;
    var result = window.GanJiangCredits.calculate(input);
    byId('credit-total').value = format(result.total);
    byId('usd-total').value = usdText(result.total);
    byId('credit-total').classList.toggle('large-number', String(result.total).length > 7);
    byId('estimate-label').textContent = t(result.isUpperBound ? '本次配置的参考积分上限' : '本次流程参考积分');
    byId('estimate-scope').textContent = result.quantity === 1 ? t('1 次流程 · 不含模型调用费用') : t('{count} 次流程 · 不含模型调用费用', { count: format(result.quantity) });
    var list = byId('credit-breakdown');
    list.replaceChildren();
    result.steps.forEach(function (step) {
      var row = document.createElement('div');
      var term = document.createElement('dt');
      var amount = document.createElement('dd');
      term.textContent = t(step.label) + (step.count > 1 ? ' × ' + format(step.count) : '');
      amount.textContent = format(step.credits);
      var usd = document.createElement('small');
      usd.textContent = usdText(step.credits);
      amount.append(usd);
      row.append(term, amount); list.append(row);
    });
    var hint = '识别与精修连续执行时，两部分费用相加。';
    var disclaimer = '各次流程按相同配置估算，实际扣费以账单明细为准。';
    if (result.refinement === 'fullprof') {
      hint = 'FullProf 每轮 150 积分，最多 30 轮，最高 4,500 积分。轮数由云端决定，用户不能指定。';
      disclaimer = '含 FullProf 的最高参考费用；云端可能提前停止，实际费用可能更低。';
    } else if (result.refinement === 'wpem') {
      hint = '每次 WPEM 计算 600 积分，另加 1 次最终校验 20；内部迭代不按轮数单独计费。';
    } else if (result.refinement === 'gsas') {
      hint = '按通常流程计：1 次 GSAS-II 计算 1,200＋1 次最终校验 20。';
    }
    byId('refinement-hint').textContent = t(hint);
    byId('estimate-disclaimer').textContent = t(disclaimer);
  }
  form.addEventListener('submit', function (event) { event.preventDefault(); });
  form.addEventListener('input', updateEstimate);
  form.addEventListener('change', updateEstimate);
  form.addEventListener('focusout', function (event) {
    var field = event.target;
    if (field.type !== 'number') return;
    var min = Number(field.min || 0);
    var max = Number(field.max || 10000);
    var value = Number(field.value);
    field.value = field.value === '' || !Number.isFinite(value) ? (field.defaultValue || min) : Math.max(min, Math.min(max, Math.floor(value)));
    updateEstimate();
  });
  form.addEventListener('reset', function () { window.setTimeout(updateEstimate, 0); });
  function renderLanguage() {
    updateMenuLabel();
    var downloadLink = document.querySelector('[data-download]');
    downloadLink.querySelector('span').textContent = t(downloadLink.hasAttribute('href') ? '前往下载中心' : '下载入口即将开放');
    marqueeButton.querySelector('span').textContent = t(marqueeButton.getAttribute('aria-pressed') === 'true' ? '继续滚动' : '暂停滚动');
    selectView(tabs.find(function (tab) { return tab.getAttribute('aria-selected') === 'true'; }) || tabs[0]);
    renderMoneyReferences();
    updateEstimate();
  }
  window.addEventListener('ganjiang:languagechange', renderLanguage);
  window.addEventListener('ganjiang:themechange', function () {
    selectView(tabs.find(function (tab) { return tab.getAttribute('aria-selected') === 'true'; }) || tabs[0]);
  });
  renderLanguage();
})();
