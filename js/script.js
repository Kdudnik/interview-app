const storageKey = 'theme-mode' // just a name of the field

window.onload = () => {
  // set on load so screen readers can see latest value on the button
  reflectPreference()

  // now this script can find and listen for clicks on the control
  document.querySelector('#switchColorScheme').addEventListener('click', () => {
    // flip current value
    theme.value = theme.value === 'light' ? 'dark' : 'light'

    setPreference()
  })
}

const getColorPreference = () => {
  if (localStorage.getItem(storageKey)) {
    return localStorage.getItem(storageKey)
  } else {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
}

const theme = {
  value: getColorPreference(),
}

const setPreference = () => {
  localStorage.setItem(storageKey, theme.value)
  reflectPreference()
}

const reflectPreference = () => {
  document.firstElementChild.setAttribute('data-theme', theme.value)
  document.querySelector('#switchColorScheme')?.setAttribute('aria-label', theme.value)
}

// set early so no page flashes / CSS is made aware
reflectPreference()

// sync with system changes
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', ({ matches: isDark }) => {
    theme.value = isDark ? 'dark' : 'light'
    setPreference()
  })


// --------- CARDS -------
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('click', (event) => {
    event.currentTarget.classList.add('card--active');
    cards.forEach((c) => {
      if(!c.classList.contains('card--active')) {
        c.classList.add('card--disabled');
      }
    })
  })
  
});



const pageSwitcher = document.querySelectorAll('.navbar__topic')
const greetPage = document.querySelector('.greeting')
const cardsPage = document.querySelector('.cards')

const topicSVGs = {
  'html':
    `<svg width="266px" height="266px" viewBox="0 0 24 24">
      <path fill="#F15C2A"
        d="M12,17.56l4.07-1.13.55-6.1H9.38l-.18-2h7.6l.2-2H7l.56,6h6.89l-.23,2.58L12,15.5l-2.22-.6-.14-1.66h-2l.29,3.19L12,17.56M4.07,3H19.93L18.5,19.2,12,21,5.5,19.2Z" />
    </svg>`,
  'css': 
    `<svg width="256px" height="256px" viewBox="0 0 32 32" version="1.1">
      <path fill="#1774BB"
        d="M16.017 21.044v0zM4.743 3.519l2.049 22.981 9.194 2.552 9.22-2.556 2.051-22.977h-22.514zM23 8.775l-0.693 7.767h-0l-0.48 5.359-0.042 0.476-5.781 1.603-5.773-1.603-0.395-4.426h2.829l0.201 2.248 3.142 0.847 0.008-0.002 0.002-0 3.134-0.846 0.329-3.655-6.579 0-0.056-0.633-0.129-1.429-0.067-0.756 7.081-0 0.258-2.886h-10.786l-0.056-0.634-0.129-1.429-0.067-0.756h14.118l-0.068 0.756z">
      </path>
    </svg>`,
  'js': 
    `<svg width="256px" height="256px" viewBox="-4 -4 58 58">
      <path fill="#FCB041"
      d="M45.274,2.325C45.084,2.118,44.817,2,44.536,2H5.464C5.183,2,4.916,2.118,4.726,2.325S4.443,2.81,4.468,3.089l3.52,39.427 c0.037,0.412,0.324,0.759,0.722,0.873l16.01,4.573C24.809,47.987,24.902,48,24.994,48s0.185-0.013,0.274-0.038l16.024-4.573 c0.398-0.114,0.685-0.461,0.722-0.873l3.518-39.427C45.557,2.81,45.463,2.532,45.274,2.325z M12,29.004l7,1.942V11h4v26l-11-3.051 V29.004z M38.054,22L37,34.25L27,37v-4.601l6.75-1.855l0.25-3.75L27,28V11h12l-0.345,4H31v8L38.054,22z" />
      </path>
    </svg>`,
}

pageSwitcher.forEach(switcher => {
  switcher.addEventListener('click', (event) => {
    greetPage.style.display = "none"
    cardsPage.style.display = "flex"
    cardsPage.style.animationName = "card-show"
    cardsPage.querySelectorAll('.card__side--front').forEach(cardFront => {
      cardFront.innerHTML = topicSVGs[event.currentTarget.dataset.topic]
    })
  })
})