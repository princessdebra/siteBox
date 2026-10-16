import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Palette } from 'lucide-react'
import { byId, TEMPLATES } from '../data/templates'
import { DeviceFrame, DeviceToggle, SizeToggle, type Device, type Size } from '../components/DeviceFrame'
import { Brand, btn } from '../components/Chrome'
import { track } from '../lib/store'

export default function Preview() {
  const { id } = useParams()
  const nav = useNavigate()
  const t = byId(id)
  const [device, setDevice] = useState<Device>('desktop')
  const [size, setSize] = useState<Size>('standard')
  useEffect(() => { if (t) { track('template_preview', { template: t.id }); document.title = `${t.name} preview | SiteBox` } }, [t])
  if (!t) return <Navigate to="/templates" replace />
  return (
    <div className="flex h-dvh flex-col">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line bg-paper px-4 py-2">
        <Link to="/templates" className="press inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 text-sm font-semibold text-pine"><ArrowLeft size={17} aria-hidden /> Gallery</Link>
        <span className="hidden sm:block"><Brand /></span>
        <label className="flex items-center gap-2 text-sm"><span className="sr-only sm:not-sr-only text-ink-2">Template</span>
          <select value={t.id} onChange={(e) => nav(`/preview/${e.target.value}`)} className="min-h-11 rounded-full border border-line bg-white px-4 font-semibold">
            {TEMPLATES.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
          </select></label>
        <DeviceToggle value={device} onChange={setDevice} />
        {device === 'mobile' && <SizeToggle value={size} onChange={setSize} />}
        <div className="ml-auto flex items-center gap-2">
          <a href={`/site/${t.id}`} target="_blank" rel="noopener noreferrer" className={`${btn.small} hidden border border-line bg-white sm:inline-flex`}><ExternalLink size={15} aria-hidden /> Open full page</a>
          <Link to={`/customize/${t.id}`} className={`${btn.small} bg-pine text-white hover:bg-pine-2`} onClick={() => track('template_select', { template: t.id })}><Palette size={16} aria-hidden /> Customize this template</Link>
        </div>
      </div>
      <main id="main" className="min-h-0 flex-1"><h1 className="sr-only">{`${t.name} website preview`}</h1><DeviceFrame src={`/site/${t.id}`} device={device} size={size} title={`${t.name} website preview`} /></main>
    </div>
  )
}
