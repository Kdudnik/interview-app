
const topicsList = document.querySelector('.navbar-topics ul')
const topics = topicsList.querySelectorAll(".navbar__topic")

function handleClickOnTopic() {
  console.log( 'CLICK!' );
  
}
// topics.forEach((switcher) => {
//     switcher.addEventListener("click", (event) => {
//         // function()
//     })
// })


function generateTopics(topics) {
    let topicsArr = []

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
        topicsArr.push(field)
    });
    return topicsArr
}

export { generateTopics, handleClickOnTopic }
