import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { ArrowUpRight, Layers, GraduationCap, LayoutDashboard, Star, Gamepad2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SectionTitle } from './ui/SectionTitle'
import { Stagger, StaggerItem } from './ui/Reveal'
import { StatusBadge } from './ui/StatusBadge'
import { Modal } from './ui/Modal'
import { GithubIcon } from './ui/BrandIcons'
import { projects } from '../data/projects'
import type { Project } from '../data/projects'

const icons: Record<string, LucideIcon> = {
  Layers,
  GraduationCap,
  LayoutDashboard,
  Star,
  Gamepad2,
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

        <Stagger className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((p) => {
            const Icon = icons[p.icon] ?? Layers
            return (
              <StaggerItem key={p.id}>
                <button
                  onClick={() => setSelected(p)}
                  className="card group relative flex h-full w-full flex-col p-7 text-left"
                >
                  <div className="accent-rule absolute top-0 inset-x-0 transition-all group-hover:h-1.5" aria-hidden />
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
          {/* Ghost tile fills the grid and points at the full GitHub profile */}
          <StaggerItem>
            <a
              href="https://github.com/phoebefu6"
              target="_blank"
              rel="noreferrer"
              className="group flex h-full min-h-[280px] w-full flex-col items-center justify-center gap-3 rounded-[2px] border border-dashed border-accent/40 p-7 text-center transition-colors hover:border-accent hover:bg-paper"
            >
              <span className="grid h-12 w-12 place-items-center rounded-[2px] bg-tint-deep text-accent">
                <GithubIcon size={22} />
              </span>
              <span className="text-lg font-semibold text-ink font-display">More on GitHub</span>
              <span className="text-sm text-muted">Daily builds, notebooks, and everything in progress</span>
              <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-accent">
                github.com/phoebefu6 <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
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
