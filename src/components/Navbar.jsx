import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'
import { HiMenuAlt3, HiX } from 'react-icons/hi'

/* Links de navegación */
const NAV_LINKS = [
  { label: 'Sobre mí',       to: 'sobre-mi'       },
  { label: 'Habilidades',    to: 'habilidades'     },
  { label: 'Proyectos',      to: 'proyectos'       },
  { label: 'Automatización', to: 'automatizacion'  },
  { label: 'Certificaciones',to: 'certificaciones' },
  { label: 'Contacto',       to: 'contacto'        },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  /* Detectar scroll para activar glassmorphism */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-[0_1px_0_rgba(255,255,255,0.05)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo con foto */}
        <Link to="hero" smooth duration={600} className="cursor-pointer select-none flex items-center gap-2.5">
          <img
            src="/foto-mia.webp"
            alt="Jose Caballero"
            className="w-8 h-8 rounded-full object-cover ring-1 ring-accent-cyan/40"
            loading="eager"
          />
          <span className="font-heading font-extrabold text-lg accent-text tracking-tight">
            Jose Caballero
          </span>
        </Link>

        {/* Navegación desktop */}
        <ul className="hidden md:flex items-center gap-5 lg:gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                smooth
                spy
                duration={600}
                offset={-64}
                activeClass="!text-accent-cyan"
                className="relative text-text-secondary text-sm font-medium hover:text-text-primary cursor-pointer transition-colors duration-200 group"
              >
                {link.label}
                {/* Línea subrayado animada */}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent-cyan transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <div className="hidden md:block">
          <Link to="contacto" smooth duration={600} offset={-64} className="cursor-pointer">
            <button className="btn-primary text-xs py-2 px-4">
              Contactar
            </button>
          </Link>
        </div>

        {/* Botón hamburguesa (mobile) */}
        <button
          className="md:hidden p-1 text-text-secondary hover:text-text-primary transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          {menuOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
        </button>
      </div>

      {/* Menú mobile con animación Framer Motion */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="md:hidden glass border-t border-white/[0.06] overflow-hidden"
          >
            <ul className="px-4 sm:px-6 py-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    smooth
                    spy
                    duration={600}
                    offset={-64}
                    activeClass="!text-accent-cyan"
                    onClick={() => setMenuOpen(false)}
                    className="text-text-secondary text-sm font-medium hover:text-text-primary cursor-pointer transition-colors duration-200 block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
