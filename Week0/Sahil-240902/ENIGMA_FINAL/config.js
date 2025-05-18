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

document.addEventListener('DOMContentLoaded', () => {
  // Show only the intro screen at first
  document.getElementById('intro-screen').style.display = 'flex';
  document.getElementById('app-container').style.display = 'none';
  document.getElementById('config-modal').style.display = 'none';
  document.getElementById('rotors-screen').style.display = 'none';
  document.getElementById('plugboard-screen').style.display = 'none';

  // When "Start" is clicked, fade out intro and show rotor config
  document.getElementById('start-btn').addEventListener('click', () => {
    const intro = document.getElementById('intro-screen');
    intro.classList.add('fade-out');
    setTimeout(() => {
      intro.style.display = 'none';
      document.getElementById('rotors-screen').style.display = 'flex';
      if (window.renderRotors) window.renderRotors();
    }, 1000); // match your CSS transition
  });

  // When "back" is clicked in rotor config, go to main app
  document.getElementById('rotors-back').addEventListener('click', () => {
    const rotorsScreen = document.getElementById('rotors-screen');
    rotorsScreen.style.animation = 'fadeOut 0.4s ease-out';
    setTimeout(() => {
      rotorsScreen.style.display = 'none';
      rotorsScreen.style.animation = 'fadeIn 0.4s ease-out';
      document.getElementById('app-container').style.display = 'flex';
    }, 350);
  });
});
