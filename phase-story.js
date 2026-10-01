(() => {
  const root = document.querySelector('#phase-story');
  if (!root) return;
  const copy = {
    zh: {eyebrow:'从一份古老样品，读出五种矿物',title:'三千年的配方，<br />藏在重叠的峰里。',intro:'一份古埃及化妆粉，一张复杂的衍射图谱。跟随报告中的真实案例，看干将如何分解五相、验证拟合，重建矿物配比。',analysisLabel:'多相图谱分析',demo:'古埃及化妆粉',pattern:'古埃及化妆粉 / 五相分析',evidence:'图谱上的证据',judgment:'这一步告诉我们',step0:'读取信号',step1:'辨认五相',step2:'检验拟合',step3:'读出配方',play:'播放解读 ↗',pause:'暂停 Ⅱ',replay:'重新播放 ↺',group:'案例解读步骤',explanation:'分析说明',zoom:'重叠区',background:'背景',observed:'实测',calculated:'拟合',angle:'逐点检查 2θ',selectPhase:'选择物相，追踪它的衍射贡献',all:'全部',
      steps:[
        ['样品','读取混合图谱','约三千年前的化妆粉中，多种矿物的衍射信号相互重叠。一个峰可能对应多个反射，仅凭逐峰对照，很难读清样品的组成。','先看完整图谱：真正需要解释的，是多个物相共同留下的信号。','移动指针或拖动滑杆，逐点读取实测强度。选择「重叠区」放大 13–18.2°，查看复杂峰形。'],
        ['物相','识别五种矿物','报告中，干将把完整同步辐射图谱分解为五相贡献：石膏、碳氯铅矿、白铅矿、方铅矿和氯羟铅矿。每一个物相，都要与同一张实验图谱对应。','从一张混合图谱，得到可分别检查的五相解释。','点击下方任一物相，高亮对应的分量曲线与 Bragg 刻线；选择「全部」恢复五相对照。比例为报告中的质量分数。'],
        ['拟合','对照实测与计算曲线','观察实测曲线与计算曲线是否吻合，再检查下方 ΔI 残差。报告给出 Rₚ = 6.600%、R𝑤ₚ = 13.079%；这些指标与峰位证据一起，构成可复查的拟合结果。','拟合误差仍然可见。数值支持评价，但不能单独替代对物相合理性的判断。','浅灰为实测，青绿为总拟合，金色虚线为背景；下方 ΔI 保留正负残差，纵轴随当前范围标注。'],
        ['配比','计算各相的质量分数','报告给出的五相比例为：石膏 12.53%、碳氯铅矿 18.53%、白铅矿 32.02%、方铅矿 9.69%、氯羟铅矿 27.23%。复杂图谱由此转化为可以讨论的矿物配方。','报告认为，含氯铅矿物的显著比例支持人为化学加工的解释，为古代材料工艺提供线索。','下方色条对应报告中的五相定量结果，总计 100%。比例来自该样品，不是模型识别置信度。']
      ]},
    en: {eyebrow:'One ancient sample. Five mineral phases.',title:'A 3,000-year-old recipe.<br />Hidden in overlapping peaks.',intro:'An ancient Egyptian cosmetic powder. One intricate diffraction pattern. Follow a case from the technical report, from five-phase decomposition to a quantitative mineral formulation.',analysisLabel:'Multiphase analysis',demo:'Egyptian cosmetic powder',pattern:'Egyptian cosmetic / five-phase analysis',evidence:'Evidence in the pattern',judgment:'What this tells us',step0:'Read the signal',step1:'Resolve phases',step2:'Inspect the fit',step3:'Read the recipe',play:'Play story ↗',pause:'Pause Ⅱ',replay:'Replay ↺',group:'Case walkthrough steps',explanation:'Analysis notes',zoom:'Overlap',background:'Background',observed:'Observed',calculated:'Calculated',angle:'Inspect 2θ',selectPhase:'Select a phase to trace its contribution',all:'All phases',
      steps:[
        ['Sample','Read the mixed pattern','In a roughly 3,000-year-old cosmetic powder, diffraction signatures from several minerals overlap. A peak may contain multiple reflections, making isolated peak assignments difficult.','Start with the complete pattern: the signal reflects several phases acting together.','Move the pointer or drag the slider to inspect measured counts. Select Overlap to zoom into 13–18.2° and explore the complex peak shapes.'],
        ['Phases','Identify five minerals','In the report, Gan Jiang decomposes the full synchrotron pattern into five phase contributions: gypsum, phosgenite, cerussite, galena, and laurionite. Each is checked against the same measurement.','One mixed pattern becomes a five-phase explanation that can be inspected phase by phase.','Select a phase below to highlight its component profile and Bragg ticks. All phases restores the full comparison. Percentages are reported mass fractions.'],
        ['Fit','Compare measurement and model','Compare the observed and calculated curves, then inspect the ΔI residual below. The report gives Rₚ = 6.600% and R𝑤ₚ = 13.079%, retaining both the fit and the evidence needed to review it.','The mismatch remains visible. Fit metrics inform evaluation but cannot establish phase plausibility on their own.','Pale grey denotes observed counts, mint the total fit, and dashed gold the background. The residual preserves positive and negative differences with a labelled scale.'],
        ['Fractions','Quantify the phase fractions','Reported fractions: gypsum 12.53%, phosgenite 18.53%, cerussite 32.02%, galena 9.69%, and laurionite 27.23%. A convoluted pattern becomes a quantitative mineral formulation.','The report interprets substantial lead-chloride fractions as evidence supporting deliberate chemical processing in manufacture.','The bars show the five reported phase fractions, totalling 100%. They describe this sample, not identification confidence.']
      ]}
  };
  const board=root.querySelector('.phase-story-board'), play=root.querySelector('#phase-play');
  const buttons=[...root.querySelectorAll('[data-story-step]')];
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  const duration=3000, progress=root.querySelector('.phase-playback-progress');
  let step=0, playing=!motion.matches, visible=false, elapsed=0, frame=null, lastTime=null;
  function updateProgress(){
    const percent=Math.min(100,(step+elapsed/duration)/4*100);
    progress.style.setProperty('--progress',percent+'%');
    const rounded=String(Math.round(percent));
    if(progress.getAttribute('aria-valuenow')!==rounded)progress.setAttribute('aria-valuenow',rounded);
  }
  const lang=()=>document.documentElement.lang==='en'?'en':'zh';
  function render(){
    const c=copy[lang()], s=c.steps[step];
    root.querySelectorAll('[data-story-copy]').forEach(el=>{el.innerHTML=c[el.dataset.storyCopy];});
    root.querySelector('.phase-step-buttons').setAttribute('aria-label',c.group);
    ['tag','title','body','result'].forEach((key,i)=>{root.querySelector(`#phase-step-${key}`).textContent=s[i];});
    root.querySelector('#phase-step-title').style.whiteSpace='pre-line';
    root.querySelector('#phase-finding-text').textContent=s[4];
    root.querySelector('#phase-step-number').textContent=String(step+1).padStart(2,'0');
    board.dataset.step=String(step);
    buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===step)));
    play.textContent=playing?c.pause:c.play;
    root.querySelector('#phase-step-title').setAttribute('aria-live',playing?'off':'polite');
    updateProgress();
  }
  function tick(now){
    if(lastTime!==null)elapsed+=now-lastTime;
    lastTime=now;
    if(elapsed>=duration){
      step=(step+1)%4;elapsed=0;render();
    }
    updateProgress();
    frame=playing&&visible&&!document.hidden?requestAnimationFrame(tick):null;
  }
  function schedule(){
    if(frame!==null)cancelAnimationFrame(frame);
    frame=null;lastTime=null;
    if(playing&&visible&&!document.hidden)frame=requestAnimationFrame(tick);
  }
  buttons.forEach((button,i)=>button.addEventListener('click',()=>{step=i;elapsed=0;playing=false;render();schedule();}));
  play.addEventListener('click',()=>{if(elapsed>=duration){step=0;elapsed=0;}playing=!playing;render();schedule();});
  new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;schedule();},{threshold:.15}).observe(board);
  document.addEventListener('visibilitychange',schedule);
  motion.addEventListener('change',()=>{if(motion.matches){playing=false;render();schedule();}});
  new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  render();
})();
