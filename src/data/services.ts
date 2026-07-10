export interface Service {
  id: string
  name: string
  icon: string
  overview: string
  outcomes: string[]
  process: string[]
}

export const services: Service[] = [
  {
    id: 'fractional-cdaio',
    name: 'Fractional CDAIO',
    icon: 'Crown',
    overview:
      'CDAIO-level leadership without the full-time hire. I own your data and AI agenda 2-4 days a month: strategy, governance, team design, and board reporting.',
    outcomes: [
      'A data and AI strategy the board actually funds',
      'Governance foundations that survive audits',
      'A hiring plan and operating model for your data team',
    ],
    process: ['90-day diagnostic', 'Operating model design', 'Monthly leadership cadence', 'Quarterly board readout'],
  },
  {
    id: 'ai-strategy',
    name: 'AI Strategy & Roadmap',
    icon: 'Compass',
    overview:
      'From AI ambition to a sequenced roadmap: use-case triage, build-vs-buy calls, and an adoption plan grounded in what your data can actually support today.',
    outcomes: [
      'Prioritized AI use-case portfolio with ROI logic',
      'A realistic 12-month delivery sequence',
      'Clear build, buy, or wait decisions',
    ],
    process: ['Discovery interviews', 'Data readiness assessment', 'Use-case scoring workshop', 'Roadmap and investment case'],
  },
  {
    id: 'data-strategy',
    name: 'Data Strategy & Governance',
    icon: 'Database',
    overview:
      'The foundations under every AI ambition: data quality, event tracking standards, dictionary, lineage, and metadata - designed as workflow defaults, not policy documents.',
    outcomes: [
      'Governance standards embedded in delivery',
      'A data product catalog with clear ownership',
      'Trustable KPIs executives stop debating',
    ],
    process: ['Current-state audit', 'Standards design', 'Tooling selection', 'Rollout with the delivery team'],
  },
  {
    id: 'analytics-transformation',
    name: 'Analytics Transformation',
    icon: 'TrendingUp',
    overview:
      'Turn a reporting team into a decision engine: KPI systems, experimentation programs, self-serve data products, and the delivery routines that make it stick.',
    outcomes: [
      'A KPI tree connected to business drivers',
      'An experimentation program with real velocity',
      'Analytics routines executives attend',
    ],
    process: ['Operating model assessment', 'KPI system design', 'Experimentation setup', 'Team coaching'],
  },
  {
    id: 'executive-workshops',
    name: 'Executive AI Workshops',
    icon: 'Presentation',
    overview:
      'Half-day to two-day sessions for boards and leadership teams: what AI can and cannot do for your business, how to govern it, and how to evaluate vendor claims.',
    outcomes: [
      'A leadership team with shared AI vocabulary',
      'A governance and risk posture you can state publicly',
      'Confidence to challenge vendor promises',
    ],
    process: ['Pre-workshop diagnostic', 'Tailored session design', 'Facilitated workshop', 'Action plan handoff'],
  },
  {
    id: 'ai-training',
    name: 'AI & Data Literacy Training',
    icon: 'GraduationCap',
    overview:
      'Hands-on programs for managers and practitioners: from evaluating AI use cases to building with Claude, Python, and modern data tooling. Delivered for internal and external organizations.',
    outcomes: [
      'Teams that use AI tools daily, not once',
      'Analysts who prototype instead of spec',
      'A common quality bar for AI-assisted work',
    ],
    process: ['Skills assessment', 'Curriculum tailoring', 'Cohort delivery', 'Follow-up labs'],
  },
  {
    id: 'product-consulting',
    name: 'Data Product Consulting',
    icon: 'Box',
    overview:
      'Design and ship data products that get adopted: recommendation systems, customer intelligence engines, executive dashboards, and the tracking foundations under them.',
    outcomes: [
      'A shipped data product with real users',
      'Reusable patterns your team can extend',
      'Adoption metrics, not just delivery metrics',
    ],
    process: ['Problem framing', 'Solution design', 'Build with your team', 'Adoption review'],
  },
  {
    id: 'architecture-review',
    name: 'Architecture Review',
    icon: 'Blocks',
    overview:
      'An independent read on your data and AI architecture: what is over-engineered, what is fragile, and where open-source foundations beat platform lock-in.',
    outcomes: [
      'A ranked list of architectural risks',
      'Cost reduction opportunities identified',
      'A pragmatic modernization sequence',
    ],
    process: ['Architecture walkthrough', 'Cost and risk analysis', 'Recommendations report', 'Follow-up session'],
  },
]
