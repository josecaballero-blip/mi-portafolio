import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiMail, HiCheckCircle, HiPhone, HiUser, HiBriefcase, HiChat } from 'react-icons/hi'
import { BsWhatsapp, BsSend } from 'react-icons/bs'
import AnimatedTitle from './AnimatedTitle'
import { useTranslation } from 'react-i18next'

const CONTACT_LINKS = [
  { icon: HiMail,    labelKey: 'contact.links.email_label',    value: 'josecaballerogonzalez49@gmail.com', href: 'mailto:josecaballerogonzalez49@gmail.com', color: '#00d4ff' },
  { icon: HiPhone,   labelKey: 'contact.links.phone_label',    value: '+57 304 666 1245',                  href: 'tel:+573046661245',                       color: '#8b5cf6' },
  { icon: BsWhatsapp, labelKey: 'contact.links.whatsapp_label', value: '+57 304 666 1245',                  href: 'https://wa.me/573046661245',              color: '#25d366' },
]

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', budget: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', service: '', budget: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
    setTimeout(() => setStatus('idle'), 4500)
  }

  const inputClass = 'w-full bg-bg-card border border-glass-border rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-text-primary text-sm placeholder-text-muted/60 focus:outline-none focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20 transition-all duration-200'
  const selectClass = `${inputClass} [&>option]:bg-bg-card [&>option]:text-text-primary`

  return (
    <section id="contacto" className="py-16 sm:py-28 relative overflow-hidden" ref={ref}>
      <div className="absolute top-20 left-0 w-72 h-72 bg-accent-cyan/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-64 h-64 bg-accent-violet/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.25 }}
          className="mb-14 text-center"
        >
          <span className="section-tag">{t('contact.tag')}</span>
          <AnimatedTitle className="section-title">
            {t('contact.title1')}<span className="accent-text">{t('contact.title2')}</span>{t('contact.title3')}
          </AnimatedTitle>
          <p className="section-subtitle mt-3 mx-auto text-center max-w-xl">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.06 }}
            className="lg:col-span-3"
          >
            <div className="group relative overflow-hidden rounded-2xl p-[1px]">
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'conic-gradient(from 135deg, transparent, #00d4ff30, transparent, #8b5cf625, transparent)' }} />

              <div className="relative bg-bg-card rounded-2xl p-7">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-1.5 text-text-secondary text-sm mb-2" htmlFor="name">
                        <HiUser className="text-accent-cyan text-xs" /> {t('contact.form.name')}
                      </label>
                      <input id="name" type="text" name="name" value={form.name} onChange={handleChange} required
                        placeholder={t('contact.form.name')} className={inputClass} />
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-text-secondary text-sm mb-2" htmlFor="email">
                        <HiMail className="text-accent-cyan text-xs" /> {t('contact.form.email')}
                      </label>
                      <input id="email" type="email" name="email" value={form.email} onChange={handleChange} required
                        placeholder={t('contact.form.email')} className={inputClass} />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-1.5 text-text-secondary text-sm mb-2" htmlFor="phone">
                        <HiPhone className="text-accent-cyan text-xs" /> {t('contact.form.phone')}
                      </label>
                      <input id="phone" type="tel" name="phone" value={form.phone} onChange={handleChange}
                        placeholder="+57 300 000 0000" className={inputClass} />
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-text-secondary text-sm mb-2" htmlFor="service">
                        <HiBriefcase className="text-accent-cyan text-xs" /> {t('contact.form.service')}
                      </label>
                      <select id="service" name="service" value={form.service} onChange={handleChange}
                        className={`${selectClass} ${!form.service ? 'text-text-muted/60' : ''}`}>
                        <option value="">{t('contact.form.service')}</option>
                        <option value="web">{t('contact.form.service_web')}</option>
                        <option value="auto">{t('contact.form.service_auto')}</option>
                        <option value="api">{t('contact.form.service_api')}</option>
                        <option value="consult">{t('contact.form.service_consult')}</option>
                        <option value="other">{t('contact.form.service_other')}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-text-secondary text-sm mb-2" htmlFor="budget">
                      {t('contact.form.budget')}
                    </label>
                    <select id="budget" name="budget" value={form.budget} onChange={handleChange}
                      className={`${selectClass} ${!form.budget ? 'text-text-muted/60' : ''}`}>
                      <option value="">{t('contact.form.budget')}</option>
                      <option value="basic">{t('contact.form.budget_basic')}</option>
                      <option value="mid">{t('contact.form.budget_mid')}</option>
                      <option value="high">{t('contact.form.budget_high')}</option>
                      <option value="premium">{t('contact.form.budget_premium')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-text-secondary text-sm mb-2" htmlFor="message">
                      <HiChat className="text-accent-cyan text-xs" /> {t('contact.form.message')}
                    </label>
                    <textarea id="message" name="message" value={form.message} onChange={handleChange} required rows={5}
                      placeholder={t('contact.form.message')}
                      className={`${inputClass} resize-none`} />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-primary w-full justify-center disabled:opacity-55 disabled:cursor-not-allowed gap-2"
                  >
                    {status === 'loading' && (
                      <svg className="animate-spin h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    )}
                    {status === 'success' && <HiCheckCircle size={17} />}
                    {status !== 'loading' && status !== 'success' && <BsSend size={14} />}
                    {status === 'loading' ? t('contact.form.sending') : status === 'success' ? t('contact.form.success') : t('contact.form.submit')}
                  </motion.button>

                  {status === 'error' && (
                    <p className="text-red-400 text-sm text-center">
                      {t('contact.form.error')}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.25, delay: 0.08 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            <div className="mb-1">
              <h3 className="font-heading font-semibold text-text-primary text-xl mb-1.5">
                {t('contact.links.title')}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {t('contact.links.subtitle')}
              </p>
            </div>

            {CONTACT_LINKS.map((link, i) => {
              const Icon = link.icon
              return (
                <motion.a
                  key={link.labelKey}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.2, delay: 0.1 + i * 0.04 }}
                  className="group relative overflow-hidden rounded-2xl p-[1px]"
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `conic-gradient(from 180deg, transparent, ${link.color}30, transparent)` }} />
                  <div className="relative bg-bg-card rounded-2xl p-5 flex items-center gap-4">
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(circle at 10% 50%, ${link.color}08, transparent 60%)` }} />
                    <div
                      className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                      style={{ backgroundColor: `${link.color}14`, border: `1px solid ${link.color}22` }}
                    >
                      <Icon style={{ color: link.color }} />
                    </div>
                    <div className="relative z-10">
                      <p className="text-text-muted text-xs mb-0.5">{t(link.labelKey)}</p>
                      <p className="text-text-primary text-sm font-medium">{link.value}</p>
                    </div>
                  </div>
                </motion.a>
              )
            })}

            <div className="mt-auto bg-bg-card border border-[var(--border-base)] rounded-2xl p-5">
              <p className="text-accent-cyan text-xs font-semibold mb-2">{t('contact.links.tip_title')}</p>
              <p className="text-text-muted text-xs leading-relaxed">
                {t('contact.links.tip_text')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}