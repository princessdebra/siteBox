import { useState } from 'react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import { CheckCircle2, Loader2, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { Page, btn } from '../components/Chrome'
import { byId } from '../data/templates'
import { loadDraft, secondsSinceStarted, submitRequest, track, type RequestRecord } from '../lib/store'
import { validEmail } from '../lib/content'

const input = 'min-h-12 w-full rounded-xl border border-[#cfc8b9] bg-white px-4 py-2.5 text-base focus:border-pine aria-[invalid=true]:border-red-700'

export default function Request() {
  const { id } = useParams()
  const [q] = useSearchParams()
  const t = byId(id)
  const draft = t ? loadDraft(t.id) : null
  const publication = q.get('kind') === 'publication'
  const [name, setName] = useState('')
  const [email, setEmail] = useState(draft?.content.email ?? '')
  const [message, setMessage] = useState(publication ? 'I am happy with the preview and would like to go ahead with publishing.' : '')
  const [agree, setAgree] = useState(false)
  const [errs, setErrs] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState<RequestRecord | null>(null)
  const [failMsg, setFailMsg] = useState('')
  if (!t) return <Navigate to="/templates" replace />
  if (!draft) return <Navigate to={`/customize/${t.id}`} replace />
  const c = draft.content

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const er: Record<string, string> = {}
    if (!name.trim()) er.name = 'Please tell us your name.'
    if (!validEmail(email)) er.email = 'Enter an email like name@example.com so we can reply.'
    if (!agree) er.agree = 'Please agree so we can contact you about this request.'
    setErrs(er); setFailMsg('')
    if (Object.keys(er).length) { track('request_invalid'); return }
    setBusy(true)
    try {
      const rec = await submitRequest({ kind: publication ? 'publication' : 'customization', draft: draft!, contactName: name.trim(), contactEmail: email.trim(), message: message.trim(), seconds: secondsSinceStarted(t!.id) })
      setDone(rec); toast.success('Request received'); window.scrollTo({ top: 0 })
    } catch (err) {
      track('request_failed'); setFailMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally { setBusy(false) }
  }

  if (done) return (
    <Page>
      <section className="mx-auto max-w-2xl px-5 pb-28 pt-16 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-pine text-white"><CheckCircle2 size={32} aria-hidden /></span>
        <h1 className="mt-6 font-display text-4xl text-pine md:text-5xl" tabIndex={-1} ref={(el) => el?.focus()}>Request received</h1>
        <p className="mt-3 text-lg text-ink-2">Thank you, {done.contactName.split(' ')[0]}. Your {done.kind === 'publication' ? 'review and publication' : 'customization'} request for <b>{c.businessName}</b> is saved.</p>
        <p className="mt-2 font-mono text-sm">Reference {done.ref}</p>
        <div role="note" className="mt-8 rounded-2xl border border-amber/60 bg-amber/20 p-5 text-left text-amber-ink">
          <p className="font-bold">Demo mode: nothing has been sent or published.</p>
          <p className="mt-1 text-sm">This request was stored only in this browser. In a live version it would be delivered to the SiteBox team, who would reply to {done.contactEmail}. Your website has <b>not</b> been published.</p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to={`/result/${t.id}`} className={btn.primary}>Back to my preview</Link>
          <Link to="/feedback" className={btn.ghost}>Tell us how it went</Link>
        </div>
      </section>
    </Page>
  )

  const summary: [string, string][] = [
    ['Template', t.name], ['Business', c.businessName], ['Phone', c.phone], ['Email', c.email], ['Address', c.address || 'Not provided'],
    ['Services', `${c.services.filter((s) => s.name.trim()).length} listed`], ['Colours', `${c.primary}${c.secondary ? ` / ${c.secondary}` : ''}`], ['Preferred domain', draft.domain || 'Not provided'], ['Requested changes', draft.changes || 'None'],
  ]
  return (
    <Page>
      <section className="mx-auto grid max-w-5xl gap-8 px-5 pb-28 pt-10 md:grid-cols-[1.1fr_.9fr]">
        <div>
          <Link to={`/result/${t.id}`} className="press inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-pine"><ArrowLeft size={16} aria-hidden /> Back to preview</Link>
          <h1 className="mt-2 font-display text-4xl text-pine md:text-5xl">{publication ? 'Request review & publication' : 'Submit customization request'}</h1>
          <p className="mt-2 text-ink-2">{publication ? 'Tell us you are ready and we will review your details before anything goes live.' : 'Send your details and requested changes so a designer can refine your site.'}</p>
          {failMsg && <p role="alert" className="mt-5 rounded-xl border border-red-300 bg-red-50 p-4 text-red-900">{failMsg} Your details are still here, so you can try again.</p>}
          <form noValidate onSubmit={submit} className="mt-6 space-y-5 rounded-3xl border border-line bg-white p-6">
            <div><label htmlFor="rn" className="mb-1.5 block font-semibold">Your name <span className="text-red-700" aria-hidden>*</span></label><input id="rn" className={input} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" aria-invalid={!!errs.name} aria-describedby={errs.name ? 'rn-e' : undefined} />{errs.name && <p id="rn-e" role="alert" className="mt-1 text-sm font-medium text-red-700">{errs.name}</p>}</div>
            <div><label htmlFor="re" className="mb-1.5 block font-semibold">Email for replies <span className="text-red-700" aria-hidden>*</span></label><input id="re" type="email" className={input} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" aria-invalid={!!errs.email} aria-describedby={errs.email ? 're-e' : undefined} />{errs.email && <p id="re-e" role="alert" className="mt-1 text-sm font-medium text-red-700">{errs.email}</p>}</div>
            <div><label htmlFor="rm" className="mb-1.5 block font-semibold">Message <span className="font-normal text-ink-2">(optional)</span></label><textarea id="rm" rows={4} className={input} value={message} onChange={(e) => setMessage(e.target.value)} maxLength={1000} /></div>
            <div><label className="flex items-start gap-3 text-sm"><input type="checkbox" className="mt-1 h-5 w-5 accent-[#1f3a34]" checked={agree} onChange={(e) => setAgree(e.target.checked)} aria-invalid={!!errs.agree} />I agree that SiteBox may contact me about this request using the details above.</label>{errs.agree && <p role="alert" className="mt-1 text-sm font-medium text-red-700">{errs.agree}</p>}</div>
            <button type="submit" disabled={busy} className={`${btn.primary} w-full disabled:opacity-70 sm:w-auto`}>{busy ? <><Loader2 className="animate-spin" size={18} aria-hidden /> Sending…</> : publication ? 'Request publication' : 'Submit request'}</button>
          </form>
        </div>
        <aside aria-label="Request summary" className="h-fit rounded-3xl border border-line bg-white p-6">
          <h2 className="text-lg font-bold">What you are sending</h2>
          <dl className="mt-3 divide-y divide-line text-sm">{summary.map(([k, v]) => <div key={k} className="flex justify-between gap-4 py-2"><dt className="text-ink-2">{k}</dt><dd className="break-words text-right font-medium">{v}</dd></div>)}</dl>
          <p className="mt-4 text-xs text-ink-2">Demo mode: requests are saved in this browser only. Wire up a form service in <code>src/lib/store.ts</code> to receive them.</p>
        </aside>
      </section>
    </Page>
  )
}
