import { switchSVG } from "./cards";
import { topicSVGs } from "./utils/topicsSVG";
import { getQsIndexByTopic } from "./utils/getQsIndexByTopic";
import { generateCardContent } from "./cards";
import { dropArea } from "./csv/csvUpload"
import { useState } from "./store/useState";
import { switchCards } from "./cards";

const { setActiveTopic, getActiveQuestion } = useState();

const topicsList = document.querySelector('.navbar-topics ul')
const restartBtn = document.querySelector('.restart__btn')
const greet = document.querySelector(".greet")

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

topicsList.addEventListener('click', (event) => {
    if (!event.target.dataset.topic) return
    
    // Styling
    restartBtn.style.opacity = "1"
    topicsList.querySelectorAll('.navbar__topic a').forEach(el => el.classList.remove('topic--active'))
    event.target.classList.add('topic--active')

    // save active topic into the local state
    setActiveTopic(event.target.dataset.topic);

    greet.style.display = "none"
    switchCards()

    // if (window.getComputedStyle(cards).getPropertyValue('display') == "none") {
    //     greet.style.display = "none"
    //     cards.style.display = "flex"

    //     switchSVG()
    //     // generateCardContent(getActiveQuestion(), cards.querySelectorAll('.card__side--back'))

    //     cards.style.animation = "block-show 1s forwards"
    // } else {
        
    // }
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

export { generateTopics, topicsList }
