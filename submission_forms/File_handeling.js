const files = [];

function autoGrow(el) {
  el.style.height = '0px';
  el.style.height = el.scrollHeight + 'px';
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('textarea').forEach(ta => {
    ta.style.height = ta.scrollHeight + 'px';
    ta.addEventListener('input', () => autoGrow(ta));
  });
});

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


async function handleSubmit() {

    const formData = new FormData();

    if (files.length > 0) {

        formData.append('file', files[0]);

    }

    try {

        const response = await fetch('http://localhost:4000/api/submission', {

            method: 'POST',

            body: formData

        });

        const data = await response.json();

        if (response.ok) {

            const toast = document.getElementById('toast');

            toast.classList.add('show');

            setTimeout(() => toast.classList.remove('show'), 3000);

        } else {

            alert(data.message);

        }

    } catch (error) {

        alert('Could not connect to server');

    }

}
 