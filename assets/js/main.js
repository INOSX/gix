;(function () {
  const SUPPORTED_LANGS = ['pt', 'en']
  const FALLBACK_LANG = 'pt'

  function getInitialLang() {
    const stored = window.localStorage.getItem('gix_lang')
    if (stored && SUPPORTED_LANGS.includes(stored)) return stored
    const browser = navigator.language || navigator.userLanguage || ''
    if (browser.toLowerCase().startsWith('pt')) return 'pt'
    return FALLBACK_LANG
  }

  function getMessages(lang) {
    if (lang === 'en') return window.GIX_I18N_EN || window.GIX_I18N_PT
    return window.GIX_I18N_PT || window.GIX_I18N_EN
  }

  function applyTranslations(lang) {
    const msgs = getMessages(lang)
    if (!msgs) return

    document.documentElement.lang = lang

    const nodes = document.querySelectorAll('[data-i18n]')
    nodes.forEach((el) => {
      const key = el.getAttribute('data-i18n')
      if (!key || !(key in msgs)) return
      el.textContent = msgs[key]
    })
  }

  function setupLangSwitcher(currentLang) {
    const buttons = document.querySelectorAll('.lang-btn')
    buttons.forEach((btn) => {
      const lang = btn.getAttribute('data-lang')
      if (!lang) return
      if (lang === currentLang) {
        btn.classList.add('active')
      } else {
        btn.classList.remove('active')
      }

      btn.addEventListener('click', () => {
        if (!SUPPORTED_LANGS.includes(lang)) return
        if (lang === window.__GIX_LANG__) return

        window.__GIX_LANG__ = lang
        window.localStorage.setItem('gix_lang', lang)
        buttons.forEach((b) => b.classList.remove('active'))
        btn.classList.add('active')
        applyTranslations(lang)
      })
    })
  }

  function setYear() {
    const yearSpan = document.getElementById('year')
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear().toString()
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const lang = getInitialLang()
    window.__GIX_LANG__ = lang
    applyTranslations(lang)
    setupLangSwitcher(lang)
    setYear()
  })
})()


