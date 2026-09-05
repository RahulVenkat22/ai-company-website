import { Seo } from '@/lib/seo'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section } from '@/components/ui/Section'
import { Alert } from '@/components/ui/Alert'
import { site } from '@/config/site'

interface PolicySection {
  title: string
  description: string
}

const sections: PolicySection[] = [
  {
    title: 'Who we are',
    description: `[TBD] Identity and contact details of the data controller (${site.legalName}), including registered address.`,
  },
  {
    title: 'Data we collect',
    description:
      '[TBD] The categories of personal data collected through this website: for example, details submitted via the contact form and technical data collected by analytics after consent.',
  },
  {
    title: 'How and why we use data',
    description:
      '[TBD] The purposes of processing: responding to enquiries, operating and improving the website, and understanding aggregate usage.',
  },
  {
    title: 'Legal bases for processing',
    description:
      '[TBD] The lawful bases relied on for each purpose, such as consent and legitimate interests.',
  },
  {
    title: 'Cookies and analytics',
    description:
      '[TBD] How cookies and similar technologies are used. See the Cookie Policy for the current behavior of this site.',
  },
  {
    title: 'Data sharing and processors',
    description:
      '[TBD] The third parties and service providers (for example, hosting and analytics providers) that may process data on our behalf.',
  },
  {
    title: 'Data retention',
    description:
      '[TBD] How long each category of personal data is kept, and the criteria used to decide.',
  },
  {
    title: 'International transfers',
    description:
      '[TBD] Whether personal data is transferred outside the visitor’s jurisdiction and the safeguards applied.',
  },
  {
    title: 'Security',
    description:
      '[TBD] The technical and organizational measures used to protect personal data.',
  },
  {
    title: 'Your rights',
    description:
      '[TBD] The rights available to visitors (access, correction, deletion, objection, portability and withdrawal of consent) and how to exercise them.',
  },
  {
    title: 'Changes to this policy',
    description:
      '[TBD] How updates to this policy are published and, where appropriate, notified.',
  },
]

export default function PrivacyPolicy() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="How this website handles personal data. Placeholder page: final policy content to be provided by legal counsel."
        path="/privacy-policy"
      />

      <PageHeader
        title="Privacy Policy"
        lead="How we collect, use and protect personal data on this website. Last updated: [TBD]."
      />

      <Section variant="default">
        <div className="mx-auto flex max-w-prose flex-col gap-10">
          <Alert tone="info" title="[TBD: Replace with approved legal content]">
            This page is a placeholder and is not legal advice. The outline
            below shows the sections the final policy will contain.
          </Alert>

          {sections.map(({ title, description }) => (
            <section key={title}>
              <h2 className="text-h3">{title}</h2>
              <p className="mt-2 text-body text-ink-muted">{description}</p>
            </section>
          ))}

          <section>
            <h2 className="text-h3">Contact</h2>
            <p className="mt-2 text-body text-ink-muted">
              Questions about privacy or this policy can be sent to{' '}
              <a
                href={`mailto:${site.privacyEmail}`}
                className="font-medium text-primary underline underline-offset-2"
              >
                {site.privacyEmail}
              </a>
              .
            </p>
          </section>
        </div>
      </Section>
    </>
  )
}
