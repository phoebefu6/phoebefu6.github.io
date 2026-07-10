import { ArrowUpRight } from 'lucide-react'
import { SectionTitle } from './ui/SectionTitle'
import { Reveal } from './ui/Reveal'
import { GithubIcon, LinkedinIcon } from './ui/BrandIcons'
import { profile } from '../data/profile'

const channels = [
  {
    label: 'LinkedIn',
    href: profile.socials.linkedin,
    icon: LinkedinIcon,
    value: 'phoebe-fu',
    note: 'Three series a week, and where every conversation starts - send a connection or a DM.',
  },
  {
    label: 'GitHub',
    href: profile.socials.github,
    icon: GithubIcon,
    value: 'phoebefu6',
    note: 'The daily build log - every product on this page lives here, in the open.',
  },
]

export function Contact() {
  return (
    <section id="contact" className="relative bg-tint py-28 md:py-40">
      <div className="accent-rule absolute top-0 inset-x-0" aria-hidden />
      <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
        <SectionTitle
          kicker="Contact"
          title="Let's build something that ships"
          subtitle="A fractional engagement, a workshop, or an idea worth debating - it starts with a conversation."
          align="center"
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.1}>
              <a
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="card group relative flex h-full flex-col items-center p-10 text-center"
              >
                <div className="accent-rule absolute top-0 inset-x-0 transition-all group-hover:h-1.5" aria-hidden />
                <span className="grid h-14 w-14 place-items-center rounded-[2px] bg-tint-deep text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                  <c.icon size={26} />
                </span>
                <p className="mt-5 text-xl font-semibold text-ink font-display">{c.label}</p>
                <p className="mt-1 text-sm font-medium text-accent">{c.value}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{c.note}</p>
                <span className="mt-6 inline-flex items-center gap-1 border-t border-line pt-4 text-[13px] font-semibold text-accent">
                  Say hello <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-sm text-muted">
            Based in {profile.location}. Working with teams regionally and remotely across
            ecommerce, healthcare, financial services, and consulting.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
