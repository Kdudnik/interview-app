import { dropArea } from "./csv/csvUpload"
import { cards } from "./cards"
import { topicsList } from "./topics"

const pagins = document.querySelector('.pagination')

const show = function(block) {
    block.style.display = "flex"
    block.style.animation = "block-show 1s forwards"
}
const hide = function(block) {
    block.style.display = "none"
    block.style.animation = "block-hide 1s forwards"
}

pagins.addEventListener('click', (event) => {
    if(!event.target.dataset.block) return

    pagins.querySelectorAll('.pagination__el').forEach(el => el.classList.remove('pagination--active'))
    event.target.classList.add('pagination--active')
    if(event.target.dataset.block === "dz") {
        show(dropArea)
        hide(cards)
        topicsList.style.display = "none"
    } else {
        hide(dropArea)
        show(cards)
        topicsList.style.display = "flex"
    }
})

export { pagins, hide, show }