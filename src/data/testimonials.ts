/**
 * Illustrative customer reviews — placeholder people and quotes
 * demonstrating the layout. Replace with real customer names, photos and
 * quotes (with written permission) before launch. Photos: Unsplash,
 * stored in /public/images.
 */

export interface Testimonial {
  quote: string
  name: string
  role: string
  image: string
}

export const TESTIMONIALS_DISCLAIMER =
  'Illustrative examples — replace with real customer reviews before launch.'

export const testimonials: Testimonial[] = [
  {
    quote:
      'They started with our business problem, not their technology. The AI assistant they built now answers 70% of our support questions — and our customers actually like it.',
    name: 'Amelia Hart',
    role: 'Head of Customer Experience, Retail',
    image: '/images/client-3.jpg',
  },
  {
    quote:
      'The first team we worked with that treated a prototype and a product as different things. What they shipped has run in production for a year without drama.',
    name: 'Marcus Bell',
    role: 'CTO, Logistics Platform',
    image: '/images/client-2.jpg',
  },
  {
    quote:
      'Our data was scattered across a dozen systems. They built a platform that finally gives every team one version of the truth — and dashboards people open every morning.',
    name: 'Priya Raman',
    role: 'VP of Operations, FinTech',
    image: '/images/client-5.jpg',
  },
]
