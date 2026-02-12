import { AnimatePresence, motion } from 'framer-motion'
import { useToast } from '../../hooks/useToast'

const MotionDiv = motion.div

export default function ToastHost() {
  const { toasts } = useToast()

  return (
    <div className="toast-stack" aria-live="polite" aria-atomic="true">
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <MotionDiv
            key={toast.id}
            className="notification-toast"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {toast.message}
          </MotionDiv>
        ))}
      </AnimatePresence>
    </div>
  )
}
