import { app } from '$lib/shared.svelte'

export class HomePageState {
  initTheme = () => {
    const theme = localStorage.getItem('theme') || ''
    app.theme = theme
  }

  setTheme = (to = '') => {
    if (to === 'light') {
      app.theme = 'light'
      document.documentElement.setAttribute('data-theme', 'light')
    } else if (to === 'dark') {
      app.theme = 'dark'
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      app.theme = 'auto'
      const colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', colorScheme)
    }
  }

  setBodyBackgroundColor = () => document.body.classList.add('bg-base-200')
}
