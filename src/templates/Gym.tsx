import { ArrowRight } from 'lucide-react'
import type { SiteContent } from '../types'
import { img, type ImgKey } from '../data/images'
import { Site, Reveal, Nav, Cta, Hours, MapBlock, ContactLines, Socials, TestimonialNote, InquiryForm, Logo, footerYear, customHeadline , AmbientVideo, mapsSearch } from './kit'
import { CLIPS } from '../data/videos'

const TILE: ImgKey[] = ['gymLead', 'gymWeights', 'gymFloor', 'gymCoach', 'gymPT', 'gymWeights']
const PLANS = [
  { name: 'Day-to-Day', price: 'KSh 3,000', per: '/ month', perks: ['Off-peak gym access', '1 group class / week', 'Free induction'] },
  { name: 'All-In', price: 'KSh 5,500', per: '/ month', perks: ['24/7 gym access', 'Unlimited classes', 'Monthly body check-in'], hot: true },
  { name: 'Coached', price: 'KSh 12,000', per: '/ month', perks: ['Everything in All-In', '4 PT sessions / month', 'Nutrition coaching'] },
]

export default function Gym({ content: c }: { content: SiteContent }) {
  const programs = c.services.filter((s) => s.name.trim())
  const tests = c.testimonials.filter((t) => t.quote.trim())
  const head = "font-['Barlow_Condensed'] font-extrabold uppercase tracking-tight"
  return (
    <Site content={c} className="font-['Barlow'] text-white" style={{ background: '#0b0b0c' }}>
      <span id="top" />
      <Nav content={c} ctaLabel="Free trial"
        links={[['Programs', '#programs'], ...(c.isSample ? [['Membership', '#plans'] as [string, string]] : []), ['Coaches', '#team'], ['Visit', '#contact']]}
        theme={{ bar: 'bg-[#0b0b0c]/90 backdrop-blur border-b border-white/10', link: 'text-white/80 hover:text-white uppercase tracking-wider font-semibold', cta: 'bg-[var(--brand)] font-extrabold uppercase tracking-wider text-[var(--brand-ink)] hover:brightness-110 [clip-path:polygon(8%_0,100%_0,92%_100%,0_100%)]', menu: 'bg-[#0b0b0c] border-white/10', logo: `${head} text-2xl` }} />
      <main id="main">
        {/* Hero */}
        <section className="relative isolate overflow-hidden">
          <AmbientVideo clip={CLIPS.gym1} fallback={img('gymPT', 1800, 1100)} alt="An athlete training with dumbbells in a dark gym" className="object-cover object-[50%_35%] opacity-80" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/75 to-black/25" />
          <div className="mx-auto max-w-6xl px-5 pb-20 pt-20 md:min-h-[640px] md:pt-32">
            <p className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.3em] text-[var(--brand2)]">{c.tagline || 'Train hard'}</p>
            <h1 className={`${head} text-[5rem] leading-[0.85] md:text-[10rem]`}>{customHeadline(c) ?? (<>Built,<br /><span className="text-[var(--brand)]">not given.</span></>)}</h1>
            <p className="mt-6 max-w-lg text-xl text-white/85">{c.description || 'Tell people what makes your gym different.'}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Cta content={c} className="min-h-14 bg-[var(--brand)] px-9 text-lg font-extrabold uppercase tracking-wider text-[var(--brand-ink)] hover:brightness-110 [clip-path:polygon(6%_0,100%_0,94%_100%,0_100%)]">Start free trial <ArrowRight size={20} aria-hidden /></Cta>
              <a href={c.isSample ? '#plans' : '#programs'} className="press inline-flex min-h-14 items-center border-2 border-white/50 px-8 text-lg font-bold uppercase tracking-wider hover:bg-white hover:text-black">{c.isSample ? 'See memberships' : 'See programs'}</a>
            </div>
          </div>
        </section>

        {/* Marquee */}
        <div aria-hidden className="overflow-hidden border-y border-white/10 bg-[var(--brand)] py-3 text-[var(--brand-ink)]">
          <div className={`${head} flex w-max gap-10 whitespace-nowrap text-2xl`} style={{ animation: 'marquee 28s linear infinite' }}>
            {Array.from({ length: 2 }).flatMap((_, k) => ['Strength', 'Conditioning', 'Coaching', 'Community', 'Results'].map((w) => <span key={w + k} className="after:ml-10 after:inline-block after:h-2 after:w-2 after:rounded-full after:bg-current after:align-middle after:content-['']">{w}</span>))}
            {Array.from({ length: 2 }).flatMap((_, k) => ['Strength', 'Conditioning', 'Coaching', 'Community', 'Results'].map((w) => <span key={w + k + 'b'} className="after:ml-10 after:inline-block after:h-2 after:w-2 after:rounded-full after:bg-current after:align-middle after:content-['']">{w}</span>))}
          </div>
        </div>

        {/* Programs: one lead tile, the rest in support */}
        {programs.length > 0 && (
          <section id="programs" className="mx-auto max-w-6xl scroll-mt-16 px-5 py-24 md:py-32">
            <Reveal><h2 className={`${head} text-5xl md:text-7xl`}>Pick your <span className="text-[var(--brand)]">program</span></h2></Reveal>
            <div className="mt-10 grid auto-rows-[18rem] gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {programs.map((s, i) => (
                <Reveal key={i} delay={(i % 3) * 60} className={i === 0 ? 'sm:col-span-2 lg:row-span-2' : ''}>
                  <article className="group relative isolate flex h-full min-h-[18rem] flex-col justify-end overflow-hidden bg-neutral-900 p-6 md:p-8">
                    <img src={img(TILE[i % TILE.length], i === 0 ? 1000 : 700, i === 0 ? 1000 : 700)} alt="" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-50 transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none" />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/55 to-transparent" />
                    <span className={`${head} absolute right-5 top-3 text-6xl text-white/25`}>{String(i + 1).padStart(2, '0')}</span>
                    <h3 className={`${head} ${i === 0 ? 'text-5xl md:text-6xl' : 'text-3xl'}`}>{s.name}</h3>
                    {s.desc && <p className={`mt-2 max-w-md text-white/85 ${i === 0 ? 'text-lg' : ''}`}>{s.desc}</p>}
                    {s.price && <p className="mt-4 inline-block self-start bg-[var(--brand2)] px-3 py-1 text-sm font-bold uppercase tracking-wide text-[var(--brand2-ink)]">{s.price}</p>}
                  </article>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* The floor (sample imagery only) */}
        {c.isSample && (
          <section aria-label="The gym floor" className="mx-auto max-w-6xl px-5 pb-24 md:pb-32">
            <Reveal><h2 className={`${head} text-4xl md:text-6xl`}>Built for the work</h2><p className="mt-3 max-w-lg text-lg text-white/75">Racks, free weights and open floor space, set up so you spend your time training, not waiting.</p></Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-[1.4fr_1fr]">
              <Reveal><div className="zoom overflow-hidden"><img src={img('gymWeights', 1100, 800)} alt="Rows of dumbbells and barbells in the strength area" loading="lazy" width={1100} height={800} className="aspect-[4/3] w-full object-cover" /></div></Reveal>
              <div className="grid gap-4">
                <Reveal delay={70}><div className="zoom overflow-hidden"><img src={img('gymFloor', 800, 500)} alt="Open training floor with cardio equipment" loading="lazy" width={800} height={500} className="aspect-[16/10] w-full object-cover" /></div></Reveal>
                <Reveal delay={140}><div className="zoom overflow-hidden"><img src={img('gymLift', 800, 500)} alt="An athlete lifting on the platform" loading="lazy" width={800} height={500} className="aspect-[16/10] w-full object-cover" /></div></Reveal>
              </div>
            </div>
          </section>
        )}

        {/* Plans */}
        {c.isSample && <section id="plans" className="scroll-mt-16 bg-neutral-950 px-5 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <Reveal><h2 className={`${head} text-5xl md:text-7xl`}>Membership</h2><p className="mt-2 text-white/75">Indicative sample prices. Your real plans are confirmed with you before launch.</p></Reveal>
            <div className="mt-10 grid items-stretch gap-5 md:grid-cols-3">
              {PLANS.map((p, i) => (
                <Reveal key={p.name} delay={i * 70}><div className={`flex h-full flex-col p-7 md:p-8 ${p.hot ? 'bg-[var(--brand)] text-[var(--brand-ink)] md:-my-3 md:py-11' : 'bg-white/[0.05]'}`}>
                  {p.hot && <span className="mb-3 self-start bg-black px-2 py-0.5 text-xs font-bold uppercase tracking-widest text-white">Most popular</span>}
                  <h3 className={`${head} text-3xl`}>{p.name}</h3>
                  <p className="mt-2"><span className={`${head} text-5xl`}>{p.price}</span> <span className="opacity-80">{p.per}</span></p>
                  <ul className="mt-6 flex-1 space-y-2.5">{p.perks.map((k) => <li key={k} className="flex gap-2"><span aria-hidden>✓</span>{k}</li>)}</ul>
                  <a href="#book" className={`press mt-8 inline-flex min-h-12 items-center justify-center font-extrabold uppercase tracking-wider ${p.hot ? 'bg-black text-white' : 'border-2 border-white hover:bg-white hover:text-black'}`}>Join {p.name}</a></div></Reveal>
              ))}
            </div>
          </div>
        </section>}

        {/* Coaches */}
        {c.team.length > 0 && (
          <section id="team" className="mx-auto max-w-6xl scroll-mt-16 px-5 py-24 md:py-32">
            <Reveal><h2 className={`${head} text-5xl md:text-7xl`}>Your coaches</h2>{c.isSample && <p className="mt-2 text-sm text-white/60">Sample coaches, for illustration only.</p>}</Reveal>
            <div className="mt-10 grid gap-x-5 gap-y-12 md:grid-cols-3">
              {c.team.map((p, i) => (
                <Reveal key={i} delay={i * 70} className={i === 1 ? 'md:mt-10' : ''}><article>
                  {p.img && <div className="zoom overflow-hidden bg-neutral-900"><img src={p.img} alt={`Portrait of ${p.name}`} loading="lazy" width={500} height={600} className="aspect-[4/5] w-full object-cover grayscale transition-[filter] duration-300 hover:grayscale-0 motion-reduce:transition-none" /></div>}
                  <h3 className={`${head} mt-4 text-3xl`}>{p.name}</h3><p className="font-bold uppercase tracking-wider text-[var(--brand2)]">{p.role}</p>{p.bio && <p className="mt-1 text-white/80">{p.bio}</p>}</article></Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Member voices on the brand colour */}
        {tests.length > 0 && (
          <section aria-label="Member stories" className="bg-[var(--brand)] px-5 py-24 text-[var(--brand-ink)] md:py-32">
            <div className="mx-auto max-w-5xl">
              <Reveal>
                <blockquote className={`${head} text-balance text-4xl leading-[1.02] md:text-7xl`}>“{tests[0].quote}”</blockquote>
                <p className="mt-6 text-sm font-bold uppercase tracking-wider opacity-80">{tests[0].name}{c.isSample ? ', illustrative sample' : ''}</p>
              </Reveal>
              {tests.length > 1 && (
                <div className="mt-14 grid gap-8 border-t border-current/25 pt-10 md:grid-cols-2">
                  {tests.slice(1).map((t, i) => (
                    <Reveal key={i} delay={i * 70}><figure><blockquote className="text-xl font-medium leading-snug">“{t.quote}”</blockquote><figcaption className="mt-3 text-sm font-bold uppercase tracking-wider opacity-80">{t.name}{c.isSample ? ', illustrative sample' : ''}</figcaption></figure></Reveal>
                  ))}
                </div>
              )}
              <TestimonialNote content={c} />
            </div>
          </section>
        )}

        {/* Join */}
        <section id="book" className="mx-auto grid max-w-6xl scroll-mt-16 gap-10 px-5 py-24 md:grid-cols-[.9fr_1.1fr] md:py-32">
          <div><h2 className={`${head} text-5xl md:text-7xl`}>Claim your <span className="text-[var(--brand)]">free trial</span></h2>
            <p className="mt-4 text-lg text-white/80">Tell us a little about your goals. A coach will contact you to book your first session.</p>
            {c.bookingUrl.startsWith('http') && <Cta content={c} className="mt-6 min-h-12 bg-[var(--brand)] px-8 font-extrabold uppercase tracking-wider text-[var(--brand-ink)]">Book online</Cta>}</div>
          <div className="bg-neutral-900 p-6 md:p-8">
            <InquiryForm content={c} fields={['date', 'service']} submitLabel="Get my free trial" messageLabel="Your goals (optional)"
              note="A coach will contact you. This is a request, not a confirmed booking."
              cls={{ label: 'mb-1 block text-sm font-bold uppercase tracking-wider', input: 'min-h-12 w-full border border-white/30 bg-black px-3 py-2 text-white [color-scheme:dark] focus:border-[var(--brand)]', btn: 'bg-[var(--brand)] font-extrabold uppercase tracking-wider text-[var(--brand-ink)] hover:brightness-110', ok: 'bg-white/10' }} />
          </div>
        </section>

        {/* Location: map with the details set into it */}
        <section id="contact" className="mx-auto max-w-6xl scroll-mt-16 px-5 pb-24 md:pb-32">
          <div className="relative overflow-hidden">
            <MapBlock content={c} tone="dark" className="h-[24rem] md:h-[32rem]" />
            <div className="bg-neutral-900 p-7 md:absolute md:bottom-8 md:left-8 md:top-8 md:flex md:w-[23rem] md:flex-col md:justify-center md:shadow-2xl">
              <h2 className={`${head} text-4xl`}>Find the gym</h2>
              <ContactLines content={c} className="mt-5" iconClass="text-[var(--brand)]" />
              <h3 className={`${head} mt-6 text-2xl`}>Opening hours</h3>
              <Hours content={c} className="mt-1 text-[15px]" rowClass="border-b border-white/15" />
              {c.address && <a href={mapsSearch(c.address)} target="_blank" rel="noopener noreferrer" className="press uline mt-5 inline-flex min-h-11 items-center font-bold uppercase tracking-wider text-[var(--brand)]">Get directions</a>}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-white/10 px-5 py-10 text-center text-sm text-white/70">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 md:flex-row"><Logo content={c} className={`${head} text-2xl text-white`} /><Socials content={c} /></div>
        <p className="mt-6">© {footerYear} {c.businessName || 'Your Gym'}. Consult a doctor before starting a new exercise programme.</p>
      </footer>
    </Site>
  )
}
