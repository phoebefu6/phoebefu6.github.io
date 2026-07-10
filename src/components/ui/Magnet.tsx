import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'
import type { ReactNode } from 'react'

interface MagnetProps {
  children: ReactNode
  strength?: number
  className?: string
}

/** React Bits Magnet - element subtly pulls toward the cursor, springs back on leave. */
export function Magnet({ children, strength = 0.25, className }: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 20 })
  const sy = useSpring(y, { stiffness: 300, damping: 20 })

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left - rect.width / 2) * strength)
    y.set((e.clientY - rect.top - rect.height / 2) * strength)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className ?? ''}`}
    >
      {children}
    </motion.div>
  )
}
