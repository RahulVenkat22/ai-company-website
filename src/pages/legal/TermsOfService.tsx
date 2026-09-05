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
    title: 'Acceptance of these terms',
    description:
      '[TBD] What using this website means, who these terms apply to, and the entity they form an agreement with.',
  },
  {
    title: 'Use of the website',
    description:
      '[TBD] Permitted use of the site and its content, including any restrictions on automated access.',
  },
  {
    title: 'Intellectual property',
    description:
      '[TBD] Ownership of the content, design, code and trademarks on this website, and what visitors may and may not do with them.',
  },
  {
    title: 'Acceptable use',
    description:
      '[TBD] Conduct that is not permitted: for example, attempting to disrupt the site or misuse the contact form.',
  },
  {
    title: 'Content and information',
    description:
      '[TBD] The status of the information on this site: provided for general information, not professional advice, and subject to change.',
  },
  {
    title: 'Third-party links and services',
    description:
      '[TBD] Responsibility for external websites and services linked from this site.',
  },
  {
    title: 'Disclaimers and warranties',
    description:
      '[TBD] The extent to which the website is provided “as is”, without warranties, to the degree permitted by law.',
  },
  {
    title: 'Limitation of liability',
    description:
      '[TBD] The limits on liability arising from use of the website, to the degree permitted by law.',
  },
  {
    title: 'Governing law and jurisdiction',
    description:
      '[TBD] The law governing these terms and the courts with jurisdiction over disputes.',
  },
  {
    title: 'Changes to these terms',
    description:
      '[TBD] How and when these terms may be updated, and how updates take effect.',
  },
]

export default function TermsOfService() {
  return (
    <>
      <Seo
        title="Terms of Service"
        description="The terms governing use of this website. Placeholder page: final terms to be provided by legal counsel."
        path="/terms-of-service"
      />

      <PageHeader
        title="Terms of Service"
        lead="The terms that govern use of this website. Last updated: [TBD]."
      />

      <Section variant="default">
        <div className="mx-auto flex max-w-prose flex-col gap-10">
          <Alert tone="info" title="[TBD: Replace with approved legal content]">
            This page is a placeholder and is not legal advice. The outline
            below shows the sections the final terms will contain.
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
              Questions about these terms can be sent to{' '}
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
