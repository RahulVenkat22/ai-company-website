import { Seo } from '@/lib/seo'
import { site } from '@/config/site'
import { PageHeader } from '@/components/ui/PageHeader'
import { TechnologyStackSection } from '@/components/sections/TechnologyStackSection'
import { SoftwareSection } from '@/components/sections/SoftwareSection'
import { TestingSection } from '@/components/sections/TestingSection'
import { WebsiteManagementSection } from '@/components/sections/WebsiteManagementSection'
import { FinalCTA } from '@/components/sections/FinalCTA'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
    { '@type': 'ListItem', position: 2, name: 'Technology', item: `${site.url}/technology` },
  ],
}

export default function Technology() {
  return (
    <>
      <Seo
        title="Technology Stack & Engineering Practices"
        description="Our technology ecosystem — Python, React, TypeScript, LangChain, LangGraph, Spark, Power BI, Docker, Kubernetes and more — plus the software, testing and support practices behind it."
        path="/technology"
        jsonLd={jsonLd}
      />
      <PageHeader
        eyebrow="Technology"
        title="The Stack Behind the Solutions"
        lead="We choose proven technology per problem — not per trend. This is the ecosystem we build with, and the engineering practices that keep what we ship reliable long after launch."
      />

      <TechnologyStackSection variant="default" />
      <SoftwareSection variant="alt" />
      <TestingSection variant="default" />
      <WebsiteManagementSection variant="alt" />
      <FinalCTA />
    </>
  )
}
