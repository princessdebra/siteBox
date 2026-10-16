import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Page, btn } from '../components/Chrome'
import { saveFeedback } from '../lib/store'

const SCALE = ['Not at all', 'Somewhat', 'Yes, very']
const input = 'min-h-12 w-full rounded-xl border border-[#cfc8b9] bg-white px-4 py-2.5 text-base focus:border-pine'

function Choice({ name, legend, options }: { name: string; legend: string; options: string[] }) {
  return (
    <fieldset><legend className="mb-2 font-semibold">{legend}</legend>
      <div className="flex flex-wrap gap-2">{options.map((o) => (
        <label key={o} className="press relative cursor-pointer"><input type="radio" name={name} value={o} className="peer sr-only" required />
          <span className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-5 text-sm font-semibold peer-checked:border-pine peer-checked:bg-pine peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-amber">{o}</span></label>))}</div></fieldset>
  )
}

export default function Feedback() {
  const [done, setDone] = useState(false)
  return (
    <Page>
      <section className="mx-auto max-w-2xl px-5 pb-28 pt-12">
        <h1 className="font-display text-4xl text-pine md:text-5xl">How did we do?</h1>
        <p className="mt-2 text-ink-2">Five quick questions. Answers are stored only in this browser in demo mode.</p>
        {done ? (
          <div role="status" className="mt-8 flex items-start gap-3 rounded-2xl bg-white p-6 ring-1 ring-line"><CheckCircle2 className="shrink-0 text-pine" aria-hidden /><div><p className="font-bold">Thank you!</p><p className="text-ink-2">Your feedback helps us decide what to improve next.</p></div></div>
        ) : (
          <form className="mt-8 space-y-7 rounded-3xl border border-line bg-white p-6 sm:p-8" onSubmit={(e) => { e.preventDefault(); saveFeedback(Object.fromEntries(new FormData(e.currentTarget))); setDone(true) }}>
            <Choice name="easyToFind" legend="Was it easy to find a suitable template?" options={SCALE} />
            <Choice name="previewHelped" legend="Did the live preview help you understand the product?" options={SCALE} />
            <Choice name="clearProcess" legend="Was the customization process clear?" options={SCALE} />
            <div><label htmlFor="missing" className="mb-1.5 block font-semibold">Which features or design changes were missing? <span className="font-normal text-ink-2">(optional)</span></label><textarea id="missing" name="missing" rows={3} className={input} maxLength={800} /></div>
            <Choice name="wouldUse" legend="Would you use this for your business?" options={['No', 'Maybe', 'Yes']} />
            <button className={btn.primary}>Send feedback</button>
          </form>
        )}
      </section>
    </Page>
  )
}
