(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={tsoy_sun:{title:`Звезда по имени Солнце`,artist:`Виктор Цой`,baseKey:`Am`,difficulty:`medium`,chords:`Am              F
В нашем городе дожди...

C               G
И не нужны нам небеса...`,hasBarre:!0},tsoy_pack:{title:`Пачка сигарет`,artist:`Виктор Цой`,baseKey:`Am`,difficulty:`easy`,chords:`Am              Dm
Я сижу и смотрю в чужое небо...

G               C
И мне нравится, когда кто-то рядом...`,hasBarre:!1},kino:{title:`Группа крови`,artist:`Кино`,baseKey:`Am`,difficulty:`medium`,chords:`Am              F
Группа крови — на рукаве...

C               G
Мой порядковый номер — на рукаве...`,hasBarre:!0},ddt:{title:`Что такое осень`,artist:`ДДТ`,baseKey:`Am`,difficulty:`easy`,chords:`Am              Dm
Что такое осень — это небо...

G               C
Плачущее небо под ногами...`,hasBarre:!1},nautilus:{title:`Я хочу быть с тобой`,artist:`Наутилус Помпилиус`,baseKey:`Am`,difficulty:`medium`,chords:`Am              G
Я хочу быть с тобой...

C               F
Я хочу быть с тобой...`,hasBarre:!0},alisa:{title:`Последний герой`,artist:`Алиса`,baseKey:`Em`,difficulty:`easy`,chords:`Em              Am
Кто не спрятался, я не виноват...

D               G
Последний герой уходит в закат...`,hasBarre:!1},splin:{title:`Выхода нет`,artist:`Сплин`,baseKey:`Am`,difficulty:`medium`,chords:`Am              F
Выхода нет, выхода нет...

C               G
Выхода нет, выхода нет...`,hasBarre:!0},zemfira:{title:`Искала`,artist:`Земфира`,baseKey:`Am`,difficulty:`easy`,chords:`Am              F
Искала тебя, как потерянную вещь...

C               G
Искала тебя, как потерянную вещь...`,hasBarre:!1},bi2:{title:`Полковнику никто не пишет`,artist:`Би-2`,baseKey:`Am`,difficulty:`medium`,chords:`Am              F
Мой полковник, никто не пишет...

C               G
Мой полковник, никто не ждёт...`,hasBarre:!0},kis:{title:`Кукла колдуна`,artist:`Король и Шут`,baseKey:`Am`,difficulty:`hard`,chords:`Am              G
В доме с привидениями я живу...

C               F
В доме с привидениями я живу...`,hasBarre:!0},mumiy:{title:`Утекай`,artist:`Мумий Тролль`,baseKey:`Am`,difficulty:`easy`,chords:`Am              F
Утекай, утекай, утекай...

C               G
Утекай, утекай, утекай...`,hasBarre:!1},aria:{title:`Штиль`,artist:`Ария`,baseKey:`Em`,difficulty:`medium`,chords:`Em              Am
Я знаю, ты ждёшь...

D               G
Я знаю, ты веришь...`,hasBarre:!1},vysotsky:{title:`Конь`,artist:`Владимир Высоцкий`,baseKey:`Am`,difficulty:`hard`,chords:`Am              Dm
Уводил меня отец в далёкий край...

E               Am
Где рождались кони и горел костёр...`,hasBarre:!1},lube:{title:`Комбат`,artist:`Любэ`,baseKey:`Dm`,difficulty:`easy`,chords:`Dm              Bb
Комбат, батя, батяня, батя...

C               Dm
Землянка, огонь и гармонь...`,hasBarre:!1},narodnaya:{title:`В лесу родилась ёлочка`,artist:`Народная`,baseKey:`C`,difficulty:`easy`,chords:`C               G7
В лесу родилась ёлочка,
В лесу она росла...

F               C
Зимой и летом стройная, зелёная была.`,hasBarre:!1}},t=[`C`,`C#`,`D`,`D#`,`E`,`F`,`F#`,`G`,`G#`,`A`,`A#`,`B`],n=document.getElementById(`catalog-screen`),r=document.getElementById(`chords-screen`),i=document.getElementById(`metronome-screen`),a=document.getElementById(`tuner-screen`),o=document.querySelector(`.search-input`),s=document.querySelectorAll(`.song-card`),c=document.getElementById(`btn-artist`),l=document.getElementById(`btn-diff`),u=document.getElementById(`list-artist`),d=document.getElementById(`list-diff`),f={artist:`all`,difficulty:`all`};function p(){let t=[...new Set(Object.values(e).map(e=>e.artist))].sort();u.innerHTML=`<div class="filter-option active" data-val="all">Все исполнители</div>`,t.forEach(e=>{u.innerHTML+=`<div class="filter-option" data-val="${e}">${e}</div>`}),d.innerHTML=`
    <div class="filter-option active" data-val="all">Любая сложность</div>
    <div class="filter-option" data-val="easy">🟢 Легко</div>
    <div class="filter-option" data-val="medium">🟡 Средне</div>
    <div class="filter-option" data-val="hard">🔴 Сложно</div>
  `,u.querySelectorAll(`.filter-option`).forEach(e=>{e.addEventListener(`click`,()=>{f.artist=e.dataset.val,c.textContent=e.dataset.val===`all`?`Все исполнители ▼`:e.dataset.val+` ▼`,u.classList.add(`hidden`),h(u,e),g()})}),d.querySelectorAll(`.filter-option`).forEach(e=>{e.addEventListener(`click`,()=>{f.difficulty=e.dataset.val,l.textContent={all:`Сложность`,easy:`🟢 Легко`,medium:`🟡 Средне`,hard:`🔴 Сложно`}[e.dataset.val]+` ▼`,d.classList.add(`hidden`),h(d,e),g()})}),c.addEventListener(`click`,e=>{e.stopPropagation(),m(u,d)}),l.addEventListener(`click`,e=>{e.stopPropagation(),m(d,u)}),document.addEventListener(`click`,()=>{u.classList.add(`hidden`),d.classList.add(`hidden`)})}function m(e,t){t.classList.add(`hidden`),e.classList.toggle(`hidden`)}function h(e,t){e.querySelectorAll(`.filter-option`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`)}function g(){let t=o.value.toLowerCase().trim();s.forEach(n=>{let r=e[n.dataset.id];if(!r)return;let i=r.title.toLowerCase().includes(t)||r.artist.toLowerCase().includes(t),a=f.artist===`all`||r.artist===f.artist,o=f.difficulty===`all`||r.difficulty===f.difficulty;i&&a&&o?n.style.display=`block`:n.style.display=`none`})}var _=null,v=!1,y=null,b=120,x=0,S=4,C=document.getElementById(`metro-back`),w=document.getElementById(`metro-toggle`),T=document.getElementById(`bpm-slider`),E=document.getElementById(`bpm-value`),D=document.getElementById(`beat-indicator`),O=document.querySelectorAll(`.time-btn`);function k(e){if(!_)return;let t=_.createOscillator(),n=_.createGain();t.connect(n),n.connect(_.destination),t.frequency.value=e?1200:800,t.type=`sine`;let r=_.currentTime;n.gain.setValueAtTime(e?.4:.2,r),n.gain.exponentialRampToValueAtTime(.001,r+.05),t.start(r),t.stop(r+.06)}function A(){k(x===0),D.classList.add(`pulse`),E.classList.add(`beat`),setTimeout(()=>{D.classList.remove(`pulse`),E.classList.remove(`beat`)},100),x=(x+1)%S}w.addEventListener(`click`,()=>{_||=new(window.AudioContext||window.webkitAudioContext),_.state===`suspended`&&_.resume(),v=!v,v?(w.textContent=`⏹ Stop`,w.classList.add(`running`),y=setInterval(A,60/b*1e3)):(w.textContent=`▶ Start`,w.classList.remove(`running`),x=0,clearInterval(y))}),T.addEventListener(`input`,e=>{b=parseInt(e.target.value),E.textContent=b,v&&(clearInterval(y),y=setInterval(A,60/b*1e3))}),document.getElementById(`bpm-minus`).addEventListener(`click`,()=>{b>40&&(b-=5,T.value=b,E.textContent=b,v&&(clearInterval(y),y=setInterval(A,60/b*1e3)))}),document.getElementById(`bpm-plus`).addEventListener(`click`,()=>{b<200&&(b+=5,T.value=b,E.textContent=b,v&&(clearInterval(y),y=setInterval(A,60/b*1e3)))}),O.forEach(e=>e.addEventListener(`click`,()=>{O.forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),S=parseInt(e.dataset.beats),x=0}));var j=null,M=null,N=null,P=!1,F=null,I=document.getElementById(`tuner-toggle`),L=document.getElementById(`tuner-back`),R=document.getElementById(`note-name`),z=document.getElementById(`frequency`),B=document.getElementById(`meter-needle`),V=document.getElementById(`tuner-status`);function H(e,t){let n=e.length,r=0;for(let t=0;t<n;t++)r+=e[t]*e[t];if(r=Math.sqrt(r/n),r<.01)return-1;let i=0,a=n-1,o=.2;for(let t=0;t<n/2;t++)if(Math.abs(e[t])<o){i=t;break}for(let t=1;t<n/2;t++)if(Math.abs(e[n-t])<o){a=n-t;break}e=e.slice(i,a),n=e.length;let s=Array(n).fill(0);for(let t=0;t<n;t++)for(let r=0;r<n-t;r++)s[t]+=e[r]*e[r+t];let c=0;for(;s[c]>s[c+1];)c++;let l=-1,u=-1;for(let e=c;e<n;e++)s[e]>l&&(l=s[e],u=e);let d=u,f=s[d-1],p=s[d],m=s[d+1],h=(f+m-2*p)/2,g=(m-f)/2;return h&&(d-=g/(2*h)),t/d}function U(e){if(!e||e<70||e>400)return null;let n=12*(Math.log(e/440)/Math.log(2))+69,r=Math.round(n)%12,i=Math.floor(n/12)-1,a=t[r],o=440*2**((Math.round(n)-69)/12);return{note:a,octave:i,freq:o,cents:1200*Math.log(e/o)/Math.log(2),display:a+i}}function W(e){if(!e){R.textContent=`--`,z.textContent=`0 Hz`,B.style.left=`50%`,V.textContent=`Играй громче...`,R.className=`note-name`,B.className=`meter-needle`;return}R.textContent=e.display,z.textContent=e.freq.toFixed(1)+` Hz`;let t=50+e.cents/2;B.style.left=Math.max(10,Math.min(90,t))+`%`,Math.abs(e.cents)<5?(V.textContent=`✓ В строй!`,R.className=`note-name in-tune`,B.className=`meter-needle in-tune`):e.cents<0?(V.textContent=`Ниже нормы (подтяни)`,R.className=`note-name flat`,B.className=`meter-needle`):(V.textContent=`Выше нормы (ослабь)`,R.className=`note-name sharp`,B.className=`meter-needle`)}function G(){if(!P||!M)return;let e=new Float32Array(M.fftSize);M.getFloatTimeDomainData(e),W(U(H(e,j.sampleRate))),F=requestAnimationFrame(G)}I.addEventListener(`click`,async()=>{if(P)P=!1,F&&cancelAnimationFrame(F),N&&N.disconnect(),I.textContent=`▶ Старт`,I.classList.remove(`running`),V.textContent=`Остановлено`,W(null);else try{j||=new(window.AudioContext||window.webkitAudioContext);let e=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!1,noiseSuppression:!1}});M=j.createAnalyser(),M.fftSize=2048,N=j.createMediaStreamSource(e),N.connect(M),P=!0,I.textContent=`⏹ Стоп`,I.classList.add(`running`),V.textContent=`Слушаю... сыграй открытую струну`,G()}catch{V.textContent=`❌ Нет доступа к микрофону`,alert(`Разреши доступ к микрофону!`)}}),C.addEventListener(`click`,()=>{i.classList.add(`hidden`),r.classList.remove(`hidden`),v&&(v=!1,w.textContent=`▶ Start`,w.classList.remove(`running`),clearInterval(y))}),L.addEventListener(`click`,()=>{a.classList.add(`hidden`),P&&(P=!1,F&&cancelAnimationFrame(F),N&&N.disconnect(),I.textContent=`▶ Старт`,I.classList.remove(`running`)),n.classList.remove(`hidden`)}),s.forEach(e=>e.addEventListener(`click`,()=>K(e.dataset.id)));function K(t){let o=e[t];if(!o)return;let s=(JSON.parse(localStorage.getItem(`rusChords_transpose`))||{})[t]||0,c=o.chords.replace(/\b([A-G][#b]?m?(?:maj)?(?:7|sus[24]|dim|aug)*)\b/g,`<span class="chord-highlight">$1</span>`);r.innerHTML=`
    <header class="chords-header"><button class="back-btn">←</button><div class="header-info"><h2 class="screen-title">${o.title}</h2><p class="screen-artist">${o.artist}</p></div></header>
    <div class="transpose-block"><button class="tr-btn tr-minus">−</button><span class="current-key">${o.baseKey}</span><button class="tr-btn tr-reset">0</button><button class="tr-btn tr-plus">+</button></div>
    <div class="chords-settings"><label class="custom-checkbox"><input type="checkbox" id="barre-check" ${o.hasBarre?`checked`:``}><span class="checkmark"></span>С баррэ</label></div>
    <pre class="chords-content">${c}</pre>
    <div class="tools-row">
      <button class="tool-btn open-metro">🎵 Метроном</button>
      <button class="tool-btn open-tuner">🎸 Тюнер</button>
    </div>`,n.classList.add(`hidden`),r.classList.remove(`hidden`),i.classList.add(`hidden`),a.classList.add(`hidden`),document.querySelector(`.back-btn`).onclick=()=>{r.classList.add(`hidden`),n.classList.remove(`hidden`)},document.querySelector(`.tr-minus`).onclick=()=>{s--,q(t,s),J(o.baseKey.replace(/m|7|sus/g,``),s)},document.querySelector(`.tr-plus`).onclick=()=>{s++,q(t,s),J(o.baseKey.replace(/m|7|sus/g,``),s)},document.querySelector(`.tr-reset`).onclick=()=>{s=0,q(t,0),J(o.baseKey.replace(/m|7|sus/g,``),0)},document.querySelector(`.open-metro`).onclick=()=>{r.classList.add(`hidden`),i.classList.remove(`hidden`)},document.querySelector(`.open-tuner`).onclick=()=>{r.classList.add(`hidden`),a.classList.remove(`hidden`)},J(o.baseKey.replace(/m|7|sus/g,``),s)}function q(e,t){let n=JSON.parse(localStorage.getItem(`rusChords_transpose`))||{};n[e]=t,localStorage.setItem(`rusChords_transpose`,JSON.stringify(n))}function J(e,n){let r=(t.indexOf(e)+n)%t.length;r<0&&(r+=t.length);let i=document.querySelector(`.current-key`);i&&(i.textContent=t[r]+`m`)}o.addEventListener(`input`,g),document.querySelector(`.logo`).addEventListener(`click`,()=>{n.classList.remove(`hidden`),[r,i,a].forEach(e=>e.classList.add(`hidden`)),v&&(v=!1,w.textContent=`▶ Start`,w.classList.remove(`running`),clearInterval(y)),P&&(P=!1,F&&cancelAnimationFrame(F),N&&N.disconnect(),I.textContent=`▶ Старт`,I.classList.remove(`running`))}),p();