import { topicSVGs } from "./utils/topicsSVG"

// let inputTest = document.querySelector('#inputTest')
// let submitTest = document.querySelector('#submitTest')
const resultTitle = document.querySelector('.score h5')
const summary = document.querySelector('.summary')
const score = document.querySelector('.result .card')
const progressBar = score.querySelector('progress')
const showSummary = document.querySelector('.show__summary')
const showScore = document.querySelector('.show__score')

// submitTest.addEventListener('click', () => {
//     progressBar.value = inputTest.value
//     resultTitle.innerHTML = inputTest.value

//     if(inputTest.value >= 0 && inputTest.value <= 33) {
//         progressBar.dataset.scoreResult = "bad"
//     } else if(inputTest.value >= 34 && inputTest.value <= 66) {
//         progressBar.dataset.scoreResult = "average"
//     } else if(inputTest.value >= 67 && inputTest.value <= 100) {
//         progressBar.dataset.scoreResult = "good"
//     }

//     if(resultTitle.innerHTML > 100) {
//         resultTitle.innerHTML = 100
//         console.error("Result is more than 100")
//     }
// })

function generateSummary(topics) {
    let summaryArr = []

    if(!Array.isArray(topics)) return

    topics.forEach(field => {
        const summaryEl = `
            <div data-topic="${field.toLowerCase()}">
                <span>${topicSVGs[field.toLowerCase()]} ${field}</span>
                <span>50<span class="summary__score--static">/100</span></span>
            </div>`
        summary.insertAdjacentHTML("beforeend", summaryEl)
        summaryArr.push(field)
    })
    return summaryArr
}

showSummary.addEventListener('click', () => {
    summary.style.display = "flex"
    summary.style.animation = "resultShow .5s"
    score.style.animation = "resultHide .5s"
    score.style.display = "none"
})

showScore.addEventListener('click', () => {
    summary.style.animation = "resultHide .5s"
    summary.style.display = "none"
    score.style.display = "flex"
    score.style.animation = "resultShow .5s"
})

export { generateSummary }