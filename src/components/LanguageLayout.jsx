import { useEffect } from 'react'
import { Outlet, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const SUPPORTED_LANGUAGES = ['fr', 'en']
const DEFAULT_LANGUAGE = 'fr'

const LanguageLayout = () => {
  const { lang } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { i18n } = useTranslation()

  useEffect(() => {
    // If language is not supported, redirect to default language
    if (!SUPPORTED_LANGUAGES.includes(lang)) {
      // Special case: if lang is 'success', redirect to /fr/success (for Stripe redirect)
      if (lang === 'success') {
        navigate(`/${DEFAULT_LANGUAGE}/success${location.search}`, { replace: true })
        return
      }
      const newPath = `/${DEFAULT_LANGUAGE}${location.pathname.replace(`/${lang}`, '')}${location.search}`
      navigate(newPath, { replace: true })
      return
    }

    // Sync i18next with URL language
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang)
    }

    // Update document lang attribute
    document.documentElement.lang = lang
  }, [lang, i18n, navigate, location])

  // Don't render until language is valid
  if (!SUPPORTED_LANGUAGES.includes(lang)) {
    return null
  }

  return <Outlet />
}

export { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE }
export default LanguageLayout
