import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Page, btn } from '../components/Chrome'
import LiveFrame, { BrowserFrame } from '../components/LiveFrame'
import { Reveal } from '../templates/kit'
import { TEMPLATES } from '../data/templates'
import { track } from '../lib/store'

export default function Gallery() {
  const [filter, setFilter] = useState('all')
  const list = filter === 'all' ? TEMPLATES : TEMPLATES.filter((t) => t.id === filter)
  return (
    <Page>
      <section className="mx-auto max-w-6xl px-5 pb-6 pt-12">
        <h1 className="font-display text-5xl text-pine md:text-7xl">Choose your template</h1>
        <p className="mt-3 max-w-xl text-lg text-ink-2">Six distinct designs, each built for a different kind of local business. Open any of them as a full website before you decide.</p>
        <div role="group" aria-label="Filter by industry" className="-mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-2">
          {[{ id: 'all', name: 'All templates' }, ...TEMPLATES].map((t) => (
            <button key={t.id} aria-pressed={filter === t.id} onClick={() => setFilter(t.id)}
              className={`press min-h-11 shrink-0 rounded-lg border px-5 text-sm font-medium ${filter === t.id ? 'border-pine bg-pine text-[#f6f0e6]' : 'border-pine/25 text-ink-2 hover:border-pine/60'}`}>{t.name}</button>
          ))}
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-x-8 gap-y-16 px-5 pb-28 pt-8 md:grid-cols-2" aria-live="polite">
        {list.map((t, i) => (
          <Reveal key={t.id} delay={(i % 2) * 60}>
            <article className="flex h-full flex-col">
              <Link to={`/preview/${t.id}`} aria-label={`Preview the ${t.name} website`} onClick={() => track('template_preview_click', { template: t.id })} className="group block">
                <BrowserFrame url={t.sampleBrand.toLowerCase().replace(/[^a-z]+/g, '') + '.co.ke'} className="transition-transform duration-500 group-hover:-translate-y-1 motion-reduce:transition-none"><LiveFrame id={t.id} eager={i < 2} /></BrowserFrame>
              </Link>
              <div className="mt-6 flex flex-1 flex-col">
                <p className="text-[15px] text-brass-ink">{t.industry}</p>
                <h2 className="mt-1 font-display text-3xl text-pine">{t.name}</h2>
                <p className="mt-2 max-w-md leading-[1.7] text-ink-2">{t.blurb}</p>
                <div className="mt-auto flex flex-wrap gap-3 pt-6">
                  <Link to={`/preview/${t.id}`} className={btn.ghost} onClick={() => track('template_preview_click', { template: t.id })}>Preview website</Link>
                  <Link to={`/customize/${t.id}`} className={btn.primary} onClick={() => track('template_select', { template: t.id })}>Customize template</Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </section>
    </Page>
  )
}
