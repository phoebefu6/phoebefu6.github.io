import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Sparkles, CalendarClock } from 'lucide-react'
import { SplitText } from './ui/SplitText'
import { Magnet } from './ui/Magnet'
import { profile } from '../data/profile'

const ease = [0.21, 0.68, 0.36, 0.98] as const

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

export function Hero() {
  const reduce = useReducedMotion()
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden bg-paper">
      <DotGrid />

      {/* Signature accent sweep - the 4px rule draws across on load */}
      <motion.div
        className="absolute top-0 left-0 h-1 w-full origin-left bg-accent"
        initial={reduce ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1700px] px-6 lg:px-12 pt-32 pb-20">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease }}
          className="mb-8 inline-flex items-center gap-2 border border-line bg-tint px-4 py-1.5 text-[13px] font-medium text-ink"
        >
          <Sparkles size={13} className="text-accent" />
          The data & AI executive who still ships
        </motion.div>

        <h1 className="hero-headline max-w-5xl text-ink">
          <SplitText text="Ideas are cheap." delay={0.2} />
          <br />
          <SplitText text="Shipped systems" delay={0.45} />{' '}
          <span className="peach-mark text-accent">
            <SplitText text="move markets." delay={0.65} />
          </span>
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.36, ease }}
          className="mt-8 max-w-2xl text-lg md:text-xl text-muted leading-relaxed"
        >
          {profile.intro}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.48, ease }}
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
