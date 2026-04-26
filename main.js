// 🎸 RusChords — FULL VERSION (Catalog + Chords + Metronome)

// ==========================================
// 1. БАЗА ДАННЫХ ПЕСЕН
// ==========================================
const songsDB = {
  tsoy: { title: "Звезда по имени Солнце", artist: "Виктор Цой", baseKey: "Am", chords: `Am              F\nВ нашем городе дожди...\n\nC               G\nИ не нужны нам небеса...`, hasBarre: true },
  vysotsky: { title: "Конь", artist: "Владимир Высоцкий", baseKey: "Am", chords: `Am              Dm\nУводил меня отец в далёкий край...\n\nE               Am\nГде рождались кони и горел костёр...`, hasBarre: false },
  lube: { title: "Комбат", artist: "Любэ", baseKey: "Dm", chords: `Dm              Bb\nКомбат, батя, батяня, батя...\n\nC               Dm\nЗемлянка, огонь и гармонь...`, hasBarre: false },
  narodnaya: { title: "В лесу родилась ёлочка", artist: "Народная", baseKey: "C", chords: `C               G7\nВ лесу родилась ёлочка,\nВ лесу она росла...\n\nF               C\nЗимой и летом стройная, зелёная была.`, hasBarre: false }
};

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
let transposeStep = 0;
let currentSongId = null;

// ==========================================
// 2. ЭЛЕМЕНТЫ DOM
// ==========================================
// Экраны
const catalogScreen = document.getElementById('catalog-screen');
const chordsScreen = document.getElementById('chords-screen');
const metronomeScreen = document.getElementById('metronome-screen');

// Элементы каталога
const searchInput = document.querySelector('.search-input');
const songCards = document.querySelectorAll('.song-card');

// Элементы метронома
const metroBack = document.getElementById('metro-back');
const metroToggle = document.getElementById('metro-toggle');
const bpmSlider = document.getElementById('bpm-slider');
const bpmValueEl = document.getElementById('bpm-value');
const beatIndicator = document.getElementById('beat-indicator');
const timeBtns = document.querySelectorAll('.time-btn');

// ==========================================
// 3. ЛОГИКА МЕТРОНОМА (Web Audio API)
// ==========================================
let audioCtx = null;
let isPlaying = false;
let intervalId = null;
let currentBPM = 120;
let beatCount = 0;
let beatsPerBar = 4; // 4/4 по умолчанию

// Функция создания звука
function playClick(isAccent) {
  if (!audioCtx) return;
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  // Частота: Акцент выше (1200 Гц), обычный удар ниже (800 Гц)
  osc.frequency.value = isAccent ? 1200 : 800;
  osc.type = 'sine';
  
  // Громкость: Короткий импульс
  const now = audioCtx.currentTime;
  gain.gain.setValueAtTime(isAccent ? 0.4 : 0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
  
  osc.start(now);
  osc.stop(now + 0.06);
}

// Основной тик
function tick() {
  const isAccent = (beatCount === 0);
  
  // Звук
  playClick(isAccent);
  
  // Визуал (пульсация)
  beatIndicator.classList.add('pulse');
  bpmValueEl.classList.add('beat');
  
  // Сброс визуала через 100мс
  setTimeout(() => {
    beatIndicator.classList.remove('pulse');
    bpmValueEl.classList.remove('beat');
  }, 100);
  
  // Счётчик тактов
  beatCount++;
  if (beatCount >= beatsPerBar) beatCount = 0;
}

// Старт/Стоп
metroToggle.addEventListener('click', () => {
  // Инициализация AudioContext (требуется клик пользователя)
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  
  isPlaying = !isPlaying;
  
  if (isPlaying) {
    // Настройки UI
    metroToggle.textContent = '⏹ Stop';
    metroToggle.classList.add('running');
    
    // Запуск таймера
    const intervalMs = (60 / currentBPM) * 1000;
    intervalId = setInterval(tick, intervalMs);
  } else {
    // Настройки UI
    metroToggle.textContent = '▶ Start';
    metroToggle.classList.remove('running');
    beatCount = 0; // Сброс счётчика
    
    clearInterval(intervalId);
  }
});

// Изменение BPM
bpmSlider.addEventListener('input', (e) => {
  currentBPM = parseInt(e.target.value);
  bpmValueEl.textContent = currentBPM;
  
  // Если метроном играет, перезапускаем с новым темпом
  if (isPlaying) {
    clearInterval(intervalId);
    const intervalMs = (60 / currentBPM) * 1000;
    intervalId = setInterval(tick, intervalMs);
  }
});

// Кнопки +/- BPM
document.getElementById('bpm-minus').addEventListener('click', () => {
  if (currentBPM > 40) {
    currentBPM -= 5;
    bpmSlider.value = currentBPM;
    bpmValueEl.textContent = currentBPM;
    if (isPlaying) { clearInterval(intervalId); intervalId = setInterval(tick, (60 / currentBPM) * 1000); }
  }
});
document.getElementById('bpm-plus').addEventListener('click', () => {
  if (currentBPM < 200) {
    currentBPM += 5;
    bpmSlider.value = currentBPM;
    bpmValueEl.textContent = currentBPM;
    if (isPlaying) { clearInterval(intervalId); intervalId = setInterval(tick, (60 / currentBPM) * 1000); }
  }
});

// Выбор размера такта (4/4, 3/4, 6/8)
timeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Убираем активный класс у всех
    timeBtns.forEach(b => b.classList.remove('active'));
    // Добавляем нажатому
    btn.classList.add('active');
    
    // Устанавливаем ритм
    beatsPerBar = parseInt(btn.dataset.beats);
    beatCount = 0;
    
    // Для 6/8 звук будет быстрее (восьмые), но визуально оставим 6 ударов
    // (для простоты в этой версии каждый удар равен четверти)
  });
});

// ==========================================
// 4. НАВИГАЦИЯ И СТАРЫЙ ФУНКЦИОНАЛ
// ==========================================

// Открытие аккордов
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
      <!-- Теперь эти кнопки работают -->
      <button class="tool-btn open-metro">🎵 Метроном</button>
      <button class="tool-btn" onclick="alert('🎸 Тюнер: в разработке')">🎸 Тюнер</button>
    </div>
  `;

  catalogScreen.classList.add('hidden');
  chordsScreen.classList.remove('hidden');
  metronomeScreen.classList.add('hidden'); // Скрываем метроном если был открыт
  window.scrollTo(0, 0);

  updateKeyDisplay(song.baseKey.replace(/m|7|sus/g, ''));

  document.querySelector('.back-btn').onclick = () => {
    chordsScreen.classList.add('hidden');
    catalogScreen.classList.remove('hidden');
  };

  // Привязка логики аккордов
  document.querySelector('.tr-minus').onclick = () => changeKey(-1, song.baseKey.replace(/m|7|sus/g, ''));
  document.querySelector('.tr-plus').onclick = () => changeKey(1, song.baseKey.replace(/m|7|sus/g, ''));
  document.querySelector('.tr-reset').onclick = () => { transposeStep = 0; saveState(); updateKeyDisplay(song.baseKey.replace(/m|7|sus/g, '')); };
  
  // Привязка кнопки МЕТРОНОМ внутри аккордов
  const openMetroBtn = document.querySelector('.open-metro');
  if (openMetroBtn) {
    openMetroBtn.onclick = () => {
      chordsScreen.classList.add('hidden');
      metronomeScreen.classList.remove('hidden');
    };
  }
}

// Открытие метронома (прямая навигация)
metroBack.addEventListener('click', () => {
  metronomeScreen.classList.add('hidden');
  chordsScreen.classList.remove('hidden'); // Возврат на аккорды
  // Если был на каталоге, вернет на каталог (нужно запоминать стек, но для простоты вернем на аккорды)
  // Если аккорды не открыты, вернем на каталог:
  if (chordsScreen.classList.contains('hidden') && catalogScreen.classList.contains('hidden')) {
     catalogScreen.classList.remove('hidden');
  }
});

// Функция закрытия всех экранов и возврата на главную (для логотипа)
document.querySelector('.logo').addEventListener('click', () => {
  catalogScreen.classList.remove('hidden');
  chordsScreen.classList.add('hidden');
  metronomeScreen.classList.add('hidden');
  stopMetronomeHelper();
});

function stopMetronomeHelper() {
  isPlaying = false;
  metroToggle.textContent = '▶ Start';
  metroToggle.classList.remove('running');
  clearInterval(intervalId);
}

// Логика транспозиции (старая)
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

// Поиск (старый)
searchInput.addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase().trim();
  songCards.forEach(card => {
    const title = card.querySelector('.song-title').textContent.toLowerCase();
    const artist = card.querySelector('.song-artist').textContent.toLowerCase();
    card.style.display = (title.includes(q) || artist.includes(q)) ? 'block' : 'none';
  });
});