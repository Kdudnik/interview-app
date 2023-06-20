function findScore(score, question) {
    score.innerHTML = `Вартість Питання: ${question.split(" ")[0]}`
}

export { findScore }