import { ROTOR_PERMUTATIONS, ALPHABET } from './constants.js';
import { offsets } from './enigma.js';

const rotorsArea = document.getElementById('rotors-area');
const saveBtn = document.getElementById('rotor-save-btn');
const rotorSound = new Audio("rotorsound.wav");

// Rotor data
let userRotors = ROTOR_PERMUTATIONS.slice(0, 5);
let selectedRotors = [0, 1, 2];
let userOffsets = [0, 0, 0];

function playRotorSound() {
  rotorSound.currentTime = 0;
  rotorSound.volume = 0.3;
  rotorSound.play().catch(() => {});
  setTimeout(() => { rotorSound.pause(); rotorSound.currentTime = 0; }, 50);
}

function renderRotors() {
  rotorsArea.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const row = document.createElement('div');
    row.className = 'rotor-row';

    // Rotor box (editable)
    const box = document.createElement('div');
    box.className = 'rotor-box';
    box.textContent = userRotors[i];
    box.title = "Double-click to edit wiring";
    box.addEventListener('dblclick', () => {
      box.classList.add('editing');
      const input = document.createElement('input');
      input.type = 'text';
      input.value = userRotors[i];
      input.maxLength = 26;
      input.size = 28;
      input.addEventListener('blur', () => {
        if (/^[A-Z]{26}$/.test(input.value)) {
          userRotors[i] = input.value;
          box.textContent = input.value;
        }
        box.classList.remove('editing');
        renderRotors();
      });
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') input.blur();
      });
      box.innerHTML = '';
      box.appendChild(input);
      input.focus();
    });

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'rotor-checkbox';
    checkbox.checked = selectedRotors.includes(i);
    checkbox.addEventListener('change', () => {
      playRotorSound();
      if (checkbox.checked) {
        if (selectedRotors.length < 3) selectedRotors.push(i);
        else checkbox.checked = false;
      } else {
        selectedRotors = selectedRotors.filter(idx => idx !== i);
      }
      renderRotors();
    });

    // Position label (if selected)
    let posLabel = '';
    let offsetBox = null;
    const pos = selectedRotors.indexOf(i);
    if (pos !== -1 && pos < 3) {
      posLabel = `Position ${pos + 1}`;
      // Offset box (editable)
      offsetBox = document.createElement('div');
      offsetBox.className = 'offset-box';
      offsetBox.textContent = ALPHABET[userOffsets[pos]];
      offsetBox.title = "Double-click to edit offset";
      offsetBox.addEventListener('dblclick', () => {
        offsetBox.classList.add('editing');
        const input = document.createElement('input');
        input.type = 'text';
        input.value = offsetBox.textContent;
        input.maxLength = 1;
        input.size = 1;
        input.addEventListener('blur', () => {
          const val = input.value.toUpperCase();
          if (/^[A-Z]$/.test(val)) {
            userOffsets[pos] = ALPHABET.indexOf(val);
            offsetBox.textContent = val;
          }
          offsetBox.classList.remove('editing');
        });
        input.addEventListener('keydown', e => {
          if (e.key === 'Enter') input.blur();
        });
        offsetBox.innerHTML = '';
        offsetBox.appendChild(input);
        input.focus();
      });
    }

    row.appendChild(box);
    row.appendChild(checkbox);
    if (posLabel) {
      const posSpan = document.createElement('span');
      posSpan.className = 'rotor-pos-label';
      posSpan.textContent = posLabel;
      row.appendChild(posSpan);
      if (offsetBox) row.appendChild(offsetBox);
    }
    rotorsArea.appendChild(row);
  }
}

saveBtn.addEventListener('click', () => {
  if (selectedRotors.length !== 3) {
    alert("Select exactly 3 rotors.");
    return;
  }
  // Save rotors and offsets to global
  window.selectedRotorIndices = selectedRotors.slice();
  window.userRotorWiring = selectedRotors.map(i => userRotors[i]);
  window.userRotorOffsets = userOffsets.slice();
  // Set offsets in enigma.js
  offsets[0] = userOffsets[0];
  offsets[1] = userOffsets[1];
  offsets[2] = userOffsets[2];
  playRotorSound();
  alert("Rotor configuration saved.");
});

window.resetOffsetsToConfig = function() {
  if (window.userRotorOffsets) {
    offsets[0] = window.userRotorOffsets[0];
    offsets[1] = window.userRotorOffsets[1];
    offsets[2] = window.userRotorOffsets[2];
  } else {
    offsets[0] = 0; offsets[1] = 0; offsets[2] = 0;
  }
};

document.addEventListener('DOMContentLoaded', renderRotors);
window.renderRotors = renderRotors;
