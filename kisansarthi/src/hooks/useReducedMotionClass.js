import { useEffect } from 'react'

export function useReducedMotionClass() {
  useEffect(() => {
    const shouldReduce = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4
    if (shouldReduce) {
      document.body.classList.add('reduce-motion')
      return () => document.body.classList.remove('reduce-motion')
    }
  }, [])
}

