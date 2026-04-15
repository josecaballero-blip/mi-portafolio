import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaAws } from 'react-icons/fa'
import { HiAcademicCap, HiExternalLink, HiBriefcase, HiShieldCheck } from 'react-icons/hi'
import AnimatedTitle from './AnimatedTitle'
import { useTranslation } from 'react-i18next'

/* ─── Datos ─────────────────────────────────────────────────────────────── */
const CERTS = [
  { key: 'technical', date: 'Dic 2025', color: '#ff9900', icon: FaAws, pdf: '/certificados/aws-technical-essentials.pdf' },
  { key: 'cloud',     date: 'Dic 2025', color: '#ff9900', icon: FaAws, pdf: '/certificados/aws-cloud-practitioner.pdf' },
  { key: 'database',  date: 'Dic 2025', color: '#ff9900', icon: FaAws, pdf: '/certificados/aws-database-offerings.pdf' },
  { key: 'ai',        date: 'Dic 2025', color: '#ff9900', icon: FaAws, pdf: '/certificados/aws-generative-ai.pdf' },
]

const EDUCATION = [
  { key: 'degree', color: '#22c55e', pdf: '/certificados/diploma-sena-adso.pdf' },
  { key: 'bachillerato', color: '#8b5cf6' },
]

const EXPERIENCE_ITEMS_COUNT = 4

/* ─── Sub-heading decorativo ────────────────────────────────────────────── */
function SectionLabel({ icon: Icon, label, color, delay, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.35, delay }}
      className="flex items-center gap-3 mb-6"
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center text-base"
        style={{ backgroundColor: `${color}18`, border: `1px solid ${color}30` }}
      >
        <Icon style={{ color }} />
      </div>
      <span className="font-heading font-bold text-base text-text-primary tracking-wide uppercase">{label}</span>
      <div className="flex-1 h-px ml-1" style={{ background: `linear-gradient(to right, ${color}30, transparent)` }} />
    </motion.div>
  )
}

/* ─── Tarjeta de educación con hover glow ───────────────────────────────── */
function EduCard({ edu, index, inView, title, place, period, diplomaLabel }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay: 0.08 + index * 0.06 }}
      className="group relative overflow-hidden rounded-2xl p-[1px]"
    >
      {/* Borde sutil en hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `conic-gradient(from 180deg, transparent, ${edu.color}40, transparent)` }}
      />

      <div className="relative bg-bg-card rounded-2xl p-4 sm:p-6 h-full">
        {/* Glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-20 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle at 30% 30%, ${edu.color}10, transparent 70%)` }}
        />

        <div className="relative z-10 flex items-start gap-4">
          {/* Línea vertical decorativa */}
          <div className="flex flex-col items-center gap-1 mt-0.5">
            <div className="w-3 h-3 rounded-full ring-2 ring-offset-1 ring-offset-bg-card" style={{ backgroundColor: edu.color, ringColor: `${edu.color}50` }} />
            <div className="w-0.5 flex-1 rounded-full opacity-30" style={{ backgroundColor: edu.color }} />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-heading font-bold text-[15px] text-text-primary leading-snug">{title}</h4>
            <p className="text-text-muted text-xs mt-1.5 leading-relaxed">{place}</p>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span
                className="text-[11px] font-mono px-2.5 py-1 rounded-full"
                style={{ color: edu.color, backgroundColor: `${edu.color}12`, border: `1px solid ${edu.color}25` }}
              >
                {period}
              </span>
              {edu.pdf && (
                <a
                  href={edu.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full transition-all duration-200 hover:scale-105"
                  style={{ color: edu.color, backgroundColor: `${edu.color}10`, border: `1px solid ${edu.color}20` }}
                >
                  {diplomaLabel} <HiExternalLink className="text-xs" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Tarjeta de certificación optimizada ────────────────────────────── */
function CertCard({ cert, index, inView, t }) {
  const Icon = cert.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay: index * 0.05, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className="relative group overflow-hidden rounded-2xl p-[1px] h-full transition-transform duration-300 hover:scale-[1.02]">
        {/* Borde gradiente — solo hover, sin rotate */}
        <div
          className="absolute inset-0 rounded-2xl opacity-30 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{
            background: `conic-gradient(from 135deg, transparent, ${cert.color}55, transparent, ${cert.color}35, transparent)`,
          }}
        />

        <div className="relative bg-bg-card rounded-2xl p-4 sm:p-6 h-full flex flex-col gap-3 sm:gap-4">
          {/* Glow */}
          <div
            className="absolute inset-0 rounded-2xl opacity-20 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
            style={{ background: `radial-gradient(circle at 50% 20%, ${cert.color}12, transparent 70%)` }}
          />

          {/* Badge verificado */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: `${cert.color}18` }}>
              <HiShieldCheck className="text-xs" style={{ color: cert.color }} />
            </div>
          </div>

          {/* Header */}
          <div className="relative z-10 flex items-start gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
              style={{
                backgroundColor: `${cert.color}15`,
                border: `1px solid ${cert.color}28`,
              }}
            >
              <Icon style={{ color: cert.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="relative z-10 font-heading font-bold text-[15px] text-text-primary leading-snug">
                {t(`certifications.certs.${cert.key}.title`)}
              </h3>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[11px] font-mono text-text-muted">{t(`certifications.certs.${cert.key}.issuer`)}</span>
                <span className="text-[10px] text-text-muted">·</span>
                <span
                  className="text-[11px] font-mono px-2 py-0.5 rounded-full"
                  style={{ color: cert.color, backgroundColor: `${cert.color}12` }}
                >
                  {cert.date}
                </span>
              </div>
            </div>
          </div>

          {/* Descripción */}
          <p className="relative z-10 text-text-muted text-xs leading-relaxed flex-1">{t(`certifications.certs.${cert.key}.desc`)}</p>

          {/* Ver certificado */}
          {cert.pdf && (
            <a
              href={cert.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 mt-auto inline-flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-lg transition-all duration-200 hover:scale-[1.03] w-fit"
              style={{ color: cert.color, backgroundColor: `${cert.color}12`, border: `1px solid ${cert.color}22` }}
            >
              {t('certifications.download_cert')}
              <HiExternalLink className="text-sm" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Componente principal ─────────────────────────────────────────────── */
export default function Certifications() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })
  const { t } = useTranslation()

  return (
    <section id="certificaciones" className="py-16 sm:py-28 bg-bg-secondary/80 backdrop-blur-sm relative overflow-hidden" ref={ref}>
      {/* Orbes */}
      <div className="absolute top-16 right-0 w-80 h-80 bg-[#ff9900]/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-72 h-72 bg-accent-violet/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-cyan/[0.015] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* Encabezado principal */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3 }}
          className="mb-16 text-center"
        >
          <span className="section-tag">{t('certifications.tag')}</span>
          <AnimatedTitle className="section-title">
            {t('certifications.title1')}<span className="accent-text">{t('certifications.title2')}</span>
          </AnimatedTitle>
          <p className="section-subtitle mt-3 max-w-xl mx-auto">
            {t('certifications.subtitle')}
          </p>
        </motion.div>

        {/* ── Educación ────────────────────────────────────────────────── */}
        <SectionLabel icon={HiAcademicCap} label={t('certifications.education_title')} color="#22c55e" delay={0.05} inView={inView} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-10 sm:mb-14">
          {EDUCATION.map((edu, i) => (
            <EduCard key={edu.key} edu={edu} index={i} inView={inView}
              title={t(`certifications.edu.${edu.key}.title`)}
              place={t(`certifications.edu.${edu.key}.place`)}
              period={t(`certifications.edu.${edu.key}.period`)}
              diplomaLabel={t('certifications.download_diploma')} />
          ))}
        </div>

        {/* ── SENNOVA ──────────────────────────────────────────────────── */}
        <SectionLabel icon={HiBriefcase} label={t('certifications.sennova_title')} color="#00d4ff" delay={0.1} inView={inView} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35, delay: 0.12 }}
          className="group relative overflow-hidden rounded-2xl p-[1px] mb-14"
        >
          {/* Borde hover */}
          <div className="absolute inset-0 rounded-2xl opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: 'conic-gradient(from 90deg, transparent, #00d4ff40, transparent)' }}
          />

          <div className="relative bg-bg-card rounded-2xl p-7">
            {/* Glow */}
            <div className="absolute inset-0 rounded-2xl opacity-20 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'radial-gradient(circle at 20% 30%, #00d4ff08, transparent 60%)' }}
            />

            {/* Borde izquierdo decorativo */}
            <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-gradient-to-b from-accent-cyan via-accent-cyan/40 to-transparent" />

            <div className="relative z-10 pl-4">
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                {t('certifications.sennova_desc')}
              </p>
              <div className="flex flex-wrap gap-2">
                {t('certifications.sennova_tags', { returnObjects: true }).map((tag) => (
                  <span key={tag} className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Certificaciones AWS ──────────────────────────────────────── */}
        <SectionLabel icon={FaAws} label={t('certifications.aws_section_title')} color="#ff9900" delay={0.15} inView={inView} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {CERTS.map((cert, i) => (
            <CertCard key={cert.key} cert={cert} index={i} inView={inView} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
