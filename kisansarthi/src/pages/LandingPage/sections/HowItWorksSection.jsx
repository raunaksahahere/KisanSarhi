import { motion } from 'framer-motion'
import { useTranslation } from '../../../hooks/useTranslation'

const MotionDiv = motion.div

const steps = [
  {
    icon: '🌱',
    title: 'Select Crop Cycle',
    description: 'Choose your crop and season. Each cycle brings unique financial challenges and opportunities.'
  },
  {
    icon: '💡',
    title: 'Make Financial Decisions',
    description: 'Decide on savings, expenses, and investments throughout the growing season.'
  },
  {
    icon: '📊',
    title: 'Track Your Progress',
    description: 'Monitor savings, stress levels, and risk scores in real-time with visual meters.'
  },
  {
    icon: '🤖',
    title: 'Get AI Guidance',
    description: 'Sarthi AI explains your choices and suggests better strategies (optional).'
  }
]

export default function HowItWorksSection() {
  const { t } = useTranslation()

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <h2 className="section-title" data-i18n="section_how_it_works">
          {t('section_how_it_works')}
        </h2>
        <p className="section-subtitle">Your journey to financial mastery in 4 simple steps</p>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <MotionDiv
              key={step.title}
              className="step-card"
              data-step={index + 1}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
            >
              <div className="step-number">{index + 1}</div>
              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  )
}
