export interface Experience {
  company: string
  role: string
  period: string
  location: string
  highlights: string[]
  tools: string[]
}

export const experience: Experience[] = [
  {
    company: 'Centience',
    role: 'Head, Data Science & Applied AI',
    period: 'Jun 2024 - Present',
    location: 'Singapore',
    highlights: [
      'Built and scaling the data science and analytics function from the ground up - a team of 10 spanning data architects, engineers, analysts, scientists, and ML engineers',
      'Directed client solution pitches, translating business problems into practical AI and productized analytics proposals',
      'Deployed ML solutions from proof of concept toward production, prioritizing adoption and measurable operating impact',
      'Delivered corporate AI and data literacy training for internal and external organizations',
    ],
    tools: ['AWS', 'Databricks', 'QuickSight', 'Mixpanel', 'Python', 'Claude Code', 'Codex'],
  },
  {
    company: 'Daraz (Alibaba Group)',
    role: 'Regional Head of Data, Strategy & Planning & BI',
    period: 'Apr 2022 - Jun 2024',
    location: 'Singapore',
    highlights: [
      'Scaled the regional data team from 1 to 30+ across South Asian markets',
      'Owned the regional analytics operating model: KPI systems, data products, search and recommendation algorithms, A/B testing, event tracking',
      'Drove a 10% conversion rate improvement through bottom-funnel optimization and experimentation',
      'Directed regional data governance standards across quality, lineage, and metadata',
    ],
    tools: ['Alibaba Cloud', 'Python', 'Tableau', 'OpenAI API'],
  },
  {
    company: 'Good Doctor Technology',
    role: 'Regional Strategy & Planning',
    period: 'Dec 2020 - Apr 2022',
    location: 'Singapore',
    highlights: [
      'Launched core data products: RFM modeling engine, marketing attribution engine, customer profiling and segmentation, executive dashboards',
      'Designed analytics frameworks for B2B, B2C and O2O performance management',
      'Standardized reusable customer intelligence patterns and governance practices',
    ],
    tools: ['Hadoop', 'Hive', 'PostgreSQL', 'Tableau', 'Python', 'AppsFlyer'],
  },
  {
    company: 'Orion Consultancy',
    role: 'Lead, Data Analytics and Engineering',
    period: 'Oct 2019 - Nov 2020',
    location: 'Singapore',
    highlights: [
      'Established the data engineering and analytics department from zero, including enterprise data warehouse design',
      'Delivered customer, product, sales, and marketing analytics across CLV, retention, segmentation, and campaign measurement',
    ],
    tools: ['AWS', 'Apache Airflow', 'Tableau Server', 'Python', 'SQL'],
  },
  {
    company: 'Bank of China',
    role: 'Senior Manager, Card Center',
    period: 'Jan 2018 - Oct 2019',
    location: 'Singapore',
    highlights: [
      'Improved loan eligibility screening productivity by 80% through modeling and automation',
      'Led customer behavior analysis and precision marketing with pre/post-campaign evaluation',
      'Managed MAS-facing regulatory and stakeholder performance reporting',
    ],
    tools: ['SAS', 'Teradata', 'Python'],
  },
  {
    company: 'NTUC Link',
    role: 'Senior Data Analyst, Data Architecture & Information Management',
    period: 'Dec 2016 - Dec 2017',
    location: 'Singapore',
    highlights: [
      'Established the analytical data warehouse and Tableau BI suite for NTUC Group and key merchants such as FairPrice, Caltex, OCBC',
      'Established governance practices: event tracking, naming conventions, data dictionary, lineage, metadata',
    ],
    tools: ['AWS Redshift', 'SQL Server', 'Tableau', 'Power BI'],
  },
  {
    company: 'NUHS',
    role: 'Executive, Clinical Analytics',
    period: 'Aug 2014 - Nov 2016',
    location: 'Singapore',
    highlights: [
      'Managed the Clinical Quality Dashboard tracking 200+ MOH HPO indicators and KPIs',
      'Co-piloted a 30-day readmission predictive model achieving 85% accuracy',
      'Led Clinical Quality and Patient Safety reviews for quarterly Medical Board Meetings',
    ],
    tools: ['OBIEE', 'Tableau', 'QGIS', 'R', 'D3.js'],
  },
]
