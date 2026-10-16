import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { Page, btn } from '../components/Chrome'
import LiveFrame from '../components/LiveFrame'
import { Reveal } from '../templates/kit'
import { TEMPLATES, byId } from '../data/templates'
import type { TemplateMeta } from '../types'

const shortName = (n: string) => n.split(' &')[0]
const domain = (t: TemplateMeta) => t.sampleBrand.toLowerCase().replace(/[^a-z]+/g, '') + '.co.ke'

function Browser({ url, children, className = '' }: { url: string; children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl bg-white shadow-2xl shadow-black/40 ring-1 ring-black/10 ${className}`}>
      <div className="flex items-center gap-1.5 bg-neutral-100 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" /><span className="h-2 w-2 rounded-full bg-[#febc2e]" /><span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate rounded bg-white px-2 py-0.5 text-[10px] text-neutral-500">{url}</span>
      </div>
      {children}
    </div>
  )
}

function Phone({ id, className = '', eager = false }: { id: string; className?: string; eager?: boolean }) {
  return (
    <div className={`overflow-hidden rounded-[1.75rem] border-[6px] border-[#0d0f0e] bg-black shadow-2xl shadow-black/50 ${className}`}>
      <LiveFrame id={id} w={390} h={800} eager={eager} />
    </div>
  )
}

const STEPS: { n: string; t: string; d: string; art: ReactNode }[] = [
  {
    n: '01', t: 'Choose', d: 'Browse designs made for your industry and open any of them as a full website.',
    art: (
      <div className="flex items-center justify-center -space-x-5">
        {TEMPLATES.slice(0, 4).map((t, i) => <img key={t.id} src={t.cover} alt="" loading="lazy" width={120} height={150} className="h-28 w-20 rounded-lg object-cover shadow-lg ring-2 ring-white" style={{ transform: `translateY(${i % 2 ? 8 : -8}px)` }} />)}
      </div>
    ),
  },
  {
    n: '02', t: 'Customize', d: 'Add your business details, services, brand colours and booking link. Watch the site update.',
    art: (
      <div className="mx-auto w-full max-w-[15rem] space-y-2.5 text-left text-[11px]">
        <div className="rounded-md border border-line bg-white px-3 py-2"><span className="block text-[9px] text-ink-2">Business name</span>Zuri Beauty House</div>
        <div className="flex items-center gap-2 rounded-md border border-line bg-white px-3 py-2"><span className="text-[9px] text-ink-2">Brand colour</span><i className="ml-auto h-4 w-4 rounded-full bg-[#A8506B]" /><i className="h-4 w-4 rounded-full bg-[#C9A27E]" /><i className="h-4 w-4 rounded-full bg-[#1B4A3D]" /></div>
        <div className="rounded-md border border-line bg-white px-3 py-2"><span className="block text-[9px] text-ink-2">Booking link</span>https://</div>
      </div>
    ),
  },
  {
    n: '03', t: 'Launch', d: 'Review your personalized preview, ask for changes, and request publication when you are happy.',
    art: (
      <div className="mx-auto w-full max-w-[15rem] rounded-lg bg-white p-4 text-left shadow-lg ring-1 ring-black/5">
        <p className="flex items-center gap-2 text-xs font-medium"><span className="grid h-5 w-5 place-items-center rounded-full bg-pine text-white"><Check size={12} aria-hidden /></span>Your preview is ready</p>
        <p className="mt-2 text-[11px] leading-snug text-ink-2">Nothing goes live until you ask for it.</p>
        <span className="mt-3 inline-block rounded-md bg-pine px-3 py-1.5 text-[11px] font-medium text-[#f6f0e6]">Request publication</span>
      </div>
    ),
  },
]

const INCLUDED: [string, string][] = [
  ['Industry-specific designs', 'Six templates with their own type, layout and imagery, written for how each trade talks to customers.'],
  ['Mobile-friendly layouts', 'Composed for the phone first, because that is where most local customers look.'],
  ['Simple customization', 'Add your name, services, prices, hours and brand colours in four short steps, with a live preview.'],
  ['Booking and contact links', 'Point every booking button at your own page, or use the built-in enquiry form.'],
  ['Location maps', 'Your address becomes an embedded map with an Open in Google Maps fallback. No API key needed.'],
  ['A streamlined start', 'Begin from a finished design instead of a blank page or a long agency brief.'],
]

export default function Home() {
  const [active, setActive] = useState<TemplateMeta['id']>('salon')
  const current = byId(active)!
  return (
    <Page dark>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-deep text-[#f6f0e6]">
        <div aria-hidden className="absolute -right-40 top-10 -z-10 h-[40rem] w-[40rem] rounded-full bg-emerald/40 blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-5 pb-24 pt-14 lg:grid-cols-[.85fr_1.15fr] lg:pb-32 lg:pt-20">
          <div className="fade-in">
            <p className="mb-6 text-[15px] text-[#e3c07a]">Websites for local businesses</p>
            <h1 className="font-display text-[3.2rem] leading-[1.02] md:text-[4.6rem]">A website that <em className="font-light italic text-[#e3c07a]">feels</em> like your business.</h1>
            <p className="mt-7 max-w-md text-lg leading-[1.7] text-[#f6f0e6]/80">Choose a design made for your industry, personalize it to your brand, and get your business online without starting from scratch.</p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link to="/templates" className={btn.light}>Explore templates <ArrowRight size={18} aria-hidden /></Link>
              <a href="#how" className="press uline inline-flex min-h-12 items-center text-[#f6f0e6]">See how it works</a>
            </div>
            <ul className="mt-12 grid max-w-md gap-3 text-[15px] text-[#f6f0e6]/80">
              {['Six industry designs, ready to preview', 'Phone-ready from the first screen', 'Personalize it and request launch in minutes'].map((t) => (
                <li key={t} className="flex items-start gap-3"><Check size={18} className="mt-0.5 shrink-0 text-[#e3c07a]" aria-hidden />{t}</li>
              ))}
            </ul>
          </div>

          <div className="relative pb-16">
            <Link to="/preview/salon" aria-label="Preview the Zuri Beauty House salon website" className="group block">
              <Browser url={domain(byId('salon')!)} className="transition-transform duration-500 group-hover:-translate-y-1 motion-reduce:transition-none"><LiveFrame id="salon" eager /></Browser>
            </Link>
            <Link to="/preview/restaurant" aria-label="Preview the Moto Kitchen restaurant website on a phone" className="group absolute -bottom-3 left-2 block w-[21%] min-w-[6.5rem]">
              <Phone id="restaurant" eager className="transition-transform duration-500 group-hover:-translate-y-1 motion-reduce:transition-none" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured showcase */}
      <section className="mx-auto max-w-6xl px-5 py-24 md:py-32" aria-labelledby="show">
        <Reveal>
          <h2 id="show" className="max-w-xl font-display text-4xl text-pine md:text-6xl">Pick the design that already looks like you</h2>
          <p className="mt-4 max-w-lg text-lg leading-[1.7] text-ink-2">Each template is a complete website with its own typography, imagery and tone. Select one to see it at full size.</p>
        </Reveal>
        <div className="mt-14 grid gap-8 lg:grid-cols-[17rem_1fr] lg:gap-12">
          <div role="group" aria-label="Templates" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0">
            {TEMPLATES.map((t, i) => (
              <button key={t.id} type="button" aria-pressed={active === t.id} onClick={() => setActive(t.id)}
                className={`press group shrink-0 rounded-xl border px-4 py-3 text-left lg:border-0 lg:px-5 lg:py-4 ${active === t.id ? 'border-pine bg-pine text-[#f6f0e6]' : 'border-line text-pine hover:bg-white/70'}`}>
                <span className="flex items-baseline gap-3">
                  <span className={`hidden text-[13px] tabular-nums lg:inline ${active === t.id ? 'text-[#e3c07a]' : 'text-brass-ink'}`}>{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-display text-xl lg:text-3xl">{shortName(t.name)}</span>
                </span>
                <span className={`mt-1 hidden text-[15px] leading-snug lg:block ${active === t.id ? 'text-[#f6f0e6]/80' : 'text-ink-2'}`}>{t.industry}</span>
              </button>
            ))}
          </div>

          <div>
            <Browser url={domain(current)} className="!shadow-xl !shadow-black/15">
              <div key={active} className="fade-in"><LiveFrame id={active} eager /></div>
            </Browser>
            <div className="mt-6 flex flex-wrap items-start justify-between gap-x-8 gap-y-4">
              <div className="max-w-md"><h3 className="font-display text-2xl text-pine">{current.name}</h3><p className="mt-1 leading-[1.7] text-ink-2">{current.blurb}</p></div>
              <div className="flex flex-wrap gap-3">
                <Link to={`/preview/${current.id}`} className={btn.ghost}>Preview website <ArrowUpRight size={17} aria-hidden /></Link>
                <Link to={`/customize/${current.id}`} className={btn.primary}>Customize template</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="scroll-mt-20 bg-[#efe3cf] py-24 md:py-32" aria-labelledby="howh">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal><h2 id="howh" className="max-w-xl font-display text-4xl text-pine md:text-6xl">From choice to launch in three steps</h2></Reveal>
          <ol className="mt-16 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 90}>
                <li className="flex h-full list-none flex-col">
                  <div className="grid min-h-[11rem] place-items-center rounded-2xl bg-[#f6f0e6] p-6" aria-hidden>{s.art}</div>
                  <p className="mt-6 flex items-baseline gap-3"><span className="font-display text-3xl italic text-clay">{s.n}</span><span className="font-display text-3xl text-pine">{s.t}</span></p>
                  <p className="mt-2 leading-[1.7] text-ink-2">{s.d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* What is included */}
      <section className="mx-auto max-w-6xl px-5 py-24 md:py-32" aria-labelledby="inc">
        <div className="grid items-center gap-16 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal className="mx-auto w-full max-w-[17rem] lg:mx-0">
            <Link to="/preview/clinic" aria-label="Preview the Afya Family Clinic website"><Phone id="clinic" className="!shadow-xl !shadow-black/20" /></Link>
          </Reveal>
          <div>
            <Reveal><h2 id="inc" className="font-display text-4xl text-pine md:text-6xl">Everything a local business needs to be found and booked</h2></Reveal>
            <dl className="mt-12 grid gap-x-10 sm:grid-cols-2">
              {INCLUDED.map(([t, d], i) => (
                <Reveal key={t} delay={i * 50}><div className="border-t border-line py-6"><dt className="font-display text-2xl text-pine">{t}</dt><dd className="mt-2 leading-[1.7] text-ink-2">{d}</dd></div></Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-emerald py-24 text-[#f6f0e6] md:py-32">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="font-display text-4xl md:text-6xl">See your business on a website that suits it</h2>
          <p className="mx-auto mt-6 max-w-md text-lg leading-[1.7] text-[#f6f0e6]/85">Pick a template and preview your own details in about five minutes. Nothing is published until you ask.</p>
          <Link to="/templates" className={`${btn.light} mt-10`}>Explore templates <ArrowRight size={18} aria-hidden /></Link>
        </div>
      </section>
    </Page>
  )
}
