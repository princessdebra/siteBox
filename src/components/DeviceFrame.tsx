import { useLayoutEffect, useRef, useState } from 'react'
import { Monitor, Smartphone } from 'lucide-react'

export type Device = 'desktop' | 'mobile'
export type Size = 'small' | 'standard' | 'large'

const SIZES: Record<Size, { w: number; h: number; label: string }> = {
  small: { w: 360, h: 800, label: 'Small' },
  standard: { w: 393, h: 852, label: 'Standard' },
  large: { w: 430, h: 932, label: 'Large' },
}

export function DeviceToggle({ value, onChange }: { value: Device; onChange: (d: Device) => void }) {
  return (
    <div role="radiogroup" aria-label="Preview size" className="inline-flex rounded-full bg-black/5 p-1">
      {([['desktop', Monitor, 'Desktop'], ['mobile', Smartphone, 'Mobile']] as const).map(([d, I, label]) => (
        <button key={d} role="radio" aria-checked={value === d} onClick={() => onChange(d)}
          className={`press inline-flex min-h-10 items-center gap-1.5 rounded-full px-4 text-sm font-semibold ${value === d ? 'bg-white text-pine shadow-sm' : 'text-ink-2'}`}>
          <I size={16} aria-hidden /> {label}
        </button>
      ))}
    </div>
  )
}

/** Picks the simulated phone viewport (only relevant while device === 'mobile'). */
export function SizeToggle({ value, onChange }: { value: Size; onChange: (s: Size) => void }) {
  return (
    <div role="radiogroup" aria-label="Phone size" className="inline-flex rounded-full bg-black/5 p-1">
      {(Object.keys(SIZES) as Size[]).map((k) => (
        <button key={k} role="radio" aria-checked={value === k} onClick={() => onChange(k)}
          className={`press inline-flex min-h-10 items-center rounded-full px-3 text-sm font-semibold ${value === k ? 'bg-white text-pine shadow-sm' : 'text-ink-2'}`}>
          {SIZES[k].label}
        </button>
      ))}
    </div>
  )
}

function withFrameParam(src: string) {
  return `${src}${src.includes('?') ? '&' : '?'}frame=1`
}

// Titanium ring + inner bezel thickness (px, at natural/un-scaled size) around the screen.
const BEZEL = 14

/** Renders a site route in an iframe so responsive CSS follows the frame width. */
export function DeviceFrame({ src, device, size = 'standard', title, frameRef, onLoad }: { src: string; device: Device; size?: Size; title: string; frameRef?: React.Ref<HTMLIFrameElement>; onLoad?: () => void }) {
  const mobile = device === 'mobile'
  const paneRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const { w: vw, h: vh } = SIZES[size]
  const outerW = vw + BEZEL * 2
  const outerH = vh + BEZEL * 2

  useLayoutEffect(() => {
    if (!mobile) return
    const el = paneRef.current
    if (!el) return
    const measure = () => {
      const r = el.getBoundingClientRect()
      const s = Math.min(r.width / outerW, r.height / outerH, 1.3)
      setScale(Number.isFinite(s) && s > 0 ? s : 1)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [mobile, outerW, outerH])

  if (mobile) {
    const islandW = Math.round(vw * 0.275)
    const islandH = Math.round(vh * 0.033)
    return (
      <div ref={paneRef} className="flex h-full items-center justify-center overflow-hidden bg-[#e9e4d9] p-2 sm:p-3">
        <div style={{ width: outerW * scale, height: outerH * scale }} className="relative">
          {/* iPhone 16 shell: 393x852 CSS px viewport (or the chosen size), titanium rim, Dynamic Island */}
          <div
            style={{ width: outerW, height: outerH, transform: `scale(${scale})`, transformOrigin: 'top left' }}
            className="absolute left-0 top-0 rounded-[55px] bg-[#3b3b3d] p-[3px] shadow-2xl"
          >
            <div className="relative h-full w-full rounded-[52px] bg-black p-[12px]">
              {/* side buttons */}
              <div className="absolute -left-[3px] top-[118px] h-[32px] w-[3px] rounded-l bg-[#2a2a2c]" />
              <div className="absolute -left-[3px] top-[168px] h-[62px] w-[3px] rounded-l bg-[#2a2a2c]" />
              <div className="absolute -left-[3px] top-[240px] h-[62px] w-[3px] rounded-l bg-[#2a2a2c]" />
              <div className="absolute -right-[3px] top-[195px] h-[90px] w-[3px] rounded-r bg-[#2a2a2c]" />
              <div className="relative overflow-hidden rounded-[42px] bg-white" style={{ width: vw, height: vh }}>
                <iframe ref={frameRef} src={withFrameParam(src)} title={title} onLoad={onLoad} className="border-0" style={{ width: vw, height: vh }} />
                {/* Dynamic Island overlay — doesn't shrink the viewport */}
                <div className="pointer-events-none absolute left-1/2 top-[11px] -translate-x-1/2 rounded-full bg-black" style={{ width: islandW, height: islandH }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full justify-center overflow-auto bg-[#e9e4d9] p-0 sm:p-5">
      <div className="h-full w-full overflow-hidden bg-white sm:rounded-xl sm:shadow-xl">
        <iframe ref={frameRef} src={withFrameParam(src)} title={title} onLoad={onLoad} className="h-full w-full border-0" />
      </div>
    </div>
  )
}
