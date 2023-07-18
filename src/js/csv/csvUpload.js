import { csvRead } from "./csvRead.js";
import { isCSV } from '../utils/isCSV.js'
import { generateSummary } from "../result.js";
import { sortQuestionsFromCSV } from "../utils/questions.js";
import { useState } from "../store/useState.js";
import { generateTopics, handleClickOnTopic, topicsList, navbarBtns } from "../topics.js";
import { cards } from "../cards.js";

const dropArea = document.getElementById('csvUpload');
const dzError = dropArea.querySelector('#error')
const dzSuccess = dropArea.querySelector('#success')
const { setAllQuestions, getAllQuestions, getActiveTopic } = useState();

const csvErrorClass = 'csv-upload--error'
const csvAllowedClass = 'csv-upload--allowed'

// dataset.adminId == Number(dataset.adminId) == +dataset.adminId
// !!getAllQuestions() == !true == false
// !!!getAllQuestions() == !!true == !false == true
if (getAllQuestions().length) {
  dropArea.style.display = "none"
  generateTopics(getAllQuestions().map(item => Object.keys(item)[0]))
  let activeTopicEl = Array.from(document.querySelectorAll('.navbar__topic a')).find(el => {if (el.dataset.topic === getActiveTopic()) return el})
  handleClickOnTopic(activeTopicEl)
  navbarBtns.style.display = "flex"
}

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

  csvRead(file).then((result) => onCSVPromiseResoled(result))
});

dropArea.addEventListener('click', dropZoneClick)

function dropZoneClick() {
  let input = document.createElement('input');
  input.type = 'file';
  input.accept = 'text/csv';
  input.addEventListener("change", () => {
    let fileList = Array.from(input.files);
    csvRead(fileList[0]).then((result) => onCSVPromiseResoled(result))
  });
  input.click();
}

function onCSVPromiseResoled(result) {
  generateTopics(result.meta.fields)

  const sortedQuestions = sortQuestionsFromCSV(result.data);
  setAllQuestions(sortedQuestions)

  generateSummary(result.meta.fields)
  dropArea.style.display = "none"
  cards.style.display = "flex"

  navbarBtns.style.display = "flex"

  handleClickOnTopic(topicsList.querySelector('.navbar__topic a'))
}



export { dropArea }