import { motion } from 'framer-motion'
import { useHeroParallax } from '../../hooks/useHeroParallax'
import { useToast } from '../../hooks/useToast'
import { useTranslation } from '../../hooks/useTranslation'

const MotionDiv = motion.div
const MotionH1 = motion.h1
const MotionP = motion.p

export default function Hero() {
  const { showToast } = useToast()
  const { t } = useTranslation()
  const parallaxOffsetY = useHeroParallax(0.5)

  const onMeetSarthi = () => {
    const target = document.getElementById('ai-assistant')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    showToast('🤖 Meet Sarthi, your farming financial companion!')
  }

  return (
    <section className="hero" id="hero" style={parallaxOffsetY ? { transform: `translateY(${parallaxOffsetY}px)` } : undefined}>
      <div className="container">
        <div className="hero-content">
          <MotionDiv
            className="hero-text"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
            }}
          >
            <MotionH1
              className="hero-title"
              data-i18n="hero_title"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {t('hero_title')}
            </MotionH1>
            <MotionP
              className="hero-subtitle"
              data-i18n="hero_subtitle"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {t('hero_subtitle')}
            </MotionP>
            <MotionDiv
              className="hero-buttons"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <button
                className="btn btn-primary"
                id="start-simulation-btn"
                type="button"
                onClick={() => showToast('🌱 Simulation starting soon!')}
                data-i18n="hero_start_simulation"
              >
                <span className="btn-icon">🌱</span>
                <span className="btn-text">{t('hero_start_simulation')}</span>
              </button>
              <button
                className="btn btn-secondary"
                id="meet-sarthi-btn"
                type="button"
                onClick={onMeetSarthi}
                data-i18n="hero_meet_sarthi"
              >
                <span className="btn-icon">🤖</span>
                <span className="btn-text">{t('hero_meet_sarthi')}</span>
              </button>
            </MotionDiv>
          </MotionDiv>

          <div className="hero-illustration">
            <div className="farmer-card">
              <div className="farmer-icon">👨‍🌾</div>
              <div className="floating-elements">
                <span className="float-item coin">💰</span>
                <span className="float-item crop">🌾</span>
                <span className="float-item coin">🪙</span>
                <span className="float-item crop">🌿</span>
                <span className="float-item sparkle">✨</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
