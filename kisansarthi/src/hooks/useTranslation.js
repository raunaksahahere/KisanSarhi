import { useCallback, useContext } from 'react'
import LanguageContext from '../context/LanguageContext'
import translations from '../data/translations'

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useTranslation must be used within LanguageProvider')
  }

  const { language, setLanguage, supportedLanguages } = context

  const t = useCallback(
    (key, fallback) => {
      const entry = translations[key]
      if (!entry) return fallback ?? key
      return entry[language] ?? entry.en ?? fallback ?? key
    },
    [language]
  )

  return {
    language,
    setLanguage,
    supportedLanguages,
    t
  }
}

