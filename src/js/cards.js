import { topicSVGs } from "./utils/topicsSVG.js"
import { useState } from "./store/useState.js"

const { getActiveTopic, setActiveQuestion, getActiveQuestion, getAllQuestions } = useState()

const cards = document.querySelector(".cards")
const cardsBtns = document.querySelectorAll(".card__btn-wrapper")

cards.addEventListener("click", (event) => {
  const targetedCard = event.target.closest(".card")
  if(!targetedCard || targetedCard.classList.contains("card--active")) return
  
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
    if (!event.target.dataset.confirm) return

    if (event.target.dataset.confirm == "true") {
      console.log("Correct!")
      switchCards()
    } else {
      console.log("Incorrect :(")
    }

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

// function switchCards() {

//     /**
//      * Run the first time animation show/hide
//      */
//     if(isCardsHidden) {
//         console.log( 'cards hidden initial' );

//         cards.style.display = "flex"
//         cards.style.animation = "block-show 1s forwards"
//         switchSVG()
//     } else {
//         console.log( 'cards NOT hidden initial' );
//         cards.style.animation = "block-hide 1s forwards"
//     }

//     /**
//      * Run the animation show/hide when changing topics
//      */
//     const showHideCards = () => {
//         cards.style.display = isCardsHidden ? "flex" : "none"

//         isCardsHidden = getComputedStyle(cards).display !== "flex";

//         if(isCardsHidden) {
//             console.log( "cards hidden ON ANIMATION END" );

//             //regenerate
//             switchSVG()
//             cards.style.display = "flex"
//             cards.style.animation = "block-show 1s forwards"
//         } else {
//             console.log( "cards NOT hidden ON ANIMATION END" );
//         }

//         cards.removeEventListener('animationend', showHideCards)
//     }

//     cards.addEventListener('animationend', showHideCards)

//     //HW: read abot animationend and find other ways to follow the end of the animation

//         // getAllQuestions
//         // generateCardContent(getAllQuestions()[topicQsIndex], cards.querySelectorAll('.card__side--back'))

//         // cards.style.display = "flex"
//         // cards.style.animation = "block-show 1s forwards"
// }

function generateCardContent(activeCard) {
  let topicQs;
  getAllQuestions().forEach((element) => {
    const currentElementKey = Object.keys(element)[0].toLowerCase()
    if(getActiveTopic() === currentElementKey) {
      topicQs = Object.values(element)[0]
    }
  });

    activeCard.querySelector(".card__title").innerHTML = getActiveTopic().toUpperCase()
    const random = Math.floor(Math.random() * topicQs.length)
    activeCard.querySelector(".card__text").innerHTML = topicQs[random].replace(
      `${topicQs[random].split(" ")[0]} - `,
      ""
    )
    setActiveQuestion(topicQs[random].replace(`${topicQs[random].split(" ")[0]} - `, ""))
    // getActiveQuestion()
    activeCard.querySelector(".card__score").innerHTML = `Вартість Питання: ${
      topicQs[random].split(" ")[0]
    }`
}

export { switchSVG, switchCards }
