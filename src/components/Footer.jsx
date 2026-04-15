import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { HiMail, HiPhone, HiLocationMarker, HiArrowUp, HiCode, HiLightningBolt, HiCog, HiCloud, HiDesktopComputer } from 'react-icons/hi'
import { BsWhatsapp } from 'react-icons/bs'
import { useTranslation } from 'react-i18next'

const NAV_KEYS = [
  { key: 'about',          to: 'sobre-mi'       },
  { key: 'skills',         to: 'habilidades'     },
  { key: 'projects',       to: 'proyectos'       },
  { key: 'automation',     to: 'automatizacion'  },
  { key: 'certifications', to: 'certificaciones' },
  { key: 'contact',        to: 'contacto'        },
]

const SERVICE_ICONS = [HiCode, HiLightningBolt, HiDesktopComputer, HiCog, HiCloud]

export default function Footer() {
  const { t } = useTranslation()
  const services = t('footer.services', { returnObjects: true })
  return (
    <footer className="relative overflow-hidden">
      <div className="bg-bg-primary/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-14">

            {/* Col 1 */}
            <div className="lg:col-span-4">
              <Link to="hero" smooth duration={600} className="cursor-pointer inline-block">
                <span className="font-heading font-extrabold text-2xl sm:text-3xl accent-text">Jose Caballero</span>
              </Link>
              <p className="text-text-muted text-sm leading-relaxed mt-4 max-w-xs">
                {t('footer.description')}
              </p>
              <a
                href="mailto:josecaballerogonzalez49@gmail.com"
                className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 rounded-xl bg-glass-bg border border-glass-border text-text-secondary text-sm hover:text-accent-cyan hover:border-accent-cyan/30 transition-all duration-200"
              >
                <HiMail className="text-accent-cyan" />
                josecaballerogonzalez49@gmail.com
              </a>
            </div>

            {/* Col 2 */}
            <div className="lg:col-span-2">
              <h4 className="font-heading font-bold text-text-primary text-sm mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                {t('footer.nav_title')}
              </h4>
              <ul className="space-y-3">
                {NAV_KEYS.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      smooth
                      duration={600}
                      offset={-64}
                      className="text-text-muted text-sm hover:text-text-primary hover:translate-x-1 cursor-pointer transition-all duration-200 inline-block"
                    >
                      {t(`nav.${link.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 */}
            <div className="lg:col-span-3">
              <h4 className="font-heading font-bold text-text-primary text-sm mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-violet" />
                {t('footer.services_title')}
              </h4>
              <ul className="space-y-3">
                {Array.isArray(services) && services.map((label, i) => {
                  const Icon = SERVICE_ICONS[i] || HiCode
                  return (
                    <li key={i} className="flex items-center gap-2.5 text-text-muted text-sm">
                      <Icon className="text-accent-cyan/60 text-xs flex-shrink-0" />
                      {label}
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Col 4 */}
            <div className="lg:col-span-3">
              <h4 className="font-heading font-bold text-text-primary text-sm mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25d366]" />
                {t('footer.contact_title')}
              </h4>
              <ul className="space-y-4">
                <li>
                  <a href="tel:+573046661245" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-lg bg-glass-bg border border-glass-border flex items-center justify-center group-hover:border-accent-cyan/30 transition-colors duration-200">
                      <HiPhone className="text-accent-cyan text-sm" />
                    </div>
                    <div>
                      <p className="text-text-muted text-[11px]">{t('footer.phone_label')}</p>
                      <p className="text-text-primary text-sm font-medium">+57 304 666 1245</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/573046661245" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-lg bg-glass-bg border border-glass-border flex items-center justify-center group-hover:border-[#25d366]/30 transition-colors duration-200">
                      <BsWhatsapp className="text-[#25d366] text-sm" />
                    </div>
                    <div>
                      <p className="text-text-muted text-[11px]">WhatsApp</p>
                      <p className="text-text-primary text-sm font-medium">{t('footer.whatsapp_action')}</p>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-glass-bg border border-glass-border flex items-center justify-center">
                      <HiLocationMarker className="text-accent-violet text-sm" />
                    </div>
                    <div>
                      <p className="text-text-muted text-[11px]">{t('footer.location_label')}</p>
                      <p className="text-text-primary text-sm font-medium">Cartagena, Colombia</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border-base pt-6 flex flex-col gap-3 text-center sm:text-left sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <p className="text-text-muted text-xs">
              {'\u00A9'} {new Date().getFullYear()} Jose Caballero. {t('footer.rights')}
            </p>

            <p className="text-text-muted text-xs flex items-center gap-1.5">
              {t('footer.made_with')} <span className="text-red-400 text-sm">{'\u2665'}</span> {t('footer.in_city')}
              <span className="mx-1.5 text-text-primary/20">{'\u00B7'}</span>
              React + Tailwind CSS
            </p>

            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.9 }}>
              <Link
                to="hero"
                smooth
                duration={600}
                className="group w-10 h-10 rounded-xl bg-glass-bg border border-glass-border flex items-center justify-center text-text-muted hover:text-accent-cyan hover:border-accent-cyan/30 cursor-pointer transition-all duration-200"
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