import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNavbarScrolled } from '../../hooks/useNavbarScrolled'
import { useTranslation } from '../../hooks/useTranslation'

export default function Navbar() {
  const isScrolled = useNavbarScrolled(50)
  const { language, setLanguage, t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const navLinks = useMemo(
    () => [
      { href: '#features', label: t('nav_features'), i18nKey: 'nav_features' },
      { href: '#how-it-works', label: t('nav_how_it_works'), i18nKey: 'nav_how_it_works' },
      { href: '#ai-assistant', label: t('nav_ai_assistant'), i18nKey: 'nav_ai_assistant' },
      { href: '#about', label: t('nav_about'), i18nKey: 'nav_about' }
    ],
    [t]
  )

  const onNavClick = () => setIsMenuOpen(false)

  return (
    <nav className={`navbar${isScrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="container">
        <div className="nav-content">
          <div className="nav-logo">
            <a href="#hero" onClick={onNavClick}>
              <span className="logo-icon">🌾</span>
              <span className="logo-text">KisanSarthi</span>
            </a>
          </div>

          <div className={`nav-links${isMenuOpen ? ' active' : ''}`} id="navLinks">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                onClick={onNavClick}
                data-i18n={link.i18nKey}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <div className="lang-selector" role="group" aria-label="Language selector">
              <button
                className={`lang-btn${language === 'en' ? ' active' : ''}`}
                type="button"
                aria-pressed={language === 'en'}
                onClick={() => setLanguage('en')}
              >
                EN
              </button>
              <button
                className={`lang-btn${language === 'hi' ? ' active' : ''}`}
                type="button"
                aria-pressed={language === 'hi'}
                onClick={() => setLanguage('hi')}
              >
                हिंदी
              </button>
              <button
                className={`lang-btn${language === 'bn' ? ' active' : ''}`}
                type="button"
                aria-pressed={language === 'bn'}
                onClick={() => setLanguage('bn')}
              >
                বাংলা
              </button>
            </div>

            <div className="nav-auth">
              <button
                type="button"
                className="btn btn-outlined"
                data-i18n="nav_signin"
                onClick={() => {
                  setIsMenuOpen(false)
                  navigate('/login')
                }}
              >
                {t('nav_signin')}
              </button>
              <button
                type="button"
                className="btn btn-primary btn-signup"
                data-i18n="nav_signup"
                onClick={() => {
                  setIsMenuOpen(false)
                  navigate('/login?mode=signup')
                }}
              >
                {t('nav_signup')}
              </button>
            </div>
          </div>

          <button
            className="mobile-menu-toggle"
            id="mobileMenuToggle"
            aria-label="Toggle menu"
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>
    </nav>
  )
}
