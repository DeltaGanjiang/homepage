const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav'),languageToggle=document.querySelector('.language-toggle');
const tidyTitles=()=>document.querySelectorAll("h1,h2").forEach(title=>{title.innerHTML=title.innerHTML.replace(/[。.](?=(?:<[^>]+>)*\s*$)/u,"")});setTimeout(tidyTitles,0);languageToggle?.addEventListener("click",()=>setTimeout(tidyTitles,0));
const english={navWhat:'What it is',navCanDo:'What it does',navBeta:'Download and try',heroEyebrow:'For powder X-ray diffraction',heroTitle:'Turn diffraction analysis<br>into reliable <em>scientific judgement.</em>',heroText:'Gan Jiang is an evolving science agent for PXRD. It learns from reviewable analysis and expert feedback, helping researchers read patterns, test structural hypotheses, and move toward expert-level scientific judgement.',heroPrimary:'See what it can do <span>↓</span>',panelKicker:'In one sentence',panelStatement:'It connects diffraction data, domain knowledge, and validation into an explainable path that accumulates knowledge and evolves.',signalOne:'It does not guess the answer for you; it helps test the answer.',signalTwo:'It does not only report results; it retains the reasoning behind them.',whatEyebrow:'What it is',whatTitle:'A research partner that understands diffraction—and values evidence.',whatText:'Powder diffraction often means weighing complex signals, experimental context, and several plausible structures. Gan Jiang organizes that work: it understands the input, proposes testable paths, compares evidence, and leaves the process open for your review.',whatNote:'It supports researchers’ judgement. It does not replace it.',canDoEyebrow:'What it can do',canDoTitle:'Start with a pattern. Move research forward.',capOneTitle:'Find plausible phases',capOneText:'Identify phase signals worth testing in complex patterns, and make the match evidence visible.',capTwoTitle:'Untangle complex signals',capTwoText:'For multiphase samples, overlapping peaks, or complex compositions, organize suitable decomposition and modeling paths.',capThreeTitle:'Test structural hypotheses',capThreeText:'Compare candidate structures against measured data and locate what needs adjustment or further experiment.',capFourTitle:'Follow change through experiments',capFourText:'Place sequential measurements on a shared analytical thread to observe evolving phases, structures, and trends.',capFiveTitle:'State the limits of a conclusion',capFiveText:'Show supporting and conflicting evidence, uncertainty, and open checks so results can be discussed and reviewed.',betaEyebrow:'Download and try',betaTitle:'Free access for group members, now open.',betaText:'Gan Jiang is currently in beta and is freely available to members of this group. Access is limited to group members; teachers and students with relevant needs are welcome to join.',betaFootnote:'Scan the QR code to join the user group and receive access information.',groupCaption:'Gan Jiang user group',whyEyebrow:'Why it matters',whyTitle:'Good analysis is more than a single fit.',whyText:'Gan Jiang cares not only whether the numbers improve, but whether a conclusion is reasonable, reviewable, and useful for deciding what to do next. Each confirmed analysis and expert correction becomes material for further evolution.',principleOne:'Every suggestion should trace back to a pattern, model, or experimental condition.',principleTwo:'Important conclusions are checked through complementary methods—not a single metric.',principleThree:'Confirmed experience becomes reusable analytical capability for the next study.',principleOneLabel:'Evidence first',principleTwoLabel:'Multi-path validation',principleThreeLabel:'Continuous accumulation',outcomeIntro:'From one analysis to continuously evolving, expert-level research capability.',outcomeOne:'Locate faster',outcomeOneText:'The next direction worth testing',outcomeTwo:'Explain clearly',outcomeTwoText:'The evidence and uncertainty behind a conclusion',outcomeThree:'Evolve continuously',outcomeThreeText:'Analytical capability shaped by expert feedback',footerTagline:'Make materials research easier to reason about.',backToTop:'Back to top ↑'};
Object.assign(english,{navNews:'News',newsEyebrow:'Media coverage',newsTitle:'News & Press',newsIntro:'Coverage from the media and industry, documenting Gan Jiang’s practice and progress in materials research.',newsSourceCns:'China News Service',newsSourceCzec:'Changzhou Science and Education Town',newsOneTitle:'Changzhou AI Developer Community’s inaugural event explores industrial AI needs from the bottom up',newsOneText:'The report covers the first Changzhou AI Developer Community event and Bin Cao’s presentation, “Gan Jiang — AI for Materials in Research Practice,” demonstrating agent applications in materials research.',newsTwoTitle:'AI Agent Application Development in Practice | Inaugural Salon Opens on September 16',newsTwoText:'Changzhou Science and Education Town previews the first salon at AI Lab, The Yangtze River Delta, covering personal AI assistants, cloud infrastructure, and practical Agent deployment.',newsRead:'Read the story <i aria-hidden="true">↗</i>'});
Object.assign(english,{navHome:'Home',navTeam:'Team',backHome:'Back to home ←',teamEyebrow:'Gan Jiang Project Team',teamOrg:'AI Lab, The Yangtze River Delta',teamSalesConsultation:'Sales Enquiries',teamTitle:'The Gan Jiang XRD Development Team',teamIntroPrefix:'Based at ',teamIntroSuffix:', the team brings together researchers from industry labs and universities to collaborate across materials science, artificial intelligence, and engineering.',teamIntroMission:'Together, we are advancing intelligent materials characterization and building the ',teamIntroHighlight:'first science agent for XRD-based materials structure analysis',teamIntroEnd:'.',teamLead:'Project Lead',teamLeadRole:'Leads the Gan Jiang project',teamCore:'Core Contributors',teamTechnical:'Technical Support',teamRecord:'Operations & Sales',teamRecordRole:'Project Documentation · Xiaohongshu Operations',teamSalesRole:'Sales Lead',teamXiaohongshu:'Xiaohongshu ID',teamAdvisors:'Academic Advisors',advisorRole:'Academic Advisor',teamContact:'Project Contact',teamContactTitle:'Sales & Market Enquiries',teamChinaMarket:'China Market',teamOverseasMarket:'Overseas Market',teamNaName:'Na Wang',teamWenhanName:'Wenhan Gu',viewProfile:'Profile',orgBin:"Huawei Noah’s Ark Lab, London · HKUST(GZ)",orgHkust:'HKUST(GZ)',orgUcl:'UCL'});
Object.assign(english,{orbTitle:'Gan Jiang',orbSubtitle:'A science agent for powder X-ray diffraction',orbTitleTwo:'Patterns',orbSubtitleTwo:'From raw diffraction data to testable structural hypotheses',orbTitleThree:'Decisions',orbSubtitleThree:'Keep evidence, uncertainty, and the next step connected',orbCta:'Enter the site <span aria-hidden="true">↓</span>'});
const chinese=Object.fromEntries([...document.querySelectorAll('[data-i18n]')].map(n=>[n.dataset.i18n,n.innerHTML]));const isTeamPage=document.body.classList.contains('team-page');const metadata=isTeamPage?{zh:{lang:'zh-CN',locale:'zh_CN',title:'项目团队 — 干将',description:'干将 XRD 项目开发团队依托通用决策智能研究所，推动材料表征智能化发展。',socialDescription:'汇聚产业研究机构与高校力量，共同打造面向 XRD 材料结构分析的科学智能体。'},en:{lang:'en',locale:'en_US',title:'Team — Gan Jiang',description:'Meet the Gan Jiang XRD development team at AI Lab, The Yangtze River Delta.',socialDescription:'Researchers from industry labs and universities building a science agent for XRD-based materials structure analysis.'}}:{zh:{lang:'zh-CN',locale:'zh_CN',title:'干将 — X 射线衍射科学智能体',description:'干将是面向粉末 X 射线衍射的科学智能体：把图谱分析变成可追溯的研究判断。',socialDescription:'把复杂图谱转化为可验证的结构结论，推动材料表征智能化。'},en:{lang:'en',locale:'en_US',title:'Gan Jiang — Science Agent for X-ray Diffraction',description:'Gan Jiang is a science agent for PXRD that turns pattern analysis into traceable scientific judgement.',socialDescription:'Turning complex diffraction patterns into verifiable structural conclusions for intelligent materials characterization.'}};
function setLanguage(language){const copy=language==='en'?english:chinese,pageMeta=metadata[language];document.querySelectorAll('[data-i18n]').forEach(n=>n.innerHTML=copy[n.dataset.i18n]);document.documentElement.lang=pageMeta.lang;document.title=pageMeta.title;document.querySelector('meta[name="description"]').setAttribute('content',pageMeta.description);document.querySelector('meta[property="og:locale"]')?.setAttribute('content',pageMeta.locale);document.querySelectorAll('meta[property="og:title"],meta[name="twitter:title"]').forEach(meta=>meta.setAttribute('content',pageMeta.title));document.querySelectorAll('meta[property="og:description"],meta[name="twitter:description"]').forEach(meta=>meta.setAttribute('content',pageMeta.socialDescription));languageToggle.textContent=language==='en'?'中文':'EN';languageToggle.setAttribute('aria-label',language==='en'?'切换至中文':'Switch to English');menu.setAttribute('aria-label',language==='en'?'Open navigation':'打开导航');if(!nav.classList.contains('is-open'))menu.textContent=language==='en'?'Menu':'菜单';localStorage.setItem('gan-jiang-language',language)}
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');menu.setAttribute('aria-expanded',String(open));const en=document.documentElement.lang==='en';menu.textContent=open?(en?'Close':'关闭'):(en?'Menu':'菜单')});nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');menu?.setAttribute('aria-expanded','false');menu.textContent=document.documentElement.lang==='en'?'Menu':'菜单'}));languageToggle?.addEventListener('click',()=>setLanguage(document.documentElement.lang==='en'?'zh':'en'));const savedLanguage=localStorage.getItem('gan-jiang-language');setLanguage(savedLanguage==='zh'?'zh':'en');

const revealObserver = new IntersectionObserver((entries) => entries.forEach(({ isIntersecting, target }) => { if (isIntersecting) { target.classList.add("is-visible"); revealObserver.unobserve(target); } }), { threshold: 0.14 });
document.querySelectorAll("[data-reveal]").forEach((section) => revealObserver.observe(section));

const xhsSearch="https://www.xiaohongshu.com/search_result?keyword=95614037352";document.querySelectorAll(".xiaohongshu-link").forEach(el=>{el.setAttribute("role","link");el.setAttribute("tabindex","0");el.addEventListener("click",()=>open(xhsSearch,"_blank","noopener"));el.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open(xhsSearch,"_blank","noopener");}});});

const orbCanvas=document.querySelector("#orb-canvas");
if(orbCanvas){
  const gl=orbCanvas.getContext("webgl",{alpha:true,antialias:false,premultipliedAlpha:false,powerPreference:"high-performance"});
  if(gl){
    const vertexSource=`
      attribute vec2 a_position;
      void main(){gl_Position=vec4(a_position,0.0,1.0);}
    `;
    const fragmentSource=`
      precision highp float;
      uniform vec2 u_resolution;
      uniform vec2 u_pointer;
      uniform float u_time;
      uniform float u_hover;

      float hash(vec2 p){
        p=fract(p*vec2(123.34,456.21));
        p+=dot(p,p+45.32);
        return fract(p.x*p.y);
      }

      float noise(vec2 p){
        vec2 i=floor(p);
        vec2 f=fract(p);
        f=f*f*(3.0-2.0*f);
        return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),f.x),mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0)),f.x),f.y);
      }

      float fbm(vec2 p){
        float value=0.0;
        float amplitude=0.5;
        mat2 turn=mat2(0.80,-0.60,0.60,0.80);
        for(int i=0;i<5;i++){
          value+=amplitude*noise(p);
          p=turn*p*2.03+13.7;
          amplitude*=0.5;
        }
        return value;
      }

      void main(){
        vec2 frag=gl_FragCoord.xy;
        vec2 uv=(frag-0.5*u_resolution.xy)/min(u_resolution.x,u_resolution.y);
        vec2 pointer=(u_pointer-0.5)*vec2(u_resolution.x/u_resolution.y,1.0);
        float angle=atan(uv.y,uv.x);
        float radius=length(uv);
        float aspect=u_resolution.x/u_resolution.y;
        float orbRadius=mix(0.485,0.455,smoothstep(0.72,1.0,aspect));
        float pixel=1.5/min(u_resolution.x,u_resolution.y);
        float disc=1.0-smoothstep(orbRadius-pixel,orbRadius+pixel,radius);
        float normalizedRadius=clamp(radius/orbRadius,0.0,1.0);
        float depth=sqrt(max(0.0,1.0-normalizedRadius*normalizedRadius));
        vec3 normal=normalize(vec3(uv/orbRadius,depth));

        // Cartesian noise keeps the field continuous across the polar angle boundary.
        float turn=u_time*0.11;
        mat2 flowRotation=mat2(cos(turn),-sin(turn),sin(turn),cos(turn));
        vec2 flowUv=flowRotation*(uv/orbRadius);
        float flow=fbm(flowUv*1.9+vec2(u_time*0.075,-u_time*0.095));
        float angularFade=smoothstep(0.12,0.38,normalizedRadius);
        float centerFlow=0.5+0.5*sin(flow*6.0-u_time*0.52);
        float ribbon=mix(centerFlow,0.5+0.5*sin(angle*2.0+flow*5.4-u_time*0.78),angularFade);
        float counterRibbon=mix(flow,0.5+0.5*cos(angle*3.0-flow*4.2+u_time*0.46),angularFade);
        float fineRibbon=pow(0.5+0.5*sin(angle*6.0-flow*8.0+u_time*1.12),7.0);
        float fresnel=pow(1.0-depth,2.45)*disc;
        float innerBand=exp(-pow((radius-(orbRadius-0.055))/0.075,2.0))*disc;
        float halo=exp(-abs(radius-orbRadius)*19.0);
        float hairline=1.0-smoothstep(pixel,5.0*pixel,abs(radius-orbRadius));

        vec2 restingLight=vec2(cos(u_time*0.43),sin(u_time*0.37))*0.58;
        vec2 pointerLight=clamp(pointer/orbRadius,vec2(-1.0),vec2(1.0));
        vec3 lightDirection=normalize(vec3(mix(restingLight,pointerLight,u_hover*0.78),0.82));
        float specular=pow(max(dot(normal,lightDirection),0.0),42.0)*disc;
        float secondary=pow(max(dot(normal,normalize(vec3(-lightDirection.xy,0.55))),0.0),18.0)*disc;
        float travelingLight=pow(max(0.0,cos(angle-u_time*0.92+flow*2.4)),24.0)*innerBand;
        float reverseLight=pow(max(0.0,cos(angle+u_time*0.58-counterRibbon*2.0)),30.0)*fresnel;

        vec3 deepBlue=vec3(0.035,0.12,0.58);
        vec3 electricBlue=vec3(0.10,0.48,1.0);
        vec3 violet=vec3(0.47,0.16,0.96);
        vec3 mint=vec3(0.32,1.0,0.79);
        vec3 color=mix(deepBlue,electricBlue,ribbon);
        color=mix(color,violet,0.28+0.34*counterRibbon);
        color=mix(color,mint,innerBand*(0.14+0.46*flow));
        color+=vec3(0.68,0.88,1.0)*specular*1.8;
        color+=mint*secondary*0.5;
        color+=vec3(0.78,0.94,1.0)*travelingLight*1.55;
        color+=violet*reverseLight*1.1;
        color+=vec3(0.72,0.82,1.0)*fineRibbon*innerBand*0.34;
        color*=0.78+0.58*flow+0.36*fresnel+0.08*sin(u_time*1.35);

        float glass=disc*(0.045+0.085*flow+0.13*ribbon+0.05*counterRibbon);
        float pulse=0.92+0.08*sin(u_time*1.35);
        float alpha=clamp((glass+fresnel*0.76+innerBand*0.29+halo*0.19+hairline*0.62+specular*0.38+travelingLight*0.22)*pulse,0.0,1.0);
        gl_FragColor=vec4(color*alpha,alpha);
      }
    `;
    const compile=(type,source)=>{const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){console.warn(gl.getShaderInfoLog(shader));gl.deleteShader(shader);return null}return shader};
    const vertexShader=compile(gl.VERTEX_SHADER,vertexSource),fragmentShader=compile(gl.FRAGMENT_SHADER,fragmentSource);
    if(vertexShader&&fragmentShader){
      const program=gl.createProgram();gl.attachShader(program,vertexShader);gl.attachShader(program,fragmentShader);gl.linkProgram(program);
      if(gl.getProgramParameter(program,gl.LINK_STATUS)){
        const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
        const position=gl.getAttribLocation(program,"a_position"),resolution=gl.getUniformLocation(program,"u_resolution"),pointer=gl.getUniformLocation(program,"u_pointer"),time=gl.getUniformLocation(program,"u_time"),hover=gl.getUniformLocation(program,"u_hover");
        gl.useProgram(program);gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);gl.clearColor(0,0,0,0);gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);
        let pointerTarget=[.5,.5],pointerCurrent=[.5,.5],hoverTarget=0,hoverCurrent=0,visible=true,frame=0;
        const reducedMotion=matchMedia("(prefers-reduced-motion: reduce)").matches;
        const resizeOrb=()=>{const rect=orbCanvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,1.75),width=Math.max(1,Math.round(rect.width*dpr)),height=Math.max(1,Math.round(rect.height*dpr));if(orbCanvas.width!==width||orbCanvas.height!==height){orbCanvas.width=width;orbCanvas.height=height;gl.viewport(0,0,width,height)}};
        const updatePointer=event=>{const rect=orbCanvas.getBoundingClientRect();pointerTarget=[(event.clientX-rect.left)/rect.width,1-(event.clientY-rect.top)/rect.height];hoverTarget=1};
        const leaveOrb=()=>{pointerTarget=[.5,.5];hoverTarget=0};
        const renderOrb=milliseconds=>{frame=0;resizeOrb();pointerCurrent[0]+=(pointerTarget[0]-pointerCurrent[0])*.075;pointerCurrent[1]+=(pointerTarget[1]-pointerCurrent[1])*.075;hoverCurrent+=(hoverTarget-hoverCurrent)*.07;gl.clear(gl.COLOR_BUFFER_BIT);gl.uniform2f(resolution,orbCanvas.width,orbCanvas.height);gl.uniform2f(pointer,pointerCurrent[0],pointerCurrent[1]);gl.uniform1f(time,reducedMotion?2.4:milliseconds*.001);gl.uniform1f(hover,hoverCurrent);gl.drawArrays(gl.TRIANGLES,0,3);if(visible&&!reducedMotion)frame=requestAnimationFrame(renderOrb)};
        const startOrb=()=>{if(!frame&&!reducedMotion)frame=requestAnimationFrame(renderOrb)};
        const stopOrb=()=>{if(frame){cancelAnimationFrame(frame);frame=0}};
        orbCanvas.addEventListener("pointermove",updatePointer);orbCanvas.addEventListener("pointerleave",leaveOrb);addEventListener("resize",resizeOrb,{passive:true});
        new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible){reducedMotion?renderOrb(2400):startOrb()}else stopOrb()},{threshold:.01}).observe(orbCanvas);
        resizeOrb();renderOrb(0);
      }else{console.warn(gl.getProgramInfoLog(program));orbCanvas.classList.add("is-fallback")}
    }else orbCanvas.classList.add("is-fallback");
  }else orbCanvas.classList.add("is-fallback");
}

const heroCanvas=document.querySelector("#hero-canvas");if(heroCanvas&&!matchMedia("(prefers-reduced-motion: reduce)").matches){const c=heroCanvas.getContext("2d"),hero=heroCanvas.parentElement;let points=[];function resizeHero(){const r=hero.getBoundingClientRect(),d=Math.min(devicePixelRatio,2);heroCanvas.width=r.width*d;heroCanvas.height=r.height*d;c.setTransform(d,0,0,d,0,0);points=Array.from({length:Math.max(22,Math.floor(r.width/48))},()=>({x:Math.random()*r.width,y:Math.random()*r.height,vx:(Math.random()-.5)*.16,vy:(Math.random()-.5)*.16,r:Math.random()*1.8+.6}));}function drawHero(){const w=hero.clientWidth,h=hero.clientHeight;c.clearRect(0,0,w,h);for(const p of points){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;}for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++){const a=points[i],b=points[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<150){c.globalAlpha=(1-d/150)*.24;c.strokeStyle=i%3?"#78a9ff":"#77f6d2";c.lineWidth=.65;c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.stroke();}}for(const p of points){c.globalAlpha=.72;c.fillStyle="#9bc4ff";c.beginPath();c.arc(p.x,p.y,p.r,0,Math.PI*2);c.fill();}c.globalAlpha=1;requestAnimationFrame(drawHero);}resizeHero();addEventListener("resize",resizeHero);requestAnimationFrame(drawHero);}

if(!matchMedia("(prefers-reduced-motion: reduce)").matches&&matchMedia("(pointer: fine)").matches){const panel=document.querySelector(".hero-panel");panel?.addEventListener("pointermove",e=>{const r=panel.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;panel.style.transform=`perspective(900px) rotateY(${x*5}deg) rotateX(${y*-4}deg) translate3d(${x*5}px,${y*5}px,0)`;});panel?.addEventListener("pointerleave",()=>panel.style.transform="");document.querySelectorAll(".button").forEach(button=>{button.addEventListener("pointermove",e=>{const r=button.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;button.style.transform=`translate(${x*7}px,${y*5}px)`;});button.addEventListener("pointerleave",()=>button.style.transform="");});document.querySelectorAll(".capability-grid article").forEach(card=>card.addEventListener("pointermove",e=>{const r=card.getBoundingClientRect();card.style.setProperty("--pointer-x",`${e.clientX-r.left}px`);card.style.setProperty("--pointer-y",`${e.clientY-r.top}px`);card.style.transform=`perspective(750px) rotateX(${((e.clientY-r.top)/r.height-.5)*-5}deg) rotateY(${((e.clientX-r.left)/r.width-.5)*5}deg) translateY(-7px)`;}));document.querySelectorAll(".capability-grid article").forEach(card=>card.addEventListener("pointerleave",()=>card.style.transform=""));}

const evidenceStage=document.querySelector("#evidence-stage");
if(evidenceStage){
  const evidenceTabs=[...document.querySelectorAll(".crystal-tab")],evidenceScenes=[...evidenceStage.querySelectorAll("[data-evidence-scene]")],evidencePanels=[...evidenceStage.querySelectorAll("[data-evidence-panel]")],reduceEvidenceMotion=matchMedia("(prefers-reduced-motion: reduce)").matches;
  let evidenceScene=0,evidencePhase=0,evidenceTimer=0,evidenceVisible=false,evidencePaused=false;
  const setEvidencePhase=phase=>{evidencePhase=(phase+3)%3;evidenceStage.dataset.phase=String(evidencePhase)};
  const setEvidenceScene=scene=>{evidenceScene=scene;evidenceStage.dataset.scene=String(scene);evidenceScenes.forEach(layer=>layer.classList.toggle("is-active",Number(layer.dataset.evidenceScene)===scene));evidenceTabs.forEach((tab,index)=>{const active=index===scene;tab.classList.toggle("is-active",active);tab.setAttribute("aria-selected",String(active));});setEvidencePhase(0)};
  const stopEvidenceCycle=()=>{clearInterval(evidenceTimer);evidenceTimer=0};
  const startEvidenceCycle=()=>{stopEvidenceCycle();evidenceStage.classList.toggle("is-running",evidenceVisible&&!reduceEvidenceMotion);if(!evidenceVisible||reduceEvidenceMotion||evidencePaused)return;evidenceTimer=setInterval(()=>setEvidencePhase(evidencePhase+1),2100)};
  evidenceTabs.forEach((tab,index)=>{tab.addEventListener("click",()=>{setEvidenceScene(index);startEvidenceCycle()});tab.addEventListener("keydown",event=>{if(event.key!=="ArrowLeft"&&event.key!=="ArrowRight")return;event.preventDefault();const next=(index+(event.key==="ArrowRight"?1:-1)+evidenceTabs.length)%evidenceTabs.length;evidenceTabs[next].focus();evidenceTabs[next].click()})});
  evidencePanels.forEach(panel=>{const phase=Number(panel.dataset.evidencePanel),pause=()=>{evidencePaused=true;stopEvidenceCycle();setEvidencePhase(phase)},resume=()=>{evidencePaused=false;startEvidenceCycle()};panel.addEventListener("pointerenter",pause);panel.addEventListener("pointerleave",resume);panel.addEventListener("focus",pause);panel.addEventListener("blur",resume)});
  evidenceStage.addEventListener("pointermove",event=>{const rect=evidenceStage.getBoundingClientRect();evidenceStage.style.setProperty("--evidence-x",`${((event.clientX-rect.left)/rect.width*100).toFixed(1)}%`);evidenceStage.style.setProperty("--evidence-y",`${((event.clientY-rect.top)/rect.height*100).toFixed(1)}%`)});
  evidenceStage.addEventListener("pointerleave",()=>{evidenceStage.style.setProperty("--evidence-x","50%");evidenceStage.style.setProperty("--evidence-y","50%");});
  new IntersectionObserver(([entry])=>{evidenceVisible=entry.isIntersecting;if(evidenceVisible)startEvidenceCycle();else{stopEvidenceCycle();evidenceStage.classList.remove("is-running")}},{threshold:.16}).observe(evidenceStage);
  document.addEventListener("visibilitychange",()=>{if(document.hidden){stopEvidenceCycle();evidenceStage.classList.remove("is-running")}else startEvidenceCycle()});
  setEvidenceScene(0);
}
Object.assign(english,{fieldEyebrow:"Explore crystal analysis scenarios",fieldTitle:"Every structure requires its own path of evidence.",tabLayer:"Layered oxides <small>Phase identification</small>",tabPerovskite:"Perovskites <small>Structure refinement</small>",tabMixture:"Multiphase systems <small>Quantitative decomposition</small>",nameEyebrow:"Why the name Gan Jiang",nameTitle:"Tempering matter. Refining judgement.",nameTextOne:"Gan Jiang is a name from the Chinese culture of swordmaking. Materials discovery is a similar process of tempering: not simply making more samples, but distinguishing structure from complex evidence, ruling out false conclusions, and forging every validation into a more reliable next judgement.",nameTextTwo:"Gan Jiang aims to be the AI analysis scientist between researchers and the laboratories of the future: continuously learning and careful in verification.",futureEyebrow:"For the laboratory of the future",futureTitle:"From reports to a materials-discovery loop of experiment, characterization, and decision.",futureTextOne:"Gan Jiang connects robotic laboratories, computational screening, and XRD characterization: did the target phase form, where did an impurity arise, should the sample be remeasured, and what should change in the next run?",futureTextTwo:"It does not turn unverified experience into system knowledge. Only strategies confirmed by evidence, experts, and follow-up experiments become versioned, evaluated, and reversible analytical skills.",futureCta:"Download and try <span>↓</span>"});
Object.assign(english,{systemEyebrow:"Autonomous materials characterization",systemTitle:"Gan Jiang orchestrates the path from pattern to next experiment.",systemIntro:"Starting from a research intent, Gan Jiang coordinates analytical models, structural databases, and laboratory instruments—connecting every measurement, validation, and correction into a reviewable scientific loop.",systemHumanKicker:"Research intent",systemHumanTitle:"Materials researcher",systemHumanDetail:"question · constraints · review",systemDomainKicker:"Scientific models · dry lab",systemDomainTitle:"XRD analytical intelligence",systemDomainOne:"Pattern parsing",systemDomainTwo:"Phase identification",systemDomainThree:"Quantitative decomposition",systemDomainFour:"Structure refinement",systemDomainPort:"Structural hypotheses and evidence",systemHubKicker:"GANJIANG / AGENTIC XRD",systemHubTitle:"Gan Jiang",systemHubSubtitle:"Autonomous analysis orchestration hub",systemHubStatus:"Evidence chain in progress",systemHubOne:"Intent understanding",systemHubTwo:"Path planning",systemHubThree:"Cross-validation",systemLabKicker:"Physical experiment · measurement",systemLabTitle:"XRD instruments and laboratory",systemLabOne:"Sample preparation",systemLabTwo:"Automated measurement",systemLabThree:"In situ series",systemLabFour:"Remeasure and verify",systemLabPort:"New patterns and experimental feedback",systemExternalKicker:"API · external capabilities",systemExternalOne:"Structure databases",systemExternalTwo:"Analysis engines",systemExternalThree:"Instrument and robotics APIs",systemLoopLabel:"Analysis–experiment loop"});
Object.assign(english,{fieldDescription:"Choose a material system and see how Gan Jiang moves from diffraction signal to structural judgement.",tabLayer:"<span>01</span>Layered oxides <small>Phase identification</small>",tabPerovskite:"<span>02</span>Perovskites <small>Structure refinement</small>",tabMixture:"<span>03</span>Multiphase systems <small>Quantitative decomposition</small>"});
Object.assign(english,{evidenceLive:"Live evidence chain",evidenceDemo:"simulated data",evidencePatternLabel:"Measured pattern",evidencePatternUnit:"intensity / 2θ",evidenceMeasured:"measured",evidenceFit:"model",evidenceResidual:"residual",evidencePathLabel:"Evidence path",layerPathOne:"Locate layered-phase peaks",layerPathOneSub:"peak positions and intensity ratios",layerPathTwo:"Test interlayer constraints",layerPathTwoSub:"00l reflection series",layerPathThree:"Cross-check candidate phases",layerPathThreeSub:"calculated pattern · databases",perovPathOne:"Build the initial lattice",perovPathOneSub:"space group and unit cell",perovPathTwo:"Release parameters in stages",perovPathTwoSub:"background → lattice → occupancy",perovPathThree:"Check physical plausibility",perovPathThreeSub:"residual · bond length · stability",mixPathOne:"Search multiple candidate phases",mixPathOneSub:"major and weak impurity phases",mixPathTwo:"Separate overlapping contributions",mixPathTwoSub:"joint decomposition and refinement",mixPathThree:"Validate phase quantities",mixPathThreeSub:"fractions · uncertainty",evidenceStructureLabel:"Structure hypothesis",evidenceReviewable:"reviewable",layerOutcome:"Interlayer spacing supports the target phase",layerOutcomeSub:"weak impurity signal remains flagged",perovOutcome:"Lattice parameters converge",perovOutcomeSub:"bond lengths and occupancy remain plausible",mixOutcome:"Three phase contributions separated",mixOutcomeSub:"unexplained signal remains visible",metricCandidate:"Candidate structure",metricConfidence:"Evidence consistency",metricSpaceGroup:"Space group",metricPhaseCount:"Phase count",metricMajorPhase:"Major phase",metricUnexplained:"Unexplained signal",evidenceVerdict:"The conclusion updates with the evidence"});
if(document.documentElement.lang==="en")setLanguage("en");

const agentSystemMap=document.querySelector("#agent-system-map");
if(agentSystemMap){
  const systemNodes=[...agentSystemMap.querySelectorAll("[data-system-node]")],reduceSystemMotion=matchMedia("(prefers-reduced-motion: reduce)").matches;
  let systemStage=0,systemTimer=0,systemVisible=false,systemPaused=false;
  const setSystemStage=stage=>{systemStage=stage%systemNodes.length;agentSystemMap.dataset.stage=String(systemStage)};
  const stopSystemCycle=()=>{clearInterval(systemTimer);systemTimer=0};
  const startSystemCycle=()=>{stopSystemCycle();agentSystemMap.classList.toggle("is-running",!reduceSystemMotion&&systemVisible);if(reduceSystemMotion||!systemVisible||systemPaused)return;systemTimer=setInterval(()=>setSystemStage(systemStage+1),1800)};
  new IntersectionObserver(([entry])=>{systemVisible=entry.isIntersecting;if(systemVisible)startSystemCycle();else{stopSystemCycle();agentSystemMap.classList.remove("is-running");}},{threshold:.22}).observe(agentSystemMap);
  systemNodes.forEach((node,index)=>{
    const pause=()=>{systemPaused=true;stopSystemCycle();setSystemStage(index)};
    const resume=()=>{systemPaused=false;startSystemCycle()};
    node.addEventListener("pointerenter",pause);node.addEventListener("pointerleave",resume);node.addEventListener("focus",pause);node.addEventListener("blur",resume);
  });
  agentSystemMap.addEventListener("pointermove",event=>{const rect=agentSystemMap.getBoundingClientRect();agentSystemMap.style.setProperty("--map-x",`${((event.clientX-rect.left)/rect.width*100).toFixed(1)}%`);agentSystemMap.style.setProperty("--map-y",`${((event.clientY-rect.top)/rect.height*100).toFixed(1)}%`)});
  agentSystemMap.addEventListener("pointerleave",()=>{agentSystemMap.style.setProperty("--map-x","50%");agentSystemMap.style.setProperty("--map-y","50%");});
  document.addEventListener("visibilitychange",()=>{if(document.hidden){stopSystemCycle();agentSystemMap.classList.remove("is-running");}else startSystemCycle()});
}

const slides=[...document.querySelectorAll("main > section")], dots=document.querySelector(".page-dots");
if(slides.length&&dots){const activate=index=>[...dots.children].forEach((dot,i)=>dot.classList.toggle("is-active",i===index));slides.forEach((slide,index)=>{const dot=document.createElement("button");dot.className="page-dot";dot.type="button";dot.setAttribute("aria-label",`第 ${index+1} 页`);dot.addEventListener("click",()=>slide.scrollIntoView({behavior:"smooth",block:"start"}));dots.append(dot);});activate(0);const pager=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)activate(slides.indexOf(entry.target));}),{threshold:.58});slides.forEach(slide=>pager.observe(slide));addEventListener("keydown",event=>{if(["INPUT","TEXTAREA","SELECT"].includes(document.activeElement.tagName))return;if(event.key==="ArrowDown"||event.key==="PageDown"){event.preventDefault();const i=[...dots.children].findIndex(dot=>dot.classList.contains("is-active"));slides[Math.min(slides.length-1,i+1)].scrollIntoView({behavior:"smooth",block:"start"});}if(event.key==="ArrowUp"||event.key==="PageUp"){event.preventDefault();const i=[...dots.children].findIndex(dot=>dot.classList.contains("is-active"));slides[Math.max(0,i-1)].scrollIntoView({behavior:"smooth",block:"start"});}});}
Object.assign(english,{navPresentation:"Presentation",presentationEyebrow:"Project presentation",presentationTitle:"Get to know Gan Jiang in one presentation.",presentationText:"Explore Gan Jiang’s vision, core capabilities, and application scenarios in the project presentation.",presentationCta:"View presentation online <span>↗</span>"});
if(document.documentElement.lang==="en")setLanguage("en");

Object.assign(english,{heroEyebrow:"For powder X-ray diffraction",heroTitle:"From one pattern<br>to a trusted <em>structural conclusion.</em>",heroText:"Gan Jiang turns PXRD patterns into structural conclusions that are verifiable and traceable.",heroPrimary:"Explore Gan Jiang <span>↓</span>",panelKicker:"What is Gan Jiang",panelStatement:"A science agent for PXRD.",signalOne:"Identification, decomposition, and refinement in one path.",signalTwo:"Conclusions, evidence, and uncertainty retained together.",outcomeIntro:"Reviewable from measurement to conclusion.",outcomeOne:"Identify",outcomeOneText:"Surface candidate phases",outcomeTwo:"Validate",outcomeTwoText:"Cross-check decomposition and refinement",outcomeThree:"Decide",outcomeThreeText:"State limits and suggest the next step"});
if(document.documentElement.lang==="en")setLanguage("en");
