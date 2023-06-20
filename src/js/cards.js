import { topicSVGs } from "./utils/topicsSVG.js";
import { useState } from "./store/useState.js";

const { getActiveTopic } = useState();

const cards = document.querySelector(".cards")
const cardsBtns = document.querySelectorAll('.card__btn-wrapper')

// Cards local state
let isCardsHidden = getComputedStyle(cards).display !== "flex";

cards.addEventListener("click", (event) => {
    event.target.closest('.card').classList.add("card--active")
    event.currentTarget.querySelectorAll('.card').forEach((c) => {
        if (!c.classList.contains("card--active")) {
            c.closest('.card-wrapper').style.display = "none"
        }
    })
})

cardsBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
        if (!event.target.dataset.confirm) return

        if (event.target.dataset.confirm == "true") {
            console.log("Correct!")
        } else {
            console.log("Incorrect :(")
        }

        // switchCards( cards, getTopicQsIndex(questions, ) )
    })
})

function switchSVG() {
    cards.querySelectorAll(".card__side--front").forEach((cardFront) => {
        cardFront.dataset.topic = getActiveTopic()
        cardFront.innerHTML = topicSVGs[cardFront.dataset.topic]
    })
}

function switchCards() {

    const startSwitchingCards = [
        { transform: "translateY(-100vh)", display: "none" },
        { transform: "translateY(0)", display: "flex" },
      ];
    const cardsSwitchingOptions = {
    duration: 2000,
    iterations: 1,
};

    cards.animate(startSwitchingCards, cardsSwitchingOptions);


    // 'switch-block 1s' --- { 0%: translate(0), 100%: translate(-100vh) }
    // 
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
//         // cards.querySelectorAll('.card-wrapper').forEach(child => {
//         //     if (child.style.display === "none") child.style.display = "block"
//         // })
//         // cards.querySelectorAll('.card-wrapper > .card').forEach(card => {
//         //     card.classList.remove('card--active')
//         // })

//         // getAllQuestions
//         // generateCardContent(getAllQuestions()[topicQsIndex], cards.querySelectorAll('.card__side--back'))

//         // cards.style.display = "flex"
//         // cards.style.animation = "block-show 1s forwards"
// }

function generateCardContent(topicObj, cardBackEls) {
    const topicName = Object.keys(topicObj)[0]
    const topicQs = Object.values(topicObj).flat().filter(q => q)

    cardBackEls.forEach(cardBack => {
        cardBack.querySelector('.card__title').innerHTML = topicName
        const random = Math.floor(Math.random() * topicQs.length)
        cardBack.querySelector('.card__text').innerHTML = topicQs[random].replace(`${topicQs[random].split(" ")[0]} - `, '')
        setActiveQuestion(topicQs[random].replace(`${topicQs[random].split(" ")[0]} - `, ''))
        getActiveQuestion()
        cardBack.querySelector('.card__score').innerHTML = `Вартість Питання: ${topicQs[random].split(" ")[0]}`
    });
}

export { switchSVG, switchCards, generateCardContent }