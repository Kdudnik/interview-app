import * as Papa from "papaparse"
import { generateTopics } from "./generateCSV.js"

function initDropzone() {
  const dropArea = document.getElementById('csvUpload');
  const dzError = dropArea.querySelector('#error')
  const dzSuccess = dropArea.querySelector('#success')

  dropArea.addEventListener('dragenter', (event) => {
    event.stopPropagation();
    event.preventDefault();
    // Style the drag-and-drop as a "copy file" operation.
    if (event.dataTransfer.items.length && event.dataTransfer.items[0].type !== 'text/csv') {
      dzError.style.display = "inline-block"
      dropArea.classList.add('csv-upload--error')
      dzSuccess.style.display = "none"
    } else dropArea.classList.add('csv-upload--allowed')
  });

  dropArea.addEventListener('dragleave', (event) => {
    event.stopPropagation();
    event.preventDefault();
    dropArea.classList.remove('csv-upload--allowed')
    dropArea.classList.remove('csv-upload--error')
    dzError.style.display = "none"
    dzSuccess.style.display = "inline-block"
  });

  dropArea.addEventListener("dragover", (event) => {
    // prevent default to allow drop
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  });

  dropArea.addEventListener('drop', (event) => {
    event.stopPropagation();
    event.preventDefault();
    const fileList = event.dataTransfer.files;
    readCSV(fileList[0])
    dropArea.style.display = "none"
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
    console.error('File is not a csv.', file.type, file);
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