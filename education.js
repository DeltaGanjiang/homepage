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
    notice: 'FOR UNIVERSITY AND RESEARCH DEPARTMENTS OR SECOND-LEVEL UNITS',
    eligibilityLink: 'Check eligibility',
    peopleNote: 'User count based on actual needs',
    periodNote: 'Starts when accounts are activated',
    accessLabel: 'Designated features and usage quotas',
    freeAccess: 'Free',
    accessNote: 'For approved, non-commercial teaching and research.',
    eligibleLabel: 'ELIGIBLE', eligibleTitle: 'Departments & institutional units',
    eligibleText: 'Within universities and research institutions',
    ineligibleLabel: 'NOT ELIGIBLE', ineligibleTitle: 'Research groups, labs or individuals',
    ineligibleText: 'Please apply through your department or second-level unit',
    applyUnit: 'One application from your institutional unit',
    stepPrepare: 'Send application details', stepReview: 'Receive a review outcome', stepActivate: 'Activate approved access',
    launch: 'GanJiang EDUCATION SUPPORT · NOW OPEN',
    pageTitle: 'GanJiang Education Support Program',
    heroIntro: 'Free access for a limited time for departments and second-level units within universities and research institutions, supporting teaching, researcher training and academic research.',
    applyCta: 'Apply for education support', readPlan: 'Read the program details',
    partnersTitle: 'Agreed intent to collaborate',
    partnerHkustGz: 'The Hong Kong University of Science and Technology (Guangzhou)',
    partnerShu: 'Shanghai University',
    partnerDetails: 'View details',
    mcpfStoryTitle: 'HKUST(GZ) MCPF and the Institute of General Decision Intelligence agree on an intent to collaborate',
    mcpfStoryIntro: 'The Materials Characterization and Preparation Facility (MCPF) at the Hong Kong University of Science and Technology (Guangzhou) and the Institute of General Decision Intelligence have agreed on an intent to collaborate. Through the GanJiang Education Support Program, they plan to provide teachers and students with free access for a limited period to GanJiang, a scientific agent for powder X-ray diffraction (PXRD) analysis, for diffraction pattern interpretation, data analysis exercises and research training.',
    mcpfFacilityTitle: 'Addressing data analysis needs in materials characterization',
    mcpfFacilityIntro: 'The <a href="https://mcpf.hkust-gz.edu.cn">Materials Characterization and Preparation Facility (MCPF)</a> is a central research facility at HKUST(GZ) dedicated to advanced materials synthesis and characterization. With approximately 2,500 square meters of purpose-built laboratory space, it provides teachers and students with materials testing, analysis and related technical support. Its X-ray analysis equipment includes high-throughput powder, multifunctional and benchtop powder X-ray diffractometers to support a range of research needs.',
    mcpfAnalysisNeeds: 'After collecting a diffraction pattern, teachers and students working with PXRD still need to identify phases, analyze multiphase compositions and check whether structural models agree with experimental data. The proposed collaboration will provide access to GanJiang so they can practice analyzing their experimental data with a research agent and learn to understand the evidence and results it presents.',
    mcpfPhotoCaption: 'Materials Characterization and Preparation Facility (MCPF)',
    mcpfPracticeTitle: 'Using GanJiang for diffraction pattern interpretation and research training',
    mcpfAgentIntro: '<a href="https://ganjiang.asia">GanJiang</a> is a scientific agent for PXRD analysis, developed by a team led by Dr. Bin Cao at the Institute of General Decision Intelligence. It combines materials science knowledge, specialist algorithms and AI across phase identification, multiphase decomposition and structure refinement, helping users check the supporting evidence and review analysis results.',
    mcpfPracticeExample: 'Starting with an experimental diffraction pattern, teachers and students can use GanJiang for phase identification and multiphase analysis, then discuss the candidate phases and fitting results. For a sample that may contain multiple phases, for example, they can compare different candidate phase combinations and their fits, using sample information and experimental conditions to judge which interpretation has stronger support. Where conclusions remain uncertain, they can identify the information that needs further checking.',
    mcpfStudentTraining: 'Students learning diffraction analysis can use GanJiang as an aid in data interpretation exercises. By reviewing analysis steps, comparing approaches and explaining their reasoning, they can develop an understanding of the relationships between phase identification, multiphase analysis and structure refinement. Teachers can use specific diffraction patterns to discuss whether tool outputs agree with experimental information and help students learn to review analysis results.',
    mcpfResearchReview: 'For teachers and students with existing research projects, GanJiang can assist with interpreting diffraction data and provide a reference for analysis. Its outputs still require review against sample information, experimental conditions and professional judgment; conclusions must be checked against the relevant data and evidence.',
    mcpfSupportTitle: 'Free access through the Education Support Program',
    mcpfSupportIntro: 'The proposed support focuses on practical use of GanJiang, allowing teachers and students to practice analysis and research skills with their own diffraction data within the approved access period and usage quotas. Eligible units approved under the GanJiang Education Support Program can receive:',
    mcpfSupportPeople: '<strong>Users:</strong> Up to 50 users per approved unit, with the number determined by actual needs.',
    mcpfSupportPeriod: '<strong>Free access period:</strong> Three months from account activation, covering designated features and the corresponding usage quotas.',
    mcpfSupportUses: '<strong>Applications:</strong> Non-commercial education and research, including course teaching, student training, academic research and research practice.',
    mcpfSupportTerms: 'The supported users, account activation, features, usage quotas and start and end dates will be confirmed based on actual needs and the review outcome. Free access ends automatically and does not convert to a paid service. Renewals require a separate application under the program rules.',
    shuStoryTitle: 'Shanghai University MGI and the Institute of General Decision Intelligence at the Yangtze River Delta National Innovation Center explore research agents for materials education',
    shuStoryIntro: 'The Materials Genome Institute (MGI) at Shanghai University and the Institute of General Decision Intelligence at the Yangtze River Delta National Innovation Center have agreed on an intent to collaborate. Through Shanghai University’s graduate course “AI Agents and Research Practice,” they plan to introduce GanJiang, a scientific agent for powder X-ray diffraction analysis, into teaching and research training. The GanJiang Education Support Program will provide free access for teachers and students as the two institutions explore closer integration of AI and materials science education.',
    shuStoryContext: 'The collaboration is a further step in Shanghai University’s interdisciplinary “AI + Materials” education and a practical effort to bring advanced research agents into university classrooms to support researcher training.',
    shuCourseTitle: 'Bringing research agents into the classroom',
    shuCourseIntro: '“AI Agents and Research Practice” is a graduate course jointly developed by Shanghai University and Shanghai Artificial Intelligence Laboratory (Pujiang Laboratory). Drawing on the Shusheng series of Chinese-developed large models, the “Shusheng · Duanyan” scientific discovery platform, and Shanghai University’s research in AI for materials science, the course combines lectures with hands-on practice to help students use AI to solve real research problems.',
    shuCourseTeaching: 'The opening lecture is delivered by Zhang Tongyi, a member of the Chinese Academy of Sciences and director of Shanghai University’s Materials Genome Institute. Assistant Researcher Xiong Jie and other instructors at Shanghai University teach large language models, research agents, tool calling, skill development and multi-agent collaboration through lectures and practical training. The course plans to introduce the Institute of General Decision Intelligence’s <a href="https://ganjiang.asia">GanJiang XRD research agent</a> into materials characterization teaching, helping students understand how AI and specialist algorithms work together in real research tasks.',
    shuPhotoCaption: 'Course guest and CAS academician Zhang Tongyi lectures to students',
    shuXrdTitle: 'Combining materials expertise and AI for XRD analysis',
    shuXrdIntro: 'GanJiang is a scientific agent developed by a team led by Dr. Bin Cao at the Institute of General Decision Intelligence. Designed for practical powder X-ray diffraction (PXRD) analysis, it combines materials science knowledge, specialist analysis algorithms and AI to support phase identification, multiphase decomposition, structure refinement and verification of analysis results.',
    shuXrdPractice: 'The two institutions plan to use real experimental XRD data for case-based teaching and research training. Students will use GanJiang to analyze diffraction patterns, identify candidate phases and compare structure refinement results, then assess the agent’s reasoning and the reliability of its results using experimental conditions and materials science knowledge. Agent evaluation and integrated practical assignments will encourage students to formulate scientific questions, design analysis tasks and check tool outputs, developing an understanding of research agents’ limitations and the ability to apply AI alongside domain expertise.',
    shuSupportTitle: 'Free research tools through the Education Support Program',
    shuSupportIntro: 'The two institutions plan to provide free access through the GanJiang Education Support Program for “AI Agents and Research Practice” and related academic training activities, connecting classroom learning with independent practice and research training. Under the program, Shanghai University teachers and students participating in the course will receive the following support:',
    shuSupportPeople: '<strong>Users:</strong> Up to 50 places, based on the actual needs of course teaching and research training.',
    shuSupportPeriod: '<strong>Free access period:</strong> Three months from account activation, covering designated features and the corresponding usage quotas.',
    shuSupportUses: '<strong>Applications:</strong> XRD data analysis, materials characterization, course practice and related academic research, helping students combine domain knowledge with AI.',
    shuOutlook: 'The collaboration expands the teaching resources and practical opportunities available in Shanghai University’s “AI Agents and Research Practice” course, bringing advances in research agents into graduate education. Shanghai University’s Materials Genome Institute and the Institute of General Decision Intelligence at the Yangtze River Delta National Innovation Center will deepen their collaboration through teaching and real materials characterization tasks. They will explore research agents in materials analysis, research training and talent development, use student feedback to improve the technology, and bring AI, materials science research and graduate education closer together to develop researchers with AI literacy and interdisciplinary capabilities.',
    planTitle: 'Program details',
    planIntro: 'Only applications submitted by departments or second-level institutional units are accepted, based on real teaching and research needs.',
    whoTitle: 'Who can apply',
    whoBody: 'Applications must be submitted by the head of the unit or an authorized teacher or researcher. The applicant manages approved accounts and users and ensures use stays within the program’s scope.',
    supportTitle: 'What is included',
    supportBody: 'Approved units receive free access for up to 50 users for three months from activation, covering designated features and usage quotas. The user count depends on actual needs. Approved features, quotas and start and end dates will be confirmed after review.',
    useTitle: 'Supported uses',
    useBody: 'The program supports non-commercial education and research, including courses, student training, academic research and research practice. Eligibility and accounts are for authorized users of the approved unit only. They may not be resold, transferred or used to provide commercial services to others. Any violation may result in immediate termination of support by the GanJiang team.',
    publicityTitle: 'Collaboration publicity',
    publicityBody: 'We will publicize collaborations with participating units and share teaching and research use cases. We will confirm the institutional information and case content with the applicant unit before publication, helping others understand how GanJiang is used in practice.',
    endTitle: 'Expiry, renewal and termination',
    endBody: 'Free access ends automatically and does not convert to a paid service. Units with continuing needs may request a renewal before expiry. Renewal and the scope of support depend on usage and available resources.',
    creditExpiry: 'When support expires or ends early, all credits in the supported accounts will be reset to zero.',
    termination: 'The GanJiang team may terminate the program or support for an individual unit at any time, depending on the circumstances.',
    applyTitle: 'Apply for education support',
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

  function setupMotion() {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches || !('IntersectionObserver' in window)) return;
    const sections = [...document.querySelectorAll('.edu-benefits, .edu-term-card, .edu-apply > .edu-section-intro, .edu-application')];
    const counters = [...document.querySelectorAll('[data-edu-count]')];
    const frames = new Map();
    let counted = false;
    const countUp = () => {
      if (counted) return;
      counted = true;
      counters.forEach(node => {
        const total = Number(node.dataset.eduCount);
        const start = performance.now();
        const tick = now => {
          const progress = Math.min((now - start) / 900, 1);
          node.textContent = String(Math.round(total * (1 - (1 - progress) ** 3)));
          if (progress < 1) frames.set(node, requestAnimationFrame(tick));
          else frames.delete(node);
        };
        frames.set(node, requestAnimationFrame(tick));
      });
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        if (entry.target.classList.contains('edu-benefits')) countUp();
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    sections.forEach(section => { section.classList.add('edu-motion-ready'); observer.observe(section); });
    preference.addEventListener('change', event => {
      if (!event.matches) return;
      observer.disconnect();
      sections.forEach(section => section.classList.add('is-visible'));
      frames.forEach(frame => cancelAnimationFrame(frame));
      frames.clear();
      counters.forEach(node => { node.textContent = node.dataset.eduCount; });
    });
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
  if (isPage) setupMotion();
})();
