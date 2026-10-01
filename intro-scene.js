/* The orb is an entrance scene, not a section to scroll past. */
(() => {
  const intro=document.querySelector('.orb-intro');
  if(!intro)return;
  const html=document.documentElement;
  let entering=true,lockedUntil=0,unlockTimer=0,touchStart=null,wheelDistance=0;
  function lockMomentum(){
    lockedUntil=performance.now()+450;
    html.classList.add('intro-handoff');
    clearTimeout(unlockTimer);
    unlockTimer=setTimeout(()=>html.classList.remove('intro-handoff'),450);
  }
  function switchScene(hash,focus=false){
    entering=!hash||hash==='#top';
    intro.hidden=!entering;
    html.classList.toggle('intro-scene',entering);
    wheelDistance=0;
    // Explicit instant positioning prevents the global smooth-scroll rule
    // from animating across the entrance and the main page.
    window.scrollTo({top:0,left:0,behavior:'instant'});
    if(!entering){
      const target=document.getElementById(hash.slice(1))||document.getElementById('home');
      if(target&&hash!=='#home')target.scrollIntoView({behavior:'instant',block:'start'});
      if(focus&&target){target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}
    }else if(focus){intro.querySelector('.orb-intro-enter')?.focus({preventScroll:true});}
    dispatchEvent(new Event('scroll'));
  }
  function enter(){lockMomentum();history.replaceState(null,'','#home');switchScene('#home');}
  document.addEventListener('click',event=>{
    if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    const link=event.target.closest('a[href^="#"]');if(!link)return;
    const hash=link.getAttribute('href');
    if(entering||hash==='#top'){
      if(hash!=='#top'&&!document.getElementById(hash.slice(1)))return;
      event.preventDefault();lockMomentum();history.pushState(null,'',hash);switchScene(hash,true);
    }
  });
  addEventListener('wheel',event=>{
    if(event.ctrlKey)return; // Preserve browser pinch-to-zoom.
    if(performance.now()<lockedUntil){event.preventDefault();return;}
    if(!entering||document.querySelector('.nav.is-open'))return;
    event.preventDefault();
    if(event.deltaY<=0){wheelDistance=0;return;}
    wheelDistance+=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?innerHeight:1);
    if(wheelDistance>=35)enter();
  },{passive:false});
  intro.addEventListener('touchstart',event=>{touchStart=event.touches.length===1?{x:event.touches[0].clientX,y:event.touches[0].clientY}:null;},{passive:true});
  intro.addEventListener('touchend',event=>{
    if(!entering||!touchStart||!event.changedTouches.length)return;
    const touch=event.changedTouches[0],dy=touchStart.y-touch.clientY,dx=Math.abs(touch.clientX-touchStart.x);
    touchStart=null;if(dy>45&&dy>dx)enter();
  },{passive:true});
  intro.addEventListener('touchcancel',()=>{touchStart=null;},{passive:true});
  document.addEventListener('keydown',event=>{
    if(!entering||event.defaultPrevented||event.altKey||event.ctrlKey||event.metaKey||event.shiftKey)return;
    if(document.activeElement?.closest('a,button,input,select,textarea,summary,[contenteditable="true"]'))return;
    if(['ArrowDown','PageDown',' '].includes(event.key)){event.preventDefault();enter();}
  });
  const syncHistory=()=>{if(entering||!location.hash||location.hash==='#top')switchScene(location.hash);};
  addEventListener('hashchange',syncHistory);
  // Handles history entries created by the entrance controls, including Back.
  addEventListener('popstate',syncHistory);
  switchScene(location.hash);
})();
