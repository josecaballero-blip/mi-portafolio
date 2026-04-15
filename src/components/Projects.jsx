import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiArrowRight, HiX } from 'react-icons/hi'
import AnimatedTitle from './AnimatedTitle'

/* ─── Datos de proyectos ─────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id:          1,
    emoji:       '⚙️',
    title:       'Automatización RRHH',
    description: 'Pipeline de automatización para RRHH: onboarding sin papel, generación de contratos vía API y reportes que llegan solos al correo.',
    context:     'Prácticas profesionales · SENA',
    story:       'Este proyecto lo desarrollé durante mis prácticas en el SENA. El área de recursos humanos tenía un proceso de onboarding 100% manual: formularios en papel, contratos hechos a mano en Word y reportes que se armaban en Excel cada semana. Propuse automatizar todo el flujo y me dieron carta abierta para implementarlo.',
    longDesc:    'Monté un pipeline en n8n que recibe los datos del nuevo empleado desde un formulario web, genera el contrato en PDF con campos dinámicos, lo envía por correo al firmante y actualiza un dashboard de seguimiento automáticamente. También creé reportes semanales que se generan solos con Python y se entregan directo al buzón del jefe de RRHH.',
    impact:      'Reduje el tiempo de onboarding de 3 días a 15 minutos. El equipo de RRHH dejó de hacer trabajo repetitivo y pudo enfocarse en lo que importa. Fue mi primer proyecto real entregado a un cliente institucional.',
    tags:        ['n8n', 'Python', 'Automatización'],
    color:       '#00d4ff',
    features:    ['Onboarding automatizado sin papel', 'Generación dinámica de contratos PDF', 'Reportes semanales auto-generados', 'Dashboard de seguimiento en tiempo real', 'Notificaciones por correo automáticas'],
  },
  {
    id:          2,
    emoji:       '👓',
    title:       'Óptica Online',
    description: 'App full-stack para óptica: catálogo interactivo, reserva de citas con validación en tiempo real y dashboard admin con métricas de ventas.',
    context:     'Proyecto vendido a cliente · Cartagena',
    story:       'Un cliente dueño de una óptica en Cartagena me contactó porque necesitaba digitalizar su negocio. Tenía todo en cuadernos: inventario, citas, datos de clientes. Le propuse una app web completa y le gustó la idea. Fue mi primer proyecto vendido como freelance.',
    longDesc:    'Desarrollé el frontend en React con un catálogo interactivo donde los clientes pueden ver los lentes con filtros por marca, precio y tipo. El sistema de citas valida disponibilidad en tiempo real y envía recordatorios. El panel admin tiene métricas de ventas, gestión de inventario y exportación de datos.',
    impact:      'El cliente pasó de anotar todo en libretas a tener su negocio digitalizado. Las citas se redujeron en errores, el inventario se maneja solo y las ventas las puede ver en gráficas desde su celular.',
    tags:        ['React', 'Node.js', 'SQL', 'Dashboard'],
    color:       '#8b5cf6',
    features:    ['Catálogo de lentes con filtros', 'Reserva de citas con validación en tiempo real', 'Dashboard admin con métricas de ventas', 'Gestión completa de inventario', 'Exportación de datos y reportes'],
  },
  {
    id:          3,
    emoji:       '🎶',
    title:       'Discoteca & Eventos',
    description: 'Plataforma de reservas para entretenimiento nocturno: palcos, mesas, control de aforo en tiempo real y gestión de eventos con panel admin.',
    context:     'Proyecto vendido a cliente · Cartagena',
    story:       'El dueño de un bar-discoteca me buscó porque quería un sistema para gestionar reservas y eventos. Antes lo hacía todo por WhatsApp y siempre se le cruzaban las reservas. Le armé una plataforma completa donde sus clientes reservan directo y él controla todo desde un panel.',
    longDesc:    'La plataforma maneja reservas de mesas y palcos con lógica de disponibilidad en tiempo real. Tiene un módulo de eventos donde se crean las fiestas, se asignan DJs, se define el aforo y se puede hacer seguimiento de entradas. El panel de control le muestra al staff la ocupación de la noche, historial de clientes VIP y reportes de cada evento.',
    impact:      'Ya no se le cruzan reservas. Los clientes reservan desde la web sin llamar, y el staff tiene toda la info en un solo lugar. El dueño dice que ahora maneja tres veces más eventos sin perderse.',
    tags:        ['React', 'BD Relacional', 'Reservas'],
    color:       '#f59e0b',
    features:    ['Reserva online de mesas y palcos', 'Control de aforo en tiempo real', 'Módulo de creación de eventos', 'Panel de staff con vista de ocupación', 'Historial de clientes VIP y reportes'],
  },
  {
    id:          4,
    emoji:       '🐾',
    title:       'Veterinaria',
    description: 'Sistema clínico web para veterinaria: agenda de citas, historial médico por paciente, prescripciones y panel exclusivo para el personal médico.',
    context:     'Proyecto vendido a cliente · Cartagena',
    story:       'Una veterinaria acá en Cartagena me pidió un sistema para manejar las consultas de sus pacientes. Tenían fichas en papel, citas anotadas en un calendario de pared y las prescripciones se escribían a mano. Les construí un sistema clínico web completo pensado para que los veterinarios lo usen en consulta.',
    longDesc:    'El sistema tiene CRUD completo con relaciones entre pacientes (mascotas), dueños, citas y tratamientos. El backend lo hice en Python con Flask, endpoints REST bien documentados y base de datos SQL normalizada. El frontend en React tiene un flujo UX pensado para que el veterinario registre la consulta en tiempo real mientras atiende al paciente.',
    impact:      'Los veterinarios dejaron de buscar fichas en carpetas. Ahora tienen todo el historial a un click, las citas se organizan solas y las prescripciones se generan digitales. La clínica atiende más pacientes en menos tiempo.',
    tags:        ['React', 'Python', 'SQL'],
    color:       '#22c55e',
    features:    ['Fichas digitales por mascota', 'Historial médico completo por paciente', 'Agenda de citas inteligente', 'Prescripciones digitales', 'Panel exclusivo para veterinarios'],
  },
]

/* ─── Modal de detalle de proyecto ─────────────────────────────────────── */
function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 24 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="card max-w-[95vw] sm:max-w-lg w-full p-4 sm:p-7 relative max-h-[85vh] overflow-y-auto"
        >
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/10 transition-colors text-text-muted hover:text-text-primary"
            aria-label="Cerrar"
          >
            <HiX size={17} />
          </button>

          {/* Cabecera modal */}
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
              style={{ backgroundColor: `${project.color}15`, border: `1px solid ${project.color}28` }}
            >
              {project.emoji}
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-text-primary">{project.title}</h3>
              <span
                className="inline-block text-[11px] font-mono mt-1 px-2.5 py-0.5 rounded-full"
                style={{ backgroundColor: `${project.color}15`, color: project.color }}
              >
                {project.context}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded-full font-mono border"
                style={{ borderColor: `${project.color}25`, color: project.color }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Historia */}
          <div className="mb-5">
            <h4 className="font-heading font-semibold text-text-primary text-sm mb-2">La historia</h4>
            <p className="text-text-secondary text-sm leading-relaxed">{project.story}</p>
          </div>

          {/* Qué hice */}
          <div className="mb-5">
            <h4 className="font-heading font-semibold text-text-primary text-sm mb-2">Qué construí</h4>
            <p className="text-text-secondary text-sm leading-relaxed">{project.longDesc}</p>
          </div>

          {/* Impacto */}
          <div
            className="rounded-xl p-4 mb-5"
            style={{ backgroundColor: `${project.color}08`, border: `1px solid ${project.color}18` }}
          >
            <h4 className="font-heading font-semibold text-sm mb-1.5" style={{ color: project.color }}>Resultado</h4>
            <p className="text-text-secondary text-sm leading-relaxed">{project.impact}</p>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-heading font-semibold text-text-primary text-sm mb-3">Features</h4>
            <ul className="space-y-2">
              {project.features.map((feat) => (
                <li key={feat} className="flex items-center gap-2.5 text-text-secondary text-sm">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: project.color }}
                  />
                  {feat}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ─── Tarjeta de proyecto optimizada ──────────────────────────────────── */
function ProjectCard({ project, index, inView }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.3, delay: index * 0.04, ease: [0.25, 1, 0.5, 1] }}
      >
        <article
          className="relative group cursor-pointer overflow-hidden rounded-2xl p-[1px] transition-transform duration-300 hover:scale-[1.02]"
        >
          {/* Borde gradiente — solo visible en hover, sin rotate infinito */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
            style={{
              background: `conic-gradient(from 135deg, transparent, ${project.color}55, transparent, ${project.color}35, transparent)`,
            }}
          />

          {/* Interior */}
          <div className="relative bg-bg-card rounded-2xl p-4 sm:p-7 h-full flex flex-col gap-4 sm:gap-5">

            {/* Radial glow */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
              style={{ background: `radial-gradient(circle at 50% 20%, ${project.color}12, transparent 70%)` }}
            />

            {/* Icono + contenido */}
            <div className="relative z-10 flex items-start gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: `${project.color}12`,
                  border: `1px solid ${project.color}22`,
                }}
              >
                {project.emoji}
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-text-primary mb-1.5 leading-snug">
                  {project.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="relative z-10 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-lg font-mono"
                  style={{
                    backgroundColor: `${project.color}10`,
                    color: project.color,
                    border: `1px solid ${project.color}1e`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => setShowModal(true)}
              className="relative z-10 mt-auto flex items-center gap-1.5 text-sm font-medium w-fit transition-all duration-200"
              style={{ color: project.color }}
            >
              Más información
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                <HiArrowRight size={14} />
              </span>
            </button>
          </div>
        </article>
      </motion.div>

      {showModal && (
        <ProjectModal project={project} onClose={() => setShowModal(false)} />
      )}
    </>
  )
}

/* ─── Sección Proyectos ─────────────────────────────────────────────────── */
export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="proyectos" className="py-16 sm:py-24" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.25 }}
          className="mb-14"
        >
          <span className="section-tag">// proyectos.push([])</span>
          <AnimatedTitle className="section-title">
            Proyectos <span className="accent-text">deployados</span>
          </AnimatedTitle>
          <p className="section-subtitle mt-3">
            Casos reales — cada uno resolvió un problema concreto, con arquitectura limpia y código que se puede mantener.
          </p>
        </motion.div>

        {/* Grid 2 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
