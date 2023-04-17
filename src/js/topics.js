import { switchSVG } from "./cards";
import { topicSVGs } from "./utils/topicsSVG";
import { generateCardContent } from "./questions";
import { questions } from "./csv/csvUpload"

const topicsList = document.querySelector('.navbar-topics ul')
const cards = document.querySelector(".cards")
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
    greet.style.display = "none"
    cards.style.display = "flex"
    cards.style.animationName = "card-show"
    switchSVG(event)
    const topicQsIndex = questions.findIndex(qsObj => {
        if(Object.keys(qsObj)[0].toLowerCase() === event.target.dataset.topic) {
            return qsObj
        }
    })
    generateCardContent(questions[topicQsIndex], cards.querySelectorAll('.card__side--back'))
})

export { generateTopics }
