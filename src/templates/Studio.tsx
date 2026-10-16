import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { SiteContent } from '../types'
import { img, type ImgKey } from '../data/images'
import { Site, Reveal, Nav, Cta, Hours, MapBlock, ContactLines, Socials, TestimonialNote, InquiryForm, Logo, cleanHours, footerYear, customHeadline, mapsSearch } from './kit'

/** Scenes for the cinematic hero. Real businesses get the first scene only (stock scenery is not theirs). */
const SCENES: { key: ImgKey; label: string; alt: string }[] = [
  { key: 'vistaSavanna', label: 'Maasai Mara', alt: 'An acacia tree silhouetted against a purple and orange savanna dusk' },
  { key: 'vistaNairobiPark', label: 'Nairobi', alt: 'The Nairobi skyline rising behind open savanna plains' },
  { key: 'vistaDiani', label: 'Diani', alt: 'The sun setting over the water on Kenya\'s coast' },
  { key: 'vistaMtKenya', label: 'Mount Kenya', alt: 'Mount Kenya rising above low clouds' },
  { key: 'vistaMara', label: 'Maasai Mara', alt: 'Hot air balloons drifting over the Maasai Mara plains' },
]

const serif = "font-['Fraunces']"
const pad = (n: number) => String(n).padStart(2, '0')

export default function Studio({ content: c }: { content: SiteContent }) {
  const services = c.services.filter((s) => s.name.trim())
  const tests = c.testimonials.filter((t) => t.quote.trim())
  const scenes = c.isSample ? SCENES : SCENES.slice(0, 1)
  const [i, setI] = useState(0)
  const hours0 = cleanHours(c)[0]
  const bigWord = (c.businessName.trim().split(/\s+/)[0] || 'Welcome').replace(/[^\p{L}\p{N}]/gu, '').slice(0, 11).toUpperCase()

  useEffect(() => {
    if (scenes.length < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches || new URLSearchParams(location.search).has('still')) return
    const t = setInterval(() => setI((v) => (v + 1) % scenes.length), 4500)
    return () => clearInterval(t)
  }, [scenes.length])

  const stats: [string, string][] = [
    ...(services.length ? [[String(services.length), services.length === 1 ? 'Service' : 'Services']] as [string, string][] : []),
    ...(c.team.length ? [[String(c.team.length), c.team.length === 1 ? 'Specialist' : 'Specialists']] as [string, string][] : []),
    ...(hours0 ? [[hours0.days, 'Open']] as [string, string][] : []),
  ]

  return (
    <Site content={c} className="font-['DM_Sans'] text-[#f2ede4]" style={{ background: '#12151a' }}>
      <span id="top" />
      <Nav content={c} ctaLabel="Book now"
        links={[['Services', '#services'], ['About', '#about'], ['Reviews', '#reviews'], ['Contact', '#contact']]}
        theme={{ bar: 'bg-[#12151a]/70 backdrop-blur border-b border-white/10', link: 'text-white/85 hover:text-white', cta: 'rounded-full bg-white font-semibold text-[#12151a] hover:bg-[#f2ede4]', menu: 'bg-[#12151a] border-white/10', logo: `${serif} text-xl` }} />
      <main id="main">
        {/* Cinematic hero */}
        <section className="relative isolate min-h-[640px] overflow-hidden md:min-h-[calc(100dvh-4rem)]">
          {scenes.map((s, k) => (
            <img key={s.key} src={img(s.key, 1800, 1100)} alt={k === i ? s.alt : ''} aria-hidden={k !== i} fetchPriority={k === 0 ? 'high' : undefined} loading={k === 0 ? 'eager' : 'lazy'}
              className={`kb absolute inset-0 -z-20 h-full w-full object-cover transition-opacity duration-[1600ms] ease-out ${k === i ? 'opacity-100' : 'opacity-0'}`} />
          ))}
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/45 via-black/10 to-black/85" />
          <h1 className="sr-only">{c.businessName || 'Your business'}: {customHeadline(c) ?? 'Your story, told boldly.'}</h1>
          <p aria-hidden className="pointer-events-none absolute inset-x-0 top-[14%] select-none text-center font-['Archivo'] text-[clamp(4.5rem,21vw,18rem)] font-black leading-none tracking-tight"
            style={{ color: 'transparent', backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,.8), rgba(255,255,255,.08))', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>{bigWord}</p>

          <div className="mx-auto flex min-h-[inherit] max-w-6xl flex-col justify-end gap-10 px-5 pb-10 pt-40 md:flex-row md:items-end md:justify-between md:pb-14">
            <div>
              {stats.length > 0 && (
                <dl className="mb-8 flex flex-wrap gap-x-12 gap-y-4">
                  {stats.map(([n, l]) => <div key={l}><dd className="font-['Archivo'] text-4xl font-bold md:text-5xl">{n}</dd><dt className="mt-1 text-sm text-white/80">{l}</dt></div>)}
                </dl>
              )}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                <Cta content={c} className="group min-h-12 gap-3 rounded-full bg-white py-1.5 pl-6 pr-1.5 font-semibold text-[#12151a]">
                  Book now <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--brand)] text-[var(--brand-ink)] transition-transform duration-300 group-hover:rotate-45"><ArrowUpRight size={18} aria-hidden /></span>
                </Cta>
                <p className="max-w-sm text-[15px] leading-relaxed text-white/85">{c.description || 'Tell visitors what you do and who you do it for.'}</p>
              </div>
            </div>

            {scenes.length > 1 && (
              <p aria-hidden className="flex gap-1.5">{scenes.map((sc, k) => <span key={sc.key} className={`h-0.5 rounded-full transition-all duration-700 ${k === i ? 'w-8 bg-white' : 'w-3 bg-white/35'}`} />)}</p>
            )}
          </div>
        </section>

        {/* Services */}
        {services.length > 0 && (
          <section id="services" className="mx-auto max-w-6xl scroll-mt-16 px-5 py-24 md:py-32">
            <Reveal><h2 className={`${serif} max-w-xl text-4xl font-light leading-tight md:text-6xl`}>What we do</h2></Reveal>
            <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s, k) => (
                <Reveal key={k} delay={(k % 3) * 60}>
                  <article className="group h-full bg-[#12151a] p-8 transition-colors duration-300 hover:bg-[#1a1f26]">
                    <span className="text-sm tabular-nums text-[var(--brand)]">{pad(k + 1)}</span>
                    <h3 className={`${serif} mt-6 text-2xl`}>{s.name}</h3>
                    {s.desc && <p className="mt-3 leading-relaxed text-white/75">{s.desc}</p>}
                    {s.price && <p className="mt-5 text-sm font-medium text-[var(--brand)]">{s.price}</p>}
                  </article>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* About */}
        <section id="about" className="scroll-mt-16 border-y border-white/10 bg-[#0e1115] px-5 py-24 md:py-32">
          <div className={`mx-auto grid max-w-6xl items-center gap-14 ${c.isSample ? 'md:grid-cols-2' : ''}`}>
            {c.isSample && (
              <Reveal><div className="zoom overflow-hidden rounded-2xl"><img src={img('vistaDiani', 900, 1000)} alt="The sun setting over the water on Kenya's coast" loading="lazy" width={900} height={1000} className="aspect-[4/5] w-full object-cover" /></div></Reveal>
            )}
            <Reveal delay={80}>
              <h2 className={`${serif} text-4xl font-light leading-tight md:text-6xl`}>{c.isSample ? 'Built with care, delivered with pride.' : `About ${c.businessName || 'us'}`}</h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/80">{c.description || 'Tell your story here.'}</p>
              {c.team.length > 0 && (
                <ul className="mt-10 grid gap-5 sm:grid-cols-2">
                  {c.team.map((p, k) => (
                    <li key={k} className="flex items-center gap-4">
                      {p.img ? <img src={p.img} alt="" width={56} height={56} loading="lazy" className="h-14 w-14 rounded-full object-cover" /> : <span aria-hidden className="grid h-14 w-14 place-items-center rounded-full bg-[var(--brand)] font-bold text-[var(--brand-ink)]">{p.name.trim().charAt(0).toUpperCase()}</span>}
                      <span className="leading-tight"><b className="block font-medium">{p.name}</b><span className="text-sm text-white/70">{p.role}</span></span>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </div>
        </section>

        {/* Reviews */}
        {tests.length > 0 && (
          <section id="reviews" className="mx-auto max-w-6xl scroll-mt-16 px-5 py-24 md:py-32">
            <Reveal><h2 className={`${serif} text-4xl font-light md:text-6xl`}>Kind words</h2></Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {tests.map((t, k) => (
                <Reveal key={k} delay={k * 70}>
                  <figure className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-8">
                    <blockquote className={`${serif} text-2xl font-light leading-snug`}>“{t.quote}”</blockquote>
                    <figcaption className="mt-6 text-sm text-white/70">{t.name}{t.role ? `, ${t.role}` : ''}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
            <TestimonialNote content={c} />
          </section>
        )}

        {/* Booking */}
        <section id="book" className="scroll-mt-16 bg-[var(--brand)] px-5 py-24 text-[var(--brand-ink)] md:py-32">
          <div className="mx-auto grid max-w-5xl items-start gap-12 md:grid-cols-[.8fr_1.2fr]">
            <div>
              <h2 className={`${serif} text-4xl font-light leading-tight md:text-6xl`}>Let us start the conversation</h2>
              <p className="mt-4 max-w-sm opacity-90">Share a few details and we will get back to you with next steps.</p>
              {c.bookingUrl.startsWith('http') && <Cta content={c} className="mt-6 min-h-12 rounded-full bg-[#12151a] px-7 font-semibold text-white">Open online booking</Cta>}
            </div>
            <div className="rounded-2xl bg-[#12151a] p-6 text-[#f2ede4] shadow-2xl">
              <InquiryForm content={c} fields={['date', 'service']} submitLabel="Send enquiry" messageLabel="How can we help?"
                note="This is an enquiry, not a confirmed booking."
                cls={{ label: 'mb-1 block text-sm', input: 'min-h-11 w-full rounded-lg border border-white/25 bg-white/5 px-3 py-2 text-white [color-scheme:dark] focus:border-[var(--brand)]', btn: 'rounded-full bg-[var(--brand)] font-semibold text-[var(--brand-ink)] hover:brightness-110', ok: 'bg-white/10' }} />
            </div>
          </div>
        </section>

        {/* Contact: map with the details set into it */}
        <section id="contact" className="mx-auto max-w-6xl scroll-mt-16 px-5 py-24 md:py-32">
          <div className="relative overflow-hidden rounded-2xl">
            <MapBlock content={c} tone="dark" className="h-[24rem] md:h-[32rem]" />
            <div className="bg-[#1a1f26] p-7 md:absolute md:bottom-8 md:left-8 md:top-8 md:flex md:w-[23rem] md:flex-col md:justify-center md:rounded-xl md:shadow-2xl">
              <h2 className={`${serif} text-3xl font-light`}>Find us</h2>
              <ContactLines content={c} className="mt-5" iconClass="text-[var(--brand)]" />
              <h3 className={`${serif} mt-6 text-xl`}>Opening hours</h3>
              <Hours content={c} className="mt-1 text-[15px]" rowClass="border-b border-white/10" />
              {c.address && <a href={mapsSearch(c.address)} target="_blank" rel="noopener noreferrer" className="press uline mt-5 inline-flex min-h-11 items-center font-medium text-[var(--brand)]">Get directions</a>}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-white/10 px-5 py-10 text-sm text-white/70">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 md:flex-row"><Logo content={c} className={`${serif} text-lg text-white`} /><Socials content={c} /></div>
        <p className="mt-6 text-center">© {footerYear} {c.businessName || 'Your Business'}. All rights reserved.</p>
      </footer>
    </Site>
  )
}
