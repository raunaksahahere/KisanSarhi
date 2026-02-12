import { useEffect, useState } from 'react'

export function useHeroParallax(speed = 0.5) {
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      setOffsetY(scrollY < window.innerHeight ? scrollY * speed : 0)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])

  return offsetY
}
