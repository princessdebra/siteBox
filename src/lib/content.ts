import type { Draft, SiteContent } from '../types'
import { byId } from '../data/templates'
import { isHex, withHash } from './color'

/**
 * Turns a form draft into the content a template renders.
 * fill=true: blank text fields borrow sample text so the live preview never looks empty while typing.
 * fill=false: blanks stay blank and templates hide those sections (used for the final personalized preview).
 * Testimonials and team are never filled with fictional people for a real business.
 */
export function resolveContent(d: Draft, fill: boolean): SiteContent {
  const t = byId(d.templateId)!.defaults
  const c = d.content
  const pick = (v: string, fb: string) => (v.trim() ? v.trim() : fill ? fb : '')
  const services = c.services.filter((s) => s.name.trim())
  return {
    ...c,
    isSample: false,
    businessName: pick(c.businessName, 'Your Business Name'),
    tagline: c.tagline.trim(),
    description: pick(c.description, t.description),
    phone: pick(c.phone, t.phone),
    email: pick(c.email, t.email),
    address: pick(c.address, t.address),
    hours: c.hours.some((h) => h.days.trim() || h.time.trim()) ? c.hours : fill ? t.hours : [],
    primary: isHex(c.primary) ? withHash(c.primary) : t.primary,
    secondary: c.secondary && isHex(c.secondary) ? withHash(c.secondary) : isHex(c.primary) ? withHash(c.primary) : t.secondary,
    services: services.length ? services : fill ? t.services : [],
    testimonials: c.testimonials.filter((x) => x.quote.trim()),
    team: c.team.filter((p) => p.name.trim()),
    bookingUrl: c.bookingUrl.trim() || '#book',
  }
}

export const validUrl = (v: string) => { try { const u = new URL(v); return u.protocol === 'http:' || u.protocol === 'https:' } catch { return false } }
export const validEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
export const validPhone = (v: string) => v.replace(/\D/g, '').length >= 7
