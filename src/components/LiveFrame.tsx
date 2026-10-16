import { useEffect, useLayoutEffect, useRef, useState } from 'react'

/**
 * A real, scaled-down render of a template (the `/site/:id` route in an iframe), so previews on the
 * SiteBox pages are the actual websites rather than illustrations. The frame is decorative here:
 * it is non-interactive and hidden from assistive tech (the surrounding link carries the label).
 * `still=1` tells the template to skip background video. The iframe mounts only when near the screen.
 */
export default function LiveFrame({ id, w = 1280, h = 800, className = '', eager = false }: { id: string; w?: number; h?: number; className?: string; eager?: boolean }) {
  const box = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.4)
  const [mounted, setMounted] = useState(eager)
  useLayoutEffect(() => { if (box.current) setScale(box.current.clientWidth / w) }, [w])
  useEffect(() => {
    const el = box.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / w))
    ro.observe(el)
    let io: IntersectionObserver | undefined
    if (!eager && typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setMounted(true); io?.disconnect() } }, { rootMargin: '300px' })
      io.observe(el)
    } else setMounted(true)
    return () => { ro.disconnect(); io?.disconnect() }
  }, [w, eager])
  return (
    <div ref={box} className={`relative overflow-hidden bg-[#e9e4d9] ${className}`} style={{ aspectRatio: `${w} / ${h}` }}>
      {mounted && (
        <iframe src={`/site/${id}?still=1`} title="" aria-hidden tabIndex={-1} scrolling="no"
          className="pointer-events-none absolute left-0 top-0 border-0 bg-white" style={{ width: w, height: h, transform: `scale(${scale})`, transformOrigin: 'top left' }} />
      )}
    </div>
  )
}

/** Browser-window chrome around a preview. */
export function BrowserFrame({ url, children, className = '' }: { url: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl bg-white shadow-lg shadow-black/10 ring-1 ring-black/10 ${className}`}>
      <div className="flex items-center gap-1.5 bg-neutral-100 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" /><span className="h-2 w-2 rounded-full bg-[#febc2e]" /><span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate rounded bg-white px-2 py-0.5 text-[10px] text-neutral-500">{url}</span>
      </div>
      {children}
    </div>
  )
}
