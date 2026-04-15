import { useRef, useEffect } from 'react'
import anime from 'animejs/lib/anime.es.js'

/**
 * Animated section title — the whole title fades + slides up on scroll via anime.js.
 * Does NOT manipulate innerHTML to avoid React reconciliation conflicts.
 */
export default function AnimatedTitle({ children, className = '', tag: Tag = 'h2', delay = 0 }) {
  const containerRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Hide initially
    el.style.opacity = '0'
    el.style.transform = 'translateY(24px)'

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          anime({
            targets: el,
            opacity: [0, 1],
            translateY: [24, 0],
            easing: 'easeOutExpo',
            duration: 900,
            delay,
          })
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <Tag ref={containerRef} className={className}>
      {children}
    </Tag>
  )
}
