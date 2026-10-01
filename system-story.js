/* Reveal the system in the order that a research request moves through it. */
(() => {
  const map=document.querySelector('#agent-system-map');if(!map)return;
  const nodes=[...map.querySelectorAll('[data-system-node]')];
  const play=document.querySelector('#system-sequence-play'),replay=document.querySelector('#system-sequence-replay');
  const captions={zh:['从研究问题出发','干将理解意图，规划分析路径','接入结构数据库与分析工具','调度模型，识别、分解与精修','连接实验测量，获得新的证据','将实验反馈带回下一次判断'],en:['Start with a research question','Gan Jiang interprets intent and plans the analysis','Connect structural databases and analysis tools','Identify phases, decompose signals, refine structures','Connect measurements and collect new evidence','Bring experimental feedback into the next decision']};
  const order=[0,2,4,1,3,2],motion=matchMedia('(prefers-reduced-motion: reduce)');
  let stage=motion.matches?5:0,playing=!motion.matches,visible=false,timer=null;
  function paint(){
    const lang=document.documentElement.lang==='en'?'en':'zh';
    const revealed=new Set(order.slice(0,stage+1));
    map.classList.add('is-sequenced');map.dataset.revealStep=String(stage);map.dataset.stage=String(order[stage]);
    nodes.forEach(node=>{const show=revealed.has(Number(node.dataset.systemNode));node.classList.toggle('is-revealed',show);node.inert=!show;node.setAttribute('aria-hidden',String(!show));});
    document.querySelector('#system-sequence-count').textContent=`0${stage+1} / 06`;
    document.querySelector('#system-sequence-caption').textContent=captions[lang][stage];
    play.textContent=playing?(lang==='en'?'Pause Ⅱ':'暂停 Ⅱ'):(stage===5?(lang==='en'?'Play again ↺':'再次播放 ↺'):(lang==='en'?'Continue ▷':'继续 ▷'));
    replay.textContent=lang==='en'?'Restart ↺':'重播 ↺';
    map.classList.toggle('is-running',playing&&visible&&!document.hidden&&!motion.matches);
  }
  function schedule(){clearTimeout(timer);timer=null;if(playing&&visible&&!document.hidden&&!motion.matches){timer=setTimeout(()=>{stage=Math.min(5,stage+1);if(stage===5)playing=false;paint();schedule();},1450);}}
  play.addEventListener('click',()=>{if(stage===5){stage=0;playing=true;}else playing=!playing;if(motion.matches){stage=5;playing=false;}paint();schedule();});
  replay.addEventListener('click',()=>{stage=motion.matches?5:0;playing=!motion.matches;paint();schedule();});
  // Focusing or selecting a revealed card pauses the sequence for inspection.
  nodes.forEach(node=>{const inspect=()=>{playing=false;paint();schedule();map.dataset.stage=node.dataset.systemNode;};node.addEventListener('focus',inspect);node.addEventListener('click',inspect);});
  new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;paint();schedule();},{threshold:.12}).observe(map);
  document.addEventListener('visibilitychange',()=>{paint();schedule();});
  motion.addEventListener('change',()=>{if(motion.matches){stage=5;playing=false;}paint();schedule();});
  new MutationObserver(paint).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});paint();
})();
