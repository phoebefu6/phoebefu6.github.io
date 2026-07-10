import { profile } from '../data/profile'

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper py-10">
      <div className="mx-auto flex max-w-[1700px] flex-col items-center justify-between gap-4 px-6 lg:px-12 md:flex-row">
        <p className="text-[13px] text-faint">
          © {new Date().getFullYear()} {profile.fullName}. Built with React, Tailwind, and Claude Code.
        </p>
        <div className="flex gap-6 text-[13px] text-muted">
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
            LinkedIn
          </a>
          <a href={profile.socials.github} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
            GitHub
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-accent transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
