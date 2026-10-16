const norm = (hex: string) => {
  const h = hex.replace('#', '')
  return h.length === 3 ? h.split('').map((c) => c + c).join('') : h
}
export const isHex = (v: string) => /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v.trim())

export function luminance(hex: string): number {
  const h = norm(hex)
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** Readable text colour (white or near-black) for a given background. */
export const inkOn = (bg: string) => (isHex(bg) && luminance(bg) > 0.4 ? '#14110f' : '#ffffff')

export const withHash = (v: string) => (v.startsWith('#') ? v : `#${v}`)
