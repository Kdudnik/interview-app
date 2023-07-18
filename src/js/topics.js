import { topicSVGs } from "./utils/topicsSVG";
import { useState } from "./store/useState";
import { switchCards, switchSVG } from "./cards";
import { generateResult } from "./result";
import { cards } from "./cards";
import { dropArea } from "./csv/csvUpload";

const { setActiveTopic, clearLocalState } = useState();

const topicsList = document.querySelector('.navbar-topics ul')
const calculateBtn = document.querySelector('.btn.calculate')
const restartBtn = document.querySelector('.btn.restart')
const navbarBtns = document.querySelector('.navbar-btns-wrapper')

function generateTopics(topics) {
    if (!Array.isArray(topics)) return

    topics.forEach(field => {
        const topicEl = `
            <li class="navbar__topic">
                <a href="#" data-topic="${field.toLowerCase()}">
                    ${topicSVGs[field.toLowerCase()]}
                    ${field}
                </a>
            </li>
            `
        topicsList.insertAdjacentHTML("beforeend", topicEl)
    });
}

function handleClickOnTopic(topicLinkEl) {
    if (!topicLinkEl.dataset.topic) return
    topicsList.querySelectorAll('.navbar__topic a').forEach(el => el.classList.remove('topic--active'))
    topicLinkEl.classList.add('topic--active')

    setActiveTopic(topicLinkEl.dataset.topic);

    switchCards()
    switchSVG()
}

topicsList.addEventListener('click', (event) => handleClickOnTopic(event.target))

calculateBtn.addEventListener('click', () => {
    cards.style.display = "none"
    generateResult()
    window.localStorage.clear()
})

restartBtn.addEventListener('click', () => {
    cards.style.display = "none"
    dropArea.style.display = "flex"
    navbarBtns.style.display = "none"
    topicsList.innerHTML = ""
    clearLocalState()
    window.localStorage.clear()
})

export { generateTopics, handleClickOnTopic, topicsList, navbarBtns }
