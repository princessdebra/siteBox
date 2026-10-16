import { Phone, ShieldCheck, MessageSquareText, Scale } from 'lucide-react'
import type { SiteContent } from '../types'
import { img } from '../data/images'
import { Site, Reveal, Nav, Cta, Hours, MapBlock, ContactLines, Socials, TestimonialNote, InquiryForm, Logo, telHref, footerYear, customHeadline, SlowZoom, cleanHours, mapsSearch } from './kit'

export default function Law({ content: c }: { content: SiteContent }) {
  const areas = c.services.filter((s) => s.name.trim())
  const tests = c.testimonials.filter((t) => t.quote.trim())
  const head = "font-['EB_Garamond'] tracking-tight"
  return (
    <Site content={c} className="font-['Lato'] text-[#1d2433]" style={{ background: '#F7F5F0' }}>
      <span id="top" />
      {c.phone && (
        <div className="bg-[var(--brand)] px-5 py-2 text-center text-sm text-[var(--brand-ink)] md:text-right">
          <a href={telHref(c.phone)} className="inline-flex min-h-8 items-center gap-2 underline-offset-4 hover:underline"><Phone size={14} aria-hidden /> Call for a consultation: {c.phone}</a>
        </div>
      )}
      <Nav content={c} ctaLabel="Book a consultation"
        links={[['Practice areas', '#areas'], ['Our team', '#team'], ['Our approach', '#process'], ['Contact', '#contact']]}
        theme={{ bar: 'bg-[#F7F5F0]/95 backdrop-blur border-b border-[#d9d4c7]', link: 'text-[#1d2433] hover:text-[var(--brand)]', cta: 'rounded-sm bg-[var(--brand)] font-bold text-[var(--brand-ink)] hover:brightness-125', menu: 'bg-[#F7F5F0] border-[#d9d4c7]', logo: `${head} text-xl font-semibold` }} />
      <main id="main">
        <section className="relative isolate overflow-hidden bg-[var(--brand)] text-[var(--brand-ink)]">
          <div className="mx-auto max-w-6xl px-5">
            <div className="py-16 md:w-1/2 md:pr-10 md:py-28">
              <p className="inline-block rounded-full border border-current/30 px-4 py-1.5 text-sm font-bold">{c.tagline || 'Legal advice'}</p>
              <h1 className={`${head} mt-6 text-balance text-[2.8rem] font-medium leading-[1.04] md:text-[4.4rem]`}>{customHeadline(c) ?? (<>Clear advice when it matters most.</>)}</h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed opacity-90">{c.description || 'Describe your firm in a sentence or two.'}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Cta content={c} className="min-h-12 rounded-sm bg-[var(--brand2)] px-8 font-bold text-[var(--brand2-ink)] hover:brightness-110">Book a consultation</Cta>
                <a href="#areas" className="press inline-flex min-h-12 items-center rounded-sm border border-current/40 px-7 font-semibold hover:bg-white/10">Practice areas</a>
              </div>
              {areas.length > 0 && (
                <ul aria-label="Practice areas" className="mt-10 flex flex-wrap gap-2">
                  {areas.slice(0, 4).map((a) => <li key={a.name}><a href="#areas" className="press inline-flex min-h-10 items-center rounded-full bg-white/10 px-4 text-sm font-bold hover:bg-white/20">{a.name}</a></li>)}
                </ul>
              )}
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden md:absolute md:inset-y-0 md:right-0 md:aspect-auto md:w-1/2">
            <div className="absolute inset-0 md:[-webkit-mask-image:linear-gradient(to_right,transparent,#000_52%)] md:[mask-image:linear-gradient(to_right,transparent,#000_52%)]"><SlowZoom src={img('lawHero', 1100, 1200)} alt="An advocate at his desk in a quiet office" className="absolute inset-0 h-full w-full object-cover object-[60%_25%]" priority /></div>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[var(--brand)] via-transparent to-transparent md:hidden" />
            {c.team[0] && (
              <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-white/90 p-4 text-[#1d2433] shadow-xl backdrop-blur md:left-16 md:right-auto md:max-w-xs">
                <p className={`${head} text-xl font-semibold leading-tight`}>{c.team[0].name}</p>
                <p className="text-sm font-bold text-[#5b4620]">{c.team[0].role}</p>
                {cleanHours(c)[0] && <p className="mt-2 text-sm text-[#3a4357]">Available {cleanHours(c)[0].days}, {cleanHours(c)[0].time}</p>}
              </div>
            )}
          </div>
        </section>

        <section aria-label="How we work" className="border-y border-[#d9d4c7] bg-white">
          <ul className="mx-auto grid max-w-6xl gap-6 px-5 py-8 md:grid-cols-3">
            {([[ShieldCheck, 'Confidential', 'Your conversations stay private.'], [MessageSquareText, 'Plain language', 'No jargon, no pressure.'], [Scale, 'Fees discussed upfront', 'You know what to expect before we begin.']] as const).map(([Icon, t, d]) => (
              <li key={t} className="flex items-start gap-4"><Icon className="mt-1 shrink-0 text-[var(--brand)]" aria-hidden /><div><p className="font-bold">{t}</p><p className="text-[#3a4357]">{d}</p></div></li>
            ))}
          </ul>
        </section>

        {/* Practice areas */}
        {areas.length > 0 && (
          <section id="areas" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 md:py-32">
            <Reveal className="max-w-2xl">
              <h2 className={`${head} text-balance text-4xl font-medium leading-tight text-[var(--brand)] md:text-6xl`}>Where we can help</h2>
              <p className="mt-4 text-lg leading-relaxed text-[#3a4357]">Every matter is different. Tell us about yours and we will explain your options.</p>
            </Reveal>
            <div className="mt-16 grid gap-x-12 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {areas.map((s, i) => (
                <Reveal key={i} delay={(i % 3) * 60}>
                  <article className="group border-t-2 border-[var(--brand)] pt-6">
                    <span className={`${head} text-3xl font-medium italic`} style={{ color: 'color-mix(in srgb, var(--brand2) 80%, black)' }}>{String(i + 1).padStart(2, '0')}</span>
                    <h3 className={`${head} mt-3 text-[1.75rem] font-semibold leading-tight`}>{s.name}</h3>
                    {s.desc && <p className="mt-3 leading-relaxed text-[#3a4357]">{s.desc}</p>}
                    <a href="#book" className="press uline mt-5 inline-flex min-h-11 items-center text-sm font-bold text-[var(--brand)]">Discuss this matter</a>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Attorneys */}
        {c.team.length > 0 && (
          <section id="team" className="scroll-mt-24 bg-white px-5 py-24 md:py-32">
            <div className="mx-auto max-w-6xl">
              <Reveal className="max-w-2xl">
                <h2 className={`${head} text-balance text-4xl font-medium leading-tight text-[var(--brand)] md:text-6xl`}>The people you will speak to</h2>
                {c.isSample && <p className="mt-3 text-sm text-[#3a4357]">Sample attorneys, for illustration only.</p>}
              </Reveal>
              <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-3">
                {c.team.map((p, i) => (
                  <Reveal key={i} delay={i * 70}>
                    <article>
                      {p.img && <div className="zoom overflow-hidden bg-[#e9e6dd]"><img src={p.img} alt={`Portrait of ${p.name}`} loading="lazy" width={500} height={600} className="aspect-[4/5] w-full object-cover object-top" /></div>}
                      <h3 className={`${head} mt-5 text-[1.75rem] font-semibold leading-tight`}>{p.name}</h3>
                      <p className="text-sm font-bold uppercase tracking-wider text-[#5b4620]">{p.role}</p>
                      {p.bio && <p className="mt-3 leading-relaxed text-[#3a4357]">{p.bio}</p>}
                      {p.tags && <ul className="mt-4 flex flex-wrap gap-2">{p.tags.map((t) => <li key={t} className="border border-[#cfc9b8] px-2.5 py-1 text-xs font-bold">{t}</li>)}</ul>}
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Approach, on the brand colour */}
        <section id="process" className="scroll-mt-24 bg-[var(--brand)] px-5 py-24 text-[var(--brand-ink)] md:py-32">
          <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[.8fr_1.2fr] md:gap-20">
            <Reveal><h2 className={`${head} text-balance text-4xl font-medium leading-tight md:text-6xl`}>Advice you can act on</h2></Reveal>
            <ol className="divide-y divide-current/20 border-y border-current/20">
              {[['Tell us briefly', 'Share the outline of your situation using the form or by phone.'], ['Initial consultation', 'We listen, explain your options and discuss likely costs.'], ['You decide', 'There is no obligation to proceed after the consultation.']].map(([t, d], i) => (
                <Reveal key={t} delay={i * 70}><li className="grid grid-cols-[3.5rem_1fr] gap-4 py-7 list-none"><span className={`${head} text-4xl font-medium italic opacity-70`} aria-hidden>{i + 1}</span><div><h3 className={`${head} text-2xl font-semibold`}>{t}</h3><p className="mt-1 max-w-md leading-relaxed opacity-90">{d}</p></div></li></Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Client voices */}
        {tests.length > 0 && (
          <section aria-label="Client comments" className="mx-auto max-w-6xl px-5 py-24 md:py-32">
            <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:items-end">
              <Reveal>
                <figure>
                  <blockquote className={`${head} text-balance text-3xl font-medium leading-snug text-[var(--brand)] md:text-[2.75rem]`}>“{tests[0].quote}”</blockquote>
                  <figcaption className="mt-6 text-sm font-bold text-[#3a4357]">{tests[0].name}{c.isSample ? ', illustrative sample' : ''}</figcaption>
                </figure>
              </Reveal>
              {tests[1] && (
                <Reveal delay={80}>
                  <figure className="border-l-2 border-[var(--brand2)] pl-6">
                    <blockquote className="text-lg leading-relaxed">“{tests[1].quote}”</blockquote>
                    <figcaption className="mt-3 text-sm font-bold text-[#3a4357]">{tests[1].name}{c.isSample ? ', illustrative sample' : ''}</figcaption>
                  </figure>
                </Reveal>
              )}
            </div>
            <TestimonialNote content={c} />
          </section>
        )}

        {/* Consultation */}
        <section id="book" className="scroll-mt-24 bg-white px-5 py-24 md:py-32">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[.8fr_1.2fr]">
            <div>
              <h2 className={`${head} text-balance text-4xl font-medium leading-tight text-[var(--brand)] md:text-6xl`}>Request a consultation</h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-[#3a4357]">Please do not include confidential details or documents in this form. We will contact you to arrange a time.</p>
              {c.bookingUrl.startsWith('http') && <Cta content={c} className="mt-6 min-h-12 rounded-sm bg-[var(--brand)] px-7 font-bold text-[var(--brand-ink)]">Book online</Cta>}
            </div>
            <div className="border border-[#d9d4c7] bg-[#F7F5F0] p-6 md:p-8">
              <InquiryForm content={c} fields={['date', 'service']} submitLabel="Request consultation" messageLabel="Briefly, how can we help?"
                note="Sending this form does not create a lawyer-client relationship."
                cls={{ label: 'mb-1 block text-sm font-bold', input: 'min-h-11 w-full rounded-sm border border-[#b9b3a3] bg-white px-3 py-2 focus:border-[var(--brand)]', btn: 'rounded-sm bg-[var(--brand)] font-bold text-[var(--brand-ink)] hover:brightness-125', ok: 'bg-white' }} />
            </div>
          </div>
        </section>

        {/* Office: map with the details set into it */}
        <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 md:py-32">
          <div className="relative overflow-hidden">
            <MapBlock content={c} className="h-[24rem] md:h-[32rem]" />
            <div className="bg-[var(--brand)] p-7 text-[var(--brand-ink)] md:absolute md:bottom-8 md:left-8 md:top-8 md:flex md:w-[23rem] md:flex-col md:justify-center md:shadow-2xl">
              <h2 className={`${head} text-3xl font-medium`}>Our office</h2>
              <ContactLines content={c} className="mt-5" iconClass="opacity-80" />
              <h3 className={`${head} mt-6 text-xl font-medium`}>Office hours</h3>
              <Hours content={c} className="mt-1 text-[15px]" rowClass="border-b border-current/20" />
              {c.address && <a href={mapsSearch(c.address)} target="_blank" rel="noopener noreferrer" className="press uline mt-5 inline-flex min-h-11 items-center font-bold">Get directions</a>}
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-[var(--brand)] px-5 py-10 text-[var(--brand-ink)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 md:flex-row"><Logo content={c} className={`${head} text-lg font-semibold`} /><Socials content={c} /></div>
        <p className="mx-auto mt-6 max-w-3xl text-center text-xs opacity-80">© {footerYear} {c.businessName || 'Your Firm'}. This website provides general information only and is not legal advice. Past matters do not guarantee future outcomes.</p>
      </footer>
    </Site>
  )
}
