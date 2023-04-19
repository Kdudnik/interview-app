import { topicSVGs } from "./utils/topicsSVG.js";

const cards = document.querySelector(".cards")
const cardsBtns = document.querySelectorAll('.card__btn-wrapper')

cards.addEventListener("click", (event) => {
    event.target.closest('.card').classList.add("card--active")
    event.currentTarget.querySelectorAll('.card').forEach((c) => {
        if (!c.classList.contains("card--active")) {
            c.closest('.card-wrapper').style.display = "none"
        }
    })
})

function switchSVG(event) {
    cards.querySelectorAll(".card__side--front").forEach((cardFront) => {
        cardFront.dataset.topic = event.target.dataset.topic
        cardFront.innerHTML = topicSVGs[event.target.dataset.topic]
    })
}

cardsBtns.forEach(wrapper => {
    wrapper.addEventListener('click', (event) => {
        if (!event.target.dataset.confirm) return

        if (event.target.dataset.confirm == "true") {
            console.log("Correct!")
        } else {
            console.log("Incorrect :(")
        }

        cards.style.animation = "block-hide 1s forwards"
        cards.addEventListener('animationend', () => {
            cards.querySelectorAll('.card-wrapper').forEach(child => {
                if (child.style.display === "none") child.style.display = "block"
            })

            cards.querySelectorAll('.card-wrapper > .card').forEach(card => {
                card.classList.remove('card--active')
            })

            cards.style.animation = "block-show 1s forwards"
        })

    })
})

export { switchSVG, cards }