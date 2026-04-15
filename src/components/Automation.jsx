import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { HiLightningBolt, HiCog, HiDocumentReport, HiUsers } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'
import AnimatedTitle from './AnimatedTitle'

/* ─── Info de nodos del workflow ───────────────────────────────────────── */
const NODES = [
  { key: 'webhook', emoji: '⚡', borderColor: 'border-orange-400/40', bgGrad: 'from-orange-500/15 to-orange-400/5', shadow: 'rgba(251,146,60,0.12)', shadowHover: 'rgba(251,146,60,0.25)', accent: '#fb923c' },
  { key: 'if',      emoji: '🔀', borderColor: 'border-accent-violet/40', bgGrad: 'from-violet-500/15 to-violet-400/5', shadow: 'rgba(139,92,246,0.12)', shadowHover: 'rgba(139,92,246,0.25)', accent: '#8b5cf6' },
  { key: 'gmail',   emoji: '📧', borderColor: 'border-red-400/40', bgGrad: 'from-red-500/15 to-red-400/5', shadow: 'rgba(248,113,113,0.1)', shadowHover: 'rgba(248,113,113,0.2)', accent: '#f87171' },
  { key: 'sheets',  emoji: '📋', borderColor: 'border-green-500/40', bgGrad: 'from-green-500/15 to-green-400/5', shadow: 'rgba(34,197,94,0.1)', shadowHover: 'rgba(34,197,94,0.2)', accent: '#22c55e' },
  { key: 'slack',   emoji: '💬', borderColor: 'border-accent-cyan/40', bgGrad: 'from-cyan-500/15 to-cyan-400/5', shadow: 'rgba(0,212,255,0.12)', shadowHover: 'rgba(0,212,255,0.25)', accent: '#00d4ff' },
]

/* ─── Tarjetas de servicio ─────────────────────────────────────────────── */
const CARDS = [
  {
    icon:        HiLightningBolt,
    title:       'Flujos n8n',
    description: 'Diseño de workflows en n8n con triggers, nodos HTTP, webhooks y lógica condicional para conectar cualquier API sin levantar servidores.',
    color:       '#ea4b71',
  },
  {
    icon:        HiCog,
    title:       'Integración Make.com',
    description: 'Escenarios multi-módulo en Make.com: data mapping entre plataformas, manejo de errores, variables dinámicas y scheduling de ejecuciones.',
    color:       '#6d69ff',
  },
  {
    icon:        HiDocumentReport,
    title:       'Reportes automáticos',
    description: 'Scripts Python + n8n que agregan datos de múltiples fuentes, generan PDFs dinámicos y los distribuyen automáticamente por email o Google Drive.',
    color:       '#00d4ff',
  },
  {
    icon:        HiUsers,
    title:       'Caso real: RRHH',
    description: 'Pipeline end-to-end para el área de RRHH: desde el evento de hiring hasta la firma digital del contrato, todo sin tocar un archivo manualmente.',
    color:       '#22c55e',
  },
]

/* ─── Tarjeta con tilt 3D ──────────────────────────────────────────────── */
function TiltServiceCard({ card, index, inView, t }) {
  const Icon = card.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay: 0.1 + index * 0.05, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className="relative group overflow-hidden rounded-2xl p-[1px] h-full transition-transform duration-300 hover:scale-[1.03]">
        {/* Borde gradiente — solo en hover, sin rotate */}
        <div
          className="absolute inset-0 rounded-2xl opacity-30 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{
            background: `conic-gradient(from 135deg, transparent, ${card.color}55, transparent, ${card.color}35, transparent)`,
          }}
        />

        <div className="relative bg-bg-card rounded-2xl p-4 sm:p-6 h-full flex flex-col gap-3 sm:gap-4">

          {/* Glow */}
          <div
            className="absolute inset-0 rounded-2xl opacity-20 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
            style={{ background: `radial-gradient(circle at 50% 20%, ${card.color}12, transparent 70%)` }}
          />

          {/* Icono */}
          <div
            className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center text-[1.35rem] flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
            style={{
              backgroundColor: `${card.color}15`,
              border: `1px solid ${card.color}28`,
            }}
          >
            <Icon style={{ color: card.color }} />
          </div>

          <div className="relative z-10">
            <h3 className="font-heading font-semibold text-text-primary text-sm mb-2">
              {t(`automation.cards.${card.key}.title`)}
            </h3>
            <p className="text-text-muted text-xs leading-relaxed">
              {t(`automation.cards.${card.key}.desc`)}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Automation() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })
  const { t } = useTranslation()
  const [activeNode, setActiveNode] = useState(null)
  const activeInfo = NODES.find(n => n.key === activeNode)

  return (
    <section
      id="automatizacion"
      className="py-16 sm:py-24 bg-bg-secondary/80 backdrop-blur-sm relative overflow-hidden"
      ref={ref}
    >
      {/* Decoraciones de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-cyan/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-violet/[0.05] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* Cabecera + bloque de código */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-center mb-10 sm:mb-16">

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3 }}
          >
            <span className="section-tag">{t('automation.tag')}</span>
            <AnimatedTitle className="section-title">
              {t('automation.title1')}<span className="accent-text">{t('automation.title2')}</span>
            </AnimatedTitle>
            <p className="text-text-secondary text-base leading-relaxed mt-4 max-w-md">
              {t('automation.subtitle')}
            </p>
          </motion.div>

          {/* Canvas n8n con nodos visuales */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.06 }}
            className="glass rounded-2xl p-5 sm:p-7 relative overflow-hidden group"
          >
            {/* Glow sutil */}
            <div className="absolute inset-0 rounded-2xl opacity-20 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'radial-gradient(circle at 50% 30%, rgba(0,212,255,0.06), transparent 70%)' }}
            />

            {/* Fondo de grid estilo n8n canvas */}
            <div className="absolute inset-0 opacity-[0.035]"
              style={{ backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)', backgroundSize: '24px 24px' }}
            />

            {/* Header del canvas */}
            <div className="relative flex items-center justify-between mb-7">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                <span className="ml-3 text-text-muted text-xs font-mono tracking-wide">n8n — Lead Scoring Workflow</span>
              </div>
              <span className="text-green-400 text-[10px] font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Active
              </span>
            </div>

            {/* Workflow — layout linear con conectores CSS */}
            <div className="relative z-10">

              {/* Fila de nodos */}
              <div className="flex items-center justify-center pb-2">

                {/* ── Nodo: Webhook ── */}
                <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.3, delay: 0.3 }}
                  className="flex flex-col items-center shrink-0 cursor-pointer" onMouseEnter={() => setActiveNode('webhook')} onMouseLeave={() => setActiveNode(null)}>
                  <div className={`w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] rounded-2xl flex items-center justify-center text-[24px] sm:text-[28px] border border-orange-400/40 bg-gradient-to-br from-orange-500/15 to-orange-400/5 shadow-[0_0_20px_rgba(251,146,60,0.12)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(251,146,60,0.25)] ${activeNode === 'webhook' ? 'ring-2 ring-orange-400/60 scale-110' : ''}`}>
                    ⚡
                  </div>
                  <span className="text-[11px] text-text-secondary font-medium mt-2 font-mono">Webhook</span>
                </motion.div>

                {/* ── Conector ── */}
                <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.3, delay: 0.42 }}
                  className="origin-left shrink w-6 sm:w-12 min-w-3 h-[2px] bg-gradient-to-r from-orange-400/40 to-violet-400/40 self-center -mt-6 rounded-full" />

                {/* ── Nodo: IF ── */}
                <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.3, delay: 0.45 }}
                  className="flex flex-col items-center shrink-0 cursor-pointer" onMouseEnter={() => setActiveNode('if')} onMouseLeave={() => setActiveNode(null)}>
                  <div className={`w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] rounded-2xl flex items-center justify-center text-[24px] sm:text-[28px] border border-accent-violet/40 bg-gradient-to-br from-violet-500/15 to-violet-400/5 shadow-[0_0_20px_rgba(139,92,246,0.12)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(139,92,246,0.25)] relative ${activeNode === 'if' ? 'ring-2 ring-violet-400/60 scale-110' : ''}`}>
                    🔀
                  </div>
                  <span className="text-[11px] text-text-secondary font-medium mt-2 font-mono">IF</span>
                  <span className="text-[9px] text-text-muted/70 font-mono">score &gt; 80</span>
                </motion.div>

                {/* ── Ramas ── */}
                <div className="flex flex-col gap-4 sm:gap-5 shrink-0 ml-1">

                  {/* Rama TRUE */}
                  <motion.div initial={{ opacity: 0, x: 12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.3, delay: 0.55 }}
                    className="flex items-center gap-0">
                    {/* Conector true */}
                    <div className="flex items-center gap-0 shrink">
                      <div className="w-4 sm:w-8 min-w-2 h-[2px] bg-gradient-to-r from-violet-400/30 to-green-400/50 rounded-full" />
                      <span className="text-[8px] font-mono text-green-400/80 bg-green-400/10 px-1.5 py-0.5 rounded-full border border-green-400/20 mx-1 shrink-0">true</span>
                      <div className="w-3 sm:w-5 min-w-2 h-[2px] bg-green-400/30 rounded-full" />
                    </div>
                    <div onMouseEnter={() => setActiveNode('gmail')} onMouseLeave={() => setActiveNode(null)} className={`w-[48px] h-[48px] sm:w-[54px] sm:h-[54px] rounded-xl flex items-center justify-center text-[20px] sm:text-[24px] border border-red-400/40 bg-gradient-to-br from-red-500/15 to-red-400/5 shadow-[0_0_16px_rgba(248,113,113,0.1)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_24px_rgba(248,113,113,0.2)] cursor-pointer ${activeNode === 'gmail' ? 'ring-2 ring-red-400/60 scale-110' : ''}`}>
                      📧
                    </div>
                    <span className="text-[11px] text-text-secondary font-medium ml-1.5 font-mono shrink-0">Gmail</span>
                  </motion.div>

                  {/* Rama FALSE */}
                  <motion.div initial={{ opacity: 0, x: 12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.3, delay: 0.65 }}
                    className="flex items-center gap-0">
                    {/* Conector false */}
                    <div className="flex items-center gap-0 shrink">
                      <div className="w-4 sm:w-8 min-w-2 h-[2px] bg-gradient-to-r from-violet-400/30 to-red-400/50 rounded-full" />
                      <span className="text-[8px] font-mono text-red-400/80 bg-red-400/10 px-1 py-0.5 rounded-full border border-red-400/20 mx-1 shrink-0">false</span>
                      <div className="w-3 sm:w-5 min-w-2 h-[2px] bg-red-400/30 rounded-full" />
                    </div>
                    <div onMouseEnter={() => setActiveNode('sheets')} onMouseLeave={() => setActiveNode(null)} className={`w-[48px] h-[48px] sm:w-[54px] sm:h-[54px] rounded-xl flex items-center justify-center text-[20px] sm:text-[24px] border border-green-500/40 bg-gradient-to-br from-green-500/15 to-green-400/5 shadow-[0_0_16px_rgba(34,197,94,0.1)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_24px_rgba(34,197,94,0.2)] cursor-pointer ${activeNode === 'sheets' ? 'ring-2 ring-green-400/60 scale-110' : ''}`}>
                      📋
                    </div>
                    <span className="text-[11px] text-text-secondary font-medium ml-1.5 font-mono shrink-0">Sheets</span>
                  </motion.div>
                </div>

                {/* ── Conector merge ── */}
                <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.3, delay: 0.72 }}
                  className="origin-left shrink w-4 sm:w-10 min-w-2 h-[2px] bg-gradient-to-r from-text-muted/20 to-cyan-400/40 self-center rounded-full" />

                {/* ── Nodo: Slack ── */}
                <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.3, delay: 0.78 }}
                  className="flex flex-col items-center shrink-0 cursor-pointer" onMouseEnter={() => setActiveNode('slack')} onMouseLeave={() => setActiveNode(null)}>
                  <div className={`w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] rounded-2xl flex items-center justify-center text-[24px] sm:text-[28px] border border-accent-cyan/40 bg-gradient-to-br from-cyan-500/15 to-cyan-400/5 shadow-[0_0_20px_rgba(0,212,255,0.12)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(0,212,255,0.25)] ${activeNode === 'slack' ? 'ring-2 ring-cyan-400/60 scale-110' : ''}`}>
                    💬
                  </div>
                  <span className="text-[11px] text-text-secondary font-medium mt-2 font-mono">Slack</span>
                </motion.div>
              </div>

              {/* Panel de info del nodo seleccionado */}
              <AnimatePresence mode="wait">
                {activeInfo && (
                  <motion.div
                    key={activeNode}
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="rounded-xl p-4 border flex items-start gap-3"
                      style={{ borderColor: `${activeInfo.accent}30`, backgroundColor: `${activeInfo.accent}08` }}>
                      <span className="text-2xl shrink-0 mt-0.5">{activeInfo.emoji}</span>
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-text-primary mb-1">
                          {t(`automation.nodes.${activeNode}.name`)}
                        </h4>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          {t(`automation.nodes.${activeNode}.desc`)}
                        </p>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Barra de ejecución */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.9 }}
                className="flex items-center justify-between mt-5 pt-4 border-t border-glass-border"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-accent-cyan flex items-center gap-1">▶ Execution #1,247</span>
                  <span className="text-[10px] font-mono text-green-400 flex items-center gap-1">
                    ✓ Success <span className="text-text-muted/70">(0.3s)</span>
                  </span>
                </div>
                <span className="text-[10px] font-mono text-text-muted/60">5 nodes · 4 links</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {CARDS.map((card, i) => (
            <TiltServiceCard key={card.key} card={card} index={i} inView={inView} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
