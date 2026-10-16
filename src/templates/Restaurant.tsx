import { useMemo, useState } from 'react'
import { UtensilsCrossed } from 'lucide-react'
import type { SiteContent } from '../types'
import { img, type ImgKey } from '../data/images'
import { Site, Reveal, Nav, Cta, Hours, MapBlock, ContactLines, Socials, TestimonialNote, InquiryForm, Logo, footerYear, customHeadline, Carousel, AmbientVideo, mapsSearch } from './kit'
import { CLIPS } from '../data/videos'

const MENU_IMG: Record<string, ImgKey> = { All: 'kfTilapia', Starters: 'kfSamosaChai', Mains: 'kfUgali', Desserts: 'kfSpread', Drinks: 'kfSamosa' }

export default function Restaurant({ content: c }: { content: SiteContent }) {
  const items = c.services.filter((s) => s.name.trim())
  const cats = useMemo(() => [...new Set(items.map((s) => s.category).filter(Boolean) as string[])], [items])
  const [tab, setTab] = useState<string>('All')
  const tabs = cats.length > 1 ? cats : []
  const shown = tabs.length && tab !== 'All' ? items.filter((s) => s.category === tab) : items
  const tests = c.testimonials.filter((t) => t.quote.trim())
  const head = "font-['Fraunces'] tracking-tight"
  return (
    <Site content={c} className="font-['Karla'] text-[#f3e9dc]" style={{ background: '#1c1410' }}>
      <span id="top" />
      <Nav content={c} ctaLabel="Reserve a table"
        links={[['Menu', '#menu'], ['Our story', '#story'], ['Reviews', '#reviews'], ['Visit', '#contact']]}
        theme={{ bar: 'bg-[#1c1410]/85 backdrop-blur border-b border-white/10', link: 'text-[#f3e9dc]/85 hover:text-white', cta: 'rounded-sm bg-[var(--brand)] font-semibold text-[var(--brand-ink)] hover:brightness-110', menu: 'bg-[#1c1410] border-white/10', logo: `${head} text-xl font-bold` }} />
      <main id="main">
        {/* Hero */}
        <section className="relative isolate">
          <AmbientVideo clip={CLIPS.rest2} fallback={img('restRoom', 1800, 1100)} alt="Warmly lit restaurant dining room with set tables" />
          <div className="absolute inset-0 -z-10" style={{ background: 'linear-gradient(180deg, rgb(28 20 16 / .55), rgb(28 20 16 / .92))' }} />
          <div className="mx-auto grid max-w-6xl items-end gap-10 px-5 pb-16 pt-24 md:min-h-[640px] md:grid-cols-[1.2fr_.8fr] md:pt-32">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-[var(--brand2)]">{c.tagline || 'Kitchen & bar'}</p>
              <h1 className={`${head} text-5xl font-bold leading-[1.02] md:text-7xl`}>{customHeadline(c) ?? (<>Fire, spice <em className="font-medium italic text-[var(--brand2)]">and good company.</em></>)}</h1>
              <p className="mt-6 max-w-lg text-lg text-[#f3e9dc]/85">{c.description || 'Tell guests what makes your restaurant special.'}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Cta content={c} className="min-h-12 rounded-sm bg-[var(--brand)] px-7 font-semibold text-[var(--brand-ink)] hover:brightness-110"><UtensilsCrossed size={18} aria-hidden /> Reserve a table</Cta>
                <a href="#menu" className="press inline-flex min-h-12 items-center rounded-sm border border-white/40 px-7 hover:bg-white/10">See the menu</a>
              </div>
            </div>
            <div id="book" className="scroll-mt-20 rounded-md border border-white/15 bg-[#1c1410]/90 p-6 backdrop-blur">
              <h2 className={`${head} text-2xl font-bold`}>Book a table</h2>
              <p className="mb-5 mt-1 text-sm text-[#f3e9dc]/75">Request a time and we will confirm.</p>
              <InquiryForm content={c} fields={['date', 'time', 'guests']} submitLabel="Request table" messageLabel="Dietary needs or occasion"
                note="This is a request, not a confirmed reservation."
                cls={{ label: 'mb-1 block text-sm', input: 'min-h-11 w-full rounded-sm border border-white/25 bg-white/5 px-3 py-2 text-white [color-scheme:dark] placeholder:text-white/40 focus:border-[var(--brand2)]', btn: 'rounded-sm bg-[var(--brand)] font-semibold text-[var(--brand-ink)] hover:brightness-110', ok: 'bg-white/10' }} />
            </div>
          </div>
        </section>

        {/* Menu: image beside the list on the sample, a single column otherwise */}
        {items.length > 0 && (
          <section id="menu" className="scroll-mt-16 px-5 py-24 md:py-32">
            <div className={`mx-auto grid grid-cols-[minmax(0,1fr)] gap-12 ${c.isSample ? 'max-w-6xl lg:grid-cols-[.8fr_1.2fr] lg:gap-20' : 'max-w-3xl'}`}>
              {c.isSample && (
                <div className="relative hidden lg:block">
                  <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-sm bg-[#241a14]">
                    {Object.entries(MENU_IMG).map(([k, key]) => (
                      <img key={k} src={img(key, 800, 1000)} alt="" loading="lazy" width={800} height={1000}
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${(tab === k || (!MENU_IMG[tab] && k === 'All')) ? 'opacity-100' : 'opacity-0'}`} />
                    ))}
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <p className={`${head} absolute bottom-5 left-5 text-2xl font-bold`}>{tab === 'All' ? 'The full menu' : tab}</p>
                  </div>
                </div>
              )}
              <div className="min-w-0">
                <Reveal>
                  <p className="text-[15px] italic text-[var(--brand2)]">The menu</p>
                  <h2 className={`${head} mt-2 text-4xl font-bold md:text-6xl`}>Cooked over embers</h2>
                </Reveal>
                {tabs.length > 0 && (
                  <div role="tablist" aria-label="Menu categories" className="-mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:px-0">
                    {['All', ...tabs].map((t) => (
                      <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
                        className={`press min-h-11 shrink-0 rounded-full border px-5 text-sm font-semibold ${tab === t ? 'border-transparent bg-[var(--brand2)] text-[var(--brand2-ink)]' : 'border-white/25 hover:bg-white/10'}`}>{t}</button>
                    ))}
                  </div>
                )}
                <ul key={tab} className="fade-in mt-6 divide-y divide-white/10 border-y border-white/10">
                  {shown.map((s, i) => (
                    <li key={`${s.name}${i}`} className="flex items-baseline gap-4 py-5">
                      <div className="min-w-0 flex-1"><h3 className={`${head} text-xl font-bold`}>{s.name}</h3>{s.desc && <p className="mt-1 text-[#f3e9dc]/75">{s.desc}</p>}</div>
                      {s.price && <span className="shrink-0 font-semibold tabular-nums text-[var(--brand2)]">{s.price}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Kitchen gallery */}
        {c.isSample && (
          <section aria-label="From the kitchen" className="mx-auto max-w-6xl px-5 pb-24 md:pb-32">
            <Reveal><h2 className={`${head} mb-8 text-3xl font-bold md:text-4xl`}>From the kitchen</h2></Reveal>
            <Carousel label="Photos from the kitchen" itemClass="basis-[80%] sm:basis-[46%] lg:basis-[32%]">
              {([['kfUgali', 'Ugali with sukuma wiki and stew'], ['kfTilapia', 'Whole fried tilapia with salad and ugali'], ['kfGitheri', 'A bowl of githeri, maize and beans'], ['kfSamosaChai', 'Samosas served with masala chai'], ['kfSpread', 'A table of Kenyan dishes to share']] as const).map(([k, alt]) => (
                <figure key={k} className="zoom overflow-hidden rounded-sm"><img src={img(k, 700, 900)} alt={alt} loading="lazy" width={700} height={900} className="aspect-[4/5] w-full object-cover" /></figure>
              ))}
            </Carousel>
          </section>
        )}

        {/* Story: a light, image-led break in the rhythm */}
        <section id="story" className="scroll-mt-16 bg-[#f3e9dc] py-24 text-[#2a1c14] md:py-32">
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-[.9fr_1.1fr] md:gap-20">
            {c.isSample ? (
              <Reveal><div className="relative">
                <img src={img('kfPilau', 900, 1100)} alt="A platter of spiced pilau rice" loading="lazy" width={900} height={1100} className="aspect-[4/5] w-full rounded-sm object-cover" />
                <img src={img('kfSamosa', 500, 500)} alt="Plated samosas with chutney" loading="lazy" width={500} height={500} className="absolute -bottom-8 -right-4 hidden aspect-square w-[42%] rounded-sm border-[6px] border-[#f3e9dc] object-cover md:block" />
              </div></Reveal>
            ) : <span />}
            <Reveal delay={80}>
              <p className="text-[15px] italic text-[#9a3f2b]">Our story</p>
              <h2 className={`${head} mt-2 text-balance text-4xl font-bold leading-[1.05] md:text-6xl`}>A kitchen built around one fire.</h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#4a3527]">{c.isSample ? 'We started with a simple idea: cook the food we grew up on over real charcoal, source close to home and make everyone feel like family.' : c.description}</p>
              {c.isSample && <p className="mt-4 text-sm text-[#7a6252]">Sample copy for illustration. Your own story goes here.</p>}
              <a href="#menu" className="press uline mt-8 inline-flex min-h-11 items-center font-semibold text-[#9a3f2b]">See what is cooking</a>
            </Reveal>
          </div>
        </section>

        {/* Reviews: one voice, then the rest */}
        {tests.length > 0 && (
          <section id="reviews" className="mx-auto max-w-4xl scroll-mt-16 px-5 py-24 text-center md:py-32">
            <Reveal>
              <h2 className="sr-only">Around the table</h2>
              <blockquote className={`${head} text-balance text-3xl font-medium italic leading-snug md:text-5xl`}>“{tests[0].quote}”</blockquote>
              <p className="mt-6 text-sm text-[#f3e9dc]/75">{tests[0].name}{tests[0].role ? `, ${tests[0].role.toLowerCase()}` : ''}</p>
            </Reveal>
            {tests.length > 1 && (
              <div className="mt-14 grid gap-8 border-t border-white/10 pt-10 text-left md:grid-cols-2">
                {tests.slice(1).map((t, i) => (
                  <Reveal key={i} delay={i * 70}><figure><blockquote className="text-lg italic leading-relaxed">“{t.quote}”</blockquote><figcaption className="mt-3 text-sm text-[#f3e9dc]/75">{t.name}{t.role ? `, ${t.role.toLowerCase()}` : ''}</figcaption></figure></Reveal>
                ))}
              </div>
            )}
            <TestimonialNote content={c} />
          </section>
        )}

        {/* Reserve */}
        <section className="relative isolate overflow-hidden px-5 py-28 text-center md:py-40" style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}>
          {c.isSample && <>
            <img src={img('restRoom', 1600, 900)} alt="" loading="lazy" width={1600} height={900} className="kb absolute inset-0 -z-20 h-full w-full object-cover" />
            <div aria-hidden className="absolute inset-0 -z-10 bg-[#1c1410]/75" />
          </>}
          <div className="mx-auto max-w-2xl" style={c.isSample ? { color: '#f3e9dc' } : undefined}>
            <h2 className={`${head} text-balance text-4xl font-bold leading-tight md:text-6xl`}>Save a table for the weekend</h2>
            <p className="mx-auto mt-5 max-w-md text-lg opacity-90">Tell us when, and we will confirm by phone or message.</p>
            <Cta content={c} href="#book" className="mt-9 min-h-14 rounded-sm bg-[var(--brand2)] px-9 text-base font-semibold text-[var(--brand2-ink)] hover:brightness-110">Reserve a table</Cta>
          </div>
        </section>

        {/* Visit: map with the details set into it */}
        <section id="contact" className="mx-auto max-w-6xl scroll-mt-16 px-5 py-24 md:py-32">
          <div className="relative overflow-hidden rounded-sm">
            <MapBlock content={c} tone="dark" className="h-[24rem] md:h-[32rem]" />
            <div className="bg-[#241a14] p-7 md:absolute md:bottom-8 md:left-8 md:top-8 md:flex md:w-[23rem] md:flex-col md:justify-center md:shadow-2xl">
              <h2 className={`${head} text-3xl font-bold`}>Find us</h2>
              <ContactLines content={c} className="mt-5" iconClass="text-[var(--brand2)]" />
              <h3 className={`${head} mt-6 text-xl font-bold`}>Opening hours</h3>
              <Hours content={c} className="mt-1 text-[15px]" rowClass="border-b border-white/10" />
              {c.address && <a href={mapsSearch(c.address)} target="_blank" rel="noopener noreferrer" className="press uline mt-5 inline-flex min-h-11 items-center font-semibold text-[var(--brand2)]">Get directions</a>}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-white/10 px-5 py-10 text-center text-sm text-[#f3e9dc]/75">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 md:flex-row"><Logo content={c} className={`${head} text-lg font-bold text-white`} /><Socials content={c} /></div>
        <p className="mt-6">© {footerYear} {c.businessName || 'Your Business'}. Please tell us about allergies when you book.</p>
      </footer>
    </Site>
  )
}
