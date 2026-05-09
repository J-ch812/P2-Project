

const files = [];

//Auto Grop sections: "Your content, input and feedback" & "Additional comments or suggestions"
function autoGrow(el) {
  const styles = getComputedStyle(el);
  const maxHeight = parseInt(styles.maxHeight) || Infinity;

  el.style.height = 'auto'; // better than 0px // '0px' = reset so scrollHeight is accurate
  
  if (el.scrollHeight > maxHeight) {
    el.style.height = maxHeight + 'px';
    el.style.overflowY = 'auto';
  } else {
    el.style.height = el.scrollHeight + 'px';
    el.style.overflowY = 'hidden';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('textarea').forEach(ta => {
    autoGrow(ta);
    ta.addEventListener('input', () => autoGrow(ta));
  });
});


//Can upload files in section: "Attachments"
function openFilePicker(event) {
  // Don't trigger if clicking inside file list or on a button
  if (event.target.closest('.file_list') || event.target.closest('button')) {
    return;
  }
  document.getElementById('fileInput').click();
}

function addFiles(newFiles) {
  Array.from(newFiles).forEach(f => {
    if (!files.find(x => x.name === f.name)) files.push(f);
  });
  renderFiles();
}

function renderFiles() {
  const list = document.getElementById('fileList');
  list.innerHTML = files.map((f, i) =>
    `<div class="file_item" onclick="event.stopPropagation()">
      <span>📄 ${f.name}</span>
      <button onclick="event.stopPropagation(); removeFile(${i})" title="Remove">✕</button>
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
 