/**
 * Illustrative testimonials — placeholder people and quotes demonstrating the
 * layout. Replace with real client names, photos and quotes (with written
 * permission) before launch. Photos: Unsplash, stored in /public/images.
 */

export interface Testimonial {
  quote: string
  name: string
  role: string
  image: string
}

export const TESTIMONIALS_DISCLAIMER =
  'Illustrative examples — replace with real client quotes before launch.'

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
  {
    quote:
      'They explained every architecture decision in plain language, involved our engineers at each step, and left us able to run the system ourselves.',
    name: 'Daniel Osei',
    role: 'Engineering Director, Healthcare',
    image: '/images/client-4.jpg',
  },
  {
    quote:
      'The automation they delivered gave our analysts their evenings back. Work that took three days now happens before the morning stand-up.',
    name: 'Sofia Lindqvist',
    role: 'COO, Professional Services',
    image: '/images/client-6.jpg',
  },
  {
    quote:
      'Security was never an afterthought. They designed for our compliance requirements from day one and walked our auditors through everything.',
    name: 'James Whitfield',
    role: 'CISO, Insurance Group',
    image: '/images/client-7.jpg',
  },
]
