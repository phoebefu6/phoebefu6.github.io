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

/**
 * Tier 1 - flagship cards.
 * This set and its order mirror Phoebe's GitHub home page (pinned repos + the
 * "Start anywhere" table in github.com/phoebefu6). Keep the two in sync: if a
 * repo is unpinned there, it leaves here too.
 */
export const projects: Project[] = [
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
    id: 'agent-skills-phoebe-picks',
    name: 'Agent Skills: Phoebe Picks',
    tagline: 'Skill teardowns, field-tested by shipping with each one',
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
  {
    id: 'phoebe-data-skills',
    name: "Phoebe's Data Skills",
    tagline: 'Data skills you can install, not just read',
    description:
      'Claude skills that run the real analysis on your own schema instead of a tutorial you read. One retail platform is carried across the full stack - raw dump to lake to warehouse to marts to scorecard to agent - with every chart from a reproducible run.',
    status: 'Live',
    tech: ['Python', 'DuckDB', 'Claude skills', 'GitHub Pages'],
    icon: 'PackageCheck',
    link: 'https://phoebefu6.github.io/phoebe-data-skills/',
    repo: 'https://github.com/phoebefu6/phoebe-data-skills',
    detail:
      '## What it is\n\nInstallable skills, not readable tutorials. Each one hands Claude a schema and a decision question, then runs the same six steps on real rows: input, sample data, objective, find-skills, code and charts, expert review.\n\n## One platform, four layers\n\nEverything runs on Everrest, a fictional B2B2C retail platform, so the layers stack instead of scattering:\n\n- **Infrastructure** - raw dump to a queryable DuckDB star schema with a data contract, plus a schema-diff audit across a nine-server estate\n- **Data analytics** - decision-first EDA, a board scorecard where nothing is hand-typed, and a real fail-fix-pass data-quality gate\n- **Data science** - a Codex-assembled forensic toolbox, RFM segmentation, and a sales forecast with honest backtests and a costed buy\n- **Gen AI** - a grounded agent on the warehouse, shown getting it wrong and then self-correcting\n\n## Why it is different\n\nThe sample data has defects planted on purpose, so the analysis can be graded on whether it caught them. Version one of each analysis is kept with its real flaws; reviewer lenses tear it apart and version two applies the fixes, with the before and after on the page.',
  },
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
    id: 'sketch-ideas-with-phoebe',
    name: 'Worth a Thousand Words',
    tagline: 'Data and AI, explained in pictures',
    description:
      'A gallery of visual explainers: the ideas that blur in meetings - tokens, guardrails, averages, forecasts - designed until they land in two seconds. Every prompt is published, so anyone can check the work or copy it.',
    status: 'Live',
    tech: ['Python', 'HTML', 'Midjourney', 'GitHub Pages'],
    icon: 'Palette',
    link: 'https://phoebefu6.github.io/sketch-ideas-with-phoebe/',
    repo: 'https://github.com/phoebefu6/sketch-ideas-with-phoebe',
    detail:
      '## The rule\n\nIf it takes a paragraph, it is not designed yet. Every mark has one meaning.\n\n## What is on the wall\n\nOne folder per work, each with the original image, its metadata, the idea behind it, and a case-study page on how it was made. Formats range across infographics, data portraits, concept maps, posters, cheatsheets and illustration, filterable by topic, style and tool.\n\n## Why publish the prompts\n\nAn explainer that cannot be checked is decoration. The recipe ships with the image - the prompt, the tool, and the reasoning - so the work is reproducible and arguable.',
  },
]

/** The course shelf hub - front door to every live course */
export const courseHubLink = 'https://phoebefu6.github.io/learn-with-phoebe/'
