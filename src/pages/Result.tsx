import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink, PencilLine, Send, Rocket } from 'lucide-react'
import { byId } from '../data/templates'
import { DeviceFrame, DeviceToggle, SizeToggle, type Device, type Size } from '../components/DeviceFrame'
import { Brand, btn } from '../components/Chrome'
import { loadDraft, track } from '../lib/store'

export default function Result() {
  const { id } = useParams()
  const t = byId(id)
  const draft = t ? loadDraft(t.id) : null
  const [device, setDevice] = useState<Device>('desktop')
  const [size, setSize] = useState<Size>('standard')
  useEffect(() => { if (t) { track('personalized_preview', { template: t.id }); document.title = 'Your website preview | SiteBox' } }, [t])
  if (!t) return <Navigate to="/templates" replace />
  if (!draft) return <Navigate to={`/customize/${t.id}`} replace />
  return (
    <div className="flex h-dvh flex-col">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line bg-paper px-4 py-2">
        <Link to={`/customize/${t.id}`} className="press inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 text-sm font-semibold text-pine"><ArrowLeft size={17} aria-hidden /> Edit details</Link>
        <span className="hidden lg:block"><Brand /></span>
        <DeviceToggle value={device} onChange={setDevice} />
        {device === 'mobile' && <SizeToggle value={size} onChange={setSize} />}
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <a href={`/site/${t.id}?custom=1`} target="_blank" rel="noopener noreferrer" className={`${btn.small} hidden border border-line bg-white md:inline-flex`}><ExternalLink size={15} aria-hidden /> Open full page</a>
          <Link to={`/request/${t.id}`} className={`${btn.small} border border-pine/30 bg-white text-pine`}><Send size={15} aria-hidden /> Submit customization request</Link>
          <Link to={`/request/${t.id}?kind=publication`} className={`${btn.small} bg-pine text-white hover:bg-pine-2`}><Rocket size={15} aria-hidden /> Request review &amp; publication</Link>
        </div>
      </div>
      <p className="bg-amber/25 px-4 py-1.5 text-center text-xs text-amber-ink"><b>Preview only.</b> Your website has not been published. This preview lives in your browser and is not visible to anyone else.{' '}<Link to={`/customize/${t.id}`} className="inline-flex min-h-6 items-center gap-1 font-semibold underline"><PencilLine size={12} aria-hidden /> Edit details</Link></p>
      <main id="main" className="min-h-0 flex-1"><h1 className="sr-only">Your personalized website preview</h1><DeviceFrame src={`/site/${t.id}?custom=1`} device={device} size={size} title={`${draft.content.businessName || 'Your'} website preview`} /></main>
    </div>
  )
}
