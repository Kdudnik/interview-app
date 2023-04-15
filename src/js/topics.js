import { switchSVG } from "./cards";
import { topicSVGs } from "./utils/topicsSVG";

const topicsList = document.querySelector('.navbar-topics ul')
const cards = document.querySelector(".cards")
const greet = document.querySelector(".greet")

function handleClickOnTopic() {
    console.log('CLICK!');

}
// topics.forEach((switcher) => {
//     switcher.addEventListener("click", (event) => {
//         // function()
//     })
// })

function generateTopics(topics) {
    let topicsArr = []

    if (!Array.isArray(topics)) return

    topics.forEach(field => {
        let lowerField = field.toLowerCase()
        const topicEl = `
            <li class="navbar__topic">
                <a href="#" data-topic="${lowerField}">
                    ${topicSVGs[lowerField]}
                    ${field}
                </a>
            </li>
            `
        topicsList.insertAdjacentHTML("beforeend", topicEl)
        topicsArr.push(field)
    });
    return topicsArr
}

topicsList.addEventListener('click', (event) => {
    if (!event.target.dataset.topic) return
    greet.style.display = "none"
    cards.style.display = "flex"
    cards.style.animationName = "card-show"
    switchSVG(event)
})

export { generateTopics, handleClickOnTopic }
