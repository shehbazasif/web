// Everything you'll want to edit lives here.
export const profile = {
  name: 'Shehbaz Asif',
  first: 'Shehbaz',
  role: 'UI/UX Designer',
  location: 'Doha, Qatar',
  email: 'muhammadshehbazasif@gmail.com',
  phone: '+974 5123 8500',
  phoneHref: 'tel:+97451238500',
  available: 'Open to product design roles and freelance projects from January',
  intro:
    'I research, design and test product interfaces for web and mobile, from the first interview to the handoff file developers actually enjoy opening.',
  links: [
    { label: 'Dribbble', href: 'https://dribbble.com/' },
    { label: 'Behance', href: 'https://www.behance.net/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'GitHub', href: 'https://github.com/shehbazasif' },
  ],
}

export type Mock = 'booking' | 'onboarding' | 'calendar' | 'system' | 'mobile'

export interface Project {
  slug: string
  title: string
  client: string
  year: string
  role: string
  platform: string
  status?: string
  summary: string
  mock: Mock
  outcome: { value: string; label: string }[]
  problem: string
  approach: { title: string; body: string }[]
  learned: string
}

export const projects: Project[] = [
  {
    slug: 'rantevouos',
    title: 'An appointment system built for Greek salons',
    client: 'RantevouOS',
    year: '2026',
    role: 'Product designer & builder',
    platform: 'Web app · Nuxt',
    status: 'In progress',
    summary: 'Booking page, team calendar and customer list for salons, barbers and spas, designed and built end to end.',
    mock: 'booking',
    outcome: [
      { value: '0', label: 'accounts needed to book' },
      { value: '5', label: 'languages, Greek first' },
    ],
    problem:
      'Most small salons in Greece still take bookings by phone and keep them in a paper diary. Existing tools were built for bigger chains and felt like too much for a studio with five chairs.',
    approach: [
      { title: 'Booking without an account', body: 'Customers pick a service, a staff member or "Any available", then a time. They only type a name, phone and email. The slot is checked again before it saves, so two people can never book the same chair.' },
      { title: 'One calendar for the whole team', body: 'Appointments, staff, services, working hours and customers live in one dashboard. Each appointment moves through clear states: confirmed, checked in, completed or no-show.' },
      { title: 'Small things for the front desk', body: 'A printable QR code for the booking link, QR badges staff scan to check in, and customer import from an existing spreadsheet so nobody starts from zero.' },
    ],
    learned: 'Designing the booking page first, before the dashboard, kept every screen tied to an appointment a real customer makes.',
  },
  {
    slug: 'ledgerly-onboarding',
    title: 'Opening a business account in one sitting',
    client: 'Ledgerly',
    year: '2025',
    role: 'Lead product designer',
    platform: 'Web · iOS',
    summary: 'Rebuilt a 14-step KYC flow so small-business owners finish it before their coffee goes cold.',
    mock: 'onboarding',
    outcome: [
      { value: '38% → 71%', label: 'onboarding completion' },
      { value: '9 min', label: 'median time, down from 26' },
    ],
    problem:
      'Owners were dropping out of account setup on the document upload step. Support tickets said the same thing in different words: "I didn\'t know what you needed until you asked for it."',
    approach: [
      { title: 'Shadowed 12 sign-ups', body: 'Watched real owners onboard over video calls. Most had the documents. They just didn\'t know which ones to have open.' },
      { title: 'Front-loaded the checklist', body: 'A single screen up front lists every document for the owner\'s business type, so nothing comes as a surprise later.' },
      { title: 'Saved progress everywhere', body: 'Each step saves on blur. Owners can leave from desktop and finish on the phone where their ID photo already is.' },
    ],
    learned: 'The friction was never the number of fields. It was not knowing what came next.',
  },
  {
    slug: 'clinicflow-scheduling',
    title: 'A front desk calendar that survives Monday mornings',
    client: 'Clinicflow',
    year: '2024',
    role: 'Product designer',
    platform: 'Web app',
    summary: 'Scheduling for multi-doctor clinics, designed around a receptionist holding a phone in one hand.',
    mock: 'calendar',
    outcome: [
      { value: '−42%', label: 'double bookings' },
      { value: '3 clicks', label: 'to reschedule, down from 8' },
    ],
    problem:
      'Receptionists juggled calls, walk-ins and three doctors\' calendars. The existing tool assumed a mouse, a quiet room and full attention.',
    approach: [
      { title: 'Timed real shifts', body: 'Logged two mornings at partner clinics. Most rescheduling happened mid-call, one-handed, under 20 seconds.' },
      { title: 'Keyboard-first rescheduling', body: 'Drag still works, but arrow keys move an appointment and Enter confirms, and an inline conflict warning appears before anything saves.' },
      { title: 'Doctor lanes, not tabs', body: 'All doctors sit side by side in one day view so a gap is visible without switching context.' },
    ],
    learned: 'Design for the busiest ten minutes of the day, and the rest of the day takes care of itself.',
  },
  {
    slug: 'tandem-design-system',
    title: 'One design system for four product teams',
    client: 'Tandem',
    year: '2024',
    role: 'Design systems lead',
    platform: 'Figma · React',
    summary: 'Tokens, components and documentation that cut the time from Figma to production by a third.',
    mock: 'system',
    outcome: [
      { value: '120+', label: 'components shipped' },
      { value: '−33%', label: 'design-to-dev time' },
    ],
    problem:
      'Four teams had built four versions of the same button. Every release needed a visual QA pass just to catch drift.',
    approach: [
      { title: 'Audited every screen', body: 'Screenshotted 300 screens and grouped the patterns. We found 17 greys, 9 radii and 31 button variants.' },
      { title: 'Tokens before components', body: 'Agreed colour, type, spacing and radius tokens with engineering first, synced to code from a single source.' },
      { title: 'Docs where people work', body: 'Usage notes live inside the Figma components and in Storybook, not in a wiki nobody opens.' },
    ],
    learned: 'A design system is a product. Its users are designers and developers, and it needs research too.',
  },
  {
    slug: 'haul-driver-app',
    title: 'A delivery app you can use with gloves on',
    client: 'Haul',
    year: '2023',
    role: 'UX/UI designer',
    platform: 'Android',
    summary: 'Route, proof-of-delivery and issue reporting for drivers working in sun, rain and a hurry.',
    mock: 'mobile',
    outcome: [
      { value: '4.7★', label: 'Play Store rating, from 3.1' },
      { value: '−58%', label: 'failed proof-of-delivery' },
    ],
    problem:
      'Drivers were taking photos with the system camera and texting them to dispatch, because the in-app flow failed in low signal.',
    approach: [
      { title: 'Rode along', body: 'Two days in the passenger seat. Tap targets were too small for gloves and the screen washed out in direct sun.' },
      { title: 'Offline first', body: 'Every action queues locally and syncs later, with a clear sync indicator so drivers trust it.' },
      { title: 'Big, high-contrast controls', body: '64px minimum touch targets and a sunlight theme that passes WCAG AAA contrast.' },
    ],
    learned: 'Context is a design constraint. The desk is not where the app gets used.',
  },
]

// Order matters here — this is the actual sequence I work in.
export const process = [
  { step: 'Listen', body: 'Interviews, analytics and support tickets to find the problem behind the request.' },
  { step: 'Frame', body: 'Map the journey, name the riskiest assumption and agree on what success looks like.' },
  { step: 'Sketch', body: 'Lo-fi flows and wireframes, many of them, kept cheap so they are easy to throw away.' },
  { step: 'Prototype', body: 'Interactive Figma or coded prototypes, real enough to test with real people.' },
  { step: 'Test', body: 'Moderated usability sessions, then iterate. Usually twice.' },
  { step: 'Hand off', body: 'Annotated specs, tokens and states, and I stay close while it gets built.' },
]

export const skills = {
  'Research': ['User interviews', 'Usability testing', 'Journey mapping', 'Card sorting', 'Analytics reviews'],
  'Design': ['Interaction design', 'Information architecture', 'Wireframing', 'Visual & UI design', 'Accessibility (WCAG 2.2)'],
  'Systems': ['Design tokens', 'Component libraries', 'Documentation', 'Figma variables'],
  'Tools': ['Figma', 'FigJam', 'Framer', 'Maze', 'Notion', 'HTML/CSS'],
}

export const experience = [
  { years: '2024 — now', role: 'Senior Product Designer', org: 'Ledgerly' },
  { years: '2022 — 2024', role: 'Product Designer', org: 'Tandem' },
  { years: '2021 — 2022', role: 'UI/UX Designer', org: 'Freelance' },
  { years: '2019 — 2021', role: 'Junior Designer', org: 'Studio Nine' },
]
