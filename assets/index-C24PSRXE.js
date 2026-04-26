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
Зимой и летом стройная, зелёная была.`,hasBarre:!1}},t=[`C`,`C#`,`D`,`D#`,`E`,`F`,`F#`,`G`,`G#`,`A`,`A#`,`B`],n=0,r=null,i=document.getElementById(`catalog-screen`),a=document.getElementById(`chords-screen`),o=document.querySelector(`.search-input`),s=document.querySelectorAll(`.song-card`);o.addEventListener(`input`,e=>{let t=e.target.value.toLowerCase().trim();s.forEach(e=>{let n=e.querySelector(`.song-title`).textContent.toLowerCase(),r=e.querySelector(`.song-artist`).textContent.toLowerCase();e.style.display=n.includes(t)||r.includes(t)?`block`:`none`})}),s.forEach(e=>e.addEventListener(`click`,()=>c(e.dataset.id)));function c(t){r=t;let o=e[t];if(!o)return;n=(JSON.parse(localStorage.getItem(`rusChords_transpose`))||{})[t]||0;let s=o.chords.replace(/\b([A-G][#b]?m?(?:maj)?(?:7|sus[24]|dim|aug)*)\b/g,`<span class="chord-highlight">$1</span>`);a.innerHTML=`
    <header class="chords-header">
      <button class="back-btn">←</button>
      <div class="header-info">
        <h2 class="screen-title">${o.title}</h2>
        <p class="screen-artist">${o.artist}</p>
      </div>
    </header>
    <div class="transpose-block">
      <button class="tr-btn tr-minus">−</button>
      <span class="current-key">${o.baseKey}</span>
      <button class="tr-btn tr-reset">0</button>
      <button class="tr-btn tr-plus">+</button>
    </div>
    <div class="chords-settings">
      <label class="custom-checkbox">
        <input type="checkbox" id="barre-check" ${o.hasBarre?`checked`:``}>
        <span class="checkmark"></span>
        С баррэ
      </label>
    </div>
    <pre class="chords-content">${s}</pre>
    <div class="tools-row">
      <button class="tool-btn" onclick="alert('🥁 Метроном: подключим на следующем этапе')">🎵 Метроном</button>
      <button class="tool-btn" onclick="alert('🎸 Тюнер: подключим на следующем этапе')">🎸 Тюнер</button>
    </div>
  `,i.classList.add(`hidden`),a.classList.remove(`hidden`),window.scrollTo(0,0),d(o.baseKey.replace(/m|7|sus/g,``)),document.querySelector(`.back-btn`).onclick=l,document.querySelector(`.tr-minus`).onclick=()=>u(-1,o.baseKey.replace(/m|7|sus/g,``)),document.querySelector(`.tr-plus`).onclick=()=>u(1,o.baseKey.replace(/m|7|sus/g,``)),document.querySelector(`.tr-reset`).onclick=()=>{n=0,f(),d(o.baseKey.replace(/m|7|sus/g,``))}}function l(){a.classList.add(`hidden`),i.classList.remove(`hidden`)}function u(e,t){n+=e,f(),d(t)}function d(e){let r=(t.indexOf(e)+n)%t.length;r<0&&(r+=t.length);let i=document.querySelector(`.current-key`);i&&(i.textContent=t[r]+`m`)}function f(){let e=JSON.parse(localStorage.getItem(`rusChords_transpose`))||{};e[r]=n,localStorage.setItem(`rusChords_transpose`,JSON.stringify(e))}