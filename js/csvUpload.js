import { generateTopics } from "./generateCSV.js"

function initDropzone() {
  const dropArea = document.getElementById('csvUpload');
  const dzError = dropArea.querySelector('#error')
  const dzSuccess = dropArea.querySelector('#success')

  dropArea.addEventListener('dragstart', (event) => {
    event.stopPropagation();
    event.preventDefault();
    console.log('dragstart', event)
    // Style the drag-and-drop as a "copy file" operation.
    if (event.dataTransfer.items.length && event.dataTransfer.items[0].type !== 'text/csv') {
      dzError.style.display = "inline-block"
      dropArea.style.animation = "dz-error 3s"
      dzSuccess.style.display = "none"
    }
    // event.dataTransfer.dropEffect = 'move';
  });

  dropArea.addEventListener('dragleave', (event) => {
    console.log('dragleave')
    dropArea.style.animation = "none"
    dzError.style.display = "none"
    dzSuccess.style.display = "inline-block"
  })

  dropArea.addEventListener('drop', (event) => {
    event.stopPropagation();
    event.preventDefault();
    const fileList = event.dataTransfer.files;
    readCSV(fileList[0])
  });

  dropArea.addEventListener('click', dropZoneClick)
}

function dropZoneClick() {
  let input = document.createElement('input');
  input.type = 'file';
  input.accept = 'text/csv';
  input.addEventListener("change", (event) => {
    let fileList = Array.from(input.files);
    readCSV(fileList[0])
  });
  input.click();
}

function readCSV(file) {
  if (file.type && file.type !== 'text/csv') {
    console.log('File is not a csv.', file.type, file);
    return;
  }

  const reader = new FileReader();
  reader.readAsText(file);
  reader.addEventListener('load', (event) => {
    const data = Papa.parse(reader.result, { header: true });

    if (data.errors.length) {
      console.error(JSON.stringify(data.errors));

      // document.getElementById('errorMessage').innerHTML = "* Error parsing CSV: " + JSON.stringify(data.errors)
    } else {
      generateTopics(data.meta.fields)
    }
  });
}

export default initDropzone;