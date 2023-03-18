const topicsList = document.querySelector('.navbar-topics ul')

function generateTopics(topics) {
    if (!Array.isArray(topics)) return

    topics.forEach(field => {
        const topicEl = `
            <li class="navbar__topic" data-topic="${field.toLowerCase()}">
                <a href="#">
                    ${field}
                </a>
            </li>
            `
        topicsList.insertAdjacentHTML("beforeend", topicEl)
    });
}
export { generateTopics }
