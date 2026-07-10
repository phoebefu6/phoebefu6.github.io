export interface WriteSeries {
  id: string
  day: string
  name: string
  summary: string
  format: string
  topics: string[]
}

// The three weekly LinkedIn series
export const writeSeries: WriteSeries[] = [
  {
    id: 'ai-in-the-wild',
    day: 'Monday',
    name: 'AI in the Wild',
    summary:
      'One real enterprise AI deployment decoded every Monday - shipped, measured, no vendor demos.',
    format: 'One-page system card',
    topics: ['Real deployments', 'Measurable outcomes', 'What made it work'],
  },
  {
    id: 'data-decode',
    day: 'Wednesday',
    name: 'Data Decode',
    summary:
      'One data concept decoded every Wednesday - explained the way practitioners actually use it.',
    format: 'Visual carousel',
    topics: ['Metrics & KPIs', 'Data concepts', 'Plain-language explainers'],
  },
  {
    id: 'cdaio-friday',
    day: 'Friday',
    name: 'CDAIO Friday',
    summary:
      'Data and AI leadership lessons every Friday - workplace stories turned into operating principles.',
    format: 'Story + one illustration',
    topics: ['Leadership', 'AI adoption', 'Building data teams'],
  },
]
