import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiArrowRight, HiX } from 'react-icons/hi'
import AnimatedTitle from './AnimatedTitle'
import { useTranslation } from 'react-i18next'

const PROJECTS = [
  { id: 1, key: 'rrhh',        emoji: '⚙️', tags: ['n8n', 'Python', 'Automatización'], color: '#00d4ff' },
  { id: 2, key: 'optica',      emoji: '👓', tags: ['React', 'Node.js', 'SQL', 'Dashboard'], color: '#8b5cf6' },
  { id: 3, key: 'discoteca',   emoji: '🎶', tags: ['React', 'BD Relacional', 'Reservas'], color: '#f59e0b' },
  { id: 4, key: 'veterinaria', emoji: '🐾', tags: ['React', 'Python', 'SQL'], color: '#22c55e' },
]

function ProjectModal({ project, onClose, t }) {
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
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-bg-card-alt transition-colors text-text-muted hover:text-text-primary"
            aria-label={t('projects.close')}
          >
            <HiX size={17} />
          </button>

          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
              style={{ backgroundColor: `${project.color}15`, border: `1px solid ${project.color}28` }}
            >
              {project.emoji}
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-text-primary">{t(`projects.items.${project.key}.title`)}</h3>
              <span
                className="inline-block text-[11px] font-mono mt-1 px-2.5 py-0.5 rounded-full"
                style={{ backgroundColor: `${project.color}15`, color: project.color }}
              >
                {t(`projects.items.${project.key}.context`)}
              </span>
            </div>
          </div>

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

          <div className="mb-5">
            <h4 className="font-heading font-semibold text-text-primary text-sm mb-2">{t('projects.story')}</h4>
            <p className="text-text-secondary text-sm leading-relaxed">{t(`projects.items.${project.key}.story`)}</p>
          </div>

          <div className="mb-5">
            <h4 className="font-heading font-semibold text-text-primary text-sm mb-2">{t('projects.details')}</h4>
            <p className="text-text-secondary text-sm leading-relaxed">{t(`projects.items.${project.key}.longDesc`)}</p>
          </div>

          <div
            className="rounded-xl p-4 mb-5"
            style={{ backgroundColor: `${project.color}08`, border: `1px solid ${project.color}18` }}
          >
            <h4 className="font-heading font-semibold text-sm mb-1.5" style={{ color: project.color }}>{t('projects.impact')}</h4>
            <p className="text-text-secondary text-sm leading-relaxed">{t(`projects.items.${project.key}.impact`)}</p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-text-primary text-sm mb-3">{t('projects.features')}</h4>
            <ul className="space-y-2">
              {t(`projects.items.${project.key}.features`, { returnObjects: true }).map((feat) => (
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

function ProjectCard({ project, index, inView, t }) {
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
          <div
            className="absolute inset-0 rounded-2xl opacity-30 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
            style={{
              background: `conic-gradient(from 135deg, transparent, ${project.color}55, transparent, ${project.color}35, transparent)`,
            }}
          />

          <div className="relative bg-bg-card rounded-2xl p-4 sm:p-7 h-full flex flex-col gap-4 sm:gap-5">
            <div
              className="absolute inset-0 rounded-2xl opacity-20 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
              style={{ background: `radial-gradient(circle at 50% 20%, ${project.color}12, transparent 70%)` }}
            />

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
                  {t(`projects.items.${project.key}.title`)}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {t(`projects.items.${project.key}.description`)}
                </p>
              </div>
            </div>

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

            <button
              onClick={() => setShowModal(true)}
              className="relative z-10 mt-auto flex items-center gap-1.5 text-sm font-medium w-fit transition-all duration-200"
              style={{ color: project.color }}
            >
              {t('projects.viewProject')}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                <HiArrowRight size={14} />
              </span>
            </button>
          </div>
        </article>
      </motion.div>

      {showModal && (
        <ProjectModal project={project} onClose={() => setShowModal(false)} t={t} />
      )}
    </>
  )
}

export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })
  const { t } = useTranslation()

  return (
    <section id="proyectos" className="py-16 sm:py-24" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.25 }}
          className="mb-14"
        >
          <span className="section-tag">{t('projects.tag')}</span>
          <AnimatedTitle className="section-title">
            {t('projects.title1')}<span className="accent-text">{t('projects.title2')}</span>
          </AnimatedTitle>
          <p className="section-subtitle mt-3">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}