import { motion } from 'framer-motion'

const MotionDiv = motion.div

export default function AuthToggle({ value, onChange }) {
  return (
    <div className="auth-toggle" role="tablist" aria-label="Authentication mode">
      <MotionDiv className="auth-toggle-track">
        <MotionDiv
          className="auth-toggle-indicator"
          animate={{ left: value === 'signin' ? '0%' : '50%' }}
          transition={{ type: 'spring', stiffness: 520, damping: 40 }}
        />
        <button
          className={`auth-toggle-btn${value === 'signin' ? ' active' : ''}`}
          type="button"
          role="tab"
          aria-selected={value === 'signin'}
          onClick={() => onChange('signin')}
        >
          Sign In
        </button>
        <button
          className={`auth-toggle-btn${value === 'signup' ? ' active' : ''}`}
          type="button"
          role="tab"
          aria-selected={value === 'signup'}
          onClick={() => onChange('signup')}
        >
          Sign Up
        </button>
      </MotionDiv>
    </div>
  )
}
