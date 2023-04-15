import { topicSVGs } from "./utils/topicsSVG.js";

const cards = document.querySelector(".cards")

cards.addEventListener("click", (event) => {
    event.target.closest('.card').classList.add("card--active")
    event.currentTarget.querySelectorAll('.card').forEach((c) => {
        if (!c.classList.contains("card--active")) {
            c.classList.add("card--disabled")
        }
    })
})

function switchSVG(event) {
    cards.querySelectorAll(".card__side--front").forEach((cardFront) => {
        cardFront.innerHTML = topicSVGs[event.target.dataset.topic]
    })
}

export { switchSVG }