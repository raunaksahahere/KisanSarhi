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

function isValidOtp(token) {
  return /^\d{4,8}$/.test(token)
}

export default function SignUpForm() {
  const { signUpWithEmailPassword, signUpWithPhonePassword, verifyPhoneOtp } = useAuth()
  const { showToast } = useToast()

  const [method, setMethod] = useState('email')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [phoneOtpSent, setPhoneOtpSent] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const canSubmit = useMemo(() => {
    if (method === 'email') return isValidEmail(email) && password.length >= 6
    if (!phoneOtpSent) return isValidPhone(phone) && password.length >= 6
    return isValidPhone(phone) && isValidOtp(otp)
  }, [email, method, otp, password.length, phone, phoneOtpSent])

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!canSubmit) {
      setError('Please complete all required fields.')
      return
    }

    setIsSubmitting(true)
    try {
      if (method === 'email') {
        const emailRedirectTo = `${window.location.origin}/dashboard`
        const result = await signUpWithEmailPassword({ email: email.trim(), password, emailRedirectTo })
        if (result.error) {
          setError(result.error.message || 'Unable to sign up.')
          return
        }
        setSuccess('Check your email for a verification link to complete signup.')
        showToast('📩 Verification email sent')
        return
      }

      if (!phoneOtpSent) {
        const result = await signUpWithPhonePassword({ phone: phone.trim(), password })
        if (result.error) {
          setError(result.error.message || 'Unable to sign up.')
          return
        }
        setPhoneOtpSent(true)
        setSuccess('OTP sent to your phone. Enter it below to verify.')
        showToast('📲 OTP sent')
        return
      }

      const result = await verifyPhoneOtp({ phone: phone.trim(), token: otp.trim() })
      if (result.error) {
        setError(result.error.message || 'Invalid OTP.')
        return
      }

      showToast('✅ Phone verified')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetPhoneFlow = () => {
    setPhoneOtpSent(false)
    setOtp('')
    setError('')
    setSuccess('')
  }

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <div className="auth-method">
        <button
          type="button"
          className={`auth-method-btn${method === 'email' ? ' active' : ''}`}
          onClick={() => {
            setMethod('email')
            resetPhoneFlow()
          }}
          disabled={isSubmitting}
        >
          Email
        </button>
        <button
          type="button"
          className={`auth-method-btn${method === 'phone' ? ' active' : ''}`}
          onClick={() => {
            setMethod('phone')
            setError('')
            setSuccess('')
          }}
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

            <label className="auth-label">
              Password
              <input
                className="auth-input"
                type="password"
                autoComplete="new-password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                required
                minLength={6}
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
                disabled={isSubmitting || phoneOtpSent}
                required
              />
            </label>

            {!phoneOtpSent ? (
              <label className="auth-label">
                Password
                <input
                  className="auth-input"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                  required
                  minLength={6}
                />
              </label>
            ) : (
              <label className="auth-label">
                OTP
                <input
                  className="auth-input"
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </label>
            )}

            {phoneOtpSent ? (
              <button className="auth-link" type="button" onClick={resetPhoneFlow} disabled={isSubmitting}>
                Change phone number
              </button>
            ) : null}
          </MotionDiv>
        )}
      </AnimatePresence>

      {error ? <div className="auth-alert error">{error}</div> : null}
      {success ? <div className="auth-alert success">{success}</div> : null}

      <button className="auth-submit" type="submit" disabled={!canSubmit || isSubmitting}>
        {isSubmitting
          ? method === 'phone' && phoneOtpSent
            ? 'Verifying…'
            : 'Creating…'
          : method === 'phone' && phoneOtpSent
            ? 'Verify OTP'
            : 'Create Account'}
      </button>
    </form>
  )
}
