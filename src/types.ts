export type TemplateId = 'salon' | 'restaurant' | 'law' | 'clinic' | 'gym' | 'studio'

export interface Service { name: string; price?: string; desc?: string; category?: string }
export interface Testimonial { quote: string; name: string; role?: string }
export interface Person { name: string; role: string; bio: string; tags?: string[]; img?: string }
export interface HoursRow { days: string; time: string }

export interface SiteContent {
  isSample: boolean
  businessName: string
  tagline: string
  /** Optional custom hero headline; templates fall back to their own sample headline. */
  headline?: string
  description: string
  phone: string
  email: string
  address: string
  hours: HoursRow[]
  primary: string
  secondary: string
  logoUrl?: string
  services: Service[]
  bookingUrl: string
  socials: { instagram?: string; facebook?: string; x?: string; website?: string }
  testimonials: Testimonial[]
  team: Person[]
  /** Optional Google Maps embed URL supplied by the owner. */
  mapUrl?: string
  styleNote?: string
}

export interface TemplateMeta {
  id: TemplateId
  name: string
  industry: string
  blurb: string
  features: string[]
  cover: string
  accent: string
  bg: string
  fontClass: string
  sampleBrand: string
  headline: string
  defaults: SiteContent
}

/** What the customization form collects (superset of SiteContent fields) */
export interface Draft {
  templateId: TemplateId
  content: SiteContent
  styleChoice: string
  changes: string
  notes: string
  domain: string
  /** Owner confirms they have permission to publish supplied testimonials. */
  consent: boolean
}
