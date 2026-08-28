import { useRef, useState, type FormEvent } from 'react'
import { Send } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { Reveal } from '@/components/ui/Reveal'
import { TextInput, SelectInput, TextArea } from '@/components/ui/Field'
import { trackEvent } from '@/lib/analytics'
import { site } from '@/config/site'

/* ------------------------------------------------------------------ */
/* Data model                                                          */
/* ------------------------------------------------------------------ */

interface ContactFormData {
  name: string
  company: string
  email: string
  phone: string
  projectType: string
  scope: string
  requirement: string
}

type FieldName = keyof ContactFormData
type FieldErrors = Partial<Record<FieldName, string>>

const EMPTY_FORM: ContactFormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  projectType: '',
  scope: '',
  requirement: '',
}

/** Tab/reading order — used to focus the first invalid field on submit. */
const FIELD_ORDER: readonly FieldName[] = [
  'name',
  'company',
  'email',
  'phone',
  'projectType',
  'scope',
  'requirement',
]

const FIELD_IDS: Record<FieldName, string> = {
  name: 'contact-name',
  company: 'contact-company',
  email: 'contact-email',
  phone: 'contact-phone',
  projectType: 'contact-project-type',
  scope: 'contact-scope',
  requirement: 'contact-requirement',
}

const PROJECT_TYPE_OPTIONS = [
  { value: 'ai-agents', label: 'AI Agents & Agentic AI' },
  { value: 'rag-enterprise-ai', label: 'RAG / Enterprise AI' },
  { value: 'generative-ai', label: 'Generative AI Application' },
  { value: 'ai-automation', label: 'AI Automation' },
  { value: 'data-analytics-bi', label: 'Data & Analytics / BI' },
  { value: 'machine-learning', label: 'Machine Learning' },
  { value: 'cloud-engineering', label: 'Cloud Engineering' },
  { value: 'software-development', label: 'Software Development' },
  { value: 'testing-qa', label: 'Testing & QA' },
  { value: 'website-management', label: 'Website Management' },
  { value: 'other', label: 'Other' },
] as const

const SCOPE_OPTIONS = [
  { value: 'discovery', label: 'Discovery / Consultation' },
  { value: 'small', label: 'Small project' },
  { value: 'medium', label: 'Medium project' },
  { value: 'large', label: 'Large / multi-phase' },
  { value: 'ongoing', label: 'Ongoing partnership' },
  { value: 'not-sure', label: 'Not sure yet' },
] as const

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_CHARS_RE = /^\+?[\d\s+()-]+$/
const MIN_REQUIREMENT_LENGTH = 20

function validateField(field: FieldName, value: string): string | undefined {
  const v = value.trim()
  switch (field) {
    case 'name':
      return v ? undefined : 'Enter your name.'
    case 'company':
      return undefined // optional
    case 'email':
      if (!v) return 'Enter your work email address.'
      return EMAIL_RE.test(v)
        ? undefined
        : 'Enter a valid email address, e.g. name@company.com.'
    case 'phone': {
      if (!v) return undefined // optional
      const digits = v.replace(/\D/g, '')
      if (!PHONE_CHARS_RE.test(v) || digits.length < 7) {
        return 'Enter a valid phone number — digits, spaces and + only, at least 7 digits.'
      }
      return undefined
    }
    case 'projectType':
      return v ? undefined : 'Select the type of project.'
    case 'scope':
      return v ? undefined : 'Select an estimated scope — "Not sure yet" is fine.'
    case 'requirement':
      if (!v) return 'Tell us briefly what you want to build or solve.'
      return v.length >= MIN_REQUIREMENT_LENGTH
        ? undefined
        : `Add a little more detail (at least ${MIN_REQUIREMENT_LENGTH} characters) so we can route your request.`
    default:
      return undefined
  }
}

function validateAll(data: ContactFormData): FieldErrors {
  const errors: FieldErrors = {}
  for (const field of FIELD_ORDER) {
    const message = validateField(field, data[field])
    if (message) errors[field] = message
  }
  return errors
}

/* ------------------------------------------------------------------ */
/* Submission — no backend exists yet; this simulates a request so the */
/* full UX (loading, success, error) is real. A production endpoint    */
/* slots into this one function.                                       */
/* ------------------------------------------------------------------ */

async function submitContactRequest(data: ContactFormData): Promise<void> {
  // [TBD] Replace the simulated delay with the real endpoint, e.g.:
  //   const res = await fetch('[TBD-CONTACT-ENDPOINT-URL]', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(data),
  //   })
  //   if (!res.ok) throw new Error('Contact request failed')
  void data
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 900)
  })
}

/* Spam / abuse guards (client-side) */
const MIN_FILL_TIME_MS = 3_000
const RATE_LIMIT_MS = 30_000
const RATE_LIMIT_KEY = 'contact-last-submit-at'

function readLastSubmitAt(): number {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY)
    const n = raw ? Number(raw) : 0
    return Number.isFinite(n) ? n : 0
  } catch {
    return 0
  }
}

function writeLastSubmitAt(ts: number): void {
  try {
    localStorage.setItem(RATE_LIMIT_KEY, String(ts))
  } catch {
    /* storage unavailable — continue without persisting */
  }
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

type Status = 'idle' | 'submitting' | 'success' | 'error'

interface ContactFormProps {
  variant?: 'default' | 'alt' | 'deep'
}

/**
 * Contact / lead-generation form (prompt.md §34). Client-side validation on
 * blur and on submit, honeypot + minimum-fill-time + local rate limiting,
 * simulated async submission with clear loading / success / error states.
 */
export function ContactForm({ variant = 'default' }: ContactFormProps) {
  const [data, setData] = useState<ContactFormData>(EMPTY_FORM)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [summary, setSummary] = useState<
    { tone: 'error' | 'info'; text: string } | null
  >(null)

  const honeypotRef = useRef<HTMLInputElement>(null)
  const mountedAtRef = useRef<number>(Date.now())
  const openTrackedRef = useRef(false)

  const pending = status === 'submitting'

  const handleFirstFocus = () => {
    if (openTrackedRef.current) return
    openTrackedRef.current = true
    trackEvent('contact_form_open')
  }

  const setField = (field: FieldName, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }))
    // Live-clear an error once the visitor fixes the field.
    if (errors[field]) {
      const message = validateField(field, value)
      setErrors((prev) => ({ ...prev, [field]: message }))
    }
  }

  const handleBlur = (field: FieldName) => {
    const message = validateField(field, data[field])
    setErrors((prev) => ({ ...prev, [field]: message }))
  }

  const resetForm = () => {
    setData(EMPTY_FORM)
    setErrors({})
    setSummary(null)
    setStatus('idle')
    mountedAtRef.current = Date.now()
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (pending || status === 'success') return

    // Honeypot filled or the form was completed inhumanly fast: almost
    // certainly a bot. Pretend success without sending anything.
    const isSpam =
      Boolean(honeypotRef.current?.value) ||
      Date.now() - mountedAtRef.current < MIN_FILL_TIME_MS
    if (isSpam) {
      setSummary(null)
      setStatus('success')
      return
    }

    // Simple client-side rate limit: one submission per 30 seconds.
    const sinceLast = Date.now() - readLastSubmitAt()
    if (sinceLast < RATE_LIMIT_MS) {
      const wait = Math.ceil((RATE_LIMIT_MS - sinceLast) / 1000)
      setSummary({
        tone: 'info',
        text: `You sent a message a moment ago. Please wait about ${wait} seconds before sending another.`,
      })
      return
    }

    const nextErrors = validateAll(data)
    setErrors(nextErrors)
    const firstInvalid = FIELD_ORDER.find((f) => nextErrors[f])
    if (firstInvalid) {
      setSummary({ tone: 'error', text: 'Please fix the highlighted fields.' })
      document.getElementById(FIELD_IDS[firstInvalid])?.focus()
      return
    }

    setSummary(null)
    setStatus('submitting')
    try {
      await submitContactRequest(data)
      writeLastSubmitAt(Date.now())
      trackEvent('contact_form_submit', { project_type: data.projectType })
      setStatus('success')
    } catch {
      setStatus('error')
      setSummary({
        tone: 'error',
        text: 'Something went wrong while sending your message. Please try again.',
      })
    }
  }

  return (
    <Section id="contact-form" variant={variant}>
      <SectionHeading
        eyebrow="Contact"
        title="Tell Us About Your Project"
        lead="Share a few details about what you are trying to build or solve. We will review it and come back to you with a concrete next step — no obligation."
      />
      <Reveal>
        <Card className="mx-auto max-w-3xl p-6 sm:p-8 md:p-10">
          {status === 'success' ? (
            <div className="flex flex-col items-start gap-6">
              <Alert tone="success" title="Thanks — we received your message.">
                <p>
                  A member of our team will review your requirement and respond
                  at the email address you provided.
                </p>
              </Alert>
              <Button variant="secondary" onClick={resetForm}>
                Send another message
              </Button>
            </div>
          ) : (
            <form
              noValidate
              aria-busy={pending}
              aria-label="Contact form"
              className="relative"
              onSubmit={(e) => void handleSubmit(e)}
              onFocus={handleFirstFocus}
            >
              {/* Honeypot — hidden from real visitors; bots that fill it are
                  silently ignored. */}
              <div
                aria-hidden="true"
                className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
              >
                <label htmlFor="contact-website">
                  Leave this field empty
                  <input
                    ref={honeypotRef}
                    id="contact-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </div>

              <fieldset disabled={pending} className="grid min-w-0 gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <TextInput
                    id={FIELD_IDS.name}
                    label="Name"
                    required
                    autoComplete="name"
                    value={data.name}
                    error={errors.name}
                    onChange={(e) => setField('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                  />
                  <TextInput
                    id={FIELD_IDS.company}
                    label="Company"
                    autoComplete="organization"
                    value={data.company}
                    error={errors.company}
                    onChange={(e) => setField('company', e.target.value)}
                    onBlur={() => handleBlur('company')}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <TextInput
                    id={FIELD_IDS.email}
                    label="Email"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    value={data.email}
                    error={errors.email}
                    onChange={(e) => setField('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                  />
                  <TextInput
                    id={FIELD_IDS.phone}
                    label="Phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    hint="Optional — include your country code."
                    value={data.phone}
                    error={errors.phone}
                    onChange={(e) => setField('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <SelectInput
                    id={FIELD_IDS.projectType}
                    label="Project Type"
                    required
                    placeholder="Select a project type"
                    options={PROJECT_TYPE_OPTIONS}
                    value={data.projectType}
                    error={errors.projectType}
                    onChange={(e) => setField('projectType', e.target.value)}
                    onBlur={() => handleBlur('projectType')}
                  />
                  <SelectInput
                    id={FIELD_IDS.scope}
                    label="Estimated Scope"
                    required
                    placeholder="Select an estimated scope"
                    options={SCOPE_OPTIONS}
                    value={data.scope}
                    error={errors.scope}
                    onChange={(e) => setField('scope', e.target.value)}
                    onBlur={() => handleBlur('scope')}
                  />
                </div>

                <TextArea
                  id={FIELD_IDS.requirement}
                  label="Tell us about your requirement"
                  required
                  rows={5}
                  hint="What are you trying to build or solve, and what does success look like?"
                  value={data.requirement}
                  error={errors.requirement}
                  onChange={(e) => setField('requirement', e.target.value)}
                  onBlur={() => handleBlur('requirement')}
                />

                {summary && (
                  <Alert tone={summary.tone === 'error' ? 'error' : 'info'}>
                    <p>{summary.text}</p>
                  </Alert>
                )}

                <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={pending}
                    iconRight={<Send className="h-4 w-4" aria-hidden="true" />}
                  >
                    {pending ? 'Sending…' : 'Submit'}
                  </Button>
                  <p className="text-caption text-ink-subtle">
                    We only use your details to respond to this enquiry. You can
                    also email us directly at {site.email} [TBD — form delivery
                    endpoint pending configuration].
                  </p>
                </div>
              </fieldset>
            </form>
          )}
        </Card>
      </Reveal>
    </Section>
  )
}
