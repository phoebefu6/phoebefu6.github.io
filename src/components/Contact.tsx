import { useState } from 'react'
import type { FormEvent } from 'react'
import { Mail, Send, Check } from 'lucide-react'
import { SectionTitle } from './ui/SectionTitle'
import { Reveal } from './ui/Reveal'
import { GithubIcon, LinkedinIcon } from './ui/BrandIcons'
import { profile } from '../data/profile'

const channels = [
  { label: 'Email', href: `mailto:${profile.email}`, icon: Mail, value: profile.email },
  { label: 'LinkedIn', href: profile.socials.linkedin, icon: LinkedinIcon, value: 'phoebe-fu' },
  { label: 'GitHub', href: profile.socials.github, icon: GithubIcon, value: 'phoebefu6' },
]

export function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const subject = encodeURIComponent(`Website enquiry from ${data.get('name')}`)
    const body = encodeURIComponent(`${data.get('message')}\n\nFrom: ${data.get('name')} <${data.get('email')}>`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section id="contact" className="relative bg-tint py-28 md:py-40">
      <div className="accent-rule absolute top-0 inset-x-0" aria-hidden />
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <SectionTitle
          kicker="Contact"
          title="Let's build something that ships"
          subtitle="A fractional engagement, a workshop, or an idea worth debating - it starts with a conversation."
          align="center"
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Channels */}
          <Reveal>
            <div className="grid grid-cols-1 gap-4">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                  className="card group flex items-center gap-4 p-5"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[2px] bg-tint-deep text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                    <c.icon size={18} />
                  </span>
                  <span className="min-w-0">
                    <p className="text-sm font-semibold text-ink">{c.label}</p>
                    <p className="truncate text-[13px] text-muted">{c.value}</p>
                  </span>
                </a>
              ))}
            </div>
            <p className="mt-8 text-sm text-muted leading-relaxed">
              Based in {profile.location}. Working with teams regionally and remotely across
              ecommerce, healthcare, financial services, and consulting.
            </p>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.15}>
            <form onSubmit={handleSubmit} className="card relative p-8 space-y-5">
              <div className="accent-rule absolute top-0 inset-x-0" aria-hidden />
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-[13px] font-medium text-muted">Name</span>
                  <input
                    name="name"
                    required
                    className="w-full rounded-[2px] border border-line bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-faint outline-none focus:border-accent transition-colors"
                    placeholder="Your name"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[13px] font-medium text-muted">Email</span>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-[2px] border border-line bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-faint outline-none focus:border-accent transition-colors"
                    placeholder="you@company.com"
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-1.5 block text-[13px] font-medium text-muted">Message</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full resize-none rounded-[2px] border border-line bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-faint outline-none focus:border-accent transition-colors"
                  placeholder="What are you building, and where are you stuck?"
                />
              </label>
              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-[2px] bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
              >
                {sent ? (
                  <>
                    <Check size={15} /> Opening your mail client...
                  </>
                ) : (
                  <>
                    Send message
                    <Send size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
              <p className="text-[12px] text-faint text-center">
                This form opens your email client. A hosted form endpoint can be plugged in later.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
