import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { BsWhatsapp } from 'react-icons/bs'
import { HiX } from 'react-icons/hi'

export default function WhatsAppButton() {
  const [show, setShow] = useState(false)
  const [tooltip, setTooltip] = useState(true)

  /* Mostrar después de 2s de scroll */
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Ocultar tooltip después de 6s */
  useEffect(() => {
    const t = setTimeout(() => setTooltip(false), 8000)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 flex items-center gap-2 sm:gap-3"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {tooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="relative bg-white rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 shadow-lg max-w-[160px] sm:max-w-[200px]"
              >
                <button onClick={() => setTooltip(false)} className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                  <HiX className="text-gray-600 text-[10px]" />
                </button>
                <p className="text-gray-800 text-xs font-medium leading-relaxed">
                  ¿Necesitas ayuda? Escríbeme por WhatsApp 👋
                </p>
                {/* Flecha */}
                <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botón */}
          <motion.a
            href="https://wa.me/573046661245?text=Hola%20Jose%2C%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20hablar%20contigo"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative w-14 h-14 bg-[#25d366] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#25d366]/30 hover:shadow-[#25d366]/50 transition-shadow duration-300"
          >
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-[#25d366] animate-ping opacity-20" />
            <BsWhatsapp size={26} className="relative z-10" />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
