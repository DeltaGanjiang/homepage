/* Native SVG charts: all curves are supplied measurements / fitted components. */
(() => {
  const root=document.querySelector('#phase-story'), data=window.egyptData;
  if(!root||!data)return;
  const $=s=>root.querySelector(s), svg=$('#egypt-chart');
  const en=()=>document.documentElement.lang==='en';
  let range='full', selected=-1, background=true, inspected=1000;
  const svgNS='http://www.w3.org/2000/svg';
  const node=(tag,attrs,text)=>{const el=document.createElementNS(svgNS,tag);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));if(text!==undefined)el.textContent=text;return el;};
  let visibleRows=[], xScale,yScale,minAngle,maxAngle;
  const phaseButtons=data.phases.map((phase,i)=>{
    const b=document.createElement('button');b.type='button';b.className='phase-data-button';b.style.setProperty('--phase-color',phase.color);b.style.setProperty('--fraction',phase.fraction+'%');
    b.innerHTML=`<span class="phase-data-name"><b>${phase.formula}</b><small></small></span><span class="phase-data-track"><i></i></span><strong>${phase.fraction.toFixed(2)}%</strong>`;
    b.addEventListener('click',()=>{selected=selected===i?-1:i;if(Number($('.phase-story-board').dataset.step)<1)$('[data-story-step="1"]').click();draw();});
    $('#phase-composition').append(b);return b;
  });
  function readout(index){
    inspected=Math.max(0,Math.min(data.rows.length-1,index));
    const r=data.rows[inspected];$('#xrd-angle').value=String(inspected);
    const detail=selected<0?'':` · ${data.phases[selected].formula} ${r[selected+4].toFixed(1)}`;
    $('#xrd-readout').textContent=`2θ ${r[0].toFixed(2)}° · ${en()?'Observed':'实测'} ${r[1].toFixed(1)} · ${en()?'Fit':'拟合'} ${r[2].toFixed(1)} · ΔI ${(r[1]-r[2]).toFixed(1)}${detail}`;
    const cursor=$('#xrd-cursor');cursor.setAttribute('visibility',r[0]>=minAngle&&r[0]<=maxAngle?'visible':'hidden');
    const x=xScale(r[0]);cursor.querySelector('line').setAttribute('x1',x);cursor.querySelector('line').setAttribute('x2',x);cursor.querySelector('circle').setAttribute('cx',x);cursor.querySelector('circle').setAttribute('cy',yScale(r[1]));
  }
  function draw(){
    const step=Number($('.phase-story-board').dataset.step);
    minAngle=range==='detail'?13:data.rows[0][0];maxAngle=range==='detail'?18.2:data.rows.at(-1)[0];
    visibleRows=data.rows.filter(r=>r[0]>=minAngle&&r[0]<=maxAngle);
    const maxY=Math.ceil(Math.max(...visibleRows.map(r=>Math.max(r[1],r[2])))/1000)*1000;
    xScale=x=>64+(x-minAngle)/(maxAngle-minAngle)*672;yScale=y=>258-y/maxY*214;
    const residualMax=Math.max(1,...visibleRows.map(r=>Math.abs(r[1]-r[2])));
    const grid=$('#xrd-grid'),labels=$('#xrd-labels'),traces=$('#xrd-traces');grid.replaceChildren();labels.replaceChildren();traces.replaceChildren();
    for(let i=0;i<=4;i++){
      const value=maxY*i/4,y=yScale(value);grid.append(node('line',{x1:64,x2:736,y1:y,y2:y,stroke:'#25324b','stroke-dasharray':'3 5'}));labels.append(node('text',{x:55,y:y+4,'text-anchor':'end'},Math.round(value).toLocaleString('en-US')));
    }
    const ticks=range==='detail'?[13,14,15,16,17,18]:[5,15,25,35,45,55,65,75];
    ticks.forEach(v=>{const x=xScale(v);labels.append(node('text',{x:Math.min(x,736),y:427,'text-anchor':'middle'},v+'°'));});
    labels.append(node('text',{x:64,y:18},en()?'Intensity / counts':'强度 / counts'),node('text',{x:736,y:18,'text-anchor':'end'},'2θ / °'));
    const path=(fn)=>visibleRows.map((r,i)=>`${i?'L':'M'}${xScale(r[0]).toFixed(2)},${fn(r).toFixed(2)}`).join('');
    const addPath=(d,color,width=1.1,opacity=1,dash='')=>{traces.append(node('path',{d,fill:'none',stroke:color,'stroke-width':width,opacity,'stroke-dasharray':dash,'vector-effect':'non-scaling-stroke'}));};
    if(range==='full')traces.append(node('rect',{x:xScale(13),y:30,width:xScale(18.2)-xScale(13),height:228,fill:'#76a9ff',opacity:.065}));
    if(step>=1)data.phases.forEach((p,i)=>{
      const active=selected<0||selected===i;
      addPath(path(r=>yScale(r[i+4])),p.color,active?1.25:.6,active?.85:.09);
      const ticks=p.peaks.filter(v=>v>=minAngle&&v<=maxAngle).map(v=>`M${xScale(v).toFixed(2)},${384+i*6}v4`).join('');addPath(ticks,p.color,.75,active?.9:.12);
    });
    addPath(path(r=>yScale(r[1])),'#dce6fa',1,step>=1?.55:1);
    if(step>=2)addPath(path(r=>yScale(r[2])),'#77f6d2',1.25,.9);
    if(background)addPath(path(r=>yScale(r[3])),'#ffca88',1,.75,'4 4');
    grid.append(node('line',{x1:64,x2:736,y1:323,y2:323,stroke:'#566785','stroke-dasharray':'3 4'}));
    labels.append(node('text',{x:64,y:285},en()?'Residual ΔI = observed − calculated':'残差 ΔI = 实测 − 拟合'));
    if(step>=2){addPath(path(r=>323-(r[1]-r[2])/residualMax*39),'#9aaed1',.85);labels.append(node('text',{x:55,y:307,'text-anchor':'end'},'±'+Math.ceil(residualMax)),node('text',{x:55,y:327,'text-anchor':'end'},'0'));}
    else labels.append(node('text',{x:400,y:328,'text-anchor':'middle'},en()?'Residual appears at the fit-check step':'进入「检验拟合」查看残差'));
    phaseButtons.forEach((b,i)=>{b.setAttribute('aria-pressed',String(selected<0||selected===i));b.querySelector('small').textContent=data.phases[i][en()?'en':'zh'];b.setAttribute('aria-label',`${data.phases[i][en()?'en':'zh']}, ${data.phases[i].fraction}%`);});
    $('#xrd-all').setAttribute('aria-pressed',String(selected<0));
    root.querySelectorAll('[data-xrd-range]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.xrdRange===range)));
    $('#xrd-background').setAttribute('aria-pressed',String(background));
    $('#egypt-chart-title').textContent=en()?'Measured diffraction, fitted components, background and residual of Egyptian cosmetic powder':'古埃及化妆粉实测曲线、物相分量、背景与残差';
    const first=Math.round((minAngle-data.rows[0][0])*100),last=Math.min(6999,Math.round((maxAngle-data.rows[0][0])*100));$('#xrd-angle').min=first;$('#xrd-angle').max=last;
    readout(Math.max(first,Math.min(last,inspected)));
  }
  root.querySelectorAll('[data-xrd-range]').forEach(b=>b.addEventListener('click',()=>{range=b.dataset.xrdRange;draw();}));
  $('#xrd-background').addEventListener('click',()=>{background=!background;draw();});
  $('#xrd-all').addEventListener('click',()=>{selected=-1;draw();});
  $('#xrd-angle').addEventListener('input',e=>readout(Number(e.target.value)));
  $('#xrd-hit').addEventListener('pointermove',e=>{const pt=svg.createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;const p=pt.matrixTransform(svg.getScreenCTM().inverse());const angle=minAngle+Math.max(0,Math.min(1,(p.x-64)/672))*(maxAngle-minAngle);readout(Math.round((angle-data.rows[0][0])*100));});
  new MutationObserver(draw).observe($('.phase-story-board'),{attributes:true,attributeFilter:['data-step']});
  new MutationObserver(draw).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  draw();
})();

(() => {
  const root=document.querySelector('#benchmarks'),data=window.benchmarkData;if(!root||!data)return;
  const $=s=>root.querySelector(s);let dataset=0;
  const copy={zh:{eyebrow:'DeltaXRDbench',title:'物相识别评测',intro:'从模拟图谱到真实实验，在相同任务与输入条件下，查看干将与各基线的识别表现。',metricLabel:'任务 / 指标',inputLabel:'输入条件',higher:'越高越好 ↑',lead:'领先当前最强基线',pp:'个百分点',methodTitle:'数据来源与评测口径',metrics:['单相 · Top-1','多相 · F1','多相 · 完整相集'],conditions:['仅 XRD','XRD + 组成信息'],single:'Top-1 准确率',multiF1:'样本宏平均 F1',multiExact:'完整相集恢复率',simulated:'模拟图谱',experimental:'实验图谱',samples:'样本',mixtures:'混合样本 / 3 个固定随机种子的均值',methodSingle:'Top-1：首位候选的结构匹配准确率。表中 MP500 / RRUFF / opXRD 的名义规模为 10,000 / 944 / 654；各方法按其声明的评测子集计分，PXRDGen-Flow 在 RRUFF 与 opXRD 使用满足 ≤100 原子限制的子集。空缺或无效输出计零。AutoXRD 使用固定的 GanJiang 候选库；生成模型沿用预训练权重。',methodMulti:'每个数据集包含 1,000 个隐藏混合样本，结果为三个固定随机种子的均值。完整相集恢复要求所有物相匹配；F1 为样本宏平均，空缺输出计失败。有组成信息时，AutoXRD 和干将直接获得参考组成；AutoAnalyzer 和 SimonnetCNN 用各相参考组成后筛选冻结的预测。',oracle:'组成条件使用参考组成（oracle），不是模型自行预测的组成。'},en:{eyebrow:'DeltaXRDbench',title:'Phase identification benchmarks',intro:'From simulated patterns to experimental data. Compare Gan Jiang with the baselines under the same task and input condition.',metricLabel:'Task / metric',inputLabel:'Input condition',higher:'Higher is better ↑',lead:'Ahead of the strongest baseline here',pp:'percentage points',methodTitle:'Sources and evaluation protocol',metrics:['Single phase · Top-1','Multiphase · F1','Multiphase · Exact set'],conditions:['XRD only','XRD + composition'],single:'Top-1 accuracy',multiF1:'Sample-macro F1',multiExact:'Exact phase-set recovery',simulated:'Simulated patterns',experimental:'Experimental patterns',samples:'samples',mixtures:'mixtures / mean of 3 fixed seeds',methodSingle:'Top-1 measures structural matching of the first candidate. Nominal sizes for MP500 / RRUFF / opXRD are 10,000 / 944 / 654; methods are scored on their declared subsets. PXRDGen-Flow uses ≤100-atom subsets for RRUFF and opXRD. Missing or invalid outputs score zero. AutoXRD uses a fixed GanJiang candidate library; generative models use existing pretrained checkpoints.',methodMulti:'Each dataset contains 1,000 hidden mixtures; results are means over three fixed random seeds. Exact-set recovery requires all phases to match; F1 is a sample-wise macro average. Missing predictions count as failures. With composition, AutoXRD and Gan Jiang receive oracle composition at inference; AutoAnalyzer and SimonnetCNN use oracle per-phase composition to post-filter frozen predictions.',oracle:'The composition condition supplies oracle reference composition, not predicted composition.'}};
  function draw(){
    const lang=document.documentElement.lang==='en'?'en':'zh',c=copy[lang];const metric=$('#benchmark-metric').value,condition=Number($('#benchmark-condition').value);
    root.querySelectorAll('[data-bench-copy]').forEach(el=>el.textContent=c[el.dataset.benchCopy]);
    [...$('#benchmark-metric').options].forEach((o,i)=>o.textContent=c.metrics[i]);[...$('#benchmark-condition').options].forEach((o,i)=>o.textContent=c.conditions[i]);
    const entries=Object.entries(data[metric]).map(([name,v])=>({name,value:v[condition][dataset]})).sort((a,b)=>b.value-a.value);
    const ours=entries.find(e=>e.name==='Gan Jiang'),best=entries.find(e=>e.name!=='Gan Jiang');
    $('#benchmark-chart-title').textContent=`${data.datasets[dataset]} / ${c[metric]}`;
    const chart=$('#benchmark-bars');chart.replaceChildren();chart.setAttribute('aria-label',`${data.datasets[dataset]}, ${c[metric]}, ${c.conditions[condition]}: `+entries.map(e=>`${e.name} ${e.value.toFixed(2)}%`).join('; '));
    entries.forEach(e=>{const row=document.createElement('div');row.className='benchmark-row'+(e.name==='Gan Jiang'?' is-ours':'');row.innerHTML=`<span>${e.name}</span><div class="benchmark-track"><i style="width:${e.value}%"></i></div><b>${e.value.toFixed(2)}<small>%</small></b>`;chart.append(row);});
    $('#benchmark-gain').textContent='+'+(ours.value-best.value).toFixed(2);$('#benchmark-score').textContent=ours.value.toFixed(2)+'%';$('#benchmark-comparison').textContent=`${c[metric]} · ${c.conditions[condition]}\nvs. ${best.name} (${best.value.toFixed(2)}%)`;
    const n=metric==='single'?[10000,944,654][dataset]:1000;
    $('#benchmark-context').textContent=`${dataset===0?c.simulated:c.experimental} · N = ${n.toLocaleString('en-US')} ${metric==='single'?c.samples:c.mixtures}`;
    $('#benchmark-method-text').textContent=(metric==='single'?c.methodSingle:c.methodMulti)+(condition?' '+c.oracle:'');
    root.querySelectorAll('[data-bench-dataset]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.benchDataset)===dataset)));
  }
  root.querySelectorAll('[data-bench-dataset]').forEach(b=>b.addEventListener('click',()=>{dataset=Number(b.dataset.benchDataset);draw();}));
  $('#benchmark-metric').addEventListener('change',draw);$('#benchmark-condition').addEventListener('change',draw);
  new MutationObserver(draw).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});draw();
})();
