import { useEffect, useRef, useState, type ReactNode } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import type { Clip } from '../data/videos'

const reducedMotion = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Continuously gliding carousel (Embla + auto-scroll), looping and draggable, with no visible controls.
 * Pauses on hover, focus and touch, when off screen, and stays still for reduced-motion users.
 */
export function Carousel({ label, children, itemClass = 'basis-[78%] sm:basis-[44%] lg:basis-[30%]', speed = 1.4 }: { label: string; children: ReactNode[]; itemClass?: string; speed?: number }) {
  const box = useRef<HTMLDivElement>(null)
  const [plugin] = useState(() => AutoScroll({ speed, stopOnInteraction: false, stopOnMouseEnter: true, startDelay: 0 }))
  const [ref, api] = useEmblaCarousel({ align: 'start', loop: true, dragFree: true }, [plugin])

  useEffect(() => {
    const el = box.current
    const scroll = api?.plugins()?.autoScroll
    if (!el || !scroll) return
    if (reducedMotion()) { scroll.stop(); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) scroll.play(); else scroll.stop() }, { threshold: 0.15 })
    io.observe(el)
    const vis = () => { if (document.hidden) scroll.stop(); else if (el.getBoundingClientRect().top < innerHeight) scroll.play() }
    document.addEventListener('visibilitychange', vis)
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', vis) }
  }, [api])

  return (
    <div ref={box} role="region" aria-roledescription="carousel" aria-label={label}>
      <div ref={ref} className="-mx-5 overflow-hidden">
        <div className="flex pl-5">
          {children.map((c, i) => (
            <div key={i} className={`min-w-0 shrink-0 grow-0 select-none pr-4 ${itemClass}`} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${children.length}`}>{c}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * Decorative background footage: silent, looping, no visible controls.
 * - A still image always sits underneath and is the only thing shown on phones, with reduced motion,
 *   Save-Data, or if the video fails. The video fades in once it is actually playing.
 * - Loads only when near the screen and pauses when off screen.
 * - Keyboard and screen-reader users get a pause control that appears on focus.
 */
export function AmbientVideo({ clip, fallback, alt = '', wrapClass = 'absolute inset-0 -z-10', className = 'object-cover' }: { clip: Clip; fallback: string; alt?: string; wrapClass?: string; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null)
  const vid = useRef<HTMLVideoElement>(null)
  const [skip] = useState(() => {
    if (typeof matchMedia === 'undefined') return true
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } }
    return reducedMotion() || matchMedia('(max-width: 767px)').matches || !!nav.connection?.saveData || new URLSearchParams(location.search).has('still')
  })
  const [near, setNear] = useState(false)
  const [visible, setVisible] = useState(false)
  const [want, setWant] = useState(true)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = wrap.current
    if (skip || !el || typeof IntersectionObserver === 'undefined') return
    const a = new IntersectionObserver(([e]) => { if (e.isIntersecting) setNear(true) }, { rootMargin: '200px' })
    const b = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.1 })
    a.observe(el); b.observe(el)
    return () => { a.disconnect(); b.disconnect() }
  }, [skip])
  useEffect(() => {
    const v = vid.current
    if (!v || !near) return
    if (want && visible) v.play().catch(() => setWant(false))
    else v.pause()
  }, [want, visible, near])
  return (
    <>
      <div ref={wrap} className={`${wrapClass} overflow-hidden`}>
        <img src={fallback} alt={alt} className={`absolute inset-0 h-full w-full ${className}`} fetchPriority="high" />
        {!skip && (
          <video ref={vid} src={near ? clip.src : undefined} muted loop playsInline preload="none" aria-label={clip.label} onPlaying={() => setShown(true)} onError={() => setShown(false)}
            className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${shown ? 'opacity-100' : 'opacity-0'} ${className}`} />
        )}
      </div>
      {!skip && <button type="button" onClick={() => setWant(!want)} className="sr-only-focus fixed bottom-3 left-3 z-[110] rounded bg-white px-3 py-2 text-sm text-black shadow">{want ? 'Pause background video' : 'Play background video'}</button>}
    </>
  )
}

/** A still image with a very slow, purposeful push-in (transform only; off for reduced motion). */
export function SlowZoom({ src, alt, className = '', width, height, priority = false }: { src: string; alt: string; className?: string; width?: number; height?: number; priority?: boolean }) {
  return <img src={src} alt={alt} width={width} height={height} className={`kb ${className}`} fetchPriority={priority ? 'high' : undefined} />
}
