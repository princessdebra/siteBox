import { StrictMode, useEffect, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes, useLocation, Link } from 'react-router-dom'
import { Toaster } from 'sonner'
import './index.css'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import SiteFrame from './pages/SiteFrame'
import { Page } from './components/Chrome'

const Preview = lazy(() => import('./pages/Preview'))
const Customize = lazy(() => import('./pages/Customize'))
const Result = lazy(() => import('./pages/Result'))
const Request = lazy(() => import('./pages/Request'))
const Feedback = lazy(() => import('./pages/Feedback'))

function ScrollTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => { if (!hash) window.scrollTo(0, 0) }, [pathname, hash])
  return null
}

const NotFound = () => (
  <Page><div className="mx-auto max-w-xl px-5 py-24 text-center"><h1 className="font-display text-5xl text-pine">Page not found</h1><p className="mt-3 text-ink-2">That page does not exist.</p><Link to="/" className="press mt-6 inline-flex min-h-12 items-center rounded-full bg-pine px-7 font-semibold text-white">Back home</Link></div></Page>
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollTop />
      <Suspense fallback={<div className="grid min-h-dvh place-items-center text-ink-2" role="status">Loading…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<Gallery />} />
          <Route path="/preview/:id" element={<Preview />} />
          <Route path="/site/:id" element={<SiteFrame />} />
          <Route path="/customize/:id" element={<Customize />} />
          <Route path="/result/:id" element={<Result />} />
          <Route path="/request/:id" element={<Request />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  </StrictMode>,
)
