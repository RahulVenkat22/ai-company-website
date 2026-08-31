import { Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Seo } from '@/lib/seo'
import { site } from '@/config/site'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { ContactForm } from '@/components/sections/ContactForm'
import { EngagementModels } from '@/components/sections/EngagementModels'

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact',
    url: `${site.url}/contact`,
    description:
      'Start a conversation about AI agents, RAG, data platforms, cloud engineering or application development.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: `${site.url}/contact` },
    ],
  },
]

const nextSteps = [
  {
    step: '01',
    title: 'We review your requirement',
    body: 'An engineer — not a sales script — reads what you send and considers the technical shape of the problem.',
  },
  {
    step: '02',
    title: 'A short technical conversation',
    body: 'We set up a call to understand your goals, constraints, data and systems, and answer your questions directly.',
  },
  {
    step: '03',
    title: 'A clear proposal',
    body: 'You receive a concrete recommendation: proposed architecture, scope, engagement model and next steps.',
  },
]

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact — Start a Project"
        description="Tell us about your AI, data, cloud or software challenge. We review every requirement and respond with a concrete, production-focused next step."
        path="/contact"
        jsonLd={jsonLd}
      />
      <PageHeader
        image="/images/happy-handshake.jpg"
        eyebrow="Contact"
        title="Have a Technology Challenge? Let's Build the Solution."
        lead="Whether you are exploring AI, modernizing your data platform, automating a business process or building a new application, our team can help turn the idea into a production-ready solution."
      />

      <ContactForm variant="default" />

      <Section variant="alt" ariaLabel="Contact details and what happens next">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal className="h-full">
            <Card className="h-full p-6 md:p-8">
              <h2 className="text-h4">Direct contact</h2>
              <ul className="mt-5 flex flex-col gap-4 text-small text-ink-muted">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-[18px] w-[18px] shrink-0 text-primary" aria-hidden="true" />
                  <span>
                    <span className="block font-medium text-ink">Email</span>
                    {site.email}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-[18px] w-[18px] shrink-0 text-primary" aria-hidden="true" />
                  <span>
                    <span className="block font-medium text-ink">Phone</span>
                    {site.phone}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-primary" aria-hidden="true" />
                  <span>
                    <span className="block font-medium text-ink">Address</span>
                    {site.address}
                  </span>
                </li>
              </ul>
              <p className="mt-6 border-t border-line pt-5 text-caption text-ink-subtle">
                Your information is used only to respond to your enquiry. See our{' '}
                <Link
                  to="/privacy-policy"
                  className="font-medium text-ink-muted underline underline-offset-2 hover:text-ink"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </Card>
          </Reveal>

          <Reveal delay={100} className="h-full">
            <Card className="h-full p-6 md:p-8">
              <h2 className="text-h4">What happens next</h2>
              <ol className="mt-5 flex flex-col gap-5">
                {nextSteps.map((item) => (
                  <li key={item.step} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="font-mono text-body-lg font-semibold text-ink-subtle"
                    >
                      {item.step}
                    </span>
                    <span>
                      <span className="block text-small font-semibold text-ink">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-small text-ink-muted">
                        {item.body}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </Card>
          </Reveal>
        </div>
      </Section>

      <EngagementModels variant="default" />
    </>
  )
}
