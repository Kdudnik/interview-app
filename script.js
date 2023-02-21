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
  .addEventListener('change', ({matches:isDark}) => {
    theme.value = isDark ? 'dark' : 'light'
    setPreference()
  })