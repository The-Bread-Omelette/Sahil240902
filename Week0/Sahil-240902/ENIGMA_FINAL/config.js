const configBtn = document.getElementById('config-btn');
const configModal = document.getElementById('config-modal');
const configRotorsBtn = document.getElementById('config-rotors-btn');
const configPlugboardBtn = document.getElementById('config-plugboard-btn');
const plugboardScreen = document.getElementById('plugboard-screen');
const rotorsScreen = document.getElementById('rotors-screen');
const plugboardBackBtn = document.getElementById('plugboard-back');
const rotorsBackBtn = document.getElementById('rotors-back');

configBtn.addEventListener('click', () => {
  configModal.style.display = 'flex';
});
configPlugboardBtn.addEventListener('click', () => {
  configModal.style.display = 'none';
  plugboardScreen.style.display = 'flex';
  window.setupPlugboardUI();
});
configRotorsBtn.addEventListener('click', () => {
  configModal.style.display = 'none';
  rotorsScreen.style.display = 'flex';
  window.renderRotors();
});
plugboardBackBtn.addEventListener('click', () => {
  plugboardScreen.style.animation = 'fadeOut 0.4s ease-out';
  setTimeout(() => {
    plugboardScreen.style.display = 'none';
    plugboardScreen.style.animation = 'fadeIn 0.4s ease-out';
  }, 350);
});
rotorsBackBtn.addEventListener('click', () => {
  rotorsScreen.style.animation = 'fadeOut 0.4s ease-out';
  setTimeout(() => {
    rotorsScreen.style.display = 'none';
    rotorsScreen.style.animation = 'fadeIn 0.4s ease-out';
  }, 350);
});
