import { motion, useReducedMotion } from 'framer-motion'

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
}

/** React Bits SplitText - headline reveals word by word, staggered rise-and-fade. */
export function SplitText({ text, className, delay = 0, stagger = 0.07 }: SplitTextProps) {
  const reduce = useReducedMotion()
  if (reduce) return <span className={className}>{text}</span>
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: '70%' }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: delay + i * stagger, ease: [0.21, 0.68, 0.36, 0.98] }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
