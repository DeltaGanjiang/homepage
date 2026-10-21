/* Shared navigation and copy for the research-first site layout. */
(() => {
  const copy={
    zh:{skip:'跳到主要内容',explore:'探索古埃及配方',try:'体验干将',researchLabel:'古埃及 × 现代材料科学',sample:'一份古埃及化妆粉',phases:'种矿物',caseLink:'从三千年前的眼妆，走进现代材料科学',proofLabel:'仅输入 XRD<br />单相 Top-1 准确率',compare:'查看基线对比',navCase:'研究案例',navPerformance:'性能表现',navApproach:'分析方法',navPaper:'论文',navFilm:'干将视频介绍',navTry:'体验干将',navDownload:'下载干将',navManual:'使用说明书',navCollaboration:'生态合作',collaborationTitle:'从软件共建到学术研究，一起拓展干将生态',collaborationIntro:'欢迎开源与闭源软件共建，也支持学术研究、测试与对比分析。提交研究 proposal，审核通过后可在获批额度内免费调用 GanJiang API。',collaborationLink:'了解合作与申报',backWebsite:'返回官网',footerCommunity:'用户社区',downloadTitle:'干将桌面客户端',downloadIntro:'物相识别、多相分解与结构精修，连接你的每一步分析。',downloadGift:'每个账户赠送 <strong>20,000</strong> 积分'},
    en:{skip:'Skip to content',explore:'Explore the Egyptian recipe',try:'Try Gan Jiang',researchLabel:'Ancient Egypt × Materials science',sample:'An ancient Egyptian cosmetic',phases:'mineral phases',caseLink:'From ancient eye make-up to materials science today',proofLabel:'XRD-only input<br />Single-phase Top-1 accuracy',compare:'Compare baselines',navCase:'Research',navPerformance:'Performance',navApproach:'Approach',navPaper:'Paper',navFilm:'Gan Jiang Video',navTry:'Try Gan Jiang',navDownload:'Download',navManual:'User manual',navCollaboration:'Collaborate',collaborationTitle:'Software and research, together with GanJiang',collaborationIntro:'Collaborate on open-source or proprietary software, or explore academic research, testing and comparative analysis. Submit a research proposal for review to receive free GanJiang API access within an approved quota.',collaborationLink:'Explore the collaboration program',backWebsite:'Back to website',footerCommunity:'Community',downloadTitle:'GanJiang for desktop',downloadIntro:'Phase identification, multiphase decomposition and structural refinement in one workspace.',downloadGift:'<strong>20,000</strong> complimentary credits per account'}
  };
  function translate(){
    const language=document.documentElement.lang==='en'?'en':'zh';
    const c=copy[language];
    document.querySelectorAll('[data-design-copy]').forEach(el=>el.innerHTML=c[el.dataset.designCopy]);
    document.querySelectorAll('[data-booklet-link]').forEach(link=>link.setAttribute('href',language==='en'?'booklet/en.html':'booklet/index.html'));
  }
  new MutationObserver(translate).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});translate();
  const nav=document.querySelector('.nav'),toggle=document.querySelector('.menu-toggle');
  const closeMenu=()=>{nav?.classList.remove('is-open');toggle?.setAttribute('aria-expanded','false');if(toggle)toggle.textContent=document.documentElement.lang==='en'?'Menu':'菜单';};
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav?.classList.contains('is-open')){closeMenu();toggle?.focus();}});
  document.addEventListener('click',event=>{if(nav?.classList.contains('is-open')&&!nav.contains(event.target)&&!toggle?.contains(event.target))closeMenu();});
  matchMedia('(min-width: 801px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
  const links=[...(nav?.querySelectorAll('a[href^="#"]')||[])];
  const sectionLinks=new Map(links.map(link=>[document.querySelector(link.getAttribute('href')),link]).filter(([section])=>section));
  if(sectionLinks.size){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;links.forEach(link=>{if(link===sectionLinks.get(entry.target))link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});});},{rootMargin:'-12% 0px -50% 0px',threshold:0});sectionLinks.forEach((_,section)=>observer.observe(section));}
  let scheduled=false;
  const progress=document.querySelector('.reading-progress');
  function updateReading(){scheduled=false;if(!progress)return;const total=document.documentElement.scrollHeight-innerHeight;progress.style.setProperty('--read-progress',`${total>0?Math.min(100,scrollY/total*100):0}%`);}
  addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateReading);}},{passive:true});addEventListener('resize',updateReading,{passive:true});updateReading();
  function drawHeroData(){
    const target=document.querySelector('#hero-data-paths'),data=window.egyptData;
    if(!target||!data||target.hasChildNodes())return;
    const max=Math.max(...data.rows.map(r=>r[1])),svgNS='http://www.w3.org/2000/svg';
    const path=column=>data.rows.map((r,i)=>`${i?'L':'M'}${(35+(r[0]-5)/69.99*575).toFixed(1)},${(270-r[column]/max*220).toFixed(1)}`).join('');
    data.phases.forEach((phase,i)=>{const line=document.createElementNS(svgNS,'path');line.setAttribute('d',path(i+4));line.setAttribute('fill','none');line.setAttribute('stroke',phase.color);line.setAttribute('stroke-width','1');line.setAttribute('opacity','.55');target.append(line);});
    const observed=document.createElementNS(svgNS,'path');observed.setAttribute('d',path(1));observed.setAttribute('fill','none');observed.setAttribute('stroke','#dce6fa');observed.setAttribute('stroke-width','.85');observed.setAttribute('opacity','.85');target.append(observed);
  }
  window.addEventListener('egyptdataready',drawHeroData,{once:true});
  drawHeroData();
})();
