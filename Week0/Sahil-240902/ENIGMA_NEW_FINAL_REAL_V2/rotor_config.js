let rotorSelections = [];
let configuredOffsets = [0, 0, 0];

function openRotorModal() {
  const container = document.getElementById("rotorContainer");
  container.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    const rotorDiv = document.createElement("div");
    rotorDiv.className = "rotor-item";
    rotorDiv.innerHTML = `
      <label>Rotor ${i + 1}:</label>
      <input type="text" maxlength="26" class="rotor-input" placeholder="Permutation">
      <input type="checkbox" class="rotor-check">
      <input type="text" maxlength="1" class="rotor-offset" placeholder="Offset">
    `;
    container.appendChild(rotorDiv);
  }
}

function validateRotors() {
  const inputs = document.querySelectorAll(".rotor-check:checked");
  if (inputs.length !== 3) {
    alert("Please select exactly 3 rotors.");
    return;
  }
  rotorSelections = [];
  document.querySelectorAll(".rotor-check").forEach((cb, idx) => {
    if (cb.checked) {
      const perm = cb.parentElement.querySelector(".rotor-input").value;
      const offset = cb.parentElement.querySelector(".rotor-offset").value.charCodeAt(0) - 65;
      rotorSelections.push({ index: idx, perm, offset });
      configuredOffsets[idx] = offset;
    }
  });
  document.getElementById("rotors-screen").style.display = 'none';
}

function closeHelp() {
  document.getElementById("helpDialog").style.display = 'none';
}
