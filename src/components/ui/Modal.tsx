import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

const EXIT_MS = 300

/**
 * Mount/unmount is managed manually (not AnimatePresence): nested exit
 * animations in this framer-motion / React 19 combo never fire their
 * completion callback, leaving an invisible overlay that blocks the page.
 */
export function Modal({ open, onClose, children }: ModalProps) {
  const [mounted, setMounted] = useState(open)
  // Callers usually null their selection on close, which would blank the
  // content mid-fade - keep the last rendered children during the exit.
  const [cached, setCached] = useState<ReactNode>(children)

  useEffect(() => {
    if (open) {
      setMounted(true)
      setCached(children)
      return
    }
    const t = setTimeout(() => setMounted(false), EXIT_MS)
    return () => clearTimeout(t)
  }, [open, children])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!mounted) return null

  return (
    <motion.div
      className={`fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-8 ${
        open ? '' : 'pointer-events-none'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: open ? 1 : 0 }}
      transition={{ duration: EXIT_MS / 1000 }}
    >
      <div className="absolute inset-0 bg-ink/30" onClick={onClose} />
      <motion.div
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto thin-scroll rounded-[2px] border border-line bg-paper p-6 md:p-10"
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={open ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.21, 0.68, 0.36, 0.98] }}
      >
        <div className="accent-rule absolute top-0 inset-x-0" aria-hidden />
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 rounded-[2px] border border-line p-2 text-muted hover:text-accent hover:border-accent/50 transition-colors"
        >
          <X size={16} />
        </button>
        {open ? children : cached}
      </motion.div>
    </motion.div>
  )
}
