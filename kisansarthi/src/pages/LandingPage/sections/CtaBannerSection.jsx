import { useTranslation } from '../../../hooks/useTranslation'

export default function CtaBannerSection() {
  const { t } = useTranslation()

  return (
    <section className="cta-banner" id="start-now">
      <div className="container">
        <div className="cta-content">
          <div className="cta-text">
            <h2 className="cta-title">Start Your First Crop Cycle Today</h2>
            <p className="cta-subtitle">
              Experience the thrill of farming without the financial risk. Master crop economics in a safe, simulated
              environment.
            </p>
          </div>
          <div className="cta-buttons">
            <button className="btn btn-primary btn-large" id="cta-start-btn" type="button">
              <span className="btn-icon">🌱</span>
              <span className="btn-text" data-i18n="cta_start_simulation">
                {t('cta_start_simulation')}
              </span>
            </button>
            <button className="btn btn-outlined btn-white" id="cta-learn-btn" type="button">
              <span className="btn-icon">📚</span>
              <span className="btn-text" data-i18n="cta_learn_more">
                {t('cta_learn_more')}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
