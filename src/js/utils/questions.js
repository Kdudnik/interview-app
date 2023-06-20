function sortQuestionsFromCSV(questions) {
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

export { sortQuestionsFromCSV }