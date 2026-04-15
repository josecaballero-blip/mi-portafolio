import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { SiReact, SiPython, SiMysql, SiNodedotjs, SiFigma, SiWordpress, SiTailwindcss, SiGit, SiPostman, SiOpenai, SiMongodb, SiSupabase, SiJavascript, SiHtml5, SiCss, SiVite, SiNextdotjs, SiFramer, SiVuedotjs, SiDocker } from 'react-icons/si'
import { HiLightningBolt, HiCog, HiCode, HiCloud, HiX } from 'react-icons/hi'
import AnimatedTitle from './AnimatedTitle'
import { FaAws } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

/* ─── Datos ─────────────────────────────────────────────────────────────── */
const CATEGORIES = ['Frontend', 'Backend', 'Cloud & DevOps', 'Datos', 'Automatización', 'Herramientas']

const SKILLS = [
  { icon: SiJavascript,    name: 'JavaScript',    color: '#f7df1e', cat: 'Frontend',
    desc: 'Mi lenguaje principal. Manejo ES6+, async/await, destructuring, módulos y manipulación del DOM para crear aplicaciones web dinámicas y eficientes.' },
  { icon: SiHtml5,          name: 'HTML5',          color: '#e34f26', cat: 'Frontend',
    desc: 'Estructura semántica, accesibilidad, formularios avanzados, SEO on-page y buenas prácticas para crear bases sólidas en cualquier proyecto web.' },
  { icon: SiCss,           name: 'CSS3',           color: '#264de4', cat: 'Frontend',
    desc: 'Flexbox, Grid, animaciones, custom properties y media queries. Maqueto layouts complejos y responsive sin depender de frameworks.' },
  { icon: SiReact,          name: 'React',          color: '#61dafb', cat: 'Frontend',
    desc: 'Construyo SPAs y interfaces interactivas con React. Manejo hooks, context, estado global y componentización para crear experiencias de usuario rápidas y mantenibles.' },
  { icon: SiNextdotjs,      name: 'Next.js',        color: '#ffffff', cat: 'Frontend',
    desc: 'SSR, SSG, API routes y optimización de imágenes. Uso Next.js para proyectos que necesitan SEO, rendimiento y despliegue en Vercel.' },
  { icon: SiTailwindcss,    name: 'Tailwind CSS',   color: '#38bdf8', cat: 'Frontend',
    desc: 'Maqueto interfaces responsive con utility-first CSS. Uso tokens de diseño personalizados, dark mode y componentes reutilizables sin salir del HTML.' },
  { icon: SiFramer,         name: 'Framer Motion',  color: '#e846ff', cat: 'Frontend',
    desc: 'Animaciones declarativas en React: transiciones de layout, gestos, scroll animations y micro-interacciones que le dan vida a las interfaces.' },
  { icon: SiVite,           name: 'Vite',           color: '#646cff', cat: 'Frontend',
    desc: 'Build tool ultrarrápido con HMR instantáneo. Lo uso como bundler para todos mis proyectos React, con configuración de plugins y optimización de producción.' },
  { icon: SiVuedotjs,       name: 'Vue.js',         color: '#42b883', cat: 'Frontend',
    desc: 'Desarrollo interfaces reactivas con Vue.js. Manejo Composition API, reactividad, directivas personalizadas y ecosistema (Vue Router, Pinia) para crear SPAs escalables.' },
  { icon: SiPython,         name: 'Python',         color: '#4b8bbe', cat: 'Backend',
    desc: 'Desarrollo scripts de automatización, APIs con Flask y procesamiento de datos. Lo uso para conectar servicios, generar reportes y manejar lógica de negocio.' },
  { icon: SiNodedotjs,     name: 'Node.js',        color: '#68a063', cat: 'Backend',
    desc: 'Creo servidores y APIs REST con Express. Manejo autenticación JWT, middleware, conexiones a bases de datos y despliegue en producción.' },
  { icon: HiCloud,         name: 'APIs REST',      color: '#f97316', cat: 'Backend',
    desc: 'Diseño y consumo endpoints RESTful. Documento con Postman, manejo status codes, paginación, filtros y autenticación con tokens.' },
  { icon: FaAws,           name: 'AWS',             color: '#ff9900', cat: 'Cloud & DevOps',
    desc: 'Servicios cloud de Amazon: EC2, S3, RDS, Lambda y IAM. Tengo 4 certificaciones AWS que validan mis conocimientos en arquitectura cloud, bases de datos y IA generativa.' },
  { icon: SiDocker,        name: 'Docker',           color: '#2496ed', cat: 'Cloud & DevOps',
    desc: 'Contenedorización de aplicaciones con Docker. Creo imágenes, configuro docker-compose para entornos multi-servicio y gestiono despliegues reproducibles.' },
  { icon: SiMysql,         name: 'SQL',            color: '#4479a1', cat: 'Datos',
    desc: 'Diseño esquemas normalizados, escribo queries optimizadas, manejo relaciones entre tablas y uso JOINs, vistas y procedimientos almacenados.' },
  { icon: SiMongodb,       name: 'MongoDB',        color: '#47a248', cat: 'Datos',
    desc: 'Trabajo con bases de datos no relacionales como MongoDB. Diseño colecciones, documentos embebidos, índices y consultas con aggregation pipelines.' },
  { icon: SiSupabase,      name: 'Supabase',       color: '#3ecf8e', cat: 'Datos',
    desc: 'Uso Supabase como backend-as-a-service: autenticación, base de datos Postgres en tiempo real, storage y edge functions sin montar infraestructura propia.' },
  { icon: HiLightningBolt, name: 'n8n',            color: '#ea4b71', cat: 'Automatización',
    desc: 'Armo flujos de trabajo con triggers, webhooks, nodos HTTP y lógica condicional. Conecto apps entre sí para automatizar procesos sin tocar código.' },
  { icon: HiCog,           name: 'Make.com',       color: '#6d69ff', cat: 'Automatización',
    desc: 'Creo escenarios multi-módulo para sincronizar datos entre plataformas, programar ejecuciones y manejar errores con rutas alternativas.' },
  { icon: SiOpenai,        name: 'Claude / IA',    color: '#d4a574', cat: 'Herramientas',
    desc: 'Uso modelos de IA para generar código, automatizar tareas repetitivas, hacer prompting avanzado y crear asistentes inteligentes integrados en flujos de trabajo.' },
  { icon: SiFigma,         name: 'Figma',           color: '#a259ff', cat: 'Herramientas',
    desc: 'Diseño wireframes, prototipos interactivos y sistemas de diseño. Trabajo con auto-layout, componentes y variables para entregar specs listas para desarrollo.' },
  { icon: SiWordpress,     name: 'WordPress',       color: '#21759b', cat: 'Herramientas',
    desc: 'Monto sitios con WordPress, personalizo temas, configuro plugins, optimizo SEO y gestiono contenido para clientes que necesitan autonomía en su web.' },
  { icon: SiGit,           name: 'Git / GitHub',    color: '#f05032', cat: 'Herramientas',
    desc: 'Control de versiones con Git, manejo ramas, pull requests, merge conflicts y flujo de trabajo colaborativo en GitHub con CI básico.' },
  { icon: SiPostman,       name: 'Postman',          color: '#ff6c37', cat: 'Herramientas',
    desc: 'Testeo y documento APIs con Postman. Creo colecciones, variables de entorno, pruebas automatizadas y genero documentación para el equipo.' },
  { icon: HiCode,          name: 'Stitch',           color: '#00d4ff', cat: 'Herramientas',
    desc: 'Uso Stitch para diseñar componentes visuales y extraer tokens de diseño que implemento directamente en código, acelerando el paso de diseño a producción.' },
]

/* ─── Tarjeta con hover effects (CSS-only, sin animaciones infinitas) ── */
function TiltCard({ skill, index, inView, onSelect, t }) {
  const Icon = skill.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, delay: index * 0.03, ease: [0.25, 1, 0.5, 1] }}
    >
      <div
        onClick={() => onSelect(skill)}
        className="relative group cursor-pointer overflow-hidden rounded-2xl p-[1px] transition-transform duration-300 hover:scale-[1.03]"
      >
        {/* Borde gradiente — brillo sutil permanente, más intenso en hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-30 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{
            background: `conic-gradient(from 135deg, transparent, ${skill.color}55, transparent, ${skill.color}35, transparent)`,
          }}
        />

        {/* ── Interior ── */}
        <div className="relative bg-bg-card rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center gap-3 min-h-[170px]">

          {/* Radial glow */}
          <div
            className="absolute inset-0 rounded-2xl opacity-20 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
            style={{ background: `radial-gradient(circle at 50% 30%, ${skill.color}18, transparent 70%)` }}
          />

          {/* Icono con scale en hover */}
          <div
            className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110"
            style={{
              backgroundColor: `${skill.color}10`,
              border: `1px solid ${skill.color}22`,
            }}
          >
            <Icon style={{ color: skill.color }} />
          </div>

          {/* Nombre */}
          <h3 className="relative z-10 font-heading font-bold text-[15px] text-text-primary">
            {skill.name}
          </h3>

          {/* Categoría pill */}
          <span
            className="relative z-10 text-[10px] font-mono px-2.5 py-0.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"
            style={{ backgroundColor: `${skill.color}12`, color: skill.color }}
          >
            {skill.cat}
          </span>

          {/* CTA */}
          <span className="relative z-10 mt-1 flex items-center gap-1 text-[11px] text-text-muted opacity-0 group-hover:opacity-80 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            {t('skills.viewMore')} <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Modal de detalle ─────────────────────────────────────────────────── */
function SkillModal({ skill, onClose, t }) {
  const Icon = skill.icon
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.75, rotateX: 12 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        exit={{ opacity: 0, scale: 0.75, rotateX: -12 }}
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-bg-card border border-glass-border rounded-2xl sm:rounded-3xl max-w-[90vw] sm:max-w-sm w-full p-5 sm:p-8 overflow-hidden"
      >
        {/* Glows */}
        <motion.div
          className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: skill.color }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="absolute -bottom-14 -left-14 w-36 h-36 rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: skill.color }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 0.08, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl hover:bg-bg-card-alt transition-colors text-text-muted hover:text-text-primary z-10"
          aria-label={t('skills.close')}
        >
          <HiX size={18} />
        </button>

        <div className="relative z-10">
          {/* Icono con entrada giratoria */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 14, stiffness: 200, delay: 0.1 }}
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-6 mx-auto"
            style={{ backgroundColor: `${skill.color}15`, border: `1px solid ${skill.color}30` }}
          >
            <Icon style={{ color: skill.color }} />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-heading font-bold text-2xl text-text-primary text-center mb-2"
          >
            {skill.name}
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-5"
          >
            <span
              className="text-xs font-mono px-3 py-1 rounded-full"
              style={{ backgroundColor: `${skill.color}15`, color: skill.color }}
            >
              {skill.cat}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-text-secondary text-sm leading-relaxed text-center"
          >
            {t(`skills.descs.${skill.name}`)}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Sección principal ────────────────────────────────────────────────── */
export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('Frontend')
  const { t } = useTranslation()

  const filtered = SKILLS.filter((s) => s.cat === filter)

  return (
    <section id="habilidades" className="py-16 sm:py-24 bg-bg-secondary/80 backdrop-blur-sm relative overflow-hidden" ref={ref}>

      {/* Orbes decorativos */}
      <div className="absolute top-20 left-0 w-80 h-80 bg-accent-cyan/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-accent-violet/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3 }}
          className="mb-10"
        >
          <span className="section-tag">{t('skills.tag')}</span>
          <AnimatedTitle className="section-title">
            {t('skills.title1')}<span className="accent-text">{t('skills.title2')}</span>{t('skills.title3')}
          </AnimatedTitle>
          <p className="section-subtitle mt-3">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        {/* Filtros interactivos */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, delay: 0.08 }}
          className="flex flex-wrap gap-1.5 sm:gap-2 mb-8 sm:mb-10"
        >
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.93 }}
              className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 overflow-hidden
                ${filter === cat
                  ? 'bg-accent-cyan text-bg-primary shadow-glow-cyan'
                  : 'bg-glass-bg text-text-secondary border border-glass-border hover:bg-bg-card-alt hover:text-text-primary'
                }`}
            >
              {filter === cat && (
                <motion.div
                  layoutId="filterPill"
                  className="absolute inset-0 bg-accent-cyan rounded-xl"
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                />
              )}
              <span className="relative z-10">{t(`skills.cats.${cat}`)}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Grid de tarjetas 3D */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="col-span-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
            >
              {filtered.map((skill, i) => (
                <TiltCard key={skill.name} skill={skill} index={i} inView={true} onSelect={setSelected} t={t} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <SkillModal skill={selected} onClose={() => setSelected(null)} t={t} />}
      </AnimatePresence>
    </section>
  )
}
