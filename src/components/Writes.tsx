import { ArrowUpRight } from 'lucide-react'
import { SectionTitle } from './ui/SectionTitle'
import { Stagger, StaggerItem } from './ui/Reveal'
import { LinkedinIcon } from './ui/BrandIcons'
import { writeSeries } from '../data/writes'
import { profile } from '../data/profile'

export function Writes() {
  return (
    <section id="writes" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-[1700px] px-6 lg:px-12">
        <SectionTitle
          kicker="Writes"
          index="04"
          title="Three series, every week, on LinkedIn"
          subtitle="Real deployments on Monday. Concepts decoded on Wednesday. Leadership on Friday."
        />

        <Stagger className="grid gap-6 md:grid-cols-3">
          {writeSeries.map((s, i) => (
            <StaggerItem key={s.id}>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="card group relative flex h-full flex-col p-8"
              >
                <div className="accent-rule absolute top-0 inset-x-0 transition-all group-hover:h-1.5" aria-hidden />
                <div className="flex items-baseline justify-between">
                  <span className="kicker">{s.day}</span>
                  <span className="text-4xl font-semibold text-tint-deep font-display tabular-nums select-none" aria-hidden>
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink group-hover:text-accent transition-colors">
                  {s.name}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{s.summary}</p>
                <p className="mt-5 text-[13px] font-semibold text-accent-deep">
                  Format: <span className="font-medium text-muted">{s.format}</span>
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {s.topics.map((t) => (
                    <span key={t} className="rounded-[2px] bg-tint px-2 py-0.5 text-[11px] text-muted">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="mt-6 inline-flex items-center gap-2 border-t border-line pt-4 text-[13px] font-semibold text-accent">
                  <LinkedinIcon size={14} />
                  Read on LinkedIn <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
