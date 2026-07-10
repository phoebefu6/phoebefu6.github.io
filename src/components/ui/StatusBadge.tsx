/**
 * Square-cornered status chips. One hue (plum) - meaning comes from fill depth
 * + glyph, per design.md encoding rules. Peach is reserved for the flagship state.
 */
const statusStyles: Record<string, { cls: string; glyph: string }> = {
  Live: { cls: 'bg-accent text-white', glyph: '●' },
  Beta: { cls: 'bg-tint-deep text-accent-deep', glyph: '◐' },
  Research: { cls: 'border border-accent/50 text-accent-deep', glyph: '○' },
  Internal: { cls: 'border border-line text-muted', glyph: '–' },
  'Open Source': { cls: 'bg-peach text-ink', glyph: '★' },
  Concept: { cls: 'border border-line text-muted', glyph: '–' },
  Exploring: { cls: 'border border-accent/50 text-accent-deep', glyph: '○' },
  Prototyping: { cls: 'bg-tint-deep text-accent-deep', glyph: '◐' },
  Validated: { cls: 'bg-accent text-white', glyph: '●' },
}

export function StatusBadge({ status }: { status: string }) {
  const s = statusStyles[status] ?? statusStyles.Internal
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[2px] px-2.5 py-1 text-xs font-semibold ${s.cls}`}
    >
      <span aria-hidden className="text-[10px] leading-none">{s.glyph}</span>
      {status}
    </span>
  )
}
