import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Menu, X, MapPin, Phone, Mail, Clock, Globe, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import type { SiteContent } from '../types'
import { inkOn, isHex, withHash } from '../lib/color'

const IG = (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>)
const FB = (<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden><path d="M13.5 21v-7.5H16l.5-3h-3V8.6c0-.9.3-1.5 1.600-1.500h1.500V4.400C16.300 4.300 15.400 4.200 14.400 4.200 12.200 4.200 10.600 5.500 10.600 8v2.500H8v3h2.600V21z" /></svg>)
export const telHref = (p: string) => `tel:${p.replace(/[^\d+]/g, '')}`
export const isHttp = (u: string) => /^https?:\/\//i.test(u)
export const mapsSearch = (a: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a)}`

/** Wraps a template: injects brand colours as CSS variables and a skip link. */
export function Site({ content, children, className = '', style }: { content: SiteContent; children: ReactNode; className?: string; style?: CSSProperties }) {
  const p = isHex(content.primary) ? withHash(content.primary) : '#333333'
  const s = isHex(content.secondary) ? withHash(content.secondary) : p
  return (
    <div
      className={`site ${className}`}
      style={{ '--brand': p, '--brand-ink': inkOn(p), '--brand2': s, '--brand2-ink': inkOn(s), ...style } as CSSProperties}
    >
      <a href="#main" className="sr-only-focus fixed left-3 top-3 z-[100] rounded bg-white px-3 py-2 text-black">Skip to content</a>
      {children}
    </div>
  )
}

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') { setOn(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }, { rootMargin: '0px 0px -8% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${on ? 'in' : ''} ${className}`} style={{ transitionDelay: on ? `${delay}ms` : undefined }}>{children}</div>
}

/** Link that opens external booking URLs safely and falls back to an in-page anchor. */
export function Cta({ content, href, children, className = '' }: { content: SiteContent; href?: string; children: ReactNode; className?: string }) {
  const target = href ?? (content.bookingUrl || '#book')
  const external = isHttp(target)
  return (
    <a href={external ? target : target.startsWith('#') ? target : '#book'} className={`press inline-flex items-center justify-center gap-2 ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}{external && <ArrowUpRight size={16} aria-hidden />}
    </a>
  )
}

export function Logo({ content, className = '', markClass = '' }: { content: SiteContent; className?: string; markClass?: string }) {
  const name = content.businessName || 'Your Business'
  const initials = name.split(/\s+/).filter((w) => /[a-z0-9]/i.test(w[0])).slice(0, 2).map((w) => w[0]).join('').toUpperCase()
  if (content.logoUrl) return <img src={content.logoUrl} alt={`${name} logo`} className="h-10 w-auto max-w-[160px] object-contain" />
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span aria-hidden className={`grid h-9 w-9 place-items-center rounded-full text-sm font-bold ${markClass}`} style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}>{initials || 'B'}</span>
      <span className="leading-tight">{name}</span>
    </span>
  )
}

export function Nav({ content, links, ctaLabel, theme }: {
  content: SiteContent; links: [string, string][]; ctaLabel: string
  theme: { bar: string; link: string; cta: string; menu: string; logo?: string }
}) {
  const [open, setOpen] = useState(false)
  return (
    <header className={`sticky top-0 z-50 ${theme.bar}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="min-h-11 inline-flex items-center"><Logo content={content} className={theme.logo} /></a>
        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {links.map(([l, h]) => <a key={h} href={h} className={`${theme.link} inline-flex min-h-11 items-center text-sm`}>{l}</a>)}
          <Cta content={content} className={`${theme.cta} min-h-11 px-5 text-sm`}>{ctaLabel}</Cta>
        </nav>
        <button className="press grid h-11 w-11 place-items-center md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <nav aria-label="Mobile" className={`fade-in border-t px-5 pb-5 pt-2 md:hidden ${theme.menu}`}>
          {links.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className={`block min-h-11 py-3 text-base ${theme.link}`}>{l}</a>)}
          <Cta content={content} className={`${theme.cta} mt-2 min-h-12 w-full px-5`}>{ctaLabel}</Cta>
        </nav>
      )}
    </header>
  )
}

export const cleanHours = (c: SiteContent) => c.hours.filter((h) => h.days.trim() || h.time.trim())

export function Hours({ content, className = '', rowClass = '' }: { content: SiteContent; className?: string; rowClass?: string }) {
  const rows = cleanHours(content)
  if (!rows.length) return <p className={className}>Contact us for opening hours.</p>
  return (
    <dl className={className}>
      {rows.map((h, i) => (
        <div key={i} className={`flex justify-between gap-4 py-2.5 ${rowClass}`}>
          <dt className="font-medium">{h.days}</dt><dd className="text-right tabular-nums">{h.time}</dd>
        </div>
      ))}
    </dl>
  )
}

export function MapBlock({ content, className = '', tone = 'light' }: { content: SiteContent; className?: string; tone?: 'light' | 'dark' }) {
  const [failed, setFailed] = useState(false)
  const addr = content.address.trim()
  const embed = content.mapUrl?.trim() || (!content.isSample && addr ? `https://www.google.com/maps?q=${encodeURIComponent(addr)}&output=embed` : '')
  const dark = tone === 'dark'
  if (embed && !failed && isHttp(embed)) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <iframe title={`Map showing ${content.businessName} location`} src={embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full min-h-72 w-full border-0" onError={() => setFailed(true)} />
      </div>
    )
  }
  return (
    <div className={`relative grid min-h-72 place-items-center overflow-hidden p-6 text-center ${dark ? 'bg-white/5 text-white' : 'bg-black/[0.04] text-inherit'} ${className}`}
      style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', backgroundSize: '36px 36px', backgroundBlendMode: 'normal' }}>
      <div className="absolute inset-0 opacity-90" style={{ background: dark ? 'rgb(0 0 0 / .72)' : 'rgb(255 255 255 / .86)' }} />
      <div className="relative">
        <span className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full" style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}><MapPin aria-hidden /></span>
        <p className="font-semibold">{addr || 'Location shown here'}</p>
        <p className="mt-1 text-sm opacity-70">{content.isSample ? 'Map placeholder. Your real map appears here.' : 'Map unavailable. Use the link below.'}</p>
        {addr && <a href={mapsSearch(addr)} target="_blank" rel="noopener noreferrer" className="press mt-4 inline-flex min-h-11 items-center gap-1.5 underline underline-offset-4">Open in Google Maps <ArrowUpRight size={15} aria-hidden /></a>}
      </div>
    </div>
  )
}

export function ContactLines({ content, className = '', iconClass = '' }: { content: SiteContent; className?: string; iconClass?: string }) {
  const row = 'flex items-start gap-3'
  const ic = `mt-0.5 shrink-0 ${iconClass}`
  return (
    <ul className={`space-y-3 ${className}`}>
      {content.phone && <li className={row}><Phone size={18} className={ic} aria-hidden /><a href={telHref(content.phone)} className="min-h-6 underline-offset-4 hover:underline">{content.phone}</a></li>}
      {content.email && <li className={row}><Mail size={18} className={ic} aria-hidden /><a href={`mailto:${content.email}`} className="break-all underline-offset-4 hover:underline">{content.email}</a></li>}
      {content.address && <li className={row}><MapPin size={18} className={ic} aria-hidden /><span>{content.address}</span></li>}
      {!content.phone && !content.email && !content.address && <li className={row}><Clock size={18} className={ic} aria-hidden />Contact details coming soon.</li>}
    </ul>
  )
}

export function Socials({ content, className = '' }: { content: SiteContent; className?: string }) {
  const items: [string, string | undefined, ReactNode][] = [
    ['Instagram', content.socials.instagram, IG],
    ['Facebook', content.socials.facebook, FB],
    ['Website', content.socials.website, <Globe size={18} key="w" />],
  ]
  const shown = items.filter(([, u]) => u)
  if (!shown.length) return null
  return (
    <ul className={`flex gap-2 ${className}`}>
      {shown.map(([label, url, icon]) => (
        <li key={label}><a href={url} aria-label={`${content.businessName || 'Business'} on ${label}`} {...(isHttp(url!) ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="press grid h-11 w-11 place-items-center rounded-full border border-current/25 hover:bg-white/10">{icon}</a></li>
      ))}
    </ul>
  )
}

/** Honest disclaimer shown under testimonials. */
export function TestimonialNote({ content, className = '' }: { content: SiteContent; className?: string }) {
  return (
    <p className={`mt-6 text-xs opacity-75 ${className}`}>
      {content.isSample
        ? 'Sample testimonials for illustration only. They are fictional and are not real customer reviews.'
        : 'Testimonials were supplied by the business owner and have not been independently verified.'}
    </p>
  )
}

/** Inquiry form for preview sites. Never sends data anywhere in demo/preview mode. */
export function InquiryForm({ content, fields, submitLabel, messageLabel, note, cls }: {
  content: SiteContent; fields: ('date' | 'time' | 'guests' | 'service')[]; submitLabel: string; messageLabel: string; note?: string
  cls: { label: string; input: string; btn: string; ok: string }
}) {
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState('')
  const id = useId().replace(/:/g, '')
  const opts = content.services.filter((s) => s.name.trim())
  return sent ? (
    <div role="status" className={`fade-in flex items-start gap-3 rounded-xl p-5 ${cls.ok}`}>
      <CheckCircle2 aria-hidden className="mt-0.5 shrink-0" />
      <div><p className="font-semibold">Preview only: nothing was sent.</p>
        <p className="mt-1 text-sm opacity-80">On your live website, this form delivers the message to {content.email || 'your inbox'}.</p>
        <button className="press mt-3 min-h-11 underline underline-offset-4" onClick={() => setSent(false)}>Try again</button></div>
    </div>
  ) : (
    <form noValidate onSubmit={(e) => { e.preventDefault(); const f = new FormData(e.currentTarget); if (!String(f.get('name') || '').trim() || !String(f.get('contact') || '').trim()) { setErr('Please add your name and a phone or email.'); return } setErr(''); setSent(true) }} className="grid gap-4 sm:grid-cols-2">
      <div><label htmlFor={`n${id}`} className={cls.label}>Your name</label><input id={`n${id}`} name="name" autoComplete="name" className={cls.input} /></div>
      <div><label htmlFor={`c${id}`} className={cls.label}>Phone or email</label><input id={`c${id}`} name="contact" autoComplete="email" className={cls.input} /></div>
      {fields.includes('date') && <div><label htmlFor={`d${id}`} className={cls.label}>Preferred date</label><input id={`d${id}`} name="date" type="date" className={cls.input} /></div>}
      {fields.includes('time') && <div><label htmlFor={`t${id}`} className={cls.label}>Preferred time</label><input id={`t${id}`} name="time" type="time" className={cls.input} /></div>}
      {fields.includes('guests') && <div><label htmlFor={`g${id}`} className={cls.label}>Guests</label><select id={`g${id}`} name="guests" className={cls.input}>{[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n}>{n}</option>)}</select></div>}
      {fields.includes('service') && opts.length > 0 && <div><label htmlFor={`s${id}`} className={cls.label}>Service</label><select id={`s${id}`} name="service" className={cls.input}><option value="">Not sure yet</option>{opts.map((s, i) => <option key={i}>{s.name}</option>)}</select></div>}
      <div className="sm:col-span-2"><label htmlFor={`m${id}`} className={cls.label}>{messageLabel}</label><textarea id={`m${id}`} name="message" rows={3} className={cls.input} /></div>
      {err && <p role="alert" className="text-sm font-medium sm:col-span-2">{err}</p>}
      <div className="sm:col-span-2">
        <button type="submit" className={`${cls.btn} press min-h-12 px-7`}>{submitLabel}</button>
        {note && <p className="mt-3 text-xs opacity-75">{note}</p>}
      </div>
    </form>
  )
}

export const footerYear = new Date().getFullYear()

/** Hero headline for a real business: owner's headline or a neutral welcome. Null for sample sites (templates use their own copy). */
export const customHeadline = (c: SiteContent): string | null => (c.isSample ? null : c.headline?.trim() || `Welcome to ${c.businessName || 'our business'}`)

export { Carousel, AmbientVideo, SlowZoom } from './media'
