import { useState, type ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { TEMPLATES } from '../data/templates'

export const btn = {
  primary: 'press inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-pine px-7 font-medium tracking-wide text-[#f6f0e6] hover:bg-pine-2',
  amber: 'press inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-amber px-7 font-medium tracking-wide text-amber-ink hover:brightness-105',
  ghost: 'press inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-pine/35 px-7 font-medium tracking-wide text-pine hover:bg-pine/5',
  small: 'press inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg px-5 text-sm font-medium',
  /** Primary action on a dark surface */
  light: 'press inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#f6f0e6] px-7 font-medium tracking-wide text-pine hover:bg-white',
}

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="inline-flex min-h-11 items-center gap-2.5" aria-label="SiteBox home">
      <span className={`font-display text-[1.6rem] font-normal tracking-tight ${light ? 'text-[#f6f0e6]' : 'text-pine'}`}>SiteBox</span>
    </Link>
  )
}

export function Header({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false)
  const link = ({ isActive }: { isActive: boolean }) => `press min-h-11 inline-flex items-center px-4 text-[15px] ${dark ? (isActive ? 'text-white underline decoration-amber decoration-2 underline-offset-8' : 'text-[#f6f0e6]/80 hover:text-white') : isActive ? 'text-pine underline decoration-amber decoration-2 underline-offset-8' : 'text-ink-2 hover:text-pine'}`
  return (
    <header className={`sticky top-0 z-40 border-b backdrop-blur ${dark ? 'border-white/10 bg-deep/85' : 'border-line bg-paper/90'}`}>
      <a href="#main" className="sr-only-focus fixed left-3 top-3 z-[100] rounded bg-white px-3 py-2">Skip to content</a>
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-5">
        <Brand light={dark} />
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          <NavLink to="/templates" className={link}>Templates</NavLink>
          <a href="/#how" className={link({ isActive: false })}>How it works</a>
          <NavLink to="/feedback" className={link}>Feedback</NavLink>
          <Link to="/templates" className={`${dark ? btn.light : btn.primary} ml-3 !min-h-11 !px-5 text-sm`}>Explore templates</Link>
        </nav>
        <button className={`press grid h-11 w-11 place-items-center rounded-full md:hidden ${dark ? 'text-white' : ''}`} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav aria-label="Mobile" className={`fade-in border-t px-5 pb-5 pt-2 md:hidden ${dark ? 'border-white/10 bg-deep text-white' : 'border-line bg-paper'}`} onClick={() => setOpen(false)}>
          <Link className="block py-3 text-lg" to="/templates">Templates</Link>
          <a className="block py-3 text-lg" href="/#how">How it works</a>
          <Link className="block py-3 text-lg" to="/feedback">Feedback</Link>
          <Link to="/templates" className={`${dark ? btn.light : btn.primary} mt-2 w-full`}>Explore templates</Link>
        </nav>
      )}
    </header>
  )
}

export function Footer() {
  return (
    <footer className="bg-deep text-[#f6f0e6]/75">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Brand light />
          <p className="mt-3 max-w-xs text-sm leading-relaxed">Ready-made websites for local businesses. Pick a design, add your details, preview it, then request launch.</p>
          <Link to="/templates" className="press uline mt-5 inline-flex min-h-11 items-center text-[#f6f0e6]">Explore templates</Link>
        </div>
        <nav aria-label="Templates">
          <p className="mb-3 font-display text-lg text-[#f6f0e6]">Templates</p>
          <ul className="space-y-0.5 text-sm">{TEMPLATES.map((t) => <li key={t.id}><Link className="inline-flex min-h-9 items-center hover:text-white" to={`/preview/${t.id}`}>{t.name}</Link></li>)}</ul>
        </nav>
        <nav aria-label="SiteBox">
          <p className="mb-3 font-display text-lg text-[#f6f0e6]">SiteBox</p>
          <ul className="space-y-0.5 text-sm">
            <li><a className="inline-flex min-h-9 items-center hover:text-white" href="/#how">How it works</a></li>
            <li><Link className="inline-flex min-h-9 items-center hover:text-white" to="/templates">All templates</Link></li>
            <li><Link className="inline-flex min-h-9 items-center hover:text-white" to="/feedback">Share feedback</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export function Page({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <><Header dark={dark} /><main id="main">{children}</main><Footer /></>
}
