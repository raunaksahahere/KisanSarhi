import { useReducedMotionClass } from './hooks/useReducedMotionClass'
import LandingPage from './pages/LandingPage/LandingPage'
import LoginPage from './pages/LoginPage'
import ToastHost from './components/Toast/ToastHost'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/useAuth'
import { useToast } from './hooks/useToast'
import { motion } from 'framer-motion'

function App() {
  useReducedMotionClass()

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastHost />
    </>
  )
}

const MotionDiv = motion.div

function DashboardPage() {
  const { user, signOut } = useAuth()
  const { showToast } = useToast()

  return (
    <div className="dashboard-page">
      <MotionDiv
        className="dashboard-card"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">You’re signed in.</p>
        <div className="dashboard-meta">
          <div className="dashboard-row">
            <span className="dashboard-label">User</span>
            <span className="dashboard-value">{user?.email || user?.phone || user?.id}</span>
          </div>
        </div>
        <button
          className="auth-submit"
          type="button"
          onClick={async () => {
            const result = await signOut()
            if (result?.error) showToast(result.error.message || 'Unable to sign out.')
            else showToast('👋 Signed out')
          }}
        >
          Sign Out
        </button>
      </MotionDiv>
    </div>
  )
}

export default App
