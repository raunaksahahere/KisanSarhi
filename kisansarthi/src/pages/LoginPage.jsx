import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import AuthToggle from '../components/AuthToggle'
import SignInForm from '../components/SignInForm'
import SignUpForm from '../components/SignUpForm'
import { useAuth } from '../context/useAuth'

const MotionDiv = motion.div

export default function LoginPage() {
  const { isAuthenticated, isInitializing } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()

  const initialMode = useMemo(() => {
    const mode = searchParams.get('mode')
    return mode === 'signup' ? 'signup' : 'signin'
  }, [searchParams])

  const [mode, setMode] = useState(initialMode)

  useEffect(() => {
    setMode(initialMode)
  }, [initialMode])

  const onModeChange = (nextMode) => {
    setMode(nextMode)
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev)
      if (nextMode === 'signup') p.set('mode', 'signup')
      else p.delete('mode')
      return p
    })
  }

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <div className="auth-top">
          <Link className="auth-back" to="/">
            ← Back to home
          </Link>
        </div>

        <div className="auth-card">
          <div className="auth-brand">
            <div className="auth-logo">
              <span className="auth-logo-icon">🌾</span>
              <span className="auth-logo-text">KisanSarthi</span>
            </div>
            <p className="auth-tagline">Farm-inspired fintech learning, built for real-world connectivity.</p>
          </div>

          <AuthToggle value={mode} onChange={onModeChange} />

          <AnimatePresence mode="wait" initial={false}>
            {mode === 'signin' ? (
              <MotionDiv
                key="signin"
                className="auth-panel"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                <h1 className="auth-title">Welcome back</h1>
                <p className="auth-subtitle">Sign in with email or phone + password.</p>
                <SignInForm />
              </MotionDiv>
            ) : (
              <MotionDiv
                key="signup"
                className="auth-panel"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                <h1 className="auth-title">Create your account</h1>
                <p className="auth-subtitle">Email verification or phone OTP—your choice.</p>
                <SignUpForm />
              </MotionDiv>
            )}
          </AnimatePresence>

          {isInitializing ? <div className="auth-inline-note">Restoring session…</div> : null}
          {!isInitializing && isAuthenticated ? <div className="auth-inline-note">Redirecting…</div> : null}
        </div>
      </div>

      <div className="auth-grass" aria-hidden="true" />
    </div>
  )
}
