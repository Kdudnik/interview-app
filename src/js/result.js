import { topicSVGs } from "./utils/topicsSVG"
import { useState } from "./store/useState.js"

const { getScore } = useState()

// let inputTest = document.querySelector('#inputTest')
// let submitTest = document.querySelector('#submitTest')
const result = document.querySelector('.result')
const summary = result.querySelector('.summary')
const resultScore = result.querySelector('.result .card')
const progressBar = resultScore.querySelector('progress')

const generateResult = () => {
    result.style.display = "flex"
    const userResult = getScore().user
    const allResult = getScore().all
    progressBar.value = userResult
    progressBar.max = allResult
    result.querySelector('.score h5').innerHTML = `${userResult}`
    result.querySelector('.score p').innerHTML = `of ${allResult}`

    if((userResult*100)/allResult <= 33) {
        progressBar.dataset.scoreResult = "bad"
    } else if((userResult*100)/allResult <= 66) {
        progressBar.dataset.scoreResult = "average"
    } else { 
        progressBar.dataset.scoreResult = "good"
    }
}

function generateSummary(topics) {
    if(!Array.isArray(topics)) return

    topics.forEach(field => {
        const summaryEl = `
            <div data-topic="${field.toLowerCase()}">
                <span>${topicSVGs[field.toLowerCase()]} ${field}</span>
                <span>50<span class="summary__score--static">/100</span></span>
            </div>`
        summary.insertAdjacentHTML("beforeend", summaryEl)
    })
}

export { generateSummary, generateResult }