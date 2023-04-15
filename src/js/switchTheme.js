const storageKey = "theme-mode" // just a name of the field

const switcher = document.querySelector("#switchColorScheme")

const initThemeSwitcher = () => {
  reflectPreference()
  switcher.addEventListener("click", () => {
      // flip current value
      theme.value = theme.value === "light" ? "dark" : "light"
  
      setPreference()
  })

  // sync with system changes
  window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
      theme.value = isDark ? "dark" : "light"
      setPreference()
  })
} 

const getColorPreference = () => {
    if (localStorage.getItem(storageKey)) {
        return localStorage.getItem(storageKey)
    } else {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
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
    document.firstElementChild.setAttribute("data-theme", theme.value)
    switcher?.setAttribute("aria-label", theme.value)
}

export default initThemeSwitcher