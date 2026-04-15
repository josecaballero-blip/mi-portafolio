import { Link } from 'react-scroll'
import { HiArrowRight } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'

export default function CTABanner() {
  const { t } = useTranslation()
  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
      {/* Fondo sutil */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/[0.04] via-accent-violet/[0.06] to-accent-cyan/[0.04]" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-text-primary mb-3">
          {t('cta.title')}
        </h2>

        <p className="text-text-secondary text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
          {t('cta.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link to="contacto" smooth duration={600} offset={-60}>
            <button className="btn-primary text-base px-8 py-3.5">
              {t('cta.btn_talk')}
              <HiArrowRight size={17} />
            </button>
          </Link>

          <a
            href="https://wa.me/573022457854"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-base px-8 py-3.5"
          >
            {t('cta.btn_whatsapp')}
          </a>
        </div>
      </div>
    </section>
  )
}