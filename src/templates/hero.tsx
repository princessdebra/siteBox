import { useId, useState } from 'react'
import type { SiteContent } from '../types'

/** Compact appointment request bar for the clinic hero. Preview only: it never sends data. */
export function QuickBook({ content, className = '' }: { content: SiteContent; className?: string }) {
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState('')
  const id = useId().replace(/:/g, '')
  const services = content.services.filter((s) => s.name.trim())
  const field = 'min-h-12 w-full rounded-xl border-2 border-[#b5ced3] bg-white px-3 text-base focus:border-[var(--brand)]'
  const label = 'mb-1 block text-sm font-bold'
  if (sent) {
    return (
      <div role="status" className={`fade-in flex items-center gap-3 rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/5 ${className}`}>
        <p className="font-bold">Preview only: nothing was sent.</p>
        <button type="button" className="press min-h-11 underline underline-offset-4" onClick={() => setSent(false)}>Try again</button>
      </div>
    )
  }
  return (
    <form noValidate aria-label="Request an appointment" onSubmit={(e) => { e.preventDefault(); const f = new FormData(e.currentTarget); if (!String(f.get('phone') || '').trim()) { setErr('Please add a phone number so we can reach you.'); return } setErr(''); setSent(true) }}
      className={`grid gap-4 rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-black/5 md:grid-cols-[1.2fr_1fr_1fr_auto] md:items-start ${className}`}>
      <div><label htmlFor={`s${id}`} className={label}>What do you need?</label>
        <select id={`s${id}`} name="service" className={field}><option value="">Not sure yet</option>{services.map((s) => <option key={s.name}>{s.name}</option>)}</select></div>
      <div><label htmlFor={`d${id}`} className={label}>Preferred day</label><input id={`d${id}`} name="date" type="date" className={field} /></div>
      <div><label htmlFor={`p${id}`} className={label}>Phone</label><input id={`p${id}`} name="phone" type="tel" autoComplete="tel" inputMode="tel" className={field} aria-invalid={!!err} aria-describedby={err ? `e${id}` : undefined} />
        {err && <p id={`e${id}`} role="alert" className="mt-1 text-sm font-medium text-red-700">{err}</p>}</div>
      <button type="submit" className="press min-h-12 rounded-xl bg-[var(--brand)] px-6 font-bold text-[var(--brand-ink)] hover:brightness-110 md:mt-6">Request appointment</button>
    </form>
  )
}
