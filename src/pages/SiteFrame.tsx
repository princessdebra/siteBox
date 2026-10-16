import { useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { byId } from '../data/templates'
import { VIEWS } from '../templates'
import { loadDraft, emptyDraft } from '../lib/store'
import { resolveContent } from '../lib/content'
import type { Draft, SiteContent } from '../types'

/**
 * Bare, chrome-free website. Rendered inside an <iframe> by the preview pages so
 * responsive breakpoints react to the iframe width (true mobile preview).
 *   /site/:id              sample content
 *   /site/:id?custom=1     saved draft, blanks hidden
 *   /site/:id?custom=1&live=1  saved draft with blanks filled by samples, updates via postMessage
 */
export default function SiteFrame() {
  const { id } = useParams()
  const [q] = useSearchParams()
  const t = byId(id)
  const custom = q.get('custom') === '1'
  const live = q.get('live') === '1'
  const [draft, setDraft] = useState<Draft | null>(() => (t && custom ? loadDraft(t.id) ?? (live ? emptyDraft(t.id) : null) : null))

  useEffect(() => {
    if (!live) return
    const onMsg = (e: MessageEvent) => { if (e.origin === location.origin && e.data?.type === 'sitebox:draft') setDraft(e.data.draft) }
    window.addEventListener('message', onMsg)
    window.parent?.postMessage({ type: 'sitebox:ready' }, location.origin)
    return () => window.removeEventListener('message', onMsg)
  }, [live])

  // Keep in-page "#book"-style demo links from navigating the SPA router.
  const content: SiteContent | null = useMemo(() => (!t ? null : custom && draft ? resolveContent(draft, live) : t.defaults), [t, custom, draft, live])
  useEffect(() => { if (q.get('still') === '1') { document.documentElement.style.overflow = 'hidden'; return () => { document.documentElement.style.overflow = '' } } }, [q])
  useEffect(() => {
    if (q.get('frame') !== '1') return
    const style = document.createElement('style')
    style.textContent = 'html{scrollbar-width:none}html::-webkit-scrollbar{display:none}'
    document.head.appendChild(style)
    return () => { document.head.removeChild(style) }
  }, [q])
  useEffect(() => { if (t) document.title = `${content?.businessName ?? t.sampleBrand} | preview` }, [t, content])
  if (!t || !content) return <p className="p-8">Template not found.</p>
  const View = VIEWS[t.id]
  return <View content={content} />
}
