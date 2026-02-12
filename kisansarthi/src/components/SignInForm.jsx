import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useAuth } from '../context/useAuth'
import { useToast } from '../hooks/useToast'

const MotionDiv = motion.div

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidPhone(phone) {
  return /^\+\d{8,15}$/.test(phone)
}

export default function SignInForm() {
  const { signInWithEmailPassword, signInWithPhonePassword } = useAuth()
  const { showToast } = useToast()

  const [method, setMethod] = useState('email')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const canSubmit = useMemo(() => {
    if (password.length < 6) return false
    if (method === 'email') return isValidEmail(email)
    return isValidPhone(phone)
  }, [email, method, password.length, phone])

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!canSubmit) {
      setError(method === 'email' ? 'Enter a valid email and password.' : 'Enter a valid phone (+countrycode) and password.')
      return
    }

    setIsSubmitting(true)
    try {
      const result =
        method === 'email'
          ? await signInWithEmailPassword({ email: email.trim(), password })
          : await signInWithPhonePassword({ phone: phone.trim(), password })

      if (result.error) {
        setError(result.error.message || 'Unable to sign in.')
        return
      }

      showToast('✅ Signed in successfully')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <div className="auth-method">
        <button
          type="button"
          className={`auth-method-btn${method === 'email' ? ' active' : ''}`}
          onClick={() => setMethod('email')}
          disabled={isSubmitting}
        >
          Email
        </button>
        <button
          type="button"
          className={`auth-method-btn${method === 'phone' ? ' active' : ''}`}
          onClick={() => setMethod('phone')}
          disabled={isSubmitting}
        >
          Phone
        </button>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {method === 'email' ? (
          <MotionDiv
            key="email"
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 14 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <label className="auth-label">
              Email
              <input
                className="auth-input"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </label>
          </MotionDiv>
        ) : (
          <MotionDiv
            key="phone"
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 14 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <label className="auth-label">
              Phone
              <input
                className="auth-input"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="+91XXXXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </label>
          </MotionDiv>
        )}
      </AnimatePresence>

      <label className="auth-label">
        Password
        <input
          className="auth-input"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isSubmitting}
          required
          minLength={6}
        />
      </label>

      {error ? <div className="auth-alert error">{error}</div> : null}

      <button className="auth-submit" type="submit" disabled={!canSubmit || isSubmitting}>
        {isSubmitting ? 'Signing in…' : 'Sign In'}
      </button>

      <div className="auth-helper">
        <span className="auth-helper-dot" />
        No OTP is used for sign in.
      </div>
    </form>
  )
}
