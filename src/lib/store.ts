import type { Draft, TemplateId } from '../types'
import { byId } from '../data/templates'

/**
 * DEMO MODE storage: everything lives in this browser's localStorage.
 * Swap `submitRequest` for a real endpoint (see README) to go live.
 */
const K = { draft: 'sitebox:draft:', requests: 'sitebox:requests', events: 'sitebox:events', feedback: 'sitebox:feedback', started: 'sitebox:started:' }

const read = <T,>(key: string, fallback: T): T => {
  try { const v = localStorage.getItem(key); return v ? (JSON.parse(v) as T) : fallback } catch { return fallback }
}
const write = (key: string, value: unknown) => {
  try { localStorage.setItem(key, JSON.stringify(value)); return true } catch { return false }
}

export function emptyDraft(id: TemplateId): Draft {
  const t = byId(id)!
  return {
    templateId: id,
    content: { ...structuredClone(t.defaults), isSample: false, businessName: '', description: '', phone: '', email: '', address: '', tagline: '', hours: [{ days: '', time: '' }], services: [{ name: '', price: '', desc: '' }], testimonials: [], bookingUrl: '', socials: {}, team: [], mapUrl: '' },
    styleChoice: '', changes: '', notes: '', domain: '', consent: false,
  }
}
export const loadDraft = (id: TemplateId): Draft | null => read<Draft | null>(K.draft + id, null)
export const saveDraft = (d: Draft) => write(K.draft + d.templateId, d)
export const clearDraft = (id: TemplateId) => { try { localStorage.removeItem(K.draft + id) } catch { /* ignore */ } }

export interface RequestRecord {
  ref: string; createdAt: string; kind: 'customization' | 'publication'; draft: Draft; contactName: string; contactEmail: string; message: string; seconds?: number
}
export const listRequests = () => read<RequestRecord[]>(K.requests, [])

/** Demo submission. Replace body with a fetch() to your form service. */
export async function submitRequest(r: Omit<RequestRecord, 'ref' | 'createdAt'>): Promise<RequestRecord> {
  await new Promise((res) => setTimeout(res, 700))
  const rec: RequestRecord = { ...r, ref: 'SB-' + Math.random().toString(36).slice(2, 8).toUpperCase(), createdAt: new Date().toISOString() }
  if (!write(K.requests, [...listRequests(), rec])) throw new Error('Could not save in this browser (storage unavailable).')
  track('request_submitted', { template: r.draft.templateId, seconds: r.seconds })
  return rec
}

/** Privacy-friendly local analytics: no cookies, no third parties, no personal data. */
export function track(name: string, data: Record<string, unknown> = {}) {
  const events = read<{ name: string; at: number; data: Record<string, unknown> }[]>(K.events, [])
  events.push({ name, at: Date.now(), data })
  write(K.events, events.slice(-500))
}
export const markStarted = (id: TemplateId) => write(K.started + id, Date.now())
export const secondsSinceStarted = (id: TemplateId) => { const s = read<number | null>(K.started + id, null); return s ? Math.round((Date.now() - s) / 1000) : undefined }

export const saveFeedback = (f: Record<string, unknown>) => { write(K.feedback, [...read<unknown[]>(K.feedback, []), { ...f, at: Date.now() }]); track('feedback_submitted') }
