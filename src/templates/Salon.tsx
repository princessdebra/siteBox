import { useEffect, useRef, useState } from 'react'
import { CalendarHeart } from 'lucide-react'
import type { SiteContent } from '../types'
import { img } from '../data/images'
import { Site, Reveal, Nav, Cta, Hours, MapBlock, ContactLines, Socials, TestimonialNote, InquiryForm, Logo, Carousel, cleanHours, footerYear , customHeadline , SlowZoom } from './kit'

const tint = (n: number) => `color-mix(in srgb, var(--brand) ${n}%, white)`

export default function Salon({ content: c }: { content: SiteContent }) {
  const services = c.services.filter((s) => s.name.trim())
  const tests = c.testimonials.filter((t) => t.quote.trim())
  const heading = "font-['Cormorant_Garamond'] font-semibold tracking-tight"
  const ctaRef = useRef<HTMLDivElement>(null)
  const [heroCtaSeen, setHeroCtaSeen] = useState(true)
  useEffect(() => {
    const el = ctaRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([e]) => setHeroCtaSeen(e.isIntersecting), { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Site content={c} className="font-['Jost'] text-[#3a2a2d]" style={{ background: '#FBF6F1' }}>
      <span id="top" />
      <Nav content={c} ctaLabel="Book appointment"
        links={[['Services', '#services'], ['Stylists', '#team'], ['Reviews', '#reviews'], ['Visit', '#contact']]}
        theme={{ bar: 'bg-[#FBF6F1]/90 backdrop-blur border-b border-[#ecdfd2]', link: 'text-[#3a2a2d] hover:text-[var(--brand)]', cta: 'rounded-full bg-[var(--brand)] text-[var(--brand-ink)] hover:opacity-90', menu: 'bg-[#FBF6F1] border-[#ecdfd2]', logo: `${heading} text-xl` }} />
      <main id="main">
        {/* Hero: one tall architectural portrait, one calm column of type */}
        <section className="relative isolate overflow-hidden lg:h-[calc(100dvh-4rem)] lg:max-h-[880px] lg:min-h-[600px]">
          <div className="mx-auto w-full max-w-6xl px-5 pt-6 lg:absolute lg:inset-y-0 lg:right-[max(1.25rem,calc((100vw-72rem)/2+1.25rem))] lg:mx-0 lg:w-[min(40vw,31rem)] lg:max-w-none lg:px-0 lg:pt-10">
            <div className="h-[min(52dvh,30rem)] max-w-[24rem] overflow-hidden rounded-t-[999px] bg-[#e9dccd] sm:max-w-[28rem] lg:h-full lg:max-w-none">
              <SlowZoom src={img('salonHero', 1100, 1400)} alt="Smiling woman with long, freshly styled box braids" className="h-full w-full object-cover object-[50%_18%] [filter:saturate(1.05)_sepia(.06)]" priority />
            </div>
          </div>

          <div className="relative z-10 mx-auto flex max-w-6xl flex-col px-5 pb-16 pt-10 lg:h-full lg:justify-center lg:pb-12 lg:pt-0">
            <div className="lg:w-[56%]">
              <p className="mb-6 text-[13px] font-medium uppercase tracking-[0.3em] text-[var(--brand)]">{c.tagline || 'Braids · Natural hair · Colour · Skin'}</p>
              <h1 className="font-['Cormorant_Garamond'] text-[clamp(4.25rem,17vw,5.5rem)] font-medium leading-[0.9] tracking-[-0.02em] lg:text-[clamp(4.5rem,8.6vw,8.75rem)]">
                {customHeadline(c) ?? (<><span className="block">Beauty,</span><em className="block pr-2 font-medium italic text-[var(--brand)]">unhurried.</em></>)}
              </h1>
              <p className="mt-8 max-w-[26rem] text-[1.0625rem] leading-[1.7] text-[#5a484b]">{c.description || 'Add a short description of your salon here.'}</p>
              <div ref={ctaRef} className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Cta content={c} className="min-h-14 w-full rounded-full bg-[var(--brand)] px-9 text-base font-medium tracking-wide text-[var(--brand-ink)] shadow-[0_10px_30px_-12px_var(--brand)] hover:brightness-110 sm:w-auto"><CalendarHeart size={18} aria-hidden /> Book an appointment</Cta>
                {services.length > 0 && <a href="#services" className="press uline inline-flex min-h-11 items-center text-[#3a2a2d]">Explore services</a>}
              </div>
              {cleanHours(c)[0] && <p className="mt-7 text-sm text-[#7a6669]">Open {cleanHours(c)[0].days}, {cleanHours(c)[0].time}</p>}
            </div>
          </div>
        </section>

        {/* A single quiet quote, directly below the hero */}
        {tests[0] && (
          <section aria-label="What clients say" className="px-5 py-20 md:py-28">
            <Reveal>
              <figure className="mx-auto max-w-3xl text-center">
                <blockquote className={`${heading} text-balance text-3xl font-medium italic leading-snug md:text-[2.5rem]`}>“{tests[0].quote}”</blockquote>
                <figcaption className="mt-6 text-sm tracking-wide text-[#7a6669]">{tests[0].name}{c.isSample ? ', illustrative sample' : ''}</figcaption>
              </figure>
            </Reveal>
          </section>
        )}

        {/* Services: price-menu */}
        {services.length > 0 && (
          <section id="services" className="py-16 md:py-24" style={{ background: tint(8) }}>
            <div className="mx-auto max-w-5xl px-5">
              <Reveal><h2 className={`${heading} text-center text-4xl md:text-5xl`}>Services &amp; Prices</h2>
                <p className="mx-auto mt-3 max-w-md text-center text-[#5a484b]">Prices are a guide. Your stylist will confirm after a short consultation.</p></Reveal>
              <div className="mt-12 grid gap-x-14 gap-y-8 md:grid-cols-2">
                {services.map((s, i) => (
                  <Reveal key={i} delay={(i % 2) * 60}>
                    <div className="flex items-baseline gap-3"><h3 className={`${heading} text-2xl`}>{s.name}</h3>
                      <span aria-hidden className="mb-1 flex-1 border-b border-dotted border-[#3a2a2d]/30" />
                      {s.price && <span className="font-medium tabular-nums text-[var(--brand)]">{s.price}</span>}</div>
                    {s.desc && <p className="mt-1 text-[#5a484b]">{s.desc}</p>}
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Gallery */}
        <section id="studio" aria-label="Studio gallery" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24 md:py-32">
          <Reveal><h2 className={`${heading} mb-8 text-4xl md:text-5xl`}>Inside the studio</h2></Reveal>
          <Carousel label="Studio gallery" itemClass="basis-[72%] sm:basis-[38%] lg:basis-[24%]">
            {([['salonChairs', 'Styling chairs in a bright salon'], ['salonMakeup', 'Close-up of a bold makeup look'], ['salonBraid', 'Woman with a braided updo'], ['skin', 'Relaxing skincare treatment'], ['salonRoom', 'Bright salon interior with mirrors'], ['salonStyle', 'Styling station with large mirrors']] as const).map(([k, alt]) => (
              <figure key={k} className="zoom overflow-hidden rounded-2xl"><img src={img(k, 500, 640)} alt={alt} loading="lazy" width={500} height={640} className="aspect-[4/5] w-full object-cover" /></figure>
            ))}
          </Carousel>
        </section>

        {/* Team */}
        {c.team.length > 0 && (
          <section id="team" className="mx-auto max-w-6xl px-5 pb-16 md:pb-24">
            <Reveal><h2 className={`${heading} text-center text-4xl md:text-5xl`}>Meet your stylists</h2></Reveal>
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {c.team.map((p, i) => (
                <Reveal key={i} delay={i * 70} className="text-center">
                  {p.img ? <img src={p.img} alt={`Portrait of ${p.name}`} loading="lazy" width={500} height={600} className="mx-auto aspect-square w-48 rounded-full object-cover" /> : <div className="mx-auto h-48 w-48 rounded-full" style={{ background: tint(20) }} />}
                  <h3 className={`${heading} mt-5 text-2xl`}>{p.name}</h3>
                  <p className="text-sm uppercase tracking-widest text-[var(--brand)]">{p.role}</p>
                  <p className="mx-auto mt-2 max-w-xs text-[#5a484b]">{p.bio}</p>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Testimonials */}
        {tests.length > 0 && (
          <section id="reviews" className="py-16 md:py-24" style={{ background: tint(8) }}>
            <div className="mx-auto max-w-6xl px-5">
              <Reveal><h2 className={`${heading} text-center text-4xl md:text-5xl`}>Kind words</h2></Reveal>
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {tests.map((t, i) => (
                  <Reveal key={i} delay={i * 70}><figure className="h-full rounded-2xl bg-white p-7 shadow-sm">
                    <span aria-hidden className={`${heading} block h-8 text-6xl leading-none text-[var(--brand)]`}>“</span>
                    <blockquote className={`${heading} mt-2 text-xl leading-snug`}>{t.quote}</blockquote>
                    <figcaption className="mt-5 text-sm text-[#5a484b]">{t.name}{t.role ? ` · ${t.role}` : ''}</figcaption></figure></Reveal>
                ))}
              </div>
              <TestimonialNote content={c} className="text-center" />
            </div>
          </section>
        )}

        {/* Booking */}
        <section id="book" className="scroll-mt-16 px-5 py-16 md:py-24" style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}>
          <div className="mx-auto grid max-w-5xl items-start gap-10 md:grid-cols-[.8fr_1.2fr]">
            <div><h2 className={`${heading} text-4xl md:text-5xl`}>Reserve your chair</h2>
              <p className="mt-4 max-w-sm opacity-90">Tell us what you have in mind and we will confirm your appointment by phone or email.</p>
              {c.bookingUrl.startsWith('http') && <Cta content={c} className="mt-6 min-h-12 rounded-full bg-white px-7 text-[#3a2a2d]">Open online booking</Cta>}</div>
            <div className="rounded-2xl bg-white p-6 text-[#3a2a2d] shadow-xl">
              <InquiryForm content={c} fields={['date', 'time', 'service']} submitLabel="Request appointment" messageLabel="Anything we should know? (optional)"
                note="Requests are confirmed by the salon. This is not a confirmed booking."
                cls={{ label: 'mb-1 block text-sm font-medium', input: 'min-h-11 w-full rounded-lg border border-[#d8c9bb] bg-white px-3 py-2 focus:border-[var(--brand)]', btn: 'rounded-full bg-[var(--brand)] text-[var(--brand-ink)] hover:opacity-90', ok: 'bg-[#f5ece3]' }} />
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <div><h2 className={`${heading} text-4xl md:text-5xl`}>Visit the studio</h2>
            <ContactLines content={c} className="mt-6 text-lg" iconClass="text-[var(--brand)]" />
            <h3 className={`${heading} mt-8 text-2xl`}>Opening hours</h3>
            <Hours content={c} className="mt-2 max-w-sm" rowClass="border-b border-[#3a2a2d]/10" /></div>
          <MapBlock content={c} className="rounded-2xl" />
        </section>
      </main>

      <footer className="border-t border-[#ecdfd2] px-5 py-10 pb-28 md:pb-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 md:flex-row">
          <Logo content={c} className={`${heading} text-xl`} />
          <nav aria-label="Footer" className="flex gap-6 text-sm"><a href="#services">Services</a><a href="#team">Stylists</a><a href="#contact">Contact</a></nav>
          <Socials content={c} />
        </div>
        <p className="mt-6 text-center text-xs text-[#5a484b]">© {footerYear} {c.businessName || 'Your Business'}. All rights reserved.</p>
      </footer>

      {/* Mobile appointment bar */}
      <div inert={heroCtaSeen} className={`fixed inset-x-0 bottom-0 z-40 border-t border-[#ecdfd2] bg-[#FBF6F1]/95 p-3 backdrop-blur transition-transform duration-300 ease-out motion-reduce:transition-none md:hidden ${heroCtaSeen ? 'translate-y-full' : 'translate-y-0'}`}>
        <Cta content={c} className="min-h-12 w-full rounded-full bg-[var(--brand)] font-medium text-[var(--brand-ink)]"><CalendarHeart size={18} aria-hidden /> Book appointment</Cta>
      </div>
    </Site>
  )
}
