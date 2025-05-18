import { offsets, plugboardPairs, enigmaImage } from './enigma.js';
import { redrawAll } from './helper.js';
import { KEY_LOCATIONS } from './constants.js';

// --- Sounds ---
const clickSound = new Audio('clicksound.wav');
const pairSound = new Audio('pair.wav');
const unpairSound = new Audio('unpair.wav');

// DOM Elements
const configBtn = document.getElementById('config-btn');
const configModal = document.getElementById('config-modal');
const configRotorsBtn = document.getElementById('config-rotors-btn');
const configPlugboardBtn = document.getElementById('config-plugboard-btn');
const plugboardScreen = document.getElementById('plugboard-screen');
const rotorsScreen = document.getElementById('rotors-screen');
const plugboardBackBtn = document.getElementById('plugboard-back');
const rotorsBackBtn = document.getElementById('rotors-back');
const plugboardHelpBtn = document.getElementById('plugboard-help');
const plugboardArea = document.getElementById('plugboard-area');
const rotorsArea = document.getElementById('rotors-area');

// --- QWERTZ Layout for plugboard ---
const QWERTZ_LAYOUT = [
  ['Q','W','E','R','T','Z','U','I','O'],
  ['A','S','D','F','G','H','J','K','L'],
  ['P','Y','X','C','V','B','N','M']
];

// --- PLUGBOARD UI ---

configPlugboardBtn.addEventListener('click', () => {
  configModal.style.display = 'none';
  plugboardScreen.style.display = 'flex';
  setupPlugboardUI();
});

plugboardBackBtn.addEventListener('click', () => {
  plugboardScreen.style.animation = 'fadeOut 0.4s ease-out';
  setTimeout(() => {
    plugboardScreen.style.display = 'none';
    plugboardScreen.style.animation = 'fadeIn 0.4s ease-out';
  }, 350);
});

// Plugboard pairing logic
let plugboardSelected = null;
function setupPlugboardUI() {
  plugboardArea.innerHTML = '';
  // "Wooden" background
  plugboardArea.style.background = "url('wood.jpg') center/cover no-repeat";

  // Arrange keys in QWERTZ layout, spaced out
  const rowOffsets = [0, 120, 240];
  QWERTZ_LAYOUT.forEach((row, rowIdx) => {
    row.forEach((letter, colIdx) => {
      const keyEl = document.createElement('div');
      keyEl.className = 'plugboard-key';
      keyEl.dataset.letter = letter;
      keyEl.style.left = `${160 + colIdx * 110 + (rowIdx === 1 ? 55 : 0)}px`;
      keyEl.style.top = `${120 + rowOffsets[rowIdx]}px`;
      keyEl.innerHTML = `
        <span class="plug-letter">${letter}</span>
        <span class="plug-led ${plugboardPairs[letter] ? 'on' : ''}"></span>
      `;
      if (plugboardPairs[letter]) keyEl.classList.add('paired');
      keyEl.addEventListener('click', () => handlePlugboardKeyClick(letter, keyEl));
      plugboardArea.appendChild(keyEl);
    });
  });
  updatePlugboardConnections();
}

function handlePlugboardKeyClick(letter, keyEl) {
  clickSound.currentTime = 0; clickSound.play();
  if (plugboardPairs[letter]) return; // Already paired, ignore single click
  if (plugboardSelected && plugboardSelected !== letter) {
    if (plugboardPairs[plugboardSelected]) return;
    // Pair them
    plugboardPairs[letter] = plugboardSelected;
    plugboardPairs[plugboardSelected] = letter;
    pairSound.currentTime = 0; pairSound.play();
    plugboardSelected = null;
    document.querySelectorAll('.plugboard-key.selected').forEach(k => k.classList.remove('selected'));
    updatePlugboardConnections();
    setupPlugboardUI();
  } else {
    // Select for pairing
    document.querySelectorAll('.plugboard-key.selected').forEach(k => k.classList.remove('selected'));
    keyEl.classList.add('selected');
    plugboardSelected = letter;
  }
}

function updatePlugboardConnections() {
  document.querySelectorAll('.pair-connection').forEach(el => el.remove());
  const processed = new Set();
  for (const letter in plugboardPairs) {
    const pairLetter = plugboardPairs[letter];
    const key = [letter, pairLetter].sort().join('');
    if (processed.has(key)) continue;
    processed.add(key);

    const el1 = document.querySelector(`.plugboard-key[data-letter="${letter}"]`);
    const el2 = document.querySelector(`.plugboard-key[data-letter="${pairLetter}"]`);
    if (!el1 || !el2) continue;

    // Find center between the two
    const r1 = el1.getBoundingClientRect();
    const r2 = el2.getBoundingClientRect();
    const areaRect = plugboardArea.getBoundingClientRect();
    const centerX = ((r1.left + r1.right) / 2 + (r2.left + r2.right) / 2) / 2 - areaRect.left;
    const centerY = ((r1.top + r1.bottom) / 2 + (r2.top + r2.bottom) / 2) / 2 - areaRect.top;

    const conn = document.createElement('div');
    conn.className = 'pair-connection pair-appear';
    conn.style.left = `${centerX}px`;
    conn.style.top = `${centerY}px`;
    conn.innerHTML = `
      <span class="pair-letter">${letter}</span>
      <span class="exchange">&#8646;</span>
      <span class="pair-letter">${pairLetter}</span>
    `;
    plugboardArea.appendChild(conn);

    // Double-click to unpair
    conn.addEventListener('dblclick', () => {
      delete plugboardPairs[letter];
      delete plugboardPairs[pairLetter];
      unpairSound.currentTime = 0; unpairSound.play();
      conn.classList.add('pair-disappear');
      setTimeout(() => conn.remove(), 350);
      setupPlugboardUI();
    });
  }
}

// --- PLUGBOARD HELP MODAL ---
plugboardHelpBtn.addEventListener('click', () => {
  let modal = document.getElementById('plugboard-help-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'plugboard-help-modal';
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <h3>Plugboard Help</h3>
        <ul>
          <li>Click a letter to select it for pairing.</li>
          <li>Click another letter to create a connection.</li>
          <li>Double-click a blue connection rectangle to remove the pair.</li>
          <li>Connected letters will be swapped during encryption.</li>
        </ul>
        <button id="close-help-modal">Close</button>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('close-help-modal').onclick = () => {
      modal.style.display = 'none';
    };
  }
  modal.style.display = 'flex';
});

// --- ROTOR CONFIGURATION UI ---

// Rotor data
let rotorConfigs = [
  { perm: "EKMFLGDQVZNTOWYHXUSPAIBRCJ", offset: 0, selected: true },
  { perm: "AJDKSIRUXBLHWTMCQGZNPYFVOE", offset: 0, selected: true },
  { perm: "BDFHJLCPRTXVZNYEIWGAKMUSQO", offset: 0, selected: true },
  { perm: "VZBRGITYUPSDNHLXAWMJQOFECK", offset: 0, selected: false },
  { perm: "JPGVOUMFYQBENHZRDKASXLICTW", offset: 0, selected: false }
];

configRotorsBtn.addEventListener('click', () => {
  configModal.style.display = 'none';
  rotorsScreen.style.display = 'flex';
  setupRotorUI();
});

rotorsBackBtn.addEventListener('click', () => {
  rotorsScreen.style.animation = 'fadeOut 0.4s ease-out';
  setTimeout(() => {
    rotorsScreen.style.display = 'none';
    rotorsScreen.style.animation = 'fadeIn 0.4s ease-out';
  }, 350);
});

function setupRotorUI() {
  rotorsArea.innerHTML = '';
  rotorConfigs.forEach((rotor, idx) => {
    const div = document.createElement('div');
    div.className = 'rotor-config';
    div.innerHTML = `
      <input type="checkbox" class="rotor-select" data-idx="${idx}" ${rotor.selected ? 'checked' : ''}>
      <span class="rotor-label">Rotor ${idx + 1}</span>
      <span class="rotor-perm" data-idx="${idx}" title="Double-click to edit">${rotor.perm}</span>
      <span class="rotor-offset" data-idx="${idx}" title="Double-click to edit">${String.fromCharCode(65 + rotor.offset)}</span>
    `;
    rotorsArea.appendChild(div);
  });

  // Checkbox logic (only 3 allowed)
  rotorsArea.querySelectorAll('.rotor-select').forEach(cb => {
    cb.addEventListener('change', function() {
      const idx = +this.dataset.idx;
      rotorConfigs[idx].selected = this.checked;
      if (rotorConfigs.filter(r => r.selected).length > 3) {
        this.checked = false;
        rotorConfigs[idx].selected = false;
        alert('You can select only 3 rotors.');
      }
      setupRotorUI();
    });
  });

  // Double-click to edit permutation
  rotorsArea.querySelectorAll('.rotor-perm').forEach(span => {
    span.addEventListener('dblclick', function() {
      const idx = +this.dataset.idx;
      const input = document.createElement('input');
      input.type = 'text';
      input.maxLength = 26;
      input.value = rotorConfigs[idx].perm;
      input.style.width = '340px';
      input.addEventListener('blur', function() {
        if (/^[A-Z]{26}$/.test(this.value)) {
          rotorConfigs[idx].perm = this.value.toUpperCase();
          span.textContent = this.value.toUpperCase();
        }
        span.style.display = '';
        input.remove();
      });
      span.parentNode.insertBefore(input, span);
      span.style.display = 'none';
      input.focus();
    });
  });

  // Double-click to edit offset
  rotorsArea.querySelectorAll('.rotor-offset').forEach(span => {
    span.addEventListener('dblclick', function() {
      const idx = +this.dataset.idx;
      const input = document.createElement('input');
      input.type = 'text';
      input.maxLength = 1;
      input.value = String.fromCharCode(65 + rotorConfigs[idx].offset);
      input.style.width = '30px';
      input.addEventListener('blur', function() {
        const val = this.value.toUpperCase();
        if (/^[A-Z]$/.test(val)) {
          rotorConfigs[idx].offset = val.charCodeAt(0) - 65;
          span.textContent = val;
        }
        span.style.display = '';
        input.remove();
      });
      span.parentNode.insertBefore(input, span);
      span.style.display = 'none';
      input.focus();
    });
  });

  // Save button
  if (!document.getElementById('rotors-save')) {
    const btn = document.createElement('button');
    btn.id = 'rotors-save';
    btn.className = 'vintage-btn';
    btn.textContent = 'Save Rotors';
    btn.style.marginTop = '30px';
    rotorsScreen.appendChild(btn);
    btn.addEventListener('click', () => {
      const selected = rotorConfigs.filter(r => r.selected);
      if (selected.length !== 3) {
        alert('Please select exactly 3 rotors.');
        return;
      }
      // Update global permutations and offsets
      window.ROTOR_PERMUTATIONS = selected.map(r => r.perm);
      window.offsets = selected.map(r => r.offset);
      rotorsScreen.style.display = 'none';
    });
  }
}
