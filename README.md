# Phoebe Fu - Personal Product & Ideas Website

Premium dark-theme founder site: products, ideas, services, research, case studies, speaking, gallery, and contact - built from the CDAIO resume narrative.

## Stack

- React 19 + Vite 6 + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`, tokens in `src/index.css` `@theme`)
- Framer Motion (scroll reveals, counters, modals, carousel)
- Lucide icons (v1 - brand icons removed upstream, see `src/components/ui/BrandIcons.tsx`)
- react-markdown (product/idea/article detail content)

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
```

Note: requires Node 22.x. Vite is pinned to v6 because the local Node (22.6, anaconda) is below Vite 7+/rolldown's 22.12 floor.

## Sections

About · Products · Services · Writes · Contact. Every product links to a real repo at github.com/phoebefu6; the Writes section covers the three weekly LinkedIn series (Monday AI in the Wild, Wednesday Data Decode, Friday CDAIO).

## Content lives in data files - no component edits needed

| File | Section |
|------|---------|
| `src/data/profile.ts` | Hero intro, stats, expertise, education, socials (LinkedIn + GitHub only) |
| `src/data/experience.ts` | About timeline |
| `src/data/projects.ts` | Featured Products - grounded in the published GitHub repos |
| `src/data/services.ts` | Services (outcomes, process - no pricing, friendly CTA) |
| `src/data/writes.ts` | The three weekly LinkedIn series |

## Before going live

1. Add a real `og-image.png` to `public/`
2. Point the contact form at a form endpoint (currently mailto fallback)
3. Update `sitemap.xml` / OG URLs to the real domain

## Design system

Plum and peach outfit from Phoebe's design.md constitution (flat magazine on white): paper `#FFFFFF`, deep ink `#2A1B3D`, plum accent `#9333EA`, lavender tints `#FAF5FF`/`#F3E8FF`, peach win-light `#FDBA74` (once or twice per view), hairlines `#EAE8F0`. Poppins headlines + Inter body, sharp 2px corners, no shadows/gradients/glass, signature 4px accent rules, 1700px max content width.
