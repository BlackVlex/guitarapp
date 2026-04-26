// 🎸 RusChords — FULL: Catalog + Chords + Metronome + Tuner + Expanded DB

// ================= БАЗА ДАННЫХ (15 ПЕСЕН) =================
const songsDB = {
  tsoy_sun: { title: "Звезда по имени Солнце", artist: "Виктор Цой", baseKey: "Am", chords: `Am              F\nВ нашем городе дожди...\n\nC               G\nИ не нужны нам небеса...`, hasBarre: true },
  tsoy_pack: { title: "Пачка сигарет", artist: "Виктор Цой", baseKey: "Am", chords: `Am              Dm\nЯ сижу и смотрю в чужое небо...\n\nG               C\nИ мне нравится, когда кто-то рядом...`, hasBarre: false },
  kino: { title: "Группа крови", artist: "Кино", baseKey: "Am", chords: `Am              F\nГруппа крови — на рукаве...\n\nC               G\nМой порядковый номер — на рукаве...`, hasBarre: true },
  ddt: { title: "Что такое осень", artist: "ДДТ", baseKey: "Am", chords: `Am              Dm\nЧто такое осень — это небо...\n\nG               C\nПлачущее небо под ногами...`, hasBarre: false },
  nautilus: { title: "Я хочу быть с тобой", artist: "Наутилус Помпилиус", baseKey: "Am", chords: `Am              G\nЯ хочу быть с тобой...\n\nC               F\nЯ хочу быть с тобой...`, hasBarre: true },
  alisa: { title: "Последний герой", artist: "Алиса", baseKey: "Em", chords: `Em              Am\nКто не спрятался, я не виноват...\n\nD               G\nПоследний герой уходит в закат...`, hasBarre: false },
  splin: { title: "Выхода нет", artist: "Сплин", baseKey: "Am", chords: `Am              F\nВыхода нет, выхода нет...\n\nC               G\nВыхода нет, выхода нет...`, hasBarre: true },
  zemfira: { title: "Искала", artist: "Земфира", baseKey: "Am", chords: `Am              F\nИскала тебя, как потерянную вещь...\n\nC               G\nИскала тебя, как потерянную вещь...`, hasBarre: false },
  bi2: { title: "Полковнику никто не пишет", artist: "Би-2", baseKey: "Am", chords: `Am              F\nМой полковник, никто не пишет...\n\nC               G\nМой полковник, никто не ждёт...`, hasBarre: true },
  kis: { title: "Кукла колдуна", artist: "Король и Шут", baseKey: "Am", chords: `Am              G\nВ доме с привидениями я живу...\n\nC               F\nВ доме с привидениями я живу...`, hasBarre: true },
  mumiy: { title: "Утекай", artist: "Мумий Тролль", baseKey: "Am", chords: `Am              F\nУтекай, утекай, утекай...\n\nC               G\nУтекай, утекай, утекай...`, hasBarre: false },
  aria: { title: "Штиль", artist: "Ария", baseKey: "Em", chords: `Em              Am\nЯ знаю, ты ждёшь...\n\nD               G\nЯ знаю, ты веришь...`, hasBarre: false },
  vysotsky: { title: "Конь", artist: "Владимир Высоцкий", baseKey: "Am", chords: `Am              Dm\nУводил меня отец в далёкий край...\n\nE               Am\nГде рождались кони и горел костёр...`, hasBarre: false },
  lube: { title: "Комбат", artist: "Любэ", baseKey: "Dm", chords: `Dm              Bb\nКомбат, батя, батяня, батя...\n\nC               Dm\nЗемлянка, огонь и гармонь...`, hasBarre: false },
  narodnaya: { title: "В лесу родилась ёлочка", artist: "Народная", baseKey: "C", chords: `C               G7\nВ лесу родилась ёлочка,\nВ лесу она росла...\n\nF               C\nЗимой и летом стройная, зелёная была.`, hasBarre: false }
};

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

// ================= DOM =================
const catalogScreen = document.getElementById('catalog-screen');
const chordsScreen = document.getElementById('chords-screen');
const metronomeScreen = document.getElementById('metronome-screen');
const tunerScreen = document.getElementById('tuner-screen');
const searchInput = document.querySelector('.search-input');
const songCards = document.querySelectorAll('.song-card');

// ================= МЕТРОНОМ =================
let audioCtx = null, isPlaying = false, metroInterval = null, currentBPM = 120, beatCount = 0, beatsPerBar = 4;
const metroBack = document.getElementById('metro-back'), metroToggle = document.getElementById('metro-toggle');
const bpmSlider = document.getElementById('bpm-slider'), bpmValueEl = document.getElementById('bpm-value');
const beatIndicator = document.getElementById('beat-indicator'), timeBtns = document.querySelectorAll('.time-btn');

function playClick(isAccent) {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
  osc.connect(gain); gain.connect(audioCtx.destination);
  osc.frequency.value = isAccent ? 1200 : 800; osc.type = 'sine';
  const now = audioCtx.currentTime;
  gain.gain.setValueAtTime(isAccent ? 0.4 : 0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
  osc.start(now); osc.stop(now + 0.06);
}
function metroTick() {
  const isAccent = (beatCount === 0);
  playClick(isAccent);
  beatIndicator.classList.add('pulse'); bpmValueEl.classList.add('beat');
  setTimeout(() => { beatIndicator.classList.remove('pulse'); bpmValueEl.classList.remove('beat'); }, 100);
  beatCount = (beatCount + 1) % beatsPerBar;
}
metroToggle.addEventListener('click', () => {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  isPlaying = !isPlaying;
  if (isPlaying) {
    metroToggle.textContent = '⏹ Stop'; metroToggle.classList.add('running');
    metroInterval = setInterval(metroTick, (60 / currentBPM) * 1000);
  } else {
    metroToggle.textContent = '▶ Start'; metroToggle.classList.remove('running');
    beatCount = 0; clearInterval(metroInterval);
  }
});
bpmSlider.addEventListener('input', (e) => {
  currentBPM = parseInt(e.target.value); bpmValueEl.textContent = currentBPM;
  if (isPlaying) { clearInterval(metroInterval); metroInterval = setInterval(metroTick, (60 / currentBPM) * 1000); }
});
document.getElementById('bpm-minus').addEventListener('click', () => { if (currentBPM > 40) { currentBPM -= 5; bpmSlider.value = currentBPM; bpmValueEl.textContent = currentBPM; if (isPlaying) { clearInterval(metroInterval); metroInterval = setInterval(metroTick, (60 / currentBPM) * 1000); } } });
document.getElementById('bpm-plus').addEventListener('click', () => { if (currentBPM < 200) { currentBPM += 5; bpmSlider.value = currentBPM; bpmValueEl.textContent = currentBPM; if (isPlaying) { clearInterval(metroInterval); metroInterval = setInterval(metroTick, (60 / currentBPM) * 1000); } } });
timeBtns.forEach(btn => btn.addEventListener('click', () => { timeBtns.forEach(b => b.classList.remove('active')); btn.classList.add('active'); beatsPerBar = parseInt(btn.dataset.beats); beatCount = 0; }));

// ================= ТЮНЕР =================
let tunerCtx = null, tunerAnalyser = null, tunerSource = null, tunerRunning = false, tunerRAF = null;
const tunerToggle = document.getElementById('tuner-toggle'), tunerBack = document.getElementById('tuner-back');
const noteNameEl = document.getElementById('note-name'), freqEl = document.getElementById('frequency');
const needleEl = document.getElementById('meter-needle'), statusEl = document.getElementById('tuner-status');

function autoCorrelate(buf, sampleRate) {
  let SIZE = buf.length, rms = 0;
  for (let i = 0; i < SIZE; i++) rms += buf[i] * buf[i];
  rms = Math.sqrt(rms / SIZE);
  if (rms < 0.01) return -1;
  let r1 = 0, r2 = SIZE - 1, thres = 0.2;
  for (let i = 0; i < SIZE/2; i++) if (Math.abs(buf[i]) < thres) { r1 = i; break; }
  for (let i = 1; i < SIZE/2; i++) if (Math.abs(buf[SIZE-i]) < thres) { r2 = SIZE-i; break; }
  buf = buf.slice(r1, r2); SIZE = buf.length;
  const c = new Array(SIZE).fill(0);
  for (let i = 0; i < SIZE; i++) for (let j = 0; j < SIZE - i; j++) c[i] += buf[j] * buf[j+i];
  let d = 0; while (c[d] > c[d+1]) d++;
  let maxval = -1, maxpos = -1;
  for (let i = d; i < SIZE; i++) { if (c[i] > maxval) { maxval = c[i]; maxpos = i; } }
  let T0 = maxpos;
  const x1 = c[T0-1], x2 = c[T0], x3 = c[T0+1];
  const a = (x1 + x3 - 2*x2)/2, b = (x3 - x1)/2;
  if (a) T0 = T0 - b/(2*a);
  return sampleRate / T0;
}
function getNoteFromFreq(freq) {
  if (!freq || freq < 70 || freq > 400) return null;
  const noteNum = 12 * (Math.log(freq / 440) / Math.log(2)) + 69;
  const noteIndex = Math.round(noteNum) % 12;
  const octave = Math.floor(noteNum / 12) - 1;
  const noteName = NOTES[noteIndex];
  const targetFreq = 440 * Math.pow(2, (Math.round(noteNum) - 69) / 12);
  const cents = 1200 * Math.log(freq / targetFreq) / Math.log(2);
  return { note: noteName, octave, freq: targetFreq, cents, display: noteName + octave };
}
function updateTunerUI(result) {
  if (!result) { noteNameEl.textContent = '--'; freqEl.textContent = '0 Hz'; needleEl.style.left = '50%'; statusEl.textContent = 'Играй громче...'; noteNameEl.className = 'note-name'; needleEl.className = 'meter-needle'; return; }
  noteNameEl.textContent = result.display;
  freqEl.textContent = result.freq.toFixed(1) + ' Hz';
  const pos = 50 + (result.cents / 2);
  needleEl.style.left = Math.max(10, Math.min(90, pos)) + '%';
  if (Math.abs(result.cents) < 5) {
    statusEl.textContent = '✓ В строй!'; noteNameEl.className = 'note-name in-tune'; needleEl.className = 'meter-needle in-tune';
  } else if (result.cents < 0) {
    statusEl.textContent = 'Ниже нормы (подтяни)'; noteNameEl.className = 'note-name flat'; needleEl.className = 'meter-needle';
  } else {
    statusEl.textContent = 'Выше нормы (ослабь)'; noteNameEl.className = 'note-name sharp'; needleEl.className = 'meter-needle';
  }
}
function tunerLoop() {
  if (!tunerRunning || !tunerAnalyser) return;
  const buf = new Float32Array(tunerAnalyser.fftSize);
  tunerAnalyser.getFloatTimeDomainData(buf);
  const freq = autoCorrelate(buf, tunerCtx.sampleRate);
  const result = getNoteFromFreq(freq);
  updateTunerUI(result);
  tunerRAF = requestAnimationFrame(tunerLoop);
}
tunerToggle.addEventListener('click', async () => {
  if (tunerRunning) {
    tunerRunning = false; if (tunerRAF) cancelAnimationFrame(tunerRAF); if (tunerSource) tunerSource.disconnect();
    tunerToggle.textContent = '▶ Старт'; tunerToggle.classList.remove('running'); statusEl.textContent = 'Остановлено'; updateTunerUI(null);
  } else {
    try {
      if (!tunerCtx) tunerCtx = new (window.AudioContext || window.webkitAudioContext)();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false } });
      tunerAnalyser = tunerCtx.createAnalyser(); tunerAnalyser.fftSize = 2048;
      tunerSource = tunerCtx.createMediaStreamSource(stream); tunerSource.connect(tunerAnalyser);
      tunerRunning = true; tunerToggle.textContent = '⏹ Стоп'; tunerToggle.classList.add('running');
      statusEl.textContent = 'Слушаю... сыграй открытую струну'; tunerLoop();
    } catch (err) { statusEl.textContent = '❌ Нет доступа к микрофону'; alert('Разреши доступ к микрофону!'); }
  }
});

// ================= НАВИГАЦИЯ И АККОРДЫ =================
metroBack.addEventListener('click', () => { metronomeScreen.classList.add('hidden'); chordsScreen.classList.remove('hidden'); if (isPlaying) { isPlaying = false; metroToggle.textContent = '▶ Start'; metroToggle.classList.remove('running'); clearInterval(metroInterval); } });
tunerBack.addEventListener('click', () => { tunerScreen.classList.add('hidden'); if (tunerRunning) { tunerRunning = false; if(tunerRAF)cancelAnimationFrame(tunerRAF); if(tunerSource)tunerSource.disconnect(); tunerToggle.textContent='▶ Старт'; tunerToggle.classList.remove('running'); } catalogScreen.classList.remove('hidden'); });

songCards.forEach(card => card.addEventListener('click', () => openChordsScreen(card.dataset.id)));
function openChordsScreen(id) {
  const song = songsDB[id]; if (!song) return;
  const saved = JSON.parse(localStorage.getItem('rusChords_transpose')) || {};
  let transposeStep = saved[id] || 0;
  const chordRegex = /\b([A-G][#b]?m?(?:maj)?(?:7|sus[24]|dim|aug)*)\b/g;
  const highlighted = song.chords.replace(chordRegex, '<span class="chord-highlight">$1</span>');
  
  chordsScreen.innerHTML = `
    <header class="chords-header"><button class="back-btn">←</button><div class="header-info"><h2 class="screen-title">${song.title}</h2><p class="screen-artist">${song.artist}</p></div></header>
    <div class="transpose-block"><button class="tr-btn tr-minus">−</button><span class="current-key">${song.baseKey}</span><button class="tr-btn tr-reset">0</button><button class="tr-btn tr-plus">+</button></div>
    <div class="chords-settings"><label class="custom-checkbox"><input type="checkbox" id="barre-check" ${song.hasBarre?'checked':''}><span class="checkmark"></span>С баррэ</label></div>
    <pre class="chords-content">${highlighted}</pre>
    <div class="tools-row">
      <button class="tool-btn open-metro">🎵 Метроном</button>
      <button class="tool-btn open-tuner">🎸 Тюнер</button>
    </div>`;
  
  catalogScreen.classList.add('hidden'); chordsScreen.classList.remove('hidden'); metronomeScreen.classList.add('hidden'); tunerScreen.classList.add('hidden');
  
  document.querySelector('.back-btn').onclick = () => { chordsScreen.classList.add('hidden'); catalogScreen.classList.remove('hidden'); };
  document.querySelector('.tr-minus').onclick = () => { transposeStep--; saveTranspose(id, transposeStep); updateKeyDisplay(song.baseKey.replace(/m|7|sus/g,''), transposeStep); };
  document.querySelector('.tr-plus').onclick = () => { transposeStep++; saveTranspose(id, transposeStep); updateKeyDisplay(song.baseKey.replace(/m|7|sus/g,''), transposeStep); };
  document.querySelector('.tr-reset').onclick = () => { transposeStep = 0; saveTranspose(id, 0); updateKeyDisplay(song.baseKey.replace(/m|7|sus/g,''), 0); };
  document.querySelector('.open-metro').onclick = () => { chordsScreen.classList.add('hidden'); metronomeScreen.classList.remove('hidden'); };
  document.querySelector('.open-tuner').onclick = () => { chordsScreen.classList.add('hidden'); tunerScreen.classList.remove('hidden'); };
  
  updateKeyDisplay(song.baseKey.replace(/m|7|sus/g,''), transposeStep);
}
function saveTranspose(id, step) { const d = JSON.parse(localStorage.getItem('rusChords_transpose'))||{}; d[id]=step; localStorage.setItem('rusChords_transpose', JSON.stringify(d)); }
function updateKeyDisplay(baseNote, step) { const idx = NOTES.indexOf(baseNote); let ni = (idx + step) % NOTES.length; if (ni<0) ni+=NOTES.length; const el = document.querySelector('.current-key'); if (el) el.textContent = NOTES[ni]+'m'; }

searchInput.addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase().trim();
  songCards.forEach(card => {
    const t = card.querySelector('.song-title').textContent.toLowerCase();
    const a = card.querySelector('.song-artist').textContent.toLowerCase();
    card.style.display = (t.includes(q)||a.includes(q)) ? 'block' : 'none';
  });
});

document.querySelector('.logo').addEventListener('click', () => {
  catalogScreen.classList.remove('hidden');
  [chordsScreen, metronomeScreen, tunerScreen].forEach(s => s.classList.add('hidden'));
  if (isPlaying) { isPlaying=false; metroToggle.textContent='▶ Start'; metroToggle.classList.remove('running'); clearInterval(metroInterval); }
  if (tunerRunning) { tunerRunning=false; if(tunerRAF)cancelAnimationFrame(tunerRAF); if(tunerSource)tunerSource.disconnect(); tunerToggle.textContent='▶ Старт'; tunerToggle.classList.remove('running'); }
});