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

export interface CourseShelf {
  id: string
  name: string
  /** number of live, verified course sites on this shelf */
  liveCount: number
  samples: string
  icon: string
}

// Grounded in the repos actually published at github.com/phoebefu6

/** Tier 2 - the Learn with Phoebe course library, grouped into shelves (live counts only) */
export const shelves: CourseShelf[] = [
  {
    id: 'data-analytics-engineering',
    name: 'Data, Analytics & Engineering',
    liveCount: 16,
    samples: 'SQL, warehouse, dbt, BI, pipelines',
    icon: 'Database',
  },
  {
    id: 'ai-engineering-llms',
    name: 'AI Engineering & LLMs',
    liveCount: 23,
    samples: 'Claude, RAG, agents, evals, MCP',
    icon: 'Cpu',
  },
  {
    id: 'ai-by-business-domain',
    name: 'AI by Business Domain',
    liveCount: 18,
    samples: 'Finance, marketing, law, leadership',
    icon: 'Briefcase',
  },
  {
    id: 'data-science-ml',
    name: 'Data Science & Machine Learning',
    liveCount: 10,
    samples: 'Stats, ML, forecasting, anomaly',
    icon: 'LineChart',
  },
  {
    id: 'data-ai-governance',
    name: 'Data & AI Governance',
    liveCount: 5,
    samples: 'GDPR, PDPA, EU AI Act, DPO',
    icon: 'ShieldCheck',
  },
  {
    id: 'builder-tools-docs',
    name: 'Builder Tools & Docs',
    liveCount: 9,
    samples: 'GitHub, HTML, diagrams, data viz',
    icon: 'Wrench',
  },
  {
    id: 'leadership-business',
    name: 'Leadership & Business',
    liveCount: 9,
    samples: 'Strategy, PMO, communication, design',
    icon: 'Compass',
  },
]

/** Single source of truth for the live-course total - every count on the page derives from it */
export const liveCourseTotal = shelves.reduce((n, s) => n + s.liveCount, 0)

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
    tagline: `${liveCourseTotal} live courses, one series`,
    description:
      'The full course library - data engineering, data science, AI engineering, governance, applied AI, and builder tools, each taught as a hands-on session series and published live on GitHub Pages. Anchors the shelf grid below.',
    status: 'Live',
    tech: [`${liveCourseTotal} courses`, 'HTML', 'GitHub Pages'],
    icon: 'GraduationCap',
    peach: true,
    link: 'https://phoebefu6.github.io/learn-with-phoebe/',
    repo: 'https://github.com/phoebefu6/learn-with-phoebe',
    detail:
      `## One series, ${liveCourseTotal} live courses\n\nEvery course follows the same format: focused sessions, hands-on exercises, a live site anyone can open - built in public, taught for real teams. The course shelf is the front door to all of them.\n\n## The shelves\n\n- **Data, Analytics & Engineering** - SQL, warehouse, dbt, BI, pipelines\n- **AI Engineering & LLMs** - Claude, prompting, RAG, evals, agents, MCP\n- **AI by Business Domain** - finance, marketing, law, leadership, content\n- **Data Science & Machine Learning** - stats, ML, forecasting, anomaly detection\n- **Data & AI Governance** - GDPR, PDPA, the EU AI Act, the DPO track\n- **Builder Tools & Docs** - GitHub, HTML, markdown, diagrams, data visualization\n- **Leadership & Business** - strategic thinking, PMO, communication, system and product design\n\n## Why\n\nTeams do not need another content library. They need courses short enough to finish and practical enough to change how they work on Monday.`,
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


/** The course shelf hub - front door to every live course */
export const courseHubLink = 'https://phoebefu6.github.io/learn-with-phoebe/'
