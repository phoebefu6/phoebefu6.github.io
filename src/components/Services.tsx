import { Crown, Compass, Database, TrendingUp, Presentation, GraduationCap, Box, Blocks, ArrowRight, Check } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SectionTitle } from './ui/SectionTitle'
import { Stagger, StaggerItem } from './ui/Reveal'
import { services } from '../data/services'

const icons: Record<string, LucideIcon> = {
  Crown,
  Compass,
  Database,
  TrendingUp,
  Presentation,
  GraduationCap,
  Box,
  Blocks,
}

export function Services() {
  return (
    <section id="services" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-[1700px] px-6 lg:px-12">
        <SectionTitle
          kicker="Services"
          index="03"
          title="How we can work together"
          subtitle="Built on 12 years of doing the work - not borrowed frameworks."
        />

        <Stagger className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((s) => {
            const Icon = icons[s.icon] ?? Box
            return (
              <StaggerItem key={s.id}>
                <div className="card group flex h-full flex-col p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-[2px] bg-tint-deep text-accent">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">{s.name}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{s.overview}</p>

                  <div className="mt-5 space-y-1.5">
                    {s.outcomes.map((o) => (
                      <p key={o} className="flex gap-2 text-[13px] text-muted">
                        <Check size={14} className="mt-0.5 shrink-0 text-accent" />
                        {o}
                      </p>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {s.process.map((step, i) => (
                      <span key={step} className="rounded-[2px] bg-tint px-2 py-0.5 text-[11px] text-muted">
                        {i + 1}. {step}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-6 border-t border-line">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1 text-[13px] font-semibold text-accent hover:text-accent-deep transition-colors"
                    >
                      Curious? Let's chat <ArrowRight size={13} />
                    </a>
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
