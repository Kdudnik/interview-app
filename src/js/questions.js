function getQuestions(questions) {
    let questionsObj = {}
    const topics = Object.keys(questions[0])

    if (!Array.isArray(questions)) return

    const sortedQuestions = topics.map(t => {
        let qs = questions.map(row => {
            return row[t]
        })
        return { [t]: qs }
    })

    return sortedQuestions
}

function generateCardContent(topicObj, cardBackEls) {
    const topicName = Object.keys(topicObj)[0]
    const topicQs = Object.values(topicObj).flat().filter(q => q)

    cardBackEls.forEach(cardBack => {
        cardBack.querySelector('.card__title').innerHTML = topicName
        cardBack.querySelector('.card__text').innerHTML = topicQs[Math.floor(Math.random() * topicQs.length)]
    });
}

export { getQuestions, generateCardContent }