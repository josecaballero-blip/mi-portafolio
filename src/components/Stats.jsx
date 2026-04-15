import { useState, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import anime from 'animejs/lib/anime.es.js'

/* ─── Datos de métricas ─────────────────────────────────────────────────── */
const STATS = [
  { value: 4,  suffix: '+', label: 'Proyectos entregados'          },
  { value: 6,  suffix: '',  label: 'Meses de Experiencia'            },
  { value: 4,  suffix: '',  label: 'Certificaciones AWS'            },
  { value: 3,  suffix: '',  label: 'Herramientas de automatización' },
]

/* Contador animado con requestAnimationFrame (1 rAF por counter, no setInterval) */
function CountUp({ target, suffix, isActive }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isActive) return

    const DURATION = 1400
    let start = null
    let rafId

    const tick = (ts) => {
      if (!start) start = ts
      const elapsed = ts - start
      const progress = Math.min(elapsed / DURATION, 1)
      setCount(Math.round(target * (1 - Math.pow(1 - progress, 3))))
      if (progress < 1) rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafId)
  }, [target, isActive])

  return (
    <span className="font-heading font-extrabold text-3xl sm:text-5xl accent-text tabular-nums">
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })
  const gridRef = useRef(null)
  const animeRan = useRef(false)

  useEffect(() => {
    if (inView && !animeRan.current && gridRef.current) {
      animeRan.current = true
      anime({
        targets: gridRef.current.querySelectorAll('.stat-item'),
        opacity: [0, 1],
        translateY: [30, 0],
        scale: [0.9, 1],
        easing: 'easeOutBack',
        duration: 700,
        delay: anime.stagger(120),
      })
    }
  }, [inView])

  return (
    <section ref={ref} className="py-16 border-y border-white/[0.06] bg-bg-primary/60 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-item flex flex-col items-center text-center gap-2"
              style={{ opacity: 0 }}
            >
              <CountUp target={stat.value} suffix={stat.suffix} isActive={inView} />
              <span className="text-text-muted text-sm leading-snug">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
