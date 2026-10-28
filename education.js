/* Shared education copy and email application. No application data is submitted here. */
(() => {
  const root = document.documentElement;
  const isPage = document.body.classList.contains('education-page');
  const recipient = 'ganjiang@yzailab.com';
  const nodes = [...document.querySelectorAll('[data-education-copy]')];
  const chinese = Object.fromEntries(nodes.map(node => [node.dataset.educationCopy, node.innerHTML]));
  const english = {
    navEducation: 'Education Support',
    homeEyebrow: 'FOR DEPARTMENTS AND INSTITUTIONAL UNITS',
    homeTitle: 'GanJiang Education<br /><em>Support Program</em>',
    homeIntro: 'Bring GanJiang into real teaching and research. Schools, departments and other second-level units within universities and research institutions can apply for free access for a limited period.',
    homeCta: 'Explore the program & apply',
    noCharge: 'Access ends automatically at expiry and account credits reset to zero. No automatic paid renewal.',
    offerTitle: 'More room for teaching and research',
    peopleLabel: 'Per approved unit, up to', peopleUnit: 'users', periodLabel: 'From activation', monthUnit: 'months',
    quotaNote: 'User count, designated features and usage quotas are subject to approval. Free access does not mean unlimited usage.',
    skip: 'Skip to content', backHome: 'Back to website', planNav: 'The program', applyNav: 'Apply',
    collaborateNav: 'Collaborate', downloadNav: 'Download', contactNav: 'Contact us',
    launch: 'INTRODUCING THE GANJIANG EDUCATION SUPPORT PROGRAM',
    heroTitle: 'More possibilities<br /><em>for learning & research</em>',
    heroLead: 'For the classroom. For every thoughtful exploration.',
    heroIntro: 'To support teaching, researcher training and academic research, GanJiang offers eligible schools, departments and other second-level units within universities and research institutions free access for a limited period. We want more teachers, researchers and students to explore better ways of learning and working in real settings.',
    applyCta: 'Apply for education support', readPlan: 'Read the program details',
    planTitle: 'About the support',
    planIntro: 'Only applications submitted by departments or second-level institutional units are accepted, based on real teaching and research needs.',
    whoTitle: 'Who can apply',
    whoBody: 'Only schools, departments or other second-level units within universities and research institutions may apply, through their head or an authorized teacher or researcher. Applications from research groups, laboratories or individuals are not accepted. The applicant manages approved accounts and users and ensures use stays within the program’s scope.',
    supportTitle: 'What is included',
    supportBody: 'Approved units receive free access for up to 50 users for three months from activation, covering designated features and usage quotas. The user count depends on actual needs. Approved features, quotas and start and end dates will be confirmed after review.',
    useTitle: 'Supported uses',
    useBody: 'The program supports non-commercial education and research, including courses, student training, academic research and research practice. Eligibility and accounts are for authorized users of the approved unit only. They may not be resold, transferred or used to provide commercial services to others. Any violation may result in immediate termination of support by the GanJiang team.',
    publicityTitle: 'Sharing the collaboration',
    publicityBody: 'We will publicize collaborations with participating units and share teaching and research use cases. We will confirm the institutional information and case content with the applicant unit before publication, helping others understand how GanJiang is used in practice.',
    endTitle: 'Expiry, renewal and termination',
    endBody: 'Free access ends automatically and does not convert to a paid service. Units with continuing needs may request a renewal before expiry. Renewal and the scope of support depend on usage and available resources.',
    creditExpiry: 'When support expires or ends early, all credits in the supported accounts will be reset to zero.',
    termination: 'The GanJiang team may terminate the program or support for an individual unit at any time, depending on the circumstances.',
    applyTitle: 'Apply as an institutional unit',
    applyIntro: 'Email your application to the team. We review applications in batches, considering the intended use, institutional needs and available resources, and reply using the contact details you provide.',
    welcome: 'We welcome eligible departments and second-level institutional units, and value your suggestions as we improve GanJiang’s education support.',
    prepareTitle: 'Tell us about',
    infoOrg: 'Your university or research institution, and the applicant department or second-level unit',
    infoContact: 'The head or authorized contact’s name, role and institutional email',
    infoPurpose: 'Your intended use and support needs',
    infoSize: 'Expected user count and usage period',
    emailCta: 'Apply by email', copyTemplate: 'Copy application template',
    mailNote: 'The email link opens your email app. Fill in your details and send the application yourself.',
    showTemplate: 'View the application template', templateLabel: 'Email application template to copy',
    teamName: 'The GanJiang team', footerTagline: 'Clearer decisions in materials research.'
  };
  const template = document.querySelector('#education-template');
  const chineseTemplate = template?.value;
  const englishTemplate = `Dear GanJiang team, I would like to apply for the Education Support Program.

University or research institution:
Applicant department or second-level unit:
Head or authorized contact’s name:
Role:
Institutional email:
Intended use (teaching / academic research / research training, etc.):
Support needs (features, estimated usage, etc.):
Expected user count (up to 50):
Preferred activation date and usage plan (three months of support):

I am authorized to apply on behalf of the above department or second-level unit, have read the program details, will manage approved accounts and users, and can be contacted about this application and use of the service.`;
  const status = document.querySelector('#education-copy-status');
  const toggle = document.querySelector('.language-toggle');
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');
  const isEnglish = () => root.lang === 'en';

  function updateMenu() {
    const open = menu?.getAttribute('aria-expanded') === 'true';
    if (!menu) return;
    menu.textContent = isEnglish() ? (open ? 'Close' : 'Menu') : (open ? '关闭' : '菜单');
    menu.setAttribute('aria-label', isEnglish() ? (open ? 'Close navigation' : 'Open navigation') : (open ? '关闭导航' : '打开导航'));
  }
  function translate() {
    const en = isEnglish();
    const copy = en ? english : chinese;
    nodes.forEach(node => { if (copy[node.dataset.educationCopy] !== undefined) node.innerHTML = copy[node.dataset.educationCopy]; });
    if (!isPage) return;
    const title = en ? 'GanJiang Education Support Program' : '干将教育支持计划 · GanJiang';
    const description = en
      ? 'Free access for eligible university and research departments or second-level institutional units: up to 50 users for three months. Features and quotas are subject to approval. Read the details and apply.'
      : '干将教育支持计划正式启动：面向高校与科研机构所属的院系或二级机构，提供最多50人、3个月的限期免费使用支持。了解申请条件、使用范围与申请方式。';
    document.title = title;
    document.querySelector('meta[name="description"]').content = description;
    document.querySelector('meta[property="og:title"]').content = title;
    document.querySelector('meta[property="og:description"]').content = description;
    document.querySelector('meta[property="og:locale"]').content = en ? 'en_US' : 'zh_CN';
    toggle.textContent = en ? '中文' : 'EN';
    toggle.setAttribute('aria-label', en ? '切换至中文' : 'Switch to English');
    updateMenu();
    template.value = en ? englishTemplate : chineseTemplate;
    const subject = en ? 'GanJiang Education Support Program application' : '干将教育支持计划申请';
    document.querySelector('[data-education-email]').href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(template.value)}`;
    status.textContent = '';
  }

  if (isPage) {
    let saved = 'en';
    try { saved = localStorage.getItem('gan-jiang-language') === 'zh' ? 'zh' : 'en'; } catch (_) { /* Use the shared default. */ }
    root.lang = saved === 'zh' ? 'zh-CN' : 'en';
    toggle.addEventListener('click', () => {
      const next = isEnglish() ? 'zh' : 'en';
      root.lang = next === 'zh' ? 'zh-CN' : 'en';
      try { localStorage.setItem('gan-jiang-language', next); } catch (_) { /* Switching does not require storage. */ }
    });
    const closeMenu = () => { nav.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); updateMenu(); };
    menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open); updateMenu(); });
    nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
    document.addEventListener('click', event => { if (!nav.contains(event.target) && !menu.contains(event.target)) closeMenu(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('is-open')) { closeMenu(); menu.focus(); } });
    matchMedia('(min-width: 801px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
    const copyButton = document.querySelector('#education-copy');
    copyButton.hidden = false;
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(template.value);
        status.textContent = isEnglish() ? 'Template copied. Paste it into your email and fill in your details.' : '申请模板已复制，请粘贴到邮件并填写信息。';
      } catch (_) {
        template.closest('details').open = true;
        template.focus(); template.select();
        status.textContent = isEnglish() ? 'The template is selected. Copy it manually and paste it into your email.' : '已选中模板，请手动复制并粘贴到邮件。';
      }
    });
  }
  new MutationObserver(translate).observe(root, {attributes:true, attributeFilter:['lang']});
  translate();
})();
