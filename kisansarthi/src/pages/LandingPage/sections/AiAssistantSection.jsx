import { motion } from 'framer-motion'
import { useToast } from '../../../hooks/useToast'
import { useTranslation } from '../../../hooks/useTranslation'

const MotionDiv = motion.div

export default function AiAssistantSection() {
  const { showToast } = useToast()
  const { t } = useTranslation()

  return (
    <section className="ai-assistant" id="ai-assistant">
      <div className="container">
        <div className="ai-content">
          <MotionDiv
            className="ai-mascot"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="mascot-container">
              <div className="robot-body">
                <div className="robot-antenna">
                  <span className="antenna-leaf">🌿</span>
                </div>
                <div className="robot-face">
                  <div className="robot-eyes">
                    <span className="eye">●</span>
                    <span className="eye">●</span>
                  </div>
                  <div className="robot-smile">⌣</div>
                </div>
              </div>
              <div className="speech-bubble">
                <p>"Namaste! I'm here to help you grow your financial wisdom! 🌱"</p>
              </div>
            </div>
          </MotionDiv>

          <MotionDiv
            className="ai-text"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
          >
            <h2 className="section-title" data-i18n="section_ai_assistant">
              {t('section_ai_assistant')}
            </h2>
            <p className="ai-intro">Your friendly farming financial companion</p>
            <div className="ai-features">
              <div className="ai-feature-item">
                <span className="check-icon">✓</span>
                <p>Explains complex financial concepts in simple language</p>
              </div>
              <div className="ai-feature-item">
                <span className="check-icon">✓</span>
                <p>Provides personalized advice based on your decisions</p>
              </div>
              <div className="ai-feature-item">
                <span className="check-icon">✓</span>
                <p>Available 24/7, even offline with cached responses</p>
              </div>
              <div className="ai-feature-item">
                <span className="check-icon">✓</span>
                <p>Learns from your farming context and preferences</p>
              </div>
            </div>
            <button
              className="btn btn-primary"
              id="try-sarthi-btn"
              type="button"
              onClick={() => showToast('🤖 Meet Sarthi, your farming financial companion!')}
            >
              <span className="btn-icon">💬</span>
              <span className="btn-text" data-i18n="cta_chat_with_sarthi">
                {t('cta_chat_with_sarthi')}
              </span>
            </button>
          </MotionDiv>
        </div>
      </div>
    </section>
  )
}
