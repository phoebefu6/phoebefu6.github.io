import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { id: 'about', label: 'About' },
  { id: 'products', label: 'Products' },
  { id: 'services', label: 'Services' },
  { id: 'writes', label: 'Writes' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    for (const l of links) {
      const el = document.getElementById(l.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[80] bg-paper transition-all duration-300 ${
        scrolled ? 'border-b border-line py-3' : 'py-5'
      }`}
    >
      <nav className="mx-auto flex max-w-[1700px] items-center justify-between px-6 lg:px-12">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="grid h-8 w-8 place-items-center rounded-[2px] bg-accent text-[13px] font-bold text-white">
            PF
          </span>
          <span className="text-sm font-semibold tracking-tight text-ink group-hover:text-accent transition-colors">
            Phoebe Fu
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`relative px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                active === l.id ? 'text-accent' : 'text-muted hover:text-ink'
              }`}
            >
              {active === l.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-3 bottom-0 h-[2px] bg-accent"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{l.label}</span>
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden lg:inline-flex items-center rounded-[2px] bg-accent px-4 py-1.5 text-[13px] font-semibold text-white hover:bg-accent-deep transition-colors"
        >
          Book a call
        </a>

        {/* Mobile toggle */}
        <button
          className="lg:hidden rounded-[2px] border border-line p-2 text-ink"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-paper border-b border-line"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {links.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium text-muted hover:text-accent hover:bg-tint transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
