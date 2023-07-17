import { topicSVGs } from "./utils/topicsSVG.js"
import { useState } from "./store/useState.js"

const { getActiveTopic, setActiveQuestion, getActiveQuestion,
        getAllQuestions, updateAllQuestions, updateScore, getScore } = useState()

const cards = document.querySelector(".cards")
const cardsBtns = document.querySelectorAll(".card__btn-wrapper")

cards.addEventListener("click", (event) => {
  const targetedCard = event.target.closest(".card")
  if (!targetedCard || targetedCard.classList.contains("card--active")) return

  targetedCard.classList.add("card--active")
  generateCardContent(targetedCard)
  event.currentTarget.querySelectorAll(".card").forEach((c) => {
    if (!c.classList.contains("card--active")) {
      c.closest(".card-wrapper").style.display = "none"
    }
  })
})

cardsBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.stopPropagation()

    updateAllQuestions()

    if (event.target.dataset.confirm == "true") {
      updateScore(Number(getActiveQuestion().split(" ")[0]), true)
    } else {
      updateScore(Number(getActiveQuestion().split(" ")[0]), false)
    }

    console.log(getScore())
    switchCards()
  })
})

function switchSVG() {
  cards.querySelectorAll(".card__side--front").forEach((cardFront) => {
    cardFront.dataset.topic = getActiveTopic()
    cardFront.innerHTML = topicSVGs[cardFront.dataset.topic]
  })
}

function switchCards() {
  setTimeout(() => {
    cards.classList.remove("cards-switch")
    void cards.offsetWidth
    cards.classList.add("cards-switch")
  }, 500)

  cards.querySelectorAll('.card-wrapper').forEach(child => {
    if (child.style.display === "none") child.style.display = "block"
  })
  cards.querySelectorAll('.card-wrapper > .card').forEach(card => {
    card.classList.remove('card--active')
  })
}

function generateCardContent(activeCard) {
  let topicQs;
  getAllQuestions().forEach((element) => {
    const currentElementKey = Object.keys(element)[0].toLowerCase()
    if (getActiveTopic() === currentElementKey) {
      topicQs = Object.values(element)[0]
    }
  });

  const random = Math.floor(Math.random() * topicQs.length)
  activeCard.querySelector(".card__title").innerHTML = getActiveTopic().toUpperCase()
  activeCard.querySelector(".card__text").innerHTML = topicQs[random].replace(
    `${topicQs[random].split(" ")[0]} - `,
    ""
  )
  setActiveQuestion(topicQs[random])
  activeCard.querySelector(".card__score").innerHTML = `Вартість Питання: ${topicQs[random].split(" ")[0]
    }`
}

export { switchSVG, switchCards, cards }
