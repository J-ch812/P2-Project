const files = [];

function addFiles(newFiles) {
  Array.from(newFiles).forEach(f => {
    if (!files.find(x => x.name === f.name)) files.push(f);
  });
  renderFiles();
}

function renderFiles() {
  const list = document.getElementById('fileList');
  list.innerHTML = files.map((f, i) =>
    `<div class="file-item">
      <span>📄 ${f.name}</span>
      <button onclick="removeFile(${i})" title="Remove">✕</button>
    </div>`
  ).join('');
}

function removeFile(i) {
  files.splice(i, 1);
  renderFiles();
}

function handleSubmit() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}
