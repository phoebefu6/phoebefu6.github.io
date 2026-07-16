import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Sparkles, CalendarClock } from 'lucide-react'
import { Magnet } from './ui/Magnet'
import { profile } from '../data/profile'

const ease = [0.21, 0.68, 0.36, 0.98] as const
/** Spring-with-overshoot curve - the kinetic signature of the hero */
const spring = [0.16, 1.3, 0.3, 1] as const

/** Whisper-faint dot grid - paper texture, ~6% visibility. */
function DotGrid() {
  return (
    <svg className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <pattern id="hero-dots" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill="rgba(147,51,234,0.07)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-dots)" />
    </svg>
  )
}

/** One headline line springing up with overshoot, blur snapping to sharp. */
function SpringLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  const reduce = useReducedMotion()
  return (
    <span className="block">
      <motion.span
        className="inline-block will-change-transform"
        initial={reduce ? false : { opacity: 0, y: 70, rotate: 4, scale: 0.92, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, rotate: 0, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1, delay, ease: spring }}
      >
        {children}
      </motion.span>
    </span>
  )
}

/** Accent shards raining down the right side on load. */
function Shards() {
  const reduce = useReducedMotion()
  const shards = [
    { right: '16%', height: 90, color: 'var(--color-peach)', delay: 0.3 },
    { right: '24%', height: 56, color: 'var(--color-accent)', delay: 0.5 },
    { right: '9%', height: 120, color: 'var(--color-peach)', delay: 0.42 },
  ]
  if (reduce) return null
  return (
    <>
      {shards.map((s, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute hidden md:block"
          style={{ right: s.right, top: -s.height, width: 10, height: s.height, background: s.color }}
          initial={{ y: 0 }}
          animate={{ y: '46vh' }}
          transition={{ duration: 1.1 + i * 0.1, delay: s.delay, ease }}
        />
      ))}
    </>
  )
}

export function Hero() {
  const reduce = useReducedMotion()
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden bg-paper">
      <DotGrid />
      <Shards />

      {/* Signature accent sweep - the 4px rule draws across on load */}
      <motion.div
        className="absolute top-0 left-0 h-1 w-full origin-left bg-accent"
        initial={reduce ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.18, 1] }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1700px] px-6 lg:px-12 pt-32 pb-20">
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1.4, 0.3, 1] }}
          className="mb-8 inline-flex items-center gap-2 border border-line bg-tint px-4 py-1.5 text-[13px] font-medium text-ink"
        >
          <Sparkles size={13} className="text-accent" />
          The data & AI executive who still ships
        </motion.div>

        <h1 className="hero-headline max-w-5xl text-ink">
          <SpringLine delay={0.1}>Ideas are cheap.</SpringLine>
          <SpringLine delay={0.28}>Shipped systems</SpringLine>
          <SpringLine delay={0.46}>
            <span className="relative inline-block isolate text-accent">
              move markets.
              <motion.span
                aria-hidden
                className="absolute -z-10 bg-peach"
                style={{ left: '-0.05em', right: '-0.05em', bottom: '0.06em', height: '0.22em', originX: 0 }}
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 1.15, ease: [0.77, 0, 0.18, 1] }}
              />
            </span>
          </SpringLine>
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease }}
          className="mt-8 max-w-2xl text-lg md:text-xl text-muted leading-relaxed"
        >
          {profile.intro}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnet>
            <a
              href="#products"
              className="group inline-flex items-center gap-2 rounded-[2px] bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
            >
              Explore products
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </Magnet>
          <Magnet>
            <a
              href="#writes"
              className="inline-flex items-center gap-2 rounded-[2px] border border-ink/25 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Read my series
            </a>
          </Magnet>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-2 py-3 text-sm font-medium text-muted transition-colors hover:text-accent"
          >
            <CalendarClock size={15} />
            Book a consultation
          </a>
        </motion.div>
      </div>
    </section>
  )
}
