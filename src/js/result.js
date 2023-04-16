import { generateTopics } from "./topics"

// let inputTest = document.querySelector('#inputTest')
// let submitTest = document.querySelector('#submitTest')
const resultTitle = document.querySelector('.score h5')
const progressBar = document.querySelector('.card progress')
const summaryList = document.querySelector('.summary')

// submitTest.addEventListener('click', () => {
//     progressBar.value = inputTest.value
//     resultTitle.innerHTML = inputTest.value
//     if(resultTitle.innerHTML > 100) {
//         resultTitle.innerHTML = 100
//         console.error("Result is more than 100")
//     }
// })

function generateSummary(topics) {
    let summaryArr = []

    if(!Array.isArray(topics)) return

    topics.forEach(field => {
        let lowerField = field.toLowerCase()
        const summaryEl = `
            <div data-topic="${lowerField}">
                <span>- ${field}</span>
                <span>50<span class="summary__score--static">/100</span></span>
            </div>`
        summaryList.insertAdjacentHTML("beforeend", summaryEl)
        summaryArr.push(field)
    })
    return summaryArr
}

export { generateSummary }