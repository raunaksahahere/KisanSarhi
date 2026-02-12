import { motion } from 'framer-motion'
import { useTranslation } from '../../../hooks/useTranslation'

const MotionDiv = motion.div

const meters = [
  { label: 'Savings Goal', value: 78, barClassName: 'meter-bar' },
  { label: 'Stress Level', value: 32, barClassName: 'meter-bar stress' },
  { label: 'Risk Management', value: 85, barClassName: 'meter-bar' }
]

export default function DashboardPreviewSection() {
  const { t } = useTranslation()

  return (
    <section className="dashboard-preview" id="dashboard">
      <div className="container">
        <h2 className="section-title" data-i18n="section_dashboard">
          {t('section_dashboard')}
        </h2>
        <p className="section-subtitle">Track everything in one beautiful interface</p>
        <MotionDiv
          className="dashboard-mockup"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="dashboard-header">
            <div className="balance-cards">
              <div className="balance-card primary">
                <div className="card-label">Total Savings</div>
                <div className="card-amount">₹12,450</div>
                <div className="card-change positive">+₹2,300 this season</div>
              </div>
              <div className="balance-card secondary">
                <div className="card-label">Season Budget</div>
                <div className="card-amount">₹8,750</div>
                <div className="card-change">₹3,250 remaining</div>
              </div>
            </div>
          </div>
          <div className="dashboard-body">
            <div className="meters-section">
              <h3 className="subsection-title">Your Progress</h3>
              {meters.map((meter) => (
                <div key={meter.label} className="meter">
                  <div className="meter-label">
                    <span>{meter.label}</span>
                    <span className="meter-value">{meter.value}%</span>
                  </div>
                  <div className={meter.barClassName}>
                    <MotionDiv
                      className="meter-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${meter.value}%` }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="transactions-section">
              <h3 className="subsection-title">Farm Ledger</h3>
              <div className="transaction-list">
                <div className="transaction-item">
                  <div className="transaction-icon">🌾</div>
                  <div className="transaction-details">
                    <div className="transaction-name">Wheat Seeds Purchase</div>
                    <div className="transaction-date">2 days ago</div>
                  </div>
                  <div className="transaction-amount expense">-₹1,200</div>
                </div>
                <div className="transaction-item">
                  <div className="transaction-icon">💧</div>
                  <div className="transaction-details">
                    <div className="transaction-name">Irrigation Payment</div>
                    <div className="transaction-date">5 days ago</div>
                  </div>
                  <div className="transaction-amount expense">-₹800</div>
                </div>
                <div className="transaction-item">
                  <div className="transaction-icon">🥬</div>
                  <div className="transaction-details">
                    <div className="transaction-name">Vegetable Harvest Sale</div>
                    <div className="transaction-date">1 week ago</div>
                  </div>
                  <div className="transaction-amount income">+₹3,500</div>
                </div>
                <div className="transaction-item">
                  <div className="transaction-icon">🌱</div>
                  <div className="transaction-details">
                    <div className="transaction-name">Fertilizer Investment</div>
                    <div className="transaction-date">1 week ago</div>
                  </div>
                  <div className="transaction-amount expense">-₹950</div>
                </div>
              </div>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  )
}
