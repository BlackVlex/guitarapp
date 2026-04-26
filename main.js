const songsDB = {
  tsoy: { title: "Звезда по имени Солнце", artist: "Виктор Цой", baseKey: "Am", chords: `Am              F\nВ нашем городе дожди...\n\nC               G\nИ не нужны нам небеса...`, hasBarre: true },
  vysotsky: { title: "Конь", artist: "Владимир Высоцкий", baseKey: "Am", chords: `Am              Dm\nУводил меня отец в далёкий край...\n\nE               Am\nГде рождались кони и горел костёр...`, hasBarre: false },
  lube: { title: "Комбат", artist: "Любэ", baseKey: "Dm", chords: `Dm              Bb\nКомбат, батя, батяня, батя...\n\nC               Dm\nЗемлянка, огонь и гармонь...`, hasBarre: false },
  narodnaya: { title: "В лесу родилась ёлочка", artist: "Народная", baseKey: "C", chords: `C               G7\nВ лесу родилась ёлочка,\nВ лесу она росла...\n\nF               C\nЗимой и летом стройная, зелёная была.`, hasBarre: false }
};

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
let transposeStep = 0;
let currentSongId = null;

const catalogScreen = document.getElementById('catalog-screen');
const chordsScreen = document.getElementById('chords-screen');
const searchInput = document.querySelector('.search-input');
const songCards = document.querySelectorAll('.song-card');

searchInput.addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase().trim();
  songCards.forEach(card => {
    const title = card.querySelector('.song-title').textContent.toLowerCase();
    const artist = card.querySelector('.song-artist').textContent.toLowerCase();
    card.style.display = (title.includes(q) || artist.includes(q)) ? 'block' : 'none';
  });
});

songCards.forEach(card => card.addEventListener('click', () => openChordsScreen(card.dataset.id)));

function openChordsScreen(id) {
  currentSongId = id;
  const song = songsDB[id];
  if (!song) return;

  const saved = JSON.parse(localStorage.getItem('rusChords_transpose')) || {};
  transposeStep = saved[id] || 0;

  const chordRegex = /\b([A-G][#b]?m?(?:maj)?(?:7|sus[24]|dim|aug)*)\b/g;
  const highlighted = song.chords.replace(chordRegex, '<span class="chord-highlight">$1</span>');

  chordsScreen.innerHTML = `
    <header class="chords-header">
      <button class="back-btn">←</button>
      <div class="header-info">
        <h2 class="screen-title">${song.title}</h2>
        <p class="screen-artist">${song.artist}</p>
      </div>
    </header>
    <div class="transpose-block">
      <button class="tr-btn tr-minus">−</button>
      <span class="current-key">${song.baseKey}</span>
      <button class="tr-btn tr-reset">0</button>
      <button class="tr-btn tr-plus">+</button>
    </div>
    <div class="chords-settings">
      <label class="custom-checkbox">
        <input type="checkbox" id="barre-check" ${song.hasBarre ? 'checked' : ''}>
        <span class="checkmark"></span>
        С баррэ
      </label>
    </div>
    <pre class="chords-content">${highlighted}</pre>
    <div class="tools-row">
      <button class="tool-btn" onclick="alert('🥁 Метроном: подключим на следующем этапе')">🎵 Метроном</button>
      <button class="tool-btn" onclick="alert('🎸 Тюнер: подключим на следующем этапе')">🎸 Тюнер</button>
    </div>
  `;

  catalogScreen.classList.add('hidden');
  chordsScreen.classList.remove('hidden');
  window.scrollTo(0, 0);

  updateKeyDisplay(song.baseKey.replace(/m|7|sus/g, ''));

  document.querySelector('.back-btn').onclick = closeChordsScreen;
  document.querySelector('.tr-minus').onclick = () => changeKey(-1, song.baseKey.replace(/m|7|sus/g, ''));
  document.querySelector('.tr-plus').onclick = () => changeKey(1, song.baseKey.replace(/m|7|sus/g, ''));
  document.querySelector('.tr-reset').onclick = () => {
    transposeStep = 0; saveState(); updateKeyDisplay(song.baseKey.replace(/m|7|sus/g, ''));
  };
}

function closeChordsScreen() {
  chordsScreen.classList.add('hidden');
  catalogScreen.classList.remove('hidden');
}

function changeKey(step, baseNote) {
  transposeStep += step; saveState(); updateKeyDisplay(baseNote);
}

function updateKeyDisplay(baseNote) {
  const idx = NOTES.indexOf(baseNote);
  let newIdx = (idx + transposeStep) % NOTES.length;
  if (newIdx < 0) newIdx += NOTES.length;
  const el = document.querySelector('.current-key');
  if (el) el.textContent = NOTES[newIdx] + 'm';
}

function saveState() {
  const data = JSON.parse(localStorage.getItem('rusChords_transpose')) || {};
  data[currentSongId] = transposeStep;
  localStorage.setItem('rusChords_transpose', JSON.stringify(data));
}