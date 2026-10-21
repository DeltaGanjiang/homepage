(() => {
  'use strict';
  const t = window.GanJiangI18n.t;
  const form = document.getElementById('collaboration-form');
  const field = name => form.elements.namedItem(name);
  const byId = id => document.getElementById(id);
  const preview = byId('application-preview');
  const status = byId('form-status');
  const recipient = 'bincao@hkust-gz.edu.cn';
  const benchmark = 'https://github.com/DeltaGanjiang/deltaxrdbench';
  let application;

  const menu = document.querySelector('.menu-toggle');
  const nav = byId('site-nav');
  function updateMenu() {
    const open = menu.getAttribute('aria-expanded') === 'true';
    menu.textContent = t(open ? '关闭' : '菜单');
    menu.setAttribute('aria-label', t(open ? '关闭导航' : '打开导航'));
  }
  function closeMenu() { nav.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); updateMenu(); }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open); updateMenu();
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('click', event => { if (!nav.contains(event.target) && !menu.contains(event.target)) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('is-open')) { closeMenu(); menu.focus(); } });
  matchMedia('(min-width: 801px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

  function updateConditionalFields() {
    const academic = field('applicationType').value === 'academic';
    document.querySelectorAll('[data-application-fields]').forEach(group => {
      const active = group.dataset.applicationFields === field('applicationType').value;
      group.hidden = !active;
      group.disabled = !active;
    });
    document.querySelectorAll('[data-preparation]').forEach(list => {
      list.hidden = list.dataset.preparation !== field('applicationType').value;
    });
    byId('more-fields-number').textContent = academic ? '03' : '05';
    const closed = field('licenseType').value === 'closed';
    byId('nda-field').hidden = !closed;
    field('nda').disabled = !closed;
    byId('license-help').textContent = t(closed ? '请说明授权范围与闭源接入条件；未公开材料可在确认保密安排后提供。' : '请注明开源许可证及接入时需要遵循的条件。');
    const attachment = field('reportMode').value === 'attachment';
    byId('report-url-field').hidden = attachment;
    field('reportUrl').disabled = attachment;
    field('reportUrl').required = !attachment;
    if (attachment) field('reportUrl').setCustomValidity('');
    byId('attachment-note').hidden = !attachment;
    const hints = {
      single: '请列出 Top-1、Top-3、Top-5、MRR@5 等结果，并注明输入条件。',
      multi: '请列出 Coverage、Exact、Macro P / R / F1 等结果，并注明评测范围。',
      refine: '请列出 Rp、Rwp、相关性及 XRDinspector 等适用指标，并注明设置。'
    };
    byId('metrics-help').textContent = t(hints[field('track').value] || '填写对应任务的指标、数值与单位；多个任务请分别列出。');
  }

  function validateFields() {
    form.querySelectorAll('input:not([type="checkbox"]):not([type="radio"]), textarea').forEach(input => {
      input.setCustomValidity('');
      if (input.matches(':disabled')) return;
      if (input.required && !input.value.trim()) input.setCustomValidity(t('请填写此项，不能仅包含空格。'));
      if (input.type === 'url' && input.value.trim()) {
        try {
          const url = new URL(input.value.trim());
          if (!['https:', 'http:'].includes(url.protocol) || !url.hostname) throw new Error('Invalid URL');
        } catch (_) { input.setCustomValidity(t('请填写以 https:// 或 http:// 开头的有效链接。')); }
      }
    });
  }

  function buildApplication() {
    const val = name => field(name).value.trim() || t('未填写');
    const selected = name => field(name).selectedOptions[0].textContent;
    const label = value => t(value).replace(/\s*\*$/, '');
    const academic = field('applicationType').value === 'academic';
    const closed = field('licenseType').value === 'closed';
    const attachment = !academic && field('reportMode').value === 'attachment';
    const rows = [t('曹斌博士您好，以下是我的干将生态合作申报材料。'), ''];
    const section = title => rows.push('', `— ${t(title)} —`);
    const entry = (name, value) => rows.push(`${label(name)}: ${value}`);
    entry('申报类型 *', t(academic ? '学术项目合作' : '软件生态共建'));
    section('联系人信息');
    for (const [name, key] of [['联系人姓名 *','contactName'],['联系邮箱 *','email'],['单位 / 团队','affiliation']]) entry(name, val(key));
    if (academic) {
      section('研究 Proposal');
      for (const [name, key] of [['项目名称 *','projectTitle'],['研究目标与问题 *','researchGoals'],['数据与样本规模 *','researchData'],['实验 / 测试 / 对比方案 *','researchPlan'],['预计 API 调用量 *','apiUsage'],['项目周期 *','projectPeriod'],['预期成果 *','researchOutcomes'],['完整 Proposal 链接（选填）','proposalUrl']]) entry(name, val(key));
      rows.push('', t('申请限额免费 GanJiang API，用于上述学术项目；具体额度与使用期限以审核结果为准。'));
    } else {
      section('关于你的软件');
      for (const [name, key] of [['软件名称 *','software'],['软件版本 *','softwareVersion'],['软件主页 / 仓库 / 演示链接','softwareUrl'],['软件简介 *','summary']]) entry(name, val(key));
      section('授权与接入');
      entry('软件授权方式 *', t(closed ? '闭源软件' : '开源软件'));
      entry('许可证 / 授权条件 *', val('licenseTerms'));
      entry('计划接入方式 *', selected('integration'));
      entry('期望的合作方式 *', selected('collaboration'));
      if (closed) entry('保密安排', t(field('nda').checked ? '希望先沟通保密安排，再提供未公开技术材料。' : '未提出'));
      section('DeltaXRDbench 评测');
      entry('评测基准', benchmark);
      entry('评测任务 *', selected('track'));
      for (const [name,key] of [['基准版本 / Commit *','benchmarkVersion'],['数据集、版本与评测范围 *','dataset'],['主要评测结果 *','metrics'],['评测设置与复现说明 *','reproduction']]) entry(name,val(key));
      entry('评测报告提供方式 *', t(attachment ? '邮件附件' : '报告链接'));
      if (attachment) rows.push(t('评测报告将作为邮件附件提供。'));
      else entry('评测报告链接 *', val('reportUrl'));
    }
    section('合作想法');
    entry('补充说明', val('notes'));
    entry('申报确认', t('我有权提交上述申报材料，并愿意就评估与合作接受邮件联系。'));
    const title = val(academic ? 'projectTitle' : 'software');
    const subject = `[${t(academic ? '干将学术项目合作申报' : '干将生态合作申报')}] ${title} · ${val('contactName')}`.replace(/[\r\n]+/g, ' ');
    const body = rows.join('\n');
    const prefix = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=`;
    const long = (prefix + encodeURIComponent(body)).length > 6000;
    const shortBody = [t('曹斌博士您好，以下是我的干将生态合作申报材料。'), '', `${label('申报类型 *')}: ${t(academic ? '学术项目合作' : '软件生态共建')}`, `${label(academic ? '项目名称 *' : '软件名称 *')}: ${title}`, `${label('联系人姓名 *')}: ${val('contactName')}`, `${label('联系邮箱 *')}: ${val('email')}`, '', t('完整申报材料见附件，请查收。'), attachment ? t('请同时附上评测报告和复现材料。') : ''].join('\n');
    return { subject, body, long, attachment, mailto: prefix + encodeURIComponent(long ? shortBody : body) };
  }

  function renderApplication() {
    application = buildApplication();
    byId('application-subject').value = application.subject;
    byId('application-body').value = application.body;
    byId('open-application-email').href = application.mailto;
    byId('delivery-note').textContent = t(application.long ? '内容较长，请先下载申报材料，并手动添加为邮件附件；邮件中会预填简要信息。' : '邮件将预填申报内容；如邮件客户端无法打开，可下载或复制材料后自行发送。') + (application.attachment ? ' ' + t('请同时附上评测报告和复现材料。') : '');
    preview.hidden = false;
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    validateFields();
    if (!form.reportValidity()) return;
    renderApplication();
    status.textContent = t('材料已生成，请检查后在邮件客户端中发送。');
    byId('preview-title').focus({preventScroll:true});
    preview.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block:'start'});
  });
  function invalidatePreview() {
    updateConditionalFields();
    validateFields();
    if (application) {
      application = undefined; preview.hidden = true;
      byId('open-application-email').removeAttribute('href');
      status.textContent = t('表单已修改，请重新生成申报材料。');
    }
  }
  form.addEventListener('input', invalidatePreview);
  form.addEventListener('change', invalidatePreview);
  document.querySelectorAll('[data-application-type]').forEach(link => {
    link.addEventListener('click', () => {
      field('applicationType').value = link.dataset.applicationType;
      invalidatePreview();
    });
  });
  byId('copy-application').addEventListener('click', async () => {
    if (!application) return;
    try {
      await navigator.clipboard.writeText(application.subject + '\n\n' + application.body);
      status.textContent = t('申报内容已复制，请粘贴到邮件中并检查附件。');
    } catch (_) {
      byId('application-body').focus(); byId('application-body').select();
      status.textContent = t('无法自动复制，已选中申报内容，请使用系统复制快捷键。');
    }
  });
  byId('download-application').addEventListener('click', () => {
    if (!application) return;
    const file = new Blob(['\uFEFF', `To: ${recipient}\nSubject: ${application.subject}\n\n${application.body}\n`], {type:'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    const academic = field('applicationType').value === 'academic';
    const name = field(academic ? 'projectTitle' : 'software').value.replace(/[^\p{L}\p{N}_-]+/gu, '-').slice(0, 60) || (academic ? 'research' : 'software');
    link.href = url; link.download = `GanJiang-collaboration-${name}.txt`; document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    status.textContent = t('申报材料已导出，请将文件附在发给曹斌博士的邮件中。');
  });
  window.addEventListener('ganjiang:languagechange', () => {
    updateMenu(); updateConditionalFields(); validateFields();
    status.textContent = '';
    if (application) renderApplication();
  });
  byId('application-fields').disabled = false;
  updateMenu(); updateConditionalFields();
})();
