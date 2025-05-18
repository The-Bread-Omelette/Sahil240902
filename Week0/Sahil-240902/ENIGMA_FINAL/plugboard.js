import { plugboardPairs } from './enigma.js';
import { KEY_LOCATIONS, ALPHABET } from './constants.js';

const plugboardArea = document.getElementById('plugboard-area');
const helpBtn = document.getElementById('plugboard-help');
const helpModal = document.getElementById('plugboard-help-modal');
const helpClose = document.getElementById('plugboard-help-close');

const clickSounds = [
  new Audio("clicksound.wav"),
  new Audio("clicksound1.wav"),
  new Audio("clicksound2.wav"),
  new Audio("clicksound3.wav")
];

function playClick() {
  const sound = clickSounds[Math.floor(Math.random() * clickSounds.length)];
  sound.currentTime = 0;
  sound.volume = 0.2;
  sound.play().catch(() => {});
}

let selected = null;

function setupPlugboardUI() {
  plugboardArea.innerHTML = '';
  // Place keys
  for (let i = 0; i < 26; i++) {
    const letter = ALPHABET[i];
    const pos = KEY_LOCATIONS[i];
    const keyDiv = document.createElement('div');
    keyDiv.className = 'plugboard-key';
    keyDiv.style.left = pos.x + 'px';
    keyDiv.style.top = pos.y + 'px';
    keyDiv.dataset.letter = letter;
    keyDiv.innerHTML = `
      <div class="letter">${letter}</div>
      <div class="indicator"></div>
    `;
    if (plugboardPairs[letter]) keyDiv.classList.add('paired');
    keyDiv.addEventListener('click', () => handleKeyClick(letter, keyDiv));
    plugboardArea.appendChild(keyDiv);
  }
  drawConnections();
}

function handleKeyClick(letter, keyDiv) {
  playClick();
  if (plugboardPairs[letter]) return; // Already paired, ignore single click
  if (selected && selected !== keyDiv) {
    const selectedLetter = selected.dataset.letter;
    if (plugboardPairs[selectedLetter]) return;
    // Pair
    plugboardPairs[letter] = selectedLetter;
    plugboardPairs[selectedLetter] = letter;
    selected.classList.remove('selected');
    selected.classList.add('paired');
    keyDiv.classList.add('paired');
    selected = null;
    drawConnections();
  } else if (!plugboardPairs[letter]) {
    document.querySelectorAll('.plugboard-key.selected').forEach(k => k.classList.remove('selected'));
    keyDiv.classList.add('selected');
    selected = keyDiv;
  }
}

function drawConnections() {
  document.querySelectorAll('.pair-connection').forEach(el => el.remove());
  const done = new Set();
  for (let i = 0; i < 26; i++) {
    const a = ALPHABET[i];
    const b = plugboardPairs[a];
    if (!b || done.has(a) || done.has(b)) continue;
    done.add(a); done.add(b);
    const aEl = document.querySelector(`.plugboard-key[data-letter="${a}"]`);
    const bEl = document.querySelector(`.plugboard-key[data-letter="${b}"]`);
    if (!aEl || !bEl) continue;
    // Position blue rectangle between a and b
    const aRect = aEl.getBoundingClientRect();
    const bRect = bEl.getBoundingClientRect();
    const panelRect = plugboardArea.getBoundingClientRect();
    const x = (aRect.left + bRect.left + aRect.width) / 2 - panelRect.left;
    const y = (aRect.top + bRect.top + aRect.height) / 2 - panelRect.top;
    const conn = document.createElement('div');
    conn.className = 'pair-connection';
    conn.style.left = x + 'px';
    conn.style.top = y + 'px';
    conn.innerHTML = `<span class="pair-letter">${a}</span><span class="exchange">&#x21c4;</span><span class="pair-letter">${b}</span>`;
    conn.addEventListener('dblclick', () => {
      playClick();
      delete plugboardPairs[a];
      delete plugboardPairs[b];
      aEl.classList.remove('paired');
      bEl.classList.remove('paired');
      drawConnections();
    });
    plugboardArea.appendChild(conn);
  }
}

helpBtn.addEventListener('click', () => {
  helpModal.style.display = 'flex';
});
helpClose.addEventListener('click', () => {
  helpModal.style.display = 'none';
});

window.setupPlugboardUI = setupPlugboardUI;
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('plugboard-screen').style.display === 'flex') {
    setupPlugboardUI();
  }
});
