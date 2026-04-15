import { motion } from 'framer-motion'
import Typewriter from 'typewriter-effect'
import { Link } from 'react-scroll'
import { HiArrowRight, HiDownload, HiLocationMarker } from 'react-icons/hi'

/* ─── Variantes de animación ─────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      {/* ── Fondos decorativos ─────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 15% 50%, rgba(0,212,255,0.055) 0%, transparent 70%), radial-gradient(ellipse 55% 55% at 85% 80%, rgba(139,92,246,0.07) 0%, transparent 70%)',
        }}
      />
      {/* Grid sutil */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 w-full grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">

        {/* ── COLUMNA IZQUIERDA ─────────────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start gap-3"
        >
          {/* Badge: disponible */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-text-secondary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              Open to work · disponible ahora
            </span>
          </motion.div>

          {/* Nombre + subtítulo + descripción + botones en bloque unido */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-[4rem] leading-[1.08] text-text-primary">
              <span className="accent-text">
                <Typewriter
                  onInit={(tw) => {
                    tw.typeString('Jose Caballero').start()
                  }}
                  options={{ delay: 72, cursor: '' }}
                />
              </span>
            </h1>

            {/* Subtítulo con typewriter — empieza después del nombre */}
            <h2 className="font-heading font-bold text-lg sm:text-2xl lg:text-[1.9rem] leading-snug text-text-secondary">
              <Typewriter
                onInit={(tw) => {
                  tw
                    .pauseFor(600)
                    .typeString('Desarrollador de Software & ')
                    .typeString('<span style="color:#00d4ff">Automatización de Procesos</span>')
                    .start()
                }}
                options={{ delay: 38, cursor: '|' }}
              />
            </h2>

            {/* Descripción */}
            <p className="text-text-secondary text-base leading-relaxed max-w-md mt-1">
              Desarrollador de Software con experiencia en desarrollo full-stack
              con React, Node.js y Python, certificado en AWS y especializado en
              automatizar flujos empresariales con n8n y Make.com.
            </p>

            {/* Botones de acción */}
            <div className="flex flex-wrap gap-3 mt-2">
              <Link to="proyectos" smooth duration={600} offset={-64}>
                <button className="btn-primary">
                  Ver proyectos
                  <HiArrowRight size={15} />
                </button>
              </Link>
              <button className="btn-secondary">
                <HiDownload size={15} />
                Descargar CV
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* ── COLUMNA DERECHA ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.1, ease: 'easeOut' }}
          className="relative flex justify-center items-center"
        >
          {/* Orbe 1 — cyan — CSS animation instead of FM */}
          <div className="absolute -top-12 -left-8 w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full bg-accent-cyan/10 blur-3xl pointer-events-none animate-[orb-pulse_5s_ease-in-out_infinite]" />
          {/* Orbe 2 — violet */}
          <div className="absolute -bottom-10 -right-4 w-56 h-56 rounded-full bg-accent-violet/15 blur-2xl pointer-events-none animate-[orb-pulse_4.2s_ease-in-out_infinite_1s]" />

          {/* Foto con animación float — CSS */}
          <div className="relative z-10 animate-[float_6s_ease-in-out_infinite]">
            <div className="relative w-52 h-52 sm:w-72 sm:h-72 lg:w-80 lg:h-80 group">
              {/* Glow sutil detrás */}
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent-cyan/20 via-accent-violet/15 to-accent-cyan/20 blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-700" />
              
              {/* Borde gradiente estático */}
              <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-br from-accent-cyan/60 via-accent-violet/40 to-accent-cyan/60" />
              
              {/* Imagen */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden bg-bg-card">
                <img
                  src="/foto-mia.webp"
                  alt="Jose Caballero"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.src = '/foto-mia.jpg'
                  }}
                />
              </div>

              {/* Decoraciones de esquina */}
              <div className="absolute -top-3 -right-3 w-9 h-9 rounded-xl bg-accent-cyan/15 border border-accent-cyan/30 backdrop-blur-sm flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-accent-cyan animate-pulse" />
              </div>
              <div className="absolute -bottom-2.5 -left-2.5 w-7 h-7 rounded-lg bg-accent-violet/20 border border-accent-violet/30 backdrop-blur-sm" />
            </div>

            {/* Tag de ubicación */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="absolute -bottom-5 -right-5 glass rounded-xl px-3 py-2 flex items-center gap-2 shadow-card"
            >
              <HiLocationMarker size={13} className="text-accent-cyan flex-shrink-0" />
              <span className="text-text-secondary text-xs font-medium whitespace-nowrap">
                Cartagena, Colombia
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-text-muted text-[10px] font-mono tracking-widest uppercase">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-text-muted/60 to-transparent animate-bounce" />
      </motion.div>
    </section>
  )
}
