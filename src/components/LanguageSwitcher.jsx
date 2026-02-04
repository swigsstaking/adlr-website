import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, ChevronDown } from 'lucide-react'
import { SUPPORTED_LANGUAGES } from './LanguageLayout'

const languages = [
  { code: 'fr', name: 'Francais' },
  { code: 'en', name: 'English' }
]

/**
 * LanguageSwitcher - Header version (dropdown)
 */
export const LanguageSwitcher = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { lang } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation('common')

  const currentLang = languages.find(l => l.code === lang) || languages[0]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const switchLanguage = (newLang) => {
    if (newLang === lang) {
      setIsOpen(false)
      return
    }

    // Replace current language prefix with new one
    const currentPath = location.pathname
    const pathWithoutLang = currentPath.replace(`/${lang}`, '')
    const newPath = `/${newLang}${pathWithoutLang || ''}`

    navigate(newPath + location.search)
    setIsOpen(false)
  }

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-dark-600 hover:text-dark-900 hover:bg-sand-100 transition-colors text-sm font-medium"
        aria-label={t('languages.fr')}
      >
        <Globe className="w-4 h-4" />
        <span className="uppercase">{currentLang.code}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-sand-200 py-2 overflow-hidden z-50"
          >
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => switchLanguage(language.code)}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  language.code === lang
                    ? 'bg-sand-100 text-dark-900 font-medium'
                    : 'text-dark-600 hover:bg-sand-100 hover:text-dark-900'
                }`}
              >
                {language.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * LanguageSwitcherFooter - Footer version (simple text links)
 */
export const LanguageSwitcherFooter = ({ className = '' }) => {
  const { lang } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const switchLanguage = (newLang) => {
    if (newLang === lang) return

    const currentPath = location.pathname
    const pathWithoutLang = currentPath.replace(`/${lang}`, '')
    const newPath = `/${newLang}${pathWithoutLang || ''}`

    navigate(newPath + location.search)
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {languages.map((language, index) => (
        <span key={language.code} className="flex items-center">
          <button
            onClick={() => switchLanguage(language.code)}
            className={`text-sm transition-colors ${
              language.code === lang
                ? 'text-dark-900 font-medium'
                : 'text-dark-500 hover:text-dark-900'
            }`}
          >
            {language.name}
          </button>
          {index < languages.length - 1 && (
            <span className="ml-3 text-dark-300">|</span>
          )}
        </span>
      ))}
    </div>
  )
}

export default LanguageSwitcher
