export type ProjectStatus = 'Live' | 'Beta' | 'Research' | 'Internal' | 'Open Source'

export interface Project {
  id: string
  name: string
  tagline: string
  description: string
  status: ProjectStatus
  tech: string[]
  icon: string
  /** Peach accent bar instead of plum - reserved for the course-series anchor card */
  peach?: boolean
  link?: string
  repo: string
  detail: string
}

export interface Course {
  id: string
  rank: number
  name: string
  tag: string
  blurb: string
  link: string
  repo: string
}

export interface PlaygroundItem {
  id: string
  name: string
  blurb: string
  icon: string
  link: string
  repo: string
}

// Grounded in the repos actually published at github.com/phoebefu6

/** Tier 1 - flagship cards */
export const projects: Project[] = [
  {
    id: 'phoebe-the-builder',
    name: 'One Data Platform',
    tagline: 'A new mini AI product every day, converging into one platform',
    description:
      'The daily build log: data infrastructure tools, AI utilities, and analytics products shipped one per day, all converging into One Data Platform - one governed home for the whole data team.',
    status: 'Live',
    tech: ['Python', 'Jupyter', 'GitHub Pages', 'Claude Code'],
    icon: 'Layers',
    link: 'https://phoebefu6.github.io/phoebe-the-builder/',
    repo: 'https://github.com/phoebefu6/phoebe-the-builder',
    detail:
      '## The idea\n\nI see problems as opportunities. I build solutions to solve them. I ship products - one mini AI product every day, each solving a real data-team problem.\n\n## What is inside\n\n- A data infrastructure toolkit: CSV-to-PostgreSQL loader, schema diff tool, API-to-warehouse connector, data freshness monitor, PII detector and masker, ERD generator, dbt model generator, data lineage visualizer, and more\n- A live homepage listing every build with links to its code and notebook\n- A wiki walking through the design thinking\n\n## Where it is going\n\nThe builds converge into One Data Platform - one governed front door for a DA/DE/DS/AI team, built on open-source foundations instead of rebuilding a lakehouse.',
  },
  {
    id: 'learn-with-phoebe',
    name: 'Learn with Phoebe',
    tagline: '12 live courses, one series',
    description:
      'The full course library - AI, data, strategy, and builder tools, each taught as a hands-on session series and published live on GitHub Pages. Anchors the course grid below.',
    status: 'Live',
    tech: ['12 courses', 'HTML', 'GitHub Pages'],
    icon: 'GraduationCap',
    peach: true,
    repo: 'https://github.com/phoebefu6?tab=repositories&q=learn-&type=source',
    detail:
      '## One series, twelve courses\n\nEvery course follows the same format: focused sessions, hands-on exercises, a live site anyone can open - built in public, taught for real teams.\n\n## The library\n\n- **AI tooling** - Learn Claude, Learn Codex\n- **Data & AI culture** - Data Literacy, AI Literacy\n- **Thinking & delivery** - Strategic Thinking, Tech Project PMO\n- **Governance** - Data Governance (DPO track)\n- **Builder tools** - GitHub, GitHub for Builders, Markdown, Mermaid, HTML\n\n## Why\n\nTeams do not need another content library. They need courses short enough to finish and practical enough to change how they work on Monday.',
  },
  {
    id: 'design-dashboard-with-phoebe',
    name: 'Design Dashboard with Phoebe',
    tagline: 'Industry-focused dashboard design projects',
    description:
      'A collection of dashboard design projects by industry - executive views, analytics products, and visual design patterns for making data readable at a glance.',
    status: 'Live',
    tech: ['HTML', 'CSS', 'Charts', 'GitHub Pages'],
    icon: 'LayoutDashboard',
    link: 'https://phoebefu6.github.io/design-dashboard-with-phoebe/',
    repo: 'https://github.com/phoebefu6/design-dashboard-with-phoebe',
    detail:
      '## What it is\n\nDashboard design, treated as a craft: a growing collection of industry-focused dashboard projects, each one a complete working design.\n\n## The angle\n\n12 years of building executive dashboards taught me that most dashboards fail on design, not data. These projects work through the patterns that make numbers readable at a glance - hierarchy, encoding discipline, annotation, and restraint.',
  },
  {
    id: 'agent-skills-phoebe-picks',
    name: 'Agent Skills: Phoebe Picks',
    tagline: 'A curated, scored shortlist of agent-usable skills',
    description:
      'Reviews of agent skills as workflow packages for Claude Code, Codex, Cursor, and other coding agents - scored and shortlisted into the picks actually worth testing, keeping, or adapting.',
    status: 'Live',
    tech: ['JavaScript', 'GitHub Pages', 'Claude skills', 'Codex'],
    icon: 'Star',
    link: 'https://phoebefu6.github.io/agent-skills-phoebe-picks/',
    repo: 'https://github.com/phoebefu6/agent-skills-phoebe-picks',
    detail:
      '## What it is\n\nNot a human learning directory - a review of skills as **agent workflow packages**: reusable instructions, guardrails, scripts, and validation routines that help a coding agent produce real artifacts.\n\n## The scoring layer\n\nThe broad awesome-claude-skills corpus gets filtered into **Phoebe Picks**: the skills worth actually testing, keeping, or adapting into a working agent library.\n\n## Why\n\nThe skills ecosystem is exploding and unvetted. Someone has to try them for real.',
  },
]

/** Tier 2 - the Learn with Phoebe course library, ranked by readiness and depth */
export const courses: Course[] = [
  {
    id: 'learn-claude-with-phoebe',
    rank: 1,
    name: 'Learn Claude',
    tag: 'AI tooling',
    blurb: '6-session onboarding series',
    link: 'https://phoebefu6.github.io/learn-claude-with-phoebe/',
    repo: 'https://github.com/phoebefu6/learn-claude-with-phoebe',
  },
  {
    id: 'learn-data-literacy-with-phoebe',
    rank: 2,
    name: 'Data Literacy',
    tag: 'Data culture',
    blurb: 'Executive data course',
    link: 'https://phoebefu6.github.io/learn-data-literacy-with-phoebe/',
    repo: 'https://github.com/phoebefu6/learn-data-literacy-with-phoebe',
  },
  {
    id: 'learn-ai-literacy-with-phoebe',
    rank: 3,
    name: 'AI Literacy',
    tag: 'AI culture',
    blurb: 'Sequel for AI concepts',
    link: 'https://phoebefu6.github.io/learn-ai-literacy-with-phoebe/',
    repo: 'https://github.com/phoebefu6/learn-ai-literacy-with-phoebe',
  },
  {
    id: 'learn-strategic-thinking-with-phoebe',
    rank: 4,
    name: 'Strategic Thinking',
    tag: 'Thinking',
    blurb: '8 frameworks sessions',
    link: 'https://phoebefu6.github.io/learn-strategic-thinking-with-phoebe/',
    repo: 'https://github.com/phoebefu6/learn-strategic-thinking-with-phoebe',
  },
  {
    id: 'learn-tech-project-pmo-with-phoebe',
    rank: 5,
    name: 'Tech Project PMO',
    tag: 'Delivery',
    blurb: 'Run a platform build',
    link: 'https://phoebefu6.github.io/learn-tech-project-pmo-with-phoebe/',
    repo: 'https://github.com/phoebefu6/learn-tech-project-pmo-with-phoebe',
  },
  {
    id: 'learn-data-governance-with-phoebe',
    rank: 6,
    name: 'Data Governance',
    tag: 'Governance',
    blurb: '8-session DPO track',
    link: 'https://phoebefu6.github.io/learn-data-governance-with-phoebe/',
    repo: 'https://github.com/phoebefu6/learn-data-governance-with-phoebe',
  },
  {
    id: 'learn-codex-with-phoebe',
    rank: 7,
    name: 'Learn Codex',
    tag: 'AI tooling',
    blurb: 'Build a site with Codex',
    link: 'https://phoebefu6.github.io/learn-codex-with-phoebe/',
    repo: 'https://github.com/phoebefu6/learn-codex-with-phoebe',
  },
  {
    id: 'learn-github-with-phoebe',
    rank: 8,
    name: 'GitHub',
    tag: 'Builder tools',
    blurb: 'For non-tech teams',
    link: 'https://phoebefu6.github.io/learn-github-with-phoebe/',
    repo: 'https://github.com/phoebefu6/learn-github-with-phoebe',
  },
  {
    id: 'learn-github-for-builders-with-phoebe',
    rank: 9,
    name: 'GitHub for Builders',
    tag: 'Builder tools',
    blurb: 'Terminal + PR workflow',
    link: 'https://phoebefu6.github.io/learn-github-for-builders-with-phoebe/',
    repo: 'https://github.com/phoebefu6/learn-github-for-builders-with-phoebe',
  },
  {
    id: 'learn-markdown-with-phoebe',
    rank: 10,
    name: 'Markdown',
    tag: 'Builder tools',
    blurb: 'Beginner writing course',
    link: 'https://phoebefu6.github.io/learn-markdown-with-phoebe/',
    repo: 'https://github.com/phoebefu6/learn-markdown-with-phoebe',
  },
  {
    id: 'learn-mermaid-with-phoebe',
    rank: 11,
    name: 'Mermaid',
    tag: 'Builder tools',
    blurb: 'Live-rendered diagrams',
    link: 'https://phoebefu6.github.io/learn-mermaid-with-phoebe/',
    repo: 'https://github.com/phoebefu6/learn-mermaid-with-phoebe',
  },
  {
    id: 'learn-html-with-phoebe',
    rank: 12,
    name: 'HTML',
    tag: 'Builder tools',
    blurb: 'Editable playgrounds',
    link: 'https://phoebefu6.github.io/learn-html-with-phoebe/',
    repo: 'https://github.com/phoebefu6/learn-html-with-phoebe',
  },
]

/** Tier 3 - playground */
export const playground: PlaygroundItem[] = [
  {
    id: 'sketch-ideas-with-phoebe',
    name: 'Worth a Thousand Words',
    blurb: 'Data and AI, explained in pictures - daily AI-art gallery',
    icon: 'Palette',
    link: 'https://phoebefu6.github.io/sketch-ideas-with-phoebe/',
    repo: 'https://github.com/phoebefu6/sketch-ideas-with-phoebe',
  },
  {
    id: 'play-game-with-phoebe',
    name: 'Play Game with Phoebe',
    blurb: 'Browser game hub, built with AI coding tools',
    icon: 'Gamepad2',
    link: 'https://phoebefu6.github.io/play-game-with-phoebe/',
    repo: 'https://github.com/phoebefu6/play-game-with-phoebe',
  },
]
