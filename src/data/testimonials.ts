/**
 * Customer reviews (prompt.md 44, 45).
 *
 * ILLUSTRATIVE PLACEHOLDERS. These quotes and people are not real customers.
 * Replace with real, permitted quotes (name, role, company, written consent)
 * before launch. Portraits are Unsplash stock in /public/images.
 */

export interface Testimonial {
  quote: string
  name: string
  role: string
  image: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'They questioned our brief before writing a line of code, and the architecture they proposed is the reason the assistant survived its first audit.',
    name: 'Ilse Vandermeer',
    role: 'Head of Clinical Systems, regional healthcare provider (illustrative)',
    image: '/images/client-1.jpg',
  },
  {
    quote:
      'The agents run our reconciliation every night. What impressed us was the evaluation harness they insisted on shipping alongside them.',
    name: 'Tomasz Okafor-Lind',
    role: 'Director of Finance Operations, logistics group (illustrative)',
    image: '/images/client-2.jpg',
  },
  {
    quote:
      'One team took us from a spreadsheet estate to a governed data platform with dashboards our board actually opens.',
    name: 'Priyanka Raghunathan',
    role: 'Chief Data Officer, retail bank (illustrative)',
    image: '/images/client-3.jpg',
  },
]
