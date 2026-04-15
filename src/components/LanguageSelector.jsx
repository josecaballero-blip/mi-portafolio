import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { HiGlobeAlt } from 'react-icons/hi'

const LANGS = [
  { code: 'es', label: 'Español',    flag: '🇪🇸' },
  { code: 'en', label: 'English',    flag: '🇺🇸' },
  { code: 'fr', label: 'Français',   flag: '🇫🇷' },
  { code: 'pt', label: 'Português',  flag: '🇧🇷' },
  { code: 'de', label: 'Deutsch',    flag: '🇩🇪' },
]

export default function LanguageSelector() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const current = LANGS.find(l => l.code === i18n.language?.slice(0, 2)) || LANGS[0]

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const changeLang = (code) => {
    i18n.changeLanguage(code)
    setOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-text-secondary hover:text-accent-cyan hover:bg-accent-cyan/10 transition-all duration-200 text-sm"
        aria-label="Change language"
      >
        <HiGlobeAlt size={16} />
        <span className="text-xs font-medium">{current.flag}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-40 rounded-xl bg-bg-card border border-[var(--border-base)] shadow-lg overflow-hidden z-50">
          {LANGS.map(lang => (
            <button
              key={lang.code}
              onClick={() => changeLang(lang.code)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left text-sm transition-colors duration-150 hover:bg-accent-cyan/10 ${
                lang.code === current.code ? 'text-accent-cyan bg-accent-cyan/5' : 'text-text-secondary'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
