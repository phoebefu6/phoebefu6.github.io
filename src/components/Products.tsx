import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { ArrowUpRight, Layers, GraduationCap, LayoutDashboard, Star, Gamepad2, Terminal, Palette } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SectionTitle } from './ui/SectionTitle'
import { Stagger, StaggerItem } from './ui/Reveal'
import { StatusBadge } from './ui/StatusBadge'
import { Modal } from './ui/Modal'
import { GithubIcon } from './ui/BrandIcons'
import { projects, courses, playground } from '../data/projects'
import type { Project } from '../data/projects'

const icons: Record<string, LucideIcon> = {
  Layers,
  GraduationCap,
  LayoutDashboard,
  Star,
  Gamepad2,
  Terminal,
  Palette,
}

/** Hairline tier divider with an uppercase plum label */
function TierLabel({ label }: { label: string }) {
  return (
    <div className="mt-14 mb-5 flex items-center gap-4 first:mt-0">
      <span className="text-[13px] font-semibold uppercase tracking-[0.1em] text-accent font-display">{label}</span>
      <span className="h-px flex-1 bg-line" aria-hidden />
    </div>
  )
}

export function Products() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <section id="products" className="relative bg-tint py-28 md:py-40">
      <div className="mx-auto max-w-[1700px] px-6 lg:px-12">
        <SectionTitle
          kicker="Featured Products"
          index="02"
          title="Things I have built and shipped"
          subtitle="Everything below is live on GitHub - built in the open."
        />

        {/* Tier 1 - flagships */}
        <TierLabel label="Flagships" />
        <Stagger className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {projects.map((p) => {
            const Icon = icons[p.icon] ?? Layers
            return (
              <StaggerItem key={p.id}>
                <button
                  onClick={() => setSelected(p)}
                  className="card group relative flex h-full w-full flex-col p-7 text-left"
                >
                  <div
                    className={`absolute top-0 inset-x-0 h-1 transition-all group-hover:h-1.5 ${p.peach ? 'bg-peach' : 'bg-accent'}`}
                    aria-hidden
                  />
                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-[2px] bg-tint-deep text-accent">
                      <Icon size={22} />
                    </span>
                    <StatusBadge status={p.status} />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight text-ink group-hover:text-accent transition-colors">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-accent">{p.tagline}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span key={t} className="rounded-[2px] bg-tint px-2 py-0.5 text-[11px] text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1 text-[13px] font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    View details <ArrowUpRight size={13} />
                  </span>
                </button>
              </StaggerItem>
            )
          })}
        </Stagger>

        {/* Tier 2 - course library */}
        <TierLabel label="Learn with Phoebe · course library" />
        <Stagger className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {courses.map((c) => (
            <StaggerItem key={c.id}>
              <a
                href={c.link}
                target="_blank"
                rel="noreferrer"
                className="card group flex h-full items-start gap-3.5 p-5"
              >
                <span className="course-rank min-w-[36px] text-2xl leading-tight" aria-hidden>
                  {String(c.rank).padStart(2, '0')}
                </span>
                <span className="flex-1">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.06em] text-accent">{c.tag}</span>
                  <span className="mt-0.5 block text-[15px] font-semibold text-ink group-hover:text-accent transition-colors font-display">
                    {c.name}
                  </span>
                  <span className="mt-1 block text-xs text-faint">{c.blurb}</span>
                </span>
                <span className="rounded-[2px] bg-tint-deep px-1.5 py-0.5 text-[10px] font-semibold text-accent-deep">
                  LIVE
                </span>
              </a>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Tier 3 - playground */}
        <TierLabel label="Playground" />
        <Stagger className="grid gap-4 md:grid-cols-3">
          {playground.map((g) => {
            const Icon = icons[g.icon] ?? Palette
            return (
              <StaggerItem key={g.id}>
                <a
                  href={g.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full items-center gap-4 rounded-[2px] border border-dashed border-accent/40 bg-paper p-5 transition-colors hover:border-accent"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[2px] bg-tint-deep text-accent">
                    <Icon size={20} />
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold text-ink group-hover:text-accent transition-colors font-display">
                      {g.name}
                    </span>
                    <span className="mt-0.5 block text-[12.5px] text-muted">{g.blurb}</span>
                  </span>
                </a>
              </StaggerItem>
            )
          })}
          <StaggerItem>
            <a
              href="https://github.com/phoebefu6"
              target="_blank"
              rel="noreferrer"
              className="group flex h-full items-center gap-4 rounded-[2px] border border-dashed border-accent/40 bg-paper p-5 transition-colors hover:border-accent"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[2px] bg-tint-deep text-accent">
                <GithubIcon size={20} />
              </span>
              <span>
                <span className="block text-[15px] font-semibold text-ink group-hover:text-accent transition-colors font-display">
                  More on GitHub
                </span>
                <span className="mt-0.5 block text-[12.5px] text-muted">
                  Daily builds, notebooks, and everything in progress
                </span>
              </span>
              <ArrowUpRight
                size={15}
                className="ml-auto text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </StaggerItem>
        </Stagger>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={selected.status} />
              <span className="text-[13px] text-faint">{selected.tech.join(' · ')}</span>
            </div>
            <h3 className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight text-ink">{selected.name}</h3>
            <p className="mt-1 text-accent font-medium">{selected.tagline}</p>
            <div className="prose-doc mt-6">
              <ReactMarkdown>{selected.detail}</ReactMarkdown>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {selected.link && (
                <a
                  href={selected.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-[2px] bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-deep transition-colors"
                >
                  Visit live site <ArrowUpRight size={14} />
                </a>
              )}
              <a
                href={selected.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-[2px] border border-ink/25 px-5 py-2.5 text-sm font-semibold text-ink hover:border-accent hover:text-accent transition-colors"
              >
                <GithubIcon size={15} /> View code
              </a>
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
