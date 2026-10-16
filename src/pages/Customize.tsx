import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Eye, Plus, Trash2, Upload, X } from 'lucide-react'
import { toast } from 'sonner'
import { byId, TEMPLATES } from '../data/templates'
import { Header, btn } from '../components/Chrome'
import { DeviceFrame } from '../components/DeviceFrame'
import { emptyDraft, loadDraft, saveDraft, markStarted, track } from '../lib/store'
import { isHex, withHash } from '../lib/color'
import { validEmail, validPhone, validUrl } from '../lib/content'
import type { Draft } from '../types'

const STEPS = ['Business', 'Branding', 'Services & content', 'Requests']
const SWATCHES = ['#A8506B', '#C8553D', '#1B2A49', '#0E7C86', '#FF5A1F', '#2F6B4F', '#6D4AFF', '#222222']
const STYLES = ['Keep the template style', 'Softer and more elegant', 'Bolder and more modern', 'Simpler and more minimal', 'Something else (describe below)']
const input = 'min-h-12 w-full rounded-xl border border-[#cfc8b9] bg-white px-4 py-2.5 text-base placeholder:text-ink-2/60 focus:border-pine aria-[invalid=true]:border-red-700'

type Errors = Record<string, string>

function Field({ id, label, required, hint, error, children }: { id: string; label: string; required?: boolean; hint?: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[15px] font-semibold">{label}{required ? <span className="text-red-700" aria-hidden> *</span> : <span className="font-normal text-ink-2"> (optional)</span>}</label>
      {children}
      {hint && <p id={`${id}-h`} className="mt-1.5 text-sm text-ink-2">{hint}</p>}
      {error && <p id={`${id}-e`} role="alert" className="mt-1.5 text-sm font-medium text-red-700">{error}</p>}
    </div>
  )
}
const d = (id: string, hint?: boolean, error?: string) => ({ id, 'aria-invalid': !!error, 'aria-describedby': [hint ? `${id}-h` : '', error ? `${id}-e` : ''].join(' ').trim() || undefined })

export default function Customize() {
  const { id } = useParams()
  const t = byId(id)
  if (!t) return <Navigate to="/templates" replace />
  return <Form key={t.id} tid={t.id} />
}

function Form({ tid }: { tid: Draft['templateId'] }) {
  const t = byId(tid)!
  const nav = useNavigate()
  const [draft, setDraft] = useState<Draft>(() => loadDraft(tid) ?? emptyDraft(tid))
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<Errors>({})
  const [showPreview, setShowPreview] = useState(false)
  const summaryRef = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLIFrameElement>(null)
  const c = draft.content
  const setC = (patch: Partial<Draft['content']>) => setDraft((p) => ({ ...p, content: { ...p.content, ...patch } }))

  useEffect(() => { markStarted(tid); track('customize_start', { template: tid }) }, [tid])
  useEffect(() => { const h = setTimeout(() => saveDraft(draft), 300); return () => clearTimeout(h) }, [draft])

  const post = useCallback(() => frame.current?.contentWindow?.postMessage({ type: 'sitebox:draft', draft }, location.origin), [draft])
  useEffect(() => { post() }, [post, showPreview])
  useEffect(() => {
    const on = (e: MessageEvent) => { if (e.origin === location.origin && e.data?.type === 'sitebox:ready') post() }
    window.addEventListener('message', on); return () => window.removeEventListener('message', on)
  }, [post])

  function validate(s: number): Errors {
    const e: Errors = {}
    if (s === 0) {
      if (!c.businessName.trim()) e.businessName = 'Enter your business name, for example “Sunrise Hair Studio”.'
      if (!c.description.trim()) e.description = 'Add one or two sentences about what you do.'
      else if (c.description.trim().length < 20) e.description = 'A little more detail please (at least 20 characters).'
      if (!c.phone.trim()) e.phone = 'Enter a phone number customers can call.'
      else if (!validPhone(c.phone)) e.phone = 'That phone number looks too short.'
      if (!c.email.trim()) e.email = 'Enter an email address for enquiries.'
      else if (!validEmail(c.email)) e.email = 'Enter an email like name@example.com.'
    }
    if (s === 1) {
      if (!isHex(c.primary)) e.primary = 'Use a hex colour such as #A8506B, or pick one with the colour picker.'
      if (c.secondary && !isHex(c.secondary)) e.secondary = 'Use a hex colour such as #C9A27E, or leave blank.'
    }
    if (s === 2) {
      if (!c.services.some((x) => x.name.trim())) e.service0 = 'Add at least one service.'
      if (c.bookingUrl && !validUrl(c.bookingUrl)) e.bookingUrl = 'Enter a full link starting with https://'
      for (const k of ['instagram', 'facebook', 'website'] as const) if (c.socials[k] && !validUrl(c.socials[k]!)) e[k] = 'Enter a full link starting with https://'
      if (c.testimonials.some((x) => x.quote.trim()) && !draft.consent) e.consent = 'Please confirm you have permission to publish these testimonials.'
    }
    if (s === 3) { if (c.mapUrl && !validUrl(c.mapUrl)) e.mapUrl = 'Enter a full link starting with https://' }
    return e
  }
  const fail = (e: Errors) => { setErrors(e); setTimeout(() => summaryRef.current?.focus(), 30) }
  const next = () => { const e = validate(step); if (Object.keys(e).length) return fail(e); setErrors({}); setStep(step + 1); window.scrollTo({ top: 0 }) }
  const finish = () => {
    for (let s = 0; s < 4; s++) { const e = validate(s); if (Object.keys(e).length) { setStep(s); return fail(e) } }
    saveDraft(draft); track('customize_complete', { template: tid }); nav(`/result/${tid}`)
  }
  const swapTemplate = (nid: string) => { saveDraft({ ...draft, templateId: nid as Draft['templateId'] }); nav(`/customize/${nid}`) }

  function onLogo(f?: File) {
    if (!f) return
    if (!/^image\/(png|jpe?g|webp|svg\+xml)$/.test(f.type)) return toast.error('Please upload a PNG, JPG, WebP or SVG image.')
    if (f.size > 400_000) return toast.error('That logo is over 400 KB. Please upload a smaller file.')
    const r = new FileReader(); r.onload = () => { setC({ logoUrl: String(r.result) }); toast.success('Logo added') }; r.readAsDataURL(f)
  }

  const errList = Object.entries(errors)
  const row = 'grid gap-3 rounded-2xl border border-line bg-paper p-4'

  return (
    <div className="min-h-dvh">
      <Header />
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 lg:grid-cols-[minmax(0,640px)_1fr]">
        <main id="main">
          <Link to="/templates" className="press inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-pine"><ArrowLeft size={16} aria-hidden /> All templates</Link>
          <h1 className="mt-2 font-display text-4xl text-pine md:text-5xl">Customize {t.name}</h1>
          <p className="mt-2 text-ink-2">Only the starred fields are required. Your progress saves automatically in this browser.</p>

          <ol aria-label="Progress" className="mt-6 grid grid-cols-4 gap-2">
            {STEPS.map((s, i) => (
              <li key={s} aria-current={i === step ? 'step' : undefined}>
                <button onClick={() => i < step && setStep(i)} disabled={i > step} className={`block w-full text-left ${i < step ? 'press cursor-pointer' : ''}`}>
                  <span className={`block h-1.5 rounded-full transition-colors ${i <= step ? 'bg-pine' : 'bg-line'}`} />
                  <span className={`mt-2 block text-xs font-semibold sm:text-sm ${i === step ? 'text-pine' : 'text-ink-2'}`}><span className="sr-only">Step {i + 1}: </span>{i < step && <Check size={13} className="mr-0.5 inline" aria-hidden />}{s}</span>
                </button>
              </li>
            ))}
          </ol>

          {errList.length > 0 && (
            <div ref={summaryRef} tabIndex={-1} role="alert" className="mt-6 rounded-2xl border border-red-300 bg-red-50 p-4 text-red-900">
              <p className="font-semibold">Please fix {errList.length === 1 ? 'this' : `these ${errList.length} items`} to continue:</p>
              <ul className="mt-1 list-disc pl-5 text-sm">{errList.map(([k, m]) => <li key={k}><a className="underline" href={`#${k}`}>{m}</a></li>)}</ul>
            </div>
          )}

          <form noValidate onSubmit={(e) => { e.preventDefault(); step < 3 ? next() : finish() }} className="mt-6 space-y-6 rounded-3xl border border-line bg-white p-5 sm:p-7">
            {step === 0 && <>
              <Field id="industry" label="Industry" required hint="Switching keeps what you have typed so far.">
                <select id="industry" value={tid} onChange={(e) => swapTemplate(e.target.value)} className={input}>{TEMPLATES.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select></Field>
              <Field label="Business name" required id="businessName" error={errors.businessName}><input {...d('businessName', false, errors.businessName)} className={input} value={c.businessName} onChange={(e) => setC({ businessName: e.target.value })} placeholder="e.g. Sunrise Hair Studio" autoComplete="organization" maxLength={60} /></Field>
              <Field label="Website headline" id="headline" hint="The big line at the top of your site. Leave blank for “Welcome to your business name”."><input id="headline" className={input} value={c.headline ?? ''} onChange={(e) => setC({ headline: e.target.value })} maxLength={70} placeholder="e.g. Home cooking, made with love" /></Field>
              <Field label="Short tagline" hint="A few words under your name, e.g. “Hair · Colour · Nails”." id="tagline"><input id="tagline" className={input} value={c.tagline} onChange={(e) => setC({ tagline: e.target.value })} maxLength={70} /></Field>
              <Field label="Short description" required id="description" error={errors.description} hint="What you do, and who you do it for. 1–2 sentences."><textarea {...d('description', true, errors.description)} rows={3} className={input} value={c.description} onChange={(e) => setC({ description: e.target.value })} maxLength={280} /></Field>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Phone" required id="phone" error={errors.phone}><input {...d('phone', false, errors.phone)} type="tel" inputMode="tel" autoComplete="tel" className={input} value={c.phone} onChange={(e) => setC({ phone: e.target.value })} placeholder="0712 345 678" /></Field>
                <Field label="Email" required id="email" error={errors.email}><input {...d('email', false, errors.email)} type="email" autoComplete="email" className={input} value={c.email} onChange={(e) => setC({ email: e.target.value })} placeholder="hello@yourbusiness.com" /></Field>
              </div>
              <Field label="Address" id="address" hint="Shown with a map on your site."><input id="address" className={input} value={c.address} onChange={(e) => setC({ address: e.target.value })} autoComplete="street-address" placeholder="Street, area, Nairobi" /></Field>
              <fieldset><legend className="mb-1.5 text-[15px] font-semibold">Opening hours <span className="font-normal text-ink-2">(optional)</span></legend>
                <div className="space-y-2">
                  {c.hours.map((h, i) => (
                    <div key={i} className="flex gap-2">
                      <input aria-label={`Days, row ${i + 1}`} className={input} placeholder="Mon to Fri" value={h.days} onChange={(e) => setC({ hours: c.hours.map((x, j) => (j === i ? { ...x, days: e.target.value } : x)) })} />
                      <input aria-label={`Times, row ${i + 1}`} className={input} placeholder="9:00 am to 5:00 pm" value={h.time} onChange={(e) => setC({ hours: c.hours.map((x, j) => (j === i ? { ...x, time: e.target.value } : x)) })} />
                      <button type="button" aria-label={`Remove hours row ${i + 1}`} onClick={() => setC({ hours: c.hours.filter((_, j) => j !== i) })} className="press grid h-12 w-12 shrink-0 place-items-center rounded-xl text-ink-2 hover:bg-black/5"><X size={18} /></button>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => setC({ hours: [...c.hours, { days: '', time: '' }] })} className={`${btn.small} mt-2 border border-line text-pine`}><Plus size={15} aria-hidden /> Add hours</button></fieldset>
            </>}

            {step === 1 && <>
              <fieldset><legend className="mb-1.5 text-[15px] font-semibold">Primary colour <span className="text-red-700" aria-hidden>*</span></legend>
                <div className="flex flex-wrap items-center gap-3">
                  <input type="color" aria-label="Pick primary colour" value={isHex(c.primary) ? withHash(c.primary).slice(0, 7) : '#000000'} onChange={(e) => setC({ primary: e.target.value })} className="h-12 w-14 cursor-pointer rounded-lg border border-[#cfc8b9] bg-white p-1" />
                  <input {...d('primary', true, errors.primary)} className={`${input} !w-36 font-mono`} value={c.primary} onChange={(e) => setC({ primary: e.target.value })} aria-label="Primary colour hex" />
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Suggested colours">{SWATCHES.map((s) => <button type="button" key={s} aria-label={`Use ${s}`} aria-pressed={c.primary.toLowerCase() === s.toLowerCase()} onClick={() => setC({ primary: s })} className="press h-9 w-9 rounded-full ring-2 ring-white outline outline-1 outline-black/15 aria-pressed:outline-[3px] aria-pressed:outline-pine" style={{ background: s }} />)}</div>
                </div>
                <p id="primary-h" className="mt-1.5 text-sm text-ink-2">Used for buttons and accents. Text colour adjusts automatically for readability.</p>
                {errors.primary && <p id="primary-e" role="alert" className="mt-1 text-sm font-medium text-red-700">{errors.primary}</p>}</fieldset>
              <Field label="Secondary colour" id="secondary" error={errors.secondary} hint="Leave blank to use a matching accent."><div className="flex gap-3"><input type="color" aria-label="Pick secondary colour" value={isHex(c.secondary) ? withHash(c.secondary).slice(0, 7) : '#c9a27e'} onChange={(e) => setC({ secondary: e.target.value })} className="h-12 w-14 cursor-pointer rounded-lg border border-[#cfc8b9] bg-white p-1" /><input {...d('secondary', true, errors.secondary)} className={`${input} !w-36 font-mono`} value={c.secondary} onChange={(e) => setC({ secondary: e.target.value })} placeholder="#C9A27E" /></div></Field>
              <fieldset><legend className="mb-1.5 text-[15px] font-semibold">Logo <span className="font-normal text-ink-2">(optional)</span></legend>
                <div className="flex flex-wrap items-center gap-3">
                  {c.logoUrl ? <><img src={c.logoUrl} alt="Your uploaded logo" className="h-14 max-w-40 rounded-lg border border-line bg-white object-contain p-1" /><button type="button" className={`${btn.small} border border-line`} onClick={() => setC({ logoUrl: undefined })}>Use text logo instead</button></>
                    : <p className="rounded-xl bg-paper px-4 py-3 text-sm">No logo? We will use your business name as a text logo.</p>}
                  <label className={`${btn.small} cursor-pointer border border-line bg-white text-pine focus-within:outline focus-within:outline-[3px] focus-within:outline-amber`}><Upload size={15} aria-hidden /> {c.logoUrl ? 'Replace' : 'Upload logo'}<input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" className="sr-only" onChange={(e) => onLogo(e.target.files?.[0])} /></label>
                </div>
                <p className="mt-1.5 text-sm text-ink-2">PNG, JPG, WebP or SVG, up to 400 KB. Stays in your browser in this demo.</p></fieldset>
              <Field label="Style preference" id="style"><select id="style" className={input} value={draft.styleChoice} onChange={(e) => setDraft({ ...draft, styleChoice: e.target.value })}><option value="">No preference</option>{STYLES.map((s) => <option key={s}>{s}</option>)}</select></Field>
            </>}

            {step === 2 && <>
              <fieldset><legend className="mb-1.5 text-[15px] font-semibold">Services <span className="text-red-700" aria-hidden>*</span></legend>
                <p className="mb-3 text-sm text-ink-2">Prices and descriptions are optional. Example: “Haircut · KSh 1,500 · Includes wash and style”.</p>
                <div className="space-y-3">
                  {c.services.map((s, i) => (
                    <div key={i} className={row}>
                      <div className="grid gap-3 sm:grid-cols-[1fr_9rem]">
                        <input {...(i === 0 ? d('service0', false, errors.service0) : {})} aria-label={`Service ${i + 1} name`} className={input} placeholder="Service name" value={s.name} onChange={(e) => setC({ services: c.services.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)) })} maxLength={60} />
                        <input aria-label={`Service ${i + 1} price`} className={input} placeholder="e.g. KSh 1,500" value={s.price ?? ''} onChange={(e) => setC({ services: c.services.map((x, j) => (j === i ? { ...x, price: e.target.value } : x)) })} maxLength={20} />
                      </div>
                      <div className="flex gap-2"><input aria-label={`Service ${i + 1} description`} className={input} placeholder="Short description (optional)" value={s.desc ?? ''} onChange={(e) => setC({ services: c.services.map((x, j) => (j === i ? { ...x, desc: e.target.value } : x)) })} maxLength={110} />
                        {c.services.length > 1 && <button type="button" aria-label={`Remove service ${i + 1}`} onClick={() => setC({ services: c.services.filter((_, j) => j !== i) })} className="press grid h-12 w-12 shrink-0 place-items-center rounded-xl text-ink-2 hover:bg-black/5"><Trash2 size={18} /></button>}</div>
                    </div>
                  ))}
                </div>
                {errors.service0 && <p id="service0-e" role="alert" className="mt-2 text-sm font-medium text-red-700">{errors.service0}</p>}
                {c.services.length < 12 && <button type="button" onClick={() => setC({ services: [...c.services, { name: '', price: '', desc: '' }] })} className={`${btn.small} mt-3 border border-line text-pine`}><Plus size={15} aria-hidden /> Add a service</button>}</fieldset>
              <Field label="Booking, reservation or consultation link" id="bookingUrl" error={errors.bookingUrl} hint="Your existing booking page. Buttons on your site will open it. Leave blank to use the built-in request form."><input {...d('bookingUrl', true, errors.bookingUrl)} type="url" className={input} value={c.bookingUrl} onChange={(e) => setC({ bookingUrl: e.target.value })} placeholder="https://" /></Field>
              <fieldset><legend className="mb-1.5 text-[15px] font-semibold">Social links <span className="font-normal text-ink-2">(optional)</span></legend>
                <div className="grid gap-3 sm:grid-cols-3">{(['instagram', 'facebook', 'website'] as const).map((k) => (
                  <div key={k}><input {...d(k, false, errors[k])} aria-label={k[0].toUpperCase() + k.slice(1) + ' link'} placeholder={k[0].toUpperCase() + k.slice(1) + ' link'} className={input} value={c.socials[k] ?? ''} onChange={(e) => setC({ socials: { ...c.socials, [k]: e.target.value } })} />{errors[k] && <p id={`${k}-e`} role="alert" className="mt-1 text-sm font-medium text-red-700">{errors[k]}</p>}</div>))}</div></fieldset>
              <fieldset><legend className="mb-1.5 text-[15px] font-semibold">Customer testimonials <span className="font-normal text-ink-2">(optional)</span></legend>
                <p className="mb-3 text-sm text-ink-2">Only add real feedback you have permission to publish. {tid === 'clinic' && 'For healthcare, avoid any health details.'}</p>
                <div className="space-y-3">{c.testimonials.map((x, i) => (
                  <div key={i} className={row}><textarea aria-label={`Testimonial ${i + 1}`} rows={2} className={input} placeholder="What the customer said" value={x.quote} onChange={(e) => setC({ testimonials: c.testimonials.map((y, j) => (j === i ? { ...y, quote: e.target.value } : y)) })} maxLength={240} />
                    <div className="flex gap-2"><input aria-label={`Testimonial ${i + 1} name`} className={input} placeholder="First name or initials" value={x.name} onChange={(e) => setC({ testimonials: c.testimonials.map((y, j) => (j === i ? { ...y, name: e.target.value } : y)) })} maxLength={40} />
                      <button type="button" aria-label={`Remove testimonial ${i + 1}`} onClick={() => setC({ testimonials: c.testimonials.filter((_, j) => j !== i) })} className="press grid h-12 w-12 shrink-0 place-items-center rounded-xl text-ink-2 hover:bg-black/5"><Trash2 size={18} /></button></div></div>))}</div>
                {c.testimonials.length < 4 && <button type="button" onClick={() => setC({ testimonials: [...c.testimonials, { quote: '', name: '' }] })} className={`${btn.small} mt-3 border border-line text-pine`}><Plus size={15} aria-hidden /> Add a testimonial</button>}
                {c.testimonials.some((x) => x.quote.trim()) && <div className="mt-3"><label className="flex items-start gap-3 text-sm"><input id="consent" type="checkbox" className="mt-1 h-5 w-5 accent-[#1f3a34]" checked={draft.consent} onChange={(e) => setDraft({ ...draft, consent: e.target.checked })} aria-invalid={!!errors.consent} />I confirm these are genuine and I have permission to publish them.</label>{errors.consent && <p role="alert" className="mt-1 text-sm font-medium text-red-700">{errors.consent}</p>}</div>}</fieldset>
              <fieldset><legend className="mb-1.5 text-[15px] font-semibold">Team members <span className="font-normal text-ink-2">(optional)</span></legend>
                <div className="space-y-2">{c.team.map((p, i) => (
                  <div key={i} className="flex gap-2"><input aria-label={`Team member ${i + 1} name`} className={input} placeholder="Name" value={p.name} onChange={(e) => setC({ team: c.team.map((y, j) => (j === i ? { ...y, name: e.target.value } : y)) })} maxLength={40} />
                    <input aria-label={`Team member ${i + 1} role`} className={input} placeholder="Role" value={p.role} onChange={(e) => setC({ team: c.team.map((y, j) => (j === i ? { ...y, role: e.target.value } : y)) })} maxLength={40} />
                    <button type="button" aria-label={`Remove team member ${i + 1}`} onClick={() => setC({ team: c.team.filter((_, j) => j !== i) })} className="press grid h-12 w-12 shrink-0 place-items-center rounded-xl text-ink-2 hover:bg-black/5"><Trash2 size={18} /></button></div>))}</div>
                {c.team.length < 6 && <button type="button" onClick={() => setC({ team: [...c.team, { name: '', role: '', bio: '' }] })} className={`${btn.small} mt-2 border border-line text-pine`}><Plus size={15} aria-hidden /> Add a team member</button>}
                <p className="mt-1.5 text-sm text-ink-2">Photos can be sent after you submit your request.</p></fieldset>
            </>}

            {step === 3 && <>
              <Field label="Changes you would like" id="changes" hint="Layout, wording, colours or sections. Example: “Add a gallery”, “Make the booking button larger”."><textarea id="changes" rows={4} className={input} value={draft.changes} onChange={(e) => setDraft({ ...draft, changes: e.target.value })} maxLength={1000} /></Field>
              <Field label="Additional notes" id="notes"><textarea id="notes" rows={3} className={input} value={draft.notes} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} maxLength={1000} /></Field>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Preferred domain name" id="domain" hint="Example: sunrisehair.co.ke. We will check availability."><input id="domain" className={input} value={draft.domain} onChange={(e) => setDraft({ ...draft, domain: e.target.value })} placeholder="yourbusiness.co.ke" autoCapitalize="none" /></Field>
                <Field label="Google Maps embed link" id="mapUrl" error={errors.mapUrl} hint="Optional. Otherwise we use your address."><input {...d('mapUrl', true, errors.mapUrl)} type="url" className={input} value={c.mapUrl ?? ''} onChange={(e) => setC({ mapUrl: e.target.value })} placeholder="https://www.google.com/maps/embed?..." /></Field>
              </div>
              <p className="rounded-xl bg-paper p-4 text-sm text-ink-2">Next you will see your personalized preview. Nothing is published or sent until you submit a request there.</p>
            </>}

            <div className="flex items-center justify-between gap-3 border-t border-line pt-5">
              <button type="button" disabled={step === 0} onClick={() => { setErrors({}); setStep(step - 1) }} className={`${btn.ghost} disabled:invisible`}><ArrowLeft size={17} aria-hidden /> Back</button>
              <button type="submit" className={btn.primary}>{step < 3 ? <>Continue <ArrowRight size={17} aria-hidden /></> : <>See my preview <Eye size={17} aria-hidden /></>}</button>
            </div>
          </form>
        </main>

        {/* Live preview (desktop sticky; mobile overlay) */}
        <aside aria-label="Live preview" className={`${showPreview ? 'fixed inset-0 z-50 flex flex-col bg-paper' : 'hidden'} lg:sticky lg:top-4 lg:z-0 lg:flex lg:h-[calc(100dvh-2rem)] lg:flex-col lg:self-start lg:overflow-hidden lg:rounded-3xl lg:border lg:border-line`}>
          <div className="flex items-center justify-between gap-3 border-b border-line bg-white px-4 py-2">
            <p className="text-sm font-semibold">Live preview <span className="font-normal text-ink-2">· blank fields show sample text</span></p>
            <button className="press min-h-10 rounded-full px-3 text-sm font-semibold text-pine lg:hidden" onClick={() => setShowPreview(false)}>Close</button>
          </div>
          <div className="min-h-0 flex-1"><DeviceFrame frameRef={frame} src={`/site/${tid}?custom=1&live=1`} device="desktop" title="Live preview of your website" onLoad={post} /></div>
        </aside>
      </div>
      <button className={`${btn.amber} fixed bottom-4 right-4 z-40 shadow-lg lg:hidden`} onClick={() => setShowPreview(true)}><Eye size={17} aria-hidden /> Live preview</button>
    </div>
  )
}
