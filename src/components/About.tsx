import { SectionTitle } from './ui/SectionTitle'
import { Reveal, Stagger, StaggerItem } from './ui/Reveal'
import { Counter } from './ui/Counter'
import { profile, stats, education, certifications } from '../data/profile'
import { experience } from '../data/experience'
import { GraduationCap, Award } from 'lucide-react'

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-[1700px] px-6 lg:px-12">
        <SectionTitle
          kicker="About"
          index="01"
          title="An executive who still opens the editor"
          subtitle={profile.philosophy}
        />

        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr]">
          {/* Left: portrait + expertise - sticks while the timeline scrolls */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              {/* Portrait - /profile-photo.jpg in public/; PF monogram shows until it exists */}
              <div className="relative mx-auto lg:mx-0 aspect-[4/5] max-w-sm overflow-hidden rounded-[2px] border border-line bg-tint">
                <div className="absolute inset-0 grid place-items-center">
                  <span className="text-[140px] font-bold text-accent/10 select-none">PF</span>
                </div>
                <img
                  src="/profile-photo.jpg"
                  alt="Phoebe Fu"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
                <div className="accent-rule absolute top-0 inset-x-0 z-10" aria-hidden />
                <div className="absolute bottom-0 inset-x-0 border-t border-line bg-paper p-6">
                  <p className="text-lg font-semibold text-ink">{profile.fullName}</p>
                  <p className="text-sm text-muted">{profile.role}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="mt-10">
              <h3 className="kicker mb-4 !text-faint">Areas of expertise</h3>
              <div className="flex flex-wrap gap-2">
                {profile.expertise.map((e) => (
                  <span
                    key={e}
                    className="rounded-[2px] bg-tint-deep px-3 py-1.5 text-[13px] font-medium text-accent-deep"
                  >
                    {e}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2} className="mt-10 space-y-4">
              {education.map((ed) => (
                <div key={ed.degree} className="flex gap-3">
                  <GraduationCap size={18} className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <p className="text-sm font-medium text-ink">{ed.degree}</p>
                    <p className="text-[13px] text-muted">
                      {ed.school} · {ed.year} · <span className="peach-mark font-semibold text-ink">{ed.note}</span>
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex gap-3">
                <Award size={18} className="mt-0.5 shrink-0 text-accent" />
                <p className="text-[13px] text-muted leading-relaxed">{certifications.join(' · ')}</p>
              </div>
            </Reveal>
          </div>

          {/* Right: stats + timeline */}
          <div>
            <Stagger className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {stats.map((s) => (
                <StaggerItem key={s.label}>
                  <div className="card relative p-6">
                    <div className="accent-rule absolute top-0 inset-x-0" aria-hidden />
                    <p className="text-4xl md:text-5xl font-semibold tracking-tight text-accent font-display">
                      <Counter value={s.value} suffix={s.suffix} />
                    </p>
                    <p className="mt-2 text-[13px] text-muted">{s.label}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            {/* Timeline */}
            <div className="mt-16 relative">
              <h3 className="kicker mb-8 !text-faint">Experience</h3>
              <div className="absolute left-[7px] top-16 bottom-4 w-px bg-line" aria-hidden />
              <div className="space-y-10">
                {experience.map((job, i) => (
                  <Reveal key={job.company} delay={i * 0.05}>
                    <div className="relative pl-10">
                      <span className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-accent bg-paper" />
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h4 className="text-lg font-semibold text-ink">{job.company}</h4>
                        <span className="text-[13px] text-faint tabular-nums">{job.period}</span>
                      </div>
                      <p className="text-sm text-accent font-medium mt-0.5">{job.role}</p>
                      <ul className="mt-3 space-y-1.5">
                        {job.highlights.map((h) => (
                          <li key={h} className="text-sm text-muted leading-relaxed flex gap-2">
                            <span className="text-accent/70 mt-[7px] h-1 w-1 shrink-0 rounded-full bg-current" />
                            {h}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {job.tools.map((t) => (
                          <span key={t} className="rounded-[2px] bg-tint px-2 py-0.5 text-[11px] text-muted">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
