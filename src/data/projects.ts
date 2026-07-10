export type ProjectStatus = 'Live' | 'Beta' | 'Research' | 'Internal' | 'Open Source'

export interface Project {
  id: string
  name: string
  tagline: string
  description: string
  status: ProjectStatus
  tech: string[]
  icon: string
  link?: string
  repo: string
  detail: string
}

// Grounded in the repos actually published at github.com/phoebefu6
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
    id: 'learn-claude-with-phoebe',
    name: 'Learn Claude with Phoebe',
    tagline: 'All 19 official Anthropic courses, distilled into 6 live sessions',
    description:
      'A 6-session Claude onboarding series for data science, marketing, and C-level teams - every official Anthropic course distilled into 45-minute live sessions with demos.',
    status: 'Live',
    tech: ['Claude', 'HTML', 'GitHub Pages', 'Anthropic courses'],
    icon: 'GraduationCap',
    link: 'https://phoebefu6.github.io/learn-claude-with-phoebe/',
    repo: 'https://github.com/phoebefu6/learn-claude-with-phoebe',
    detail:
      '## Why\n\nTeams do not need 19 courses. They need 6 focused sessions that fit into working weeks.\n\n## The format\n\n- 6 sessions, 45 minutes each, live with demos\n- Tracks tailored for data science and AI teams, marketing teams, and C-level audiences\n- All 19 official Anthropic courses distilled into the parts that change how people work\n\n## Status\n\nThe course site is live on GitHub Pages and the series is actively taught.',
  },
  {
    id: 'digest-skills-with-phoebe',
    name: 'Digest Skills with Phoebe',
    tagline: 'Testing, rating, and publishing useful AI skills',
    description:
      'A skill digest that tests and rates AI skills across data, design, engineering, and daily life - every skill gets a rating out of 5, a consistent review subpage, and a tangible product artifact.',
    status: 'Live',
    tech: ['JavaScript', 'GitHub Pages', 'Claude skills'],
    icon: 'Star',
    link: 'https://phoebefu6.github.io/digest-skills-with-phoebe/',
    repo: 'https://github.com/phoebefu6/digest-skills-with-phoebe',
    detail:
      '## What it does\n\nA searchable homepage designed to scale to hundreds of skills, where every skill gets:\n\n- A rating out of 5\n- The official GitHub link and description\n- A tangible artifact or product outcome\n- Three ways the skill makes life easier\n- Three ways it could be improved\n\n## Why\n\nThe skill ecosystem is exploding and most lists are unvetted. This one is tested by hand, one skill at a time.',
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
    id: 'play-game-with-phoebe',
    name: 'Play Game with Phoebe',
    tagline: 'A browser game hub, built with AI coding tools',
    description:
      'A hub of browser games built with Codex - the playful side of AI-assisted building, where the same shipping discipline applies to things that exist purely for fun.',
    status: 'Live',
    tech: ['HTML', 'JavaScript', 'Codex', 'GitHub Pages'],
    icon: 'Gamepad2',
    link: 'https://phoebefu6.github.io/play-game-with-phoebe/',
    repo: 'https://github.com/phoebefu6/play-game-with-phoebe',
    detail:
      '## The playful side\n\nNot everything has to be a data platform. This is a hub of browser games built with AI coding tools - shipped with the same build-publish discipline as everything else.\n\n## Why it matters\n\nBuilding for fun is the fastest way to learn a tool honestly. Games are unforgiving: they either work and feel good, or they do not.',
  },
]
