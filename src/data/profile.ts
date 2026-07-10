export const profile = {
  name: 'Phoebe Fu',
  fullName: 'Phoebe Fu',
  role: 'Data & AI Leader · Builder · Fractional CDAIO',
  tagline: 'I turn data and AI into products, teams, and decisions that ship.',
  intro:
    'Head of Data Science & Applied AI at Centience. 12 years building and scaling data and AI teams across ecommerce, healthcare, banking, consulting, and retail. Certified Chief Data, Analytics and AI Officer (NUS, Full Marks). I design data and AI strategy end to end - then I open the editor and build it.',
  philosophy:
    'Strategy decks do not move metrics. Working systems do.',
  location: 'Singapore',
  socials: {
    linkedin: 'https://www.linkedin.com/in/phoebe-fu-50168895',
    github: 'https://github.com/phoebefu6',
  },
  expertise: [
    'Enterprise Data & AI Strategy',
    'AI Operating Models',
    'Data Governance & Responsible AI',
    'Search & Recommendation Systems',
    'Experimentation & A/B Testing',
    'KPI Systems & Data Products',
    'Team Building (0 to 30+)',
    'AI & Data Literacy Training',
  ],
}

export interface Stat {
  label: string
  value: number
  suffix: string
}

export const stats: Stat[] = [
  { label: 'Years in data & AI', value: 12, suffix: '+' },
  { label: 'Largest team scaled', value: 30, suffix: '+' },
  { label: 'Industries served', value: 7, suffix: '' },
  { label: 'Data products launched', value: 25, suffix: '+' },
  { label: 'Trainings delivered', value: 20, suffix: '+' },
  { label: 'Products live on GitHub', value: 9, suffix: '' },
]

export const education = [
  {
    degree: 'Chief Data, Analytics and AI Officer, Executive Program',
    school: 'National University of Singapore',
    year: '2025',
    note: 'Full Marks',
  },
  {
    degree: "Data Science & Engineering, Master's Degree",
    school: 'Singapore Management University',
    year: '2014',
    note: 'High Merit Award',
  },
]

export const certifications = [
  'Google Cloud Certified, Generative AI Leader (2026)',
  'IBM Data Science Professional Certificate (2022)',
  'Google Data Analytics Certificate',
  'Data Governance in the Age of Big Data, GST',
  'Excellent Service Award, Bank of China',
]
