import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiLightningBolt, HiCog, HiDocumentReport, HiUsers } from 'react-icons/hi'
import AnimatedTitle from './AnimatedTitle'

/* ─── Tarjetas de servicio ─────────────────────────────────────────────── */
const CARDS = [
  {
    icon:        HiLightningBolt,
    title:       'Flujos n8n',
    description: 'Diseño de workflows en n8n con triggers, nodos HTTP, webhooks y lógica condicional para conectar cualquier API sin levantar servidores.',
    color:       '#ea4b71',
  },
  {
    icon:        HiCog,
    title:       'Integración Make.com',
    description: 'Escenarios multi-módulo en Make.com: data mapping entre plataformas, manejo de errores, variables dinámicas y scheduling de ejecuciones.',
    color:       '#6d69ff',
  },
  {
    icon:        HiDocumentReport,
    title:       'Reportes automáticos',
    description: 'Scripts Python + n8n que agregan datos de múltiples fuentes, generan PDFs dinámicos y los distribuyen automáticamente por email o Google Drive.',
    color:       '#00d4ff',
  },
  {
    icon:        HiUsers,
    title:       'Caso real: RRHH',
    description: 'Pipeline end-to-end para el área de RRHH: desde el evento de hiring hasta la firma digital del contrato, todo sin tocar un archivo manualmente.',
    color:       '#22c55e',
  },
]

/* ─── Tarjeta con tilt 3D ──────────────────────────────────────────────── */
function TiltServiceCard({ card, index, inView }) {
  const Icon = card.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay: 0.1 + index * 0.05, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className="relative group overflow-hidden rounded-2xl p-[1px] h-full transition-transform duration-300 hover:scale-[1.03]">
        {/* Borde gradiente — solo en hover, sin rotate */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{
            background: `conic-gradient(from 135deg, transparent, ${card.color}55, transparent, ${card.color}35, transparent)`,
          }}
        />

        <div className="relative bg-bg-card rounded-2xl p-4 sm:p-6 h-full flex flex-col gap-3 sm:gap-4">

          {/* Glow */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
            style={{ background: `radial-gradient(circle at 50% 20%, ${card.color}12, transparent 70%)` }}
          />

          {/* Icono */}
          <div
            className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center text-[1.35rem] flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
            style={{
              backgroundColor: `${card.color}15`,
              border: `1px solid ${card.color}28`,
            }}
          >
            <Icon style={{ color: card.color }} />
          </div>

          <div className="relative z-10">
            <h3 className="font-heading font-semibold text-text-primary text-sm mb-2">
              {card.title}
            </h3>
            <p className="text-text-muted text-xs leading-relaxed">
              {card.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Automation() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })

  return (
    <section
      id="automatizacion"
      className="py-16 sm:py-24 bg-bg-secondary/80 backdrop-blur-sm relative overflow-hidden"
      ref={ref}
    >
      {/* Decoraciones de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-cyan/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-violet/[0.05] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* Cabecera + bloque de código */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-center mb-10 sm:mb-16">

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3 }}
          >
            <span className="section-tag">// automation.init()</span>
            <AnimatedTitle className="section-title">
              Automatización de <span className="accent-text">Procesos</span>
            </AnimatedTitle>
            <p className="text-text-secondary text-base leading-relaxed mt-4 max-w-md">
              Si un proceso se repite más de dos veces, se automatiza. Conecto APIs,
              bases de datos y plataformas para que los flujos corran solos — sin
              errores humanos y sin que nadie tenga que estar pendiente.
            </p>
          </motion.div>

          {/* Bloque de código decorativo */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.06 }}
            className="glass rounded-2xl p-4 sm:p-6 relative overflow-hidden group"
          >
            {/* Glow sutil */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'radial-gradient(circle at 50% 30%, rgba(0,212,255,0.06), transparent 70%)' }}
            />

            {/* Barra de pestañas tipo editor */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
              <span className="ml-3 text-text-muted text-xs font-mono">onboarding.flow.json</span>
            </div>
            {/* Pseudocódigo con líneas animadas */}
            <div className="text-xs font-mono leading-7 select-none">
              {[
                { parts: [{ text: 'trigger', cls: 'text-accent-violet' }, { text: ':  ', cls: 'text-text-muted' }, { text: '"nuevo_empleado"', cls: 'text-accent-cyan' }] },
                { parts: [{ text: '  ↓', cls: 'text-white/40' }] },
                { parts: [{ text: 'acción', cls: 'text-accent-violet' }, { text: ':  crear cuenta corporativa', cls: 'text-text-muted' }] },
                { parts: [{ text: 'acción', cls: 'text-accent-violet' }, { text: ':  enviar email de bienvenida', cls: 'text-text-muted' }] },
                { parts: [{ text: 'acción', cls: 'text-accent-violet' }, { text: ':  generar documentos legales', cls: 'text-text-muted' }] },
                { parts: [{ text: 'acción', cls: 'text-accent-violet' }, { text: ':  notificar al equipo RRHH', cls: 'text-text-muted' }] },
                { parts: [{ text: '  ↓', cls: 'text-white/40' }] },
                { parts: [{ text: '✓ completado en 0.4s', cls: 'text-green-400' }] },
              ].map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.2, delay: 0.3 + i * 0.08, ease: 'easeOut' }}
                >
                  {line.parts.map((p, j) => (
                    <span key={j} className={p.cls}>{p.text}</span>
                  ))}
                </motion.div>
              ))}
              {/* Cursor parpadeante — CSS animation en vez de Framer Motion */}
              <span className="inline-block w-2 h-4 bg-accent-cyan/70 ml-0.5 mt-1 animate-pulse" />
            </div>
          </motion.div>
        </div>

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {CARDS.map((card, i) => (
            <TiltServiceCard key={card.title} card={card} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
