import { LanguageProvider } from './context/LanguageContext'
import { ToastProvider } from './context/ToastContext'
import { useReducedMotionClass } from './hooks/useReducedMotionClass'
import LandingPage from './pages/LandingPage/LandingPage'

function App() {
  useReducedMotionClass()

  return (
    <LanguageProvider>
      <ToastProvider>
        <LandingPage />
      </ToastProvider>
    </LanguageProvider>
  )
}

export default App
