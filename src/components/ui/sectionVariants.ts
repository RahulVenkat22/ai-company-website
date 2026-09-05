export type SectionVariant = 'default' | 'alt' | 'deep'

/**
 * Band styles per section variant: 'default' (page background), 'alt'
 * (raised surface band), 'deep' (near-black band for feature sections).
 * Shared by Section and by sections that need their own wrapper element.
 */
export const sectionVariantClasses: Record<SectionVariant, string> = {
  default: '',
  alt: 'bg-surface',
  deep: 'bg-surface-2/60 border-y border-line',
}
