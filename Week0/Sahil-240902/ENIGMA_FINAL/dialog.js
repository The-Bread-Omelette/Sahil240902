export function showDialog(title, html) {
  let dialog = document.getElementById('custom-dialog');
  if (!dialog) {
    dialog = document.createElement('div');
    dialog.id = 'custom-dialog';
    dialog.innerHTML = `
      <div class="dialog-bg"></div>
      <div class="dialog-content">
        <h2></h2>
        <div class="dialog-body"></div>
        <button class="dialog-close">Close</button>
      </div>
    `;
    document.body.appendChild(dialog);
    dialog.querySelector('.dialog-close').onclick = () => dialog.style.display = 'none';
    dialog.querySelector('.dialog-bg').onclick = () => dialog.style.display = 'none';
  }
  dialog.querySelector('h2').textContent = title;
  dialog.querySelector('.dialog-body').innerHTML = html;
  dialog.style.display = 'flex';
}
