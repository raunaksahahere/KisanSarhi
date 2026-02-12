import { motion } from 'framer-motion'
import { useTranslation } from '../../../hooks/useTranslation'

const MotionDiv = motion.div

const features = [
  {
    icon: '🔄',
    title: 'Crop-Cycle Simulation',
    description: 'Experience realistic farming seasons with authentic financial scenarios based on real crop cycles.'
  },
  {
    icon: '📱',
    title: 'Offline-First',
    description: 'Works perfectly without internet. Learn anytime, anywhere—even in remote areas.'
  },
  {
    icon: '☁️',
    title: 'Cloud Device Sync',
    description: "Seamlessly sync your progress across multiple devices when you're back online."
  },
  {
    icon: '🧠',
    title: 'AI-Powered Explanations',
    description: 'Get instant, personalized guidance from Sarthi AI to understand financial concepts better.'
  },
  {
    icon: '🎮',
    title: 'Gamified Learning',
    description: 'Earn rewards, unlock achievements, and make learning fun while building real skills.'
  },
  {
    icon: '🆓',
    title: 'Free for Farmers',
    description: 'Completely free to use. No hidden costs, no subscriptions—just pure learning.',
    highlight: true
  }
]

export default function FeaturesSection() {
  const { t } = useTranslation()

  return (
    <section className="features" id="features">
      <div className="container">
        <h2 className="section-title" data-i18n="section_features">
          {t('section_features')}
        </h2>
        <p className="section-subtitle">Everything you need to master financial planning</p>
        <div className="features-grid">
          {features.map((feature, index) => (
            <MotionDiv
              key={feature.title}
              className={`feature-card${feature.highlight ? ' highlight' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.08 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  )
}
