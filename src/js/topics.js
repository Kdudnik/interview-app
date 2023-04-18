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
    topicsList.querySelectorAll('.navbar__topic a').forEach(el => el.classList.remove('topic--active'))
    event.target.classList.add('topic--active')
    const regenerate = () => {
        switchSVG(event)
        const topicQsIndex = questions.findIndex(qsObj => {
            if (Object.keys(qsObj)[0].toLowerCase() === event.target.dataset.topic) {
                return qsObj
            }
        })
        generateCardContent(questions[topicQsIndex], cards.querySelectorAll('.card__side--back'))
    }
    if (window.getComputedStyle(cards).getPropertyValue('display') == "none") {
        greet.style.display = "none"
        cards.style.display = "flex"
        regenerate()
        cards.style.animation = "card-show 1s forwards"
    } else {
        cards.style.animation = "card-hide 1s forwards"
        cards.addEventListener('animationend', () => {
            regenerate()
            cards.style.animation = "card-show 1s forwards"
        })
    }
})

export { generateTopics }
