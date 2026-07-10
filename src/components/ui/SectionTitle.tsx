import { Reveal } from './Reveal'

interface SectionTitleProps {
  kicker: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  /** Ghost numeral rendered huge and faint behind the title, e.g. "01" */
  index?: string
}

export function SectionTitle({ kicker, title, subtitle, align = 'left', index }: SectionTitleProps) {
  const alignCls = align === 'center' ? 'text-center mx-auto' : ''
  return (
    <div className="relative isolate">
      {index && <span className="ghost-numeral" aria-hidden>{index}</span>}
      <Reveal className={`max-w-2xl mb-14 md:mb-20 ${alignCls}`}>
        <p className="kicker mb-4">{kicker}</p>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-ink leading-[1.1]">
          {title}
        </h2>
        {subtitle && <p className="mt-5 text-base md:text-lg text-muted leading-relaxed">{subtitle}</p>}
      </Reveal>
    </div>
  )
}
