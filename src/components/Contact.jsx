import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiMail, HiCheckCircle, HiPhone, HiUser, HiBriefcase, HiChat } from 'react-icons/hi'
import { BsWhatsapp, BsSend } from 'react-icons/bs'
import AnimatedTitle from './AnimatedTitle'

/* ─── Links de contacto ─────────────────────────────────────────────────── */
const CONTACT_LINKS = [
  {
    icon:  HiMail,
    label: 'Email',
    value: 'josecaballerogonzalez49@gmail.com',
    href:  'mailto:josecaballerogonzalez49@gmail.com',
    color: '#00d4ff',
  },
  {
    icon:  HiPhone,
    label: 'Teléfono',
    value: '+57 304 666 1245',
    href:  'tel:+573046661245',
    color: '#8b5cf6',
  },
  {
    icon:  BsWhatsapp,
    label: 'WhatsApp',
    value: '+57 304 666 1245',
    href:  'https://wa.me/573046661245',
    color: '#25d366',
  },
]

const SERVICE_OPTIONS = [
  'Desarrollo Web',
  'Automatización de procesos',
  'Aplicación a medida',
  'Consultoría técnica',
  'Otro',
]

/* ─── Componente de formulario ──────────────────────────────────────────── */
export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })

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

  const inputClass = 'w-full bg-bg-card border border-white/[0.08] rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm placeholder-text-muted/60 focus:outline-none focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20 transition-all duration-200'
  const selectClass = `${inputClass} [&>option]:bg-[#141427] [&>option]:text-white`

  return (
    <section id="contacto" className="py-16 sm:py-28 relative overflow-hidden" ref={ref}>
      {/* Orbes */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-accent-cyan/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-64 h-64 bg-accent-violet/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* Encabezado centrado */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.25 }}
          className="mb-14 text-center"
        >
          <span className="section-tag">// new Message()</span>
          <AnimatedTitle className="section-title">
            ¿Arrancamos un <span className="accent-text">proyecto</span>?
          </AnimatedTitle>
          <p className="section-subtitle mt-3 mx-auto text-center max-w-xl">
            Disponible para freelance, trabajo remoto y oportunidades en equipo.
            Cuéntame tu idea y te respondo en menos de 24 horas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">

          {/* ── Formulario (3 cols) ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.06 }}
            className="lg:col-span-3"
          >
            <div className="group relative overflow-hidden rounded-2xl p-[1px]">
              {/* Borde hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'conic-gradient(from 135deg, transparent, #00d4ff30, transparent, #8b5cf625, transparent)' }}
              />

              <div className="relative bg-bg-card rounded-2xl p-7">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>

                  {/* Fila 1: Nombre + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-1.5 text-text-secondary text-sm mb-2" htmlFor="name">
                        <HiUser className="text-accent-cyan text-xs" /> Nombre *
                      </label>
                      <input id="name" type="text" name="name" value={form.name} onChange={handleChange} required
                        placeholder="Tu nombre completo" className={inputClass} />
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-text-secondary text-sm mb-2" htmlFor="email">
                        <HiMail className="text-accent-cyan text-xs" /> Email *
                      </label>
                      <input id="email" type="email" name="email" value={form.email} onChange={handleChange} required
                        placeholder="tu@email.com" className={inputClass} />
                    </div>
                  </div>

                  {/* Fila 2: Teléfono + Servicio */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-1.5 text-text-secondary text-sm mb-2" htmlFor="phone">
                        <HiPhone className="text-accent-cyan text-xs" /> Teléfono
                      </label>
                      <input id="phone" type="tel" name="phone" value={form.phone} onChange={handleChange}
                        placeholder="+57 300 000 0000" className={inputClass} />
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-text-secondary text-sm mb-2" htmlFor="service">
                        <HiBriefcase className="text-accent-cyan text-xs" /> Tipo de proyecto
                      </label>
                      <select id="service" name="service" value={form.service} onChange={handleChange}
                        className={`${selectClass} ${!form.service ? 'text-text-muted/60' : ''}`}>
                        <option value="">Selecciona una opción</option>
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Fila 3: Presupuesto */}
                  <div>
                    <label className="flex items-center gap-1.5 text-text-secondary text-sm mb-2" htmlFor="budget">
                      💰 Presupuesto estimado
                    </label>
                    <select id="budget" name="budget" value={form.budget} onChange={handleChange}
                      className={`${selectClass} ${!form.budget ? 'text-text-muted/60' : ''}`}>
                      <option value="">Selecciona un rango</option>
                      <option value="< $500.000 COP">Menos de $500.000 COP</option>
                      <option value="$500.000 - $1.500.000 COP">$500.000 – $1.500.000 COP</option>
                      <option value="$1.500.000 - $3.000.000 COP">$1.500.000 – $3.000.000 COP</option>
                      <option value="> $3.000.000 COP">Más de $3.000.000 COP</option>
                      <option value="Por definir">Por definir</option>
                    </select>
                  </div>

                  {/* Fila 4: Mensaje */}
                  <div>
                    <label className="flex items-center gap-1.5 text-text-secondary text-sm mb-2" htmlFor="message">
                      <HiChat className="text-accent-cyan text-xs" /> Mensaje *
                    </label>
                    <textarea id="message" name="message" value={form.message} onChange={handleChange} required rows={5}
                      placeholder="Cuéntame sobre tu proyecto, qué necesitas y en qué te puedo ayudar..."
                      className={`${inputClass} resize-none`} />
                  </div>

                  {/* Botón enviar */}
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
                    {status === 'loading' ? 'Enviando...' : status === 'success' ? '¡Mensaje enviado!' : 'Enviar mensaje'}
                  </motion.button>

                  {status === 'error' && (
                    <p className="text-red-400 text-sm text-center">
                      Hubo un error al enviar. Inténtalo de nuevo o escríbeme por WhatsApp.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </motion.div>

          {/* ── Links de contacto (2 cols) ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.25, delay: 0.08 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            <div className="mb-1">
              <h3 className="font-heading font-semibold text-text-primary text-xl mb-1.5">
                Conecta conmigo
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Respondo en menos de 24h. Si es urgente, escríbeme por WhatsApp.
              </p>
            </div>

            {CONTACT_LINKS.map((link, i) => {
              const Icon = link.icon
              return (
                <motion.a
                  key={link.label}
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
                      <p className="text-text-muted text-xs mb-0.5">{link.label}</p>
                      <p className="text-text-primary text-sm font-medium">{link.value}</p>
                    </div>
                  </div>
                </motion.a>
              )
            })}

            {/* Tip */}
            <div className="mt-auto bg-bg-card border border-white/[0.06] rounded-2xl p-5">
              <p className="text-accent-cyan text-xs font-semibold mb-2">💡 Tip</p>
              <p className="text-text-muted text-xs leading-relaxed">
                ¿No sabes qué escribir? Solo cuéntame en qué te puedo ayudar y lo resolvemos juntos. Sin compromisos.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
