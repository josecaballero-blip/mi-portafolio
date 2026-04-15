import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiLocationMarker, HiCode, HiLightningBolt, HiHeart } from 'react-icons/hi'
import AnimatedTitle from './AnimatedTitle'

const HIGHLIGHTS = [
  {
    icon:  HiCode,
    color: '#00d4ff',
    title: 'Full-Stack Developer',
    text:  'Trabajo con React, Node.js y Python para construir aplicaciones completas, desde el frontend hasta la base de datos.',
  },
  {
    icon:  HiLightningBolt,
    color: '#ff9900',
    title: 'Automatización',
    text:  'Me apasiona automatizar procesos con n8n y Make.com para que las empresas dejen de perder tiempo en tareas repetitivas.',
  },
  {
    icon:  HiHeart,
    color: '#8b5cf6',
    title: 'Siempre aprendiendo',
    text:  'Certificado en AWS, siempre buscando nuevas tecnologías y mejores formas de resolver problemas reales.',
  },
]

export default function AboutMe() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })

  return (
    <section id="sobre-mi" className="py-16 sm:py-28 relative overflow-hidden" ref={ref}>
      {/* Orbes */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-accent-cyan/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-64 h-64 bg-accent-violet/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3 }}
          className="mb-14 text-center"
        >
          <span className="section-tag">// sobre.mi</span>
          <AnimatedTitle className="section-title">
            Sobre <span className="accent-text">mí</span>
          </AnimatedTitle>
        </motion.div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 items-start">

          {/* Columna izquierda — texto personal */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="lg:col-span-2"
          >
            <div className="relative group overflow-hidden rounded-2xl p-[1px]">
              {/* Borde hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'conic-gradient(from 135deg, transparent, #00d4ff35, transparent, #8b5cf630, transparent)' }}
              />

              <div className="relative bg-bg-card rounded-2xl p-5 sm:p-7">
                {/* Glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 30% 20%, #00d4ff08, transparent 60%)' }}
                />

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-2 text-text-muted text-sm">
                    <HiLocationMarker className="text-accent-cyan" />
                    Cartagena, Colombia
                  </div>

                  <p className="text-text-secondary text-[15px] leading-relaxed">
                    Tengo <span className="text-accent-cyan font-semibold">21 años</span> y soy 
                    de Cartagena de Indias. Desde joven me interesé por la tecnología y 
                    comencé a explorar el desarrollo de software por cuenta propia, lo que 
                    rápidamente se convirtió en mi pasión.
                  </p>

                  <p className="text-text-secondary text-[15px] leading-relaxed">
                    Me formé en el <span className="text-text-primary font-medium">SENA</span> como 
                    Tecnólogo en Análisis y Desarrollo de Software, trabajando en proyectos 
                    reales con equipos multidisciplinarios que fortalecieron mis habilidades 
                    técnicas y colaborativas.
                  </p>

                  <p className="text-text-secondary text-[15px] leading-relaxed">
                    Me motiva construir soluciones que optimicen procesos y generen impacto 
                    real en la productividad de las personas. Eso es lo que impulsa mi 
                    crecimiento y aprendizaje continuo.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Columna derecha — cards de highlights */}
          <div className="lg:col-span-3 flex flex-col gap-3 sm:gap-5">
            {HIGHLIGHTS.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.1 + i * 0.07 }}
                  className="group relative overflow-hidden rounded-2xl p-[1px]"
                >
                  {/* Borde sutil hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `conic-gradient(from 180deg, transparent, ${item.color}35, transparent)` }}
                  />

                  <div className="relative bg-bg-card rounded-2xl p-6 flex items-start gap-5">
                    {/* Glow */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(circle at 10% 50%, ${item.color}10, transparent 60%)` }}
                    />

                    {/* Icono */}
                    <div
                      className="relative z-10 w-11 h-11 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                      style={{ backgroundColor: `${item.color}15`, border: `1px solid ${item.color}28` }}
                    >
                      <Icon style={{ color: item.color }} />
                    </div>

                    {/* Texto */}
                    <div className="relative z-10 flex-1 min-w-0">
                      <h3 className="font-heading font-bold text-[15px] text-text-primary mb-1">{item.title}</h3>
                      <p className="text-text-muted text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
