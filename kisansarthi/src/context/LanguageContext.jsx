import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

const LanguageContext = createContext(null)

const storageKey = 'kisansarthi_language'
const supportedLanguages = ['en', 'hi', 'bn']

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem(storageKey)
    return supportedLanguages.includes(saved) ? saved : 'en'
  })

  const setLanguage = useCallback((nextLanguage) => {
    setLanguageState(supportedLanguages.includes(nextLanguage) ? nextLanguage : 'en')
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('lang', language)
    localStorage.setItem(storageKey, language)
  }, [language])

  useEffect(() => {
    document.body.classList.add('language-switching')
    const timeoutId = window.setTimeout(() => {
      document.body.classList.remove('language-switching')
    }, 140)
    return () => window.clearTimeout(timeoutId)
  }, [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      supportedLanguages
    }),
    [language, setLanguage]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export default LanguageContext

