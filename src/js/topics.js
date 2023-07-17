import { topicSVGs } from "./utils/topicsSVG";
import { useState } from "./store/useState";
import { switchCards, switchSVG } from "./cards";
import { generateResult } from "./result";
import { cards } from "./cards";

const { setActiveTopic } = useState();

const topicsList = document.querySelector('.navbar-topics ul')
const calculateBtn = document.querySelector('.btn.calculate')

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

    // Styling
    // TODO: fix - this will execute each time when topic is clicked
    // restartBtn.style.opacity = "1"
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
})

// TODO: move to more 'global' place from where it can iteract with different modules
// restartBtn.addEventListener('click', () => {
//     cards.style.display = "none"
//     cards.style.animation = "block-hide 1s forwards"
//     dropArea.style.display = "flex"
//     dropArea.style.animation = "block-show 1s forwards"
//     topicsList.innerHTML = ""
//     restartBtn.style.opacity = "0"
// })

export { generateTopics, handleClickOnTopic, topicsList }
