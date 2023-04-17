import { generateTopics } from "../topics.js";
import { csvRead } from "./csvRead.js";
import { isCSV } from '../utils/isCSV.js'
import { generateSummary } from "../result.js";
import { getQuestions } from "../questions.js";

const dropArea = document.getElementById('csvUpload');
const greet = document.querySelector('.greet')
const dzError = dropArea.querySelector('#error')
const dzSuccess = dropArea.querySelector('#success')

const csvErrorClass = 'csv-upload--error'
const csvAllowedClass = 'csv-upload--allowed'

let questions = []

dropArea.addEventListener('dragenter', (event) => {
  event.stopPropagation();
  event.preventDefault();
  // Style the drag-and-drop as a "copy file" operation.
  if (isCSV(event.dataTransfer.items[0]?.type)) {
    dropArea.classList.add(csvAllowedClass)
  } else {
    dzError.style.display = "inline-block"
    dropArea.classList.add(csvErrorClass)
    dzSuccess.style.display = "none"
  }

});

dropArea.addEventListener('dragleave', (event) => {
  event.stopPropagation();
  event.preventDefault();
  dropArea.classList.remove(csvAllowedClass)
  dropArea.classList.remove(csvErrorClass)
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
  const file = event.dataTransfer.files[0];

  if (!isCSV(file?.type)) {
    console.error('File is not a csv.', file.type, file);
    return;
  }

  const csvDataPromise = csvRead(file)
  csvDataPromise.then((result) => { 
    generateTopics(result.meta.fields)
    questions = getQuestions(result.data)
    generateSummary(result.meta.fields)
    dropArea.style.display = "none"
    greet.style.display = "flex"
  })
});

dropArea.addEventListener('click', dropZoneClick)

function dropZoneClick() {
  let input = document.createElement('input');
  input.type = 'file';
  input.accept = 'text/csv';
  input.addEventListener("change", (event) => {
    let fileList = Array.from(input.files);
    csvRead(fileList[0]).then((result) => {
      generateTopics(result.meta.fields)
      questions = getQuestions(result.data)
      generateSummary(result.meta.fields)
      dropArea.style.display = "none"
      // greet.style.display = "flex"
    })
  });
  input.click();
}

export { questions }