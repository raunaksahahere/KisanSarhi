import { motion } from 'framer-motion'
import { useTranslation } from '../../../hooks/useTranslation'

const MotionDiv = motion.div

const testimonials = [
  {
    avatar: '👨🏽‍🌾',
    quote:
      '"KisanSarthi helped me understand how to budget for my wheat crop. For the first time, I saved money after harvest!"',
    name: 'Rajesh Kumar',
    role: 'Wheat Farmer, Punjab'
  },
  {
    avatar: '👩🏽‍🌾',
    quote: '"The AI assistant is like having a financial advisor in my pocket. It explains things so simply."',
    name: 'Lakshmi Devi',
    role: 'Cotton Farmer, Gujarat'
  },
  {
    avatar: '👳🏽‍♂️',
    quote:
      '"I played the simulation before the season started. It saved me from making a costly mistake with fertilizers."',
    name: 'Balwinder Singh',
    role: 'Rice Farmer, Haryana'
  }
]

export default function TestimonialsSection() {
  const { t } = useTranslation()

  return (
    <section className="testimonials" id="stories">
      <div className="container">
        <h2 className="section-title" data-i18n="section_testimonials">
          {t('section_testimonials')}
        </h2>
        <p className="section-subtitle">Real stories of financial resilience</p>
        <div className="testimonials-grid">
          {testimonials.map((item, index) => (
            <MotionDiv
              key={item.name}
              className="testimonial-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.08 }}
            >
              <div className="farmer-avatar">{item.avatar}</div>
              <div className="testimonial-content">
                <p className="testimonial-quote">{item.quote}</p>
                <div className="testimonial-author">
                  <h4>{item.name}</h4>
                  <p>{item.role}</p>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  )
}
