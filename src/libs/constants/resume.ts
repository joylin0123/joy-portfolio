import { profile } from './profile';

export const resume = {
  name: profile.name,
  role: profile.role,
  location: profile.location,
  contacts: {
    email: profile.email,
    phone: profile.phone,
    linkedin: profile.linkedin,
    github: profile.github,
  },
  education: [
    {
      school:
        'University of Amsterdam (UvA) & Vrije Universiteit Amsterdam (VU)',
      degree: 'MS in Computer Science — Track: Software Engineering & Green IT',
      period: 'Sept 2025 – Now',
      location: 'Amsterdam, NL',
    },
    {
      school: 'National Tsing Hua University (NTHU)',
      degree:
        'BS in Computer Science & Mathematics (GPA 3.3/4.3; 2× Academic Excellence Award)',
      period: 'Sept 2020 – Jun 2025',
      location: 'Hsinchu, Taiwan',
    },
  ],
  experience: [
    {
      company: 'Tenfold AI',
      company_url: 'https://tenfoldai.io',
      title: 'Software Engineer Intern',
      location: 'Remote, Taiwan',
      period: 'Aug 2024 – Jul 2025',
      bullets: [
        'Built an end‑to‑end customer data pipeline (AWS Lambda, S3, Python, MongoDB, SageMaker) delivering daily updates; removed manual reporting and improved freshness from 7 days to 24 hours.',
        'Implemented Redis caching and query optimizations; improved p95 latency by 80% (1200 ms → 240 ms).',
        'Re‑architected data store and API: redesigned MongoDB schema & access patterns, standardized JWT auth.',
        'Established CI/CD with linting, test matrix, preview envs; coverage from 0% → 60% and enabled parallel workstreams.',
        'Defined interface contracts and reviewed cross‑repo PRs for interoperability.',
      ],
    },
    {
      company: 'Crypto Arsenal',
      company_url: 'https://crypto-arsenal.io',
      title: 'Software Engineer Intern',
      location: 'Remote, Taiwan',
      period: 'Jun 2024 – Aug 2024',
      bullets: [
        'Migrated Next.js from Pages Router to App Router (layouts, route groups) across 10+ components with zero downtime.',
        'Built reusable React/TypeScript UI components; added Storybook stories with React Hook Form to showcase validation states.',
        'Introduced a PR template (context, change list, test plan, screenshots); reduced review turnaround by 10–15%.',
        'Unblocked GraphQL usage (queries/mutations, error handling); improved type correctness across shared fragments.',
      ],
    },
    {
      company: 'AppWorks School (AiWorks)',
      company_url: 'https://aiworks.tw',
      title: 'Web Development Trainee',
      location: 'Taipei, Taiwan',
      period: 'Aug 2023 – Jan 2024',
      bullets: [
        'Admitted to a selective full‑time SWE program; intensive training in modern frontend & backend.',
        'Shipped two full‑stack projects (Next.js/JS, Node.js, Postgres/Supabase) covering auth, CRUD APIs, CI checks.',
      ],
    },
  ],
  projects: [
    {
      name: 'Balance Cat',
      blurb:
        'Personal finance manager. Voted ‘Most Popular’ by peers; budgeting, asset overview, category analytics.',
      stack: ['React', 'Next.js'],
      link: 'https://github.com/MengChiehLiu/BalanceCat',
    },
    {
      name: 'GymRat',
      blurb:
        'Fitness tracker with workout logging, calorie calculator, weight charts, coach chat.',
      stack: ['React', 'Next.js', 'Tailwind', 'Node.js', 'Express', 'MySQL'],
      link: 'https://github.com/joylin0123/gymrat-backend',
    },
  ],
  skills: {
    Frontend: ['React', 'Next.js', 'TypeScript', 'Storybook', 'Tailwind CSS'],
    'Backend & APIs': [
      'Node.js',
      'Express',
      'OAuth 2.0/OIDC',
      'JWT',
      'Swagger',
      'REST',
    ],
    'Data & Cache': ['MySQL', 'MongoDB', 'Redis'],
    'Cloud/DevOps': [
      'AWS (Lambda, S3, EC2, RDS, CloudFront, Route53, CodePipeline)',
      'Docker',
      'GitHub Actions',
    ],
    Testing: ['Jest', 'Playwright'],
  },
  languages: ['Mandarin (Native)', 'English (Fluent)', 'Dutch/German (A1)'],
};
