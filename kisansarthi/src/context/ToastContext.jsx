import { createContext, useCallback, useMemo, useRef, useState } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const nextIdRef = useRef(1)

  const removeToast = useCallback((id) => {
    setToasts((current) => current.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback((message, options) => {
    const id = nextIdRef.current++
    const durationMs = options?.durationMs ?? 3000

    setToasts((current) => [...current, { id, message }])
    window.setTimeout(() => removeToast(id), durationMs)

    return id
  }, [removeToast])

  const value = useMemo(
    () => ({
      toasts,
      showToast,
      removeToast
    }),
    [toasts, showToast, removeToast]
  )

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

export default ToastContext

