import { plugboardPairs } from './enigma.js';

const plugboardContainer = document.getElementById("plugboardUI");
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let firstSelected = null;

alphabet.split('').forEach(letter => {
  const element = document.createElement("div");
  element.classList.add("plugboard-letter");
  element.setAttribute("data-letter", letter);
  element.innerHTML = `<span>${letter}</span><div class='light'></div>`;
  element.addEventListener("click", () => handlePlugClick(letter));
  plugboardContainer.appendChild(element);
});

function handlePlugClick(letter) {
  const elem = document.querySelector(`[data-letter='${letter}'] .light`);
  if (plugboardPairs[letter]) return;

  if (!firstSelected) {
    firstSelected = letter;
    elem.classList.add("active");
  } else {
    plugboardPairs[firstSelected] = letter;
    plugboardPairs[letter] = firstSelected;
    animateConnection(firstSelected, letter);
    document.querySelector(`[data-letter='${firstSelected}'] .light`).classList.remove("active");
    firstSelected = null;
  }
}

function animateConnection(a, b) {
  const rectA = document.querySelector(`[data-letter='${a}']`).getBoundingClientRect();
  const rectB = document.querySelector(`[data-letter='${b}']`).getBoundingClientRect();
  const line = document.createElement("div");
  line.className = "connection";
  // You can calculate and style this line if needed
  document.body.appendChild(line);
}
