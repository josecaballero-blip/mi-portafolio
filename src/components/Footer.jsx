import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { HiMail, HiPhone, HiLocationMarker, HiArrowUp, HiCode, HiLightningBolt, HiCog, HiCloud, HiDesktopComputer } from 'react-icons/hi'
import { BsWhatsapp } from 'react-icons/bs'

const NAV_LINKS = [
  { label: 'Sobre mí',       to: 'sobre-mi'       },
  { label: 'Habilidades',    to: 'habilidades'     },
  { label: 'Proyectos',      to: 'proyectos'       },
  { label: 'Automatización', to: 'automatizacion'  },
  { label: 'Certificaciones',to: 'certificaciones' },
  { label: 'Contacto',       to: 'contacto'        },
]

const SERVICES = [
  { icon: HiCode,            label: 'Desarrollo Web Full-Stack' },
  { icon: HiLightningBolt,   label: 'Automatización de Procesos' },
  { icon: HiDesktopComputer, label: 'Aplicaciones a Medida' },
  { icon: HiCog,             label: 'Consultoría Técnica' },
  { icon: HiCloud,           label: 'Cloud & DevOps (AWS)' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Contenido principal */}
      <div className="bg-[#060610]/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-14">

            {/* Col 1 — Branding (4 cols) */}
            <div className="lg:col-span-4">
              <Link to="hero" smooth duration={600} className="cursor-pointer inline-block">
                <span className="font-heading font-extrabold text-2xl sm:text-3xl accent-text">Jose Caballero</span>
              </Link>
              <p className="text-text-muted text-sm leading-relaxed mt-4 max-w-xs">
                Desarrollador de Software de Cartagena, Colombia.
                Construyo aplicaciones web y automatizo procesos para
                que las empresas crezcan y dejen de perder tiempo.
              </p>

              {/* Email destacado */}
              <a
                href="mailto:josecaballerogonzalez49@gmail.com"
                className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-text-secondary text-sm hover:text-accent-cyan hover:border-accent-cyan/30 transition-all duration-200"
              >
                <HiMail className="text-accent-cyan" />
                josecaballerogonzalez49@gmail.com
              </a>
            </div>

            {/* Col 2 — Navegación (2 cols) */}
            <div className="lg:col-span-2">
              <h4 className="font-heading font-bold text-white text-sm mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                Navegación
              </h4>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      smooth
                      duration={600}
                      offset={-64}
                      className="text-text-muted text-sm hover:text-white hover:translate-x-1 cursor-pointer transition-all duration-200 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Servicios (3 cols) */}
            <div className="lg:col-span-3">
              <h4 className="font-heading font-bold text-white text-sm mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-violet" />
                Servicios
              </h4>
              <ul className="space-y-3">
                {SERVICES.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-2.5 text-text-muted text-sm">
                    <Icon className="text-accent-cyan/60 text-xs flex-shrink-0" />
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Contacto (3 cols) */}
            <div className="lg:col-span-3">
              <h4 className="font-heading font-bold text-white text-sm mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25d366]" />
                Contacto
              </h4>
              <ul className="space-y-4">
                <li>
                  <a href="tel:+573046661245" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:border-accent-cyan/30 transition-colors duration-200">
                      <HiPhone className="text-accent-cyan text-sm" />
                    </div>
                    <div>
                      <p className="text-text-muted text-[11px]">Teléfono</p>
                      <p className="text-white text-sm font-medium">+57 304 666 1245</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/573046661245" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:border-[#25d366]/30 transition-colors duration-200">
                      <BsWhatsapp className="text-[#25d366] text-sm" />
                    </div>
                    <div>
                      <p className="text-text-muted text-[11px]">WhatsApp</p>
                      <p className="text-white text-sm font-medium">Enviar mensaje</p>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                      <HiLocationMarker className="text-accent-violet text-sm" />
                    </div>
                    <div>
                      <p className="text-text-muted text-[11px]">Ubicación</p>
                      <p className="text-white text-sm font-medium">Cartagena, Colombia</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider + bottom row */}
          <div className="border-t border-white/[0.06] pt-6 flex flex-col gap-3 text-center sm:text-left sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <p className="text-text-muted text-xs">
              © {new Date().getFullYear()} Jose Caballero. Todos los derechos reservados.
            </p>

            <p className="text-text-muted text-xs flex items-center gap-1.5">
              Hecho con <span className="text-red-400 text-sm">♥</span> en Cartagena
              <span className="mx-1.5 text-white/20">·</span>
              React + Tailwind CSS
            </p>

            {/* Botón subir */}
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.9 }}>
              <Link
                to="hero"
                smooth
                duration={600}
                className="group w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-text-muted hover:text-accent-cyan hover:border-accent-cyan/30 cursor-pointer transition-all duration-200"
              >
                <HiArrowUp size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}
