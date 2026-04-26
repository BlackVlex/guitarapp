(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={tsoy:{title:`Звезда по имени Солнце`,artist:`Виктор Цой`,baseKey:`Am`,chords:`Am              F
В нашем городе дожди...

C               G
И не нужны нам небеса...`,hasBarre:!0},vysotsky:{title:`Конь`,artist:`Владимир Высоцкий`,baseKey:`Am`,chords:`Am              Dm
Уводил меня отец в далёкий край...

E               Am
Где рождались кони и горел костёр...`,hasBarre:!1},lube:{title:`Комбат`,artist:`Любэ`,baseKey:`Dm`,chords:`Dm              Bb
Комбат, батя, батяня, батя...

C               Dm
Землянка, огонь и гармонь...`,hasBarre:!1},narodnaya:{title:`В лесу родилась ёлочка`,artist:`Народная`,baseKey:`C`,chords:`C               G7
В лесу родилась ёлочка,
В лесу она росла...

F               C
Зимой и летом стройная, зелёная была.`,hasBarre:!1}},t=[`C`,`C#`,`D`,`D#`,`E`,`F`,`F#`,`G`,`G#`,`A`,`A#`,`B`],n=0,r=null,i=document.getElementById(`catalog-screen`),a=document.getElementById(`chords-screen`),o=document.getElementById(`metronome-screen`),s=document.querySelector(`.search-input`),c=document.querySelectorAll(`.song-card`),l=document.getElementById(`metro-back`),u=document.getElementById(`metro-toggle`),d=document.getElementById(`bpm-slider`),f=document.getElementById(`bpm-value`),p=document.getElementById(`beat-indicator`),m=document.querySelectorAll(`.time-btn`),h=null,g=!1,_=null,v=120,y=0,b=4;function x(e){if(!h)return;let t=h.createOscillator(),n=h.createGain();t.connect(n),n.connect(h.destination),t.frequency.value=e?1200:800,t.type=`sine`;let r=h.currentTime;n.gain.setValueAtTime(e?.4:.2,r),n.gain.exponentialRampToValueAtTime(.001,r+.05),t.start(r),t.stop(r+.06)}function S(){x(y===0),p.classList.add(`pulse`),f.classList.add(`beat`),setTimeout(()=>{p.classList.remove(`pulse`),f.classList.remove(`beat`)},100),y++,y>=b&&(y=0)}u.addEventListener(`click`,()=>{if(h||=new(window.AudioContext||window.webkitAudioContext),h.state===`suspended`&&h.resume(),g=!g,g){u.textContent=`⏹ Stop`,u.classList.add(`running`);let e=60/v*1e3;_=setInterval(S,e)}else u.textContent=`▶ Start`,u.classList.remove(`running`),y=0,clearInterval(_)}),d.addEventListener(`input`,e=>{if(v=parseInt(e.target.value),f.textContent=v,g){clearInterval(_);let e=60/v*1e3;_=setInterval(S,e)}}),document.getElementById(`bpm-minus`).addEventListener(`click`,()=>{v>40&&(v-=5,d.value=v,f.textContent=v,g&&(clearInterval(_),_=setInterval(S,60/v*1e3)))}),document.getElementById(`bpm-plus`).addEventListener(`click`,()=>{v<200&&(v+=5,d.value=v,f.textContent=v,g&&(clearInterval(_),_=setInterval(S,60/v*1e3)))}),m.forEach(e=>{e.addEventListener(`click`,()=>{m.forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),b=parseInt(e.dataset.beats),y=0})}),c.forEach(e=>e.addEventListener(`click`,()=>C(e.dataset.id)));function C(t){r=t;let s=e[t];if(!s)return;n=(JSON.parse(localStorage.getItem(`rusChords_transpose`))||{})[t]||0;let c=s.chords.replace(/\b([A-G][#b]?m?(?:maj)?(?:7|sus[24]|dim|aug)*)\b/g,`<span class="chord-highlight">$1</span>`);a.innerHTML=`
    <header class="chords-header">
      <button class="back-btn">←</button>
      <div class="header-info">
        <h2 class="screen-title">${s.title}</h2>
        <p class="screen-artist">${s.artist}</p>
      </div>
    </header>
    <div class="transpose-block">
      <button class="tr-btn tr-minus">−</button>
      <span class="current-key">${s.baseKey}</span>
      <button class="tr-btn tr-reset">0</button>
      <button class="tr-btn tr-plus">+</button>
    </div>
    <div class="chords-settings">
      <label class="custom-checkbox">
        <input type="checkbox" id="barre-check" ${s.hasBarre?`checked`:``}>
        <span class="checkmark"></span>
        С баррэ
      </label>
    </div>
    <pre class="chords-content">${c}</pre>
    <div class="tools-row">
      <!-- Теперь эти кнопки работают -->
      <button class="tool-btn open-metro">🎵 Метроном</button>
      <button class="tool-btn" onclick="alert('🎸 Тюнер: в разработке')">🎸 Тюнер</button>
    </div>
  `,i.classList.add(`hidden`),a.classList.remove(`hidden`),o.classList.add(`hidden`),window.scrollTo(0,0),E(s.baseKey.replace(/m|7|sus/g,``)),document.querySelector(`.back-btn`).onclick=()=>{a.classList.add(`hidden`),i.classList.remove(`hidden`)},document.querySelector(`.tr-minus`).onclick=()=>T(-1,s.baseKey.replace(/m|7|sus/g,``)),document.querySelector(`.tr-plus`).onclick=()=>T(1,s.baseKey.replace(/m|7|sus/g,``)),document.querySelector(`.tr-reset`).onclick=()=>{n=0,D(),E(s.baseKey.replace(/m|7|sus/g,``))};let l=document.querySelector(`.open-metro`);l&&(l.onclick=()=>{a.classList.add(`hidden`),o.classList.remove(`hidden`)})}l.addEventListener(`click`,()=>{o.classList.add(`hidden`),a.classList.remove(`hidden`),a.classList.contains(`hidden`)&&i.classList.contains(`hidden`)&&i.classList.remove(`hidden`)}),document.querySelector(`.logo`).addEventListener(`click`,()=>{i.classList.remove(`hidden`),a.classList.add(`hidden`),o.classList.add(`hidden`),w()});function w(){g=!1,u.textContent=`▶ Start`,u.classList.remove(`running`),clearInterval(_)}function T(e,t){n+=e,D(),E(t)}function E(e){let r=(t.indexOf(e)+n)%t.length;r<0&&(r+=t.length);let i=document.querySelector(`.current-key`);i&&(i.textContent=t[r]+`m`)}function D(){let e=JSON.parse(localStorage.getItem(`rusChords_transpose`))||{};e[r]=n,localStorage.setItem(`rusChords_transpose`,JSON.stringify(e))}s.addEventListener(`input`,e=>{let t=e.target.value.toLowerCase().trim();c.forEach(e=>{let n=e.querySelector(`.song-title`).textContent.toLowerCase(),r=e.querySelector(`.song-artist`).textContent.toLowerCase();e.style.display=n.includes(t)||r.includes(t)?`block`:`none`})});