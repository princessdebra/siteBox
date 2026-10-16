import { Check, CalendarCheck, Phone, ArrowUpRight, TriangleAlert } from 'lucide-react'
import type { SiteContent } from '../types'
import { img } from '../data/images'
import { Site, Reveal, Nav, Cta, Hours, MapBlock, ContactLines, Socials, TestimonialNote, InquiryForm, Logo, telHref, mapsSearch, footerYear, customHeadline, SlowZoom, cleanHours } from './kit'
import { QuickBook } from './hero'

const serif = "font-['Fraunces']"
const warm = '#FAF8F3'
const mix = (n: number, base = warm) => `color-mix(in srgb, var(--brand) ${n}%, ${base})`

export default function Clinic({ content: c }: { content: SiteContent }) {
  const services = c.services.filter((s) => s.name.trim())
  const tests = c.testimonials.filter((t) => t.quote.trim())
  const [q1, ...restQ] = tests
  const hours0 = cleanHours(c)[0]
  return (
    <Site content={c} className="font-['Atkinson_Hyperlegible'] text-[1.0625rem] text-[#17302f]" style={{ background: warm }}>
      <span id="top" />
      <div className="flex items-center justify-center gap-2 bg-[#17302f] px-5 py-2 text-center text-sm text-white"><TriangleAlert size={15} className="shrink-0" aria-hidden /> In an emergency, call your local emergency number. This website is not for urgent care.</div>
      <Nav content={c} ctaLabel="Book appointment"
        links={[['Services', '#services'], ['Our team', '#team'], ['Visit', '#contact'], ['Contact', '#book']]}
        theme={{ bar: 'bg-[#FAF8F3]/95 backdrop-blur border-b border-[#e2e6dd]', link: 'text-[#17302f] hover:text-[var(--brand)] underline-offset-4 hover:underline', cta: 'rounded-xl bg-[var(--brand)] font-bold text-[var(--brand-ink)] hover:brightness-110', menu: 'bg-[#FAF8F3] border-[#e2e6dd]', logo: 'text-lg font-bold' }} />
      <main id="main">
        {/* Hero */}
        <section className="px-5 pb-20 pt-6 md:pt-10">
          <div className="relative mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] md:grid-cols-[1.05fr_.95fr]" style={{ background: mix(11) }}>
            <div className="px-6 pb-16 pt-12 md:px-12 md:py-20">
              <p className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-bold text-[#0b4a50]">{c.tagline || 'Healthcare you can trust'}</p>
              <h1 className={`${serif} mt-5 text-balance text-[2.6rem] font-medium leading-[1.04] tracking-tight md:text-[3.7rem]`}>{customHeadline(c) ?? (<>Care that listens, <em className="font-medium italic text-[var(--brand)]">close to home.</em></>)}</h1>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-[#38514f]">{c.description || 'Describe your clinic and who you care for.'}</p>
              <ul className="mt-7 space-y-3">
                {[hours0 && `Open ${hours0.days}, ${hours0.time}`, c.phone && `Call us on ${c.phone}`, 'Your information stays private. No medical details online.'].filter(Boolean).map((t) => (
                  <li key={String(t)} className="flex items-start gap-3"><span aria-hidden className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--brand)] text-[var(--brand-ink)]"><Check size={14} strokeWidth={3} /></span><span className="font-medium">{t}</span></li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-3">
                <Cta content={c} className="min-h-14 rounded-xl bg-[var(--brand)] px-7 font-bold text-[var(--brand-ink)] hover:brightness-110"><CalendarCheck size={20} aria-hidden /> Book online</Cta>
                {c.phone && <a href={telHref(c.phone)} className="press inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border-2 border-[var(--brand)] bg-white px-6 font-bold text-[#0b4a50]"><Phone size={20} aria-hidden /> Call us</a>}
              </div>
            </div>
            <div className="relative min-h-[340px] md:min-h-full">
              <div className="absolute inset-0 overflow-hidden md:rounded-l-[5rem]">
                <SlowZoom src={img('clinicHero', 1100, 1200)} alt="A smiling doctor in a white coat holding a stethoscope" className="h-full w-full object-cover object-[45%_30%]" priority />
              </div>
              {c.team[0] && (
                <div className="absolute bottom-16 left-5 flex items-center gap-3 rounded-full bg-white py-2 pl-2 pr-5 shadow-lg md:bottom-14 md:left-10">
                  {c.team[0].img ? <img src={c.team[0].img} alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover" /> : <span aria-hidden className="grid h-11 w-11 place-items-center rounded-full bg-[var(--brand)] font-bold text-[var(--brand-ink)]">{c.team[0].name.trim().charAt(0).toUpperCase()}</span>}
                  <span className="text-sm leading-tight"><b className="block">{c.team[0].name}</b><span className="text-[#38514f]">{c.team[0].role}</span></span>
                </div>
              )}
            </div>
          </div>
          <QuickBook content={c} className="relative z-10 mx-auto -mt-10 max-w-5xl" />
        </section>

        {/* Services: a structured list beside a warm photograph */}
        {services.length > 0 && (
          <section id="services" className="scroll-mt-24 px-5 py-24 md:py-32" style={{ background: mix(6, '#ffffff') }}>
            <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
              <Reveal className="lg:sticky lg:top-28 lg:self-start">
                <p className="text-sm font-bold text-[#0b4a50]">Our services</p>
                <h2 className={`${serif} mt-3 text-balance text-4xl font-medium leading-tight tracking-tight md:text-5xl`}>Care for the whole family</h2>
                <p className="mt-4 max-w-md leading-relaxed text-[#38514f]">Not sure which service you need? Call or send a message and we will point you in the right direction.</p>
                {c.isSample && (
                  <div className="zoom mt-8 hidden overflow-hidden rounded-2xl lg:block"><img src={img('clinicMom', 800, 900)} alt="A mother smiling with her baby" loading="lazy" width={800} height={900} className="aspect-[5/4] w-full object-cover object-[50%_35%]" /></div>
                )}
              </Reveal>
              <ol className="border-t border-[#cddbd9]">
                {services.map((s, i) => (
                  <Reveal key={i}>
                    <li className="border-b border-[#cddbd9]">
                      <a href="#book" className="group grid grid-cols-[2.75rem_1fr_auto] items-baseline gap-x-4 px-1 py-7 transition-colors hover:bg-white/70 md:px-3">
                        <span className="text-sm font-bold tabular-nums text-[var(--brand)]">{String(i + 1).padStart(2, '0')}</span>
                        <span><span className={`${serif} block text-2xl font-medium leading-snug`}>{s.name}</span>{s.desc && <span className="mt-1.5 block max-w-md leading-relaxed text-[#38514f]">{s.desc}</span>}{s.price && <span className="mt-2 block text-sm font-bold text-[#0b4a50]">{s.price}</span>}</span>
                        <ArrowUpRight size={22} aria-hidden className="mt-1 text-[var(--brand)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
                        <span className="sr-only">Ask about this service</span>
                      </a>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* Practitioners */}
        {c.team.length > 0 && (
          <section id="team" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 md:py-32">
            <Reveal className="max-w-xl">
              <p className="text-sm font-bold text-[#0b4a50]">Our practitioners</p>
              <h2 className={`${serif} mt-3 text-balance text-4xl font-medium leading-tight tracking-tight md:text-5xl`}>People who take the time to listen</h2>
              {c.isSample && <p className="mt-3 text-sm text-[#38514f]">Sample practitioners, for illustration only.</p>}
            </Reveal>
            <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-3">
              {c.team.map((p, i) => (
                <Reveal key={i} delay={i * 70} className={i === 1 ? 'md:mt-12' : ''}>
                  <article>
                    {p.img && <div className="zoom overflow-hidden rounded-2xl bg-[#e8eee9]"><img src={p.img} alt={`Portrait of ${p.name}`} loading="lazy" width={500} height={600} className="aspect-[4/5] w-full object-cover object-top" /></div>}
                    <h3 className={`${serif} mt-5 text-2xl font-medium`}>{p.name}</h3>
                    <p className="font-bold text-[#0b4a50]">{p.role}</p>
                    {p.bio && <p className="mt-2 leading-relaxed text-[#38514f]">{p.bio}</p>}
                    {p.tags && <ul className="mt-4 flex flex-wrap gap-2">{p.tags.map((t) => <li key={t} className="rounded-full border border-[#b9ccca] px-3 py-1 text-sm">{t}</li>)}</ul>}
                  </article>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* What to expect */}
        <section aria-label="What to expect" className="px-5 py-20 md:py-24" style={{ background: mix(10) }}>
          <ol className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3 md:gap-12">
            {[['Choose a time', 'Book online or call. We will confirm by phone or message.'], ['Visit us', 'Arrive a few minutes early and bring any current medication list.'], ['Follow-up', 'We explain next steps clearly and keep your records private.']].map(([t, d], i) => (
              <Reveal key={t} delay={i * 70}><li className="list-none border-t border-[#17302f]/25 pt-5"><span className={`${serif} text-5xl font-light italic text-[var(--brand)]`} aria-hidden>{i + 1}</span><h3 className="mt-3 text-xl font-bold">{t}</h3><p className="mt-1 leading-relaxed text-[#38514f]">{d}</p></li></Reveal>
            ))}
          </ol>
        </section>

        {/* Patient voices */}
        {q1 && (
          <section aria-label="Patient comments" className="mx-auto max-w-6xl px-5 py-24 md:py-32">
            <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:items-end">
              <Reveal>
                <figure>
                  <blockquote className={`${serif} text-balance text-3xl font-light leading-snug md:text-[2.75rem]`}>“{q1.quote}”</blockquote>
                  <figcaption className="mt-6 text-sm font-bold text-[#38514f]">{q1.name}{c.isSample ? ', illustrative sample' : ''}</figcaption>
                </figure>
              </Reveal>
              {restQ[0] && (
                <Reveal delay={80}>
                  <figure className="border-l-2 border-[var(--brand)] pl-6">
                    <blockquote className="text-lg leading-relaxed">“{restQ[0].quote}”</blockquote>
                    <figcaption className="mt-3 text-sm font-bold text-[#38514f]">{restQ[0].name}{c.isSample ? ', illustrative sample' : ''}</figcaption>
                  </figure>
                </Reveal>
              )}
            </div>
            <TestimonialNote content={c} />
          </section>
        )}

        {/* Booking */}
        <section id="book" className="scroll-mt-24 bg-[var(--brand)] px-5 py-24 text-[var(--brand-ink)] md:py-32">
          <div className="mx-auto grid max-w-6xl items-start gap-12 md:grid-cols-[.9fr_1.1fr]">
            <div>
              <h2 className={`${serif} text-balance text-4xl font-medium leading-tight tracking-tight md:text-5xl`}>Book a visit or ask a question</h2>
              <p className="mt-4 max-w-md leading-relaxed opacity-95">Please <b>do not share medical details</b> in this form. Reception will call you back to arrange your appointment.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {c.bookingUrl.startsWith('http') && <Cta content={c} className="min-h-14 rounded-xl bg-white px-7 font-bold text-[#17302f]">Book online</Cta>}
                {c.phone && <a href={telHref(c.phone)} className="press inline-flex min-h-14 items-center gap-2 rounded-xl border-2 border-current px-6 font-bold"><Phone size={20} aria-hidden /> {c.phone}</a>}
              </div>
            </div>
            <div className="rounded-2xl bg-white p-6 text-[#17302f] shadow-xl md:p-8">
              <InquiryForm content={c} fields={['date', 'time']} submitLabel="Send request" messageLabel="What is this about? (no medical details please)"
                note="We will only use your details to reply to this request."
                cls={{ label: 'mb-1 block text-base font-bold', input: 'min-h-12 w-full rounded-xl border-2 border-[#b5ccca] bg-white px-3 py-2 focus:border-[var(--brand)]', btn: 'rounded-xl bg-[var(--brand)] font-bold text-[var(--brand-ink)] hover:brightness-110', ok: 'bg-[#f1f6f4]' }} />
            </div>
          </div>
        </section>

        {/* Location: map with the details set into it */}
        <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 md:py-32">
          <div className="relative overflow-hidden rounded-[2rem]">
            <MapBlock content={c} className="h-[26rem] md:h-[34rem]" />
            <div className="bg-white p-7 md:absolute md:bottom-8 md:left-8 md:top-8 md:flex md:w-[24rem] md:flex-col md:justify-center md:rounded-2xl md:shadow-2xl">
              <h2 className={`${serif} text-3xl font-medium`}>Visit the clinic</h2>
              <ContactLines content={c} className="mt-5" iconClass="text-[var(--brand)]" />
              <h3 className="mt-6 text-sm font-bold text-[#0b4a50]">Opening hours</h3>
              <Hours content={c} className="mt-1" rowClass="border-b border-[#e2e6dd] text-[15px]" />
              {c.address && <a href={mapsSearch(c.address)} target="_blank" rel="noopener noreferrer" className="press mt-5 inline-flex min-h-11 items-center gap-1.5 font-bold text-[var(--brand)] underline underline-offset-4">Get directions <ArrowUpRight size={16} aria-hidden /></a>}
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-[#17302f] px-5 py-12 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 md:flex-row"><Logo content={c} className="text-lg font-bold" /><Socials content={c} /></div>
        <p className="mx-auto mt-6 max-w-3xl text-center text-sm opacity-80">© {footerYear} {c.businessName || 'Your Clinic'}. General information only; it is not a substitute for professional medical advice.</p>
      </footer>
    </Site>
  )
}
