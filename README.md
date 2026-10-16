# SiteBox: Local Business Website-in-a-Box

Pick one of five industry templates, preview it as a real website (desktop or phone), enter your details,
see a personalized preview, and submit a customization or publication request.

**Stack:** Vite + React 19 + TypeScript, Tailwind CSS v4, React Router, lucide-react, sonner (toasts).

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
```

## Structure
- `src/data/templates.ts`: template metadata and sample content (fictional businesses). Add or edit content here.
- `src/templates/*.tsx`: the five one-page websites (Salon, Restaurant, Law, Clinic, Gym). Each has its own layout, type and palette. `kit.tsx` holds shared parts (nav, hours, map, contact, inquiry form, testimonial disclaimer).
- `src/pages/SiteFrame.tsx`: chrome-free site route rendered inside an `<iframe>`, so desktop/mobile preview uses real responsive breakpoints.
- `src/pages/Customize.tsx`: 4-step form with validation and a live preview (draft is posted to the iframe).
- `src/lib/content.ts`: turns form data into template content (hides blank sections; never invents team members or testimonials).
- `src/lib/store.ts`: demo-mode persistence, local analytics and request submission.

## Previews
`src/components/LiveFrame.tsx` renders the real `/site/:id?still=1` route in a scaled iframe, so the home page and gallery show the actual templates (`still=1` skips background video). Background video is used only in the restaurant and gym heroes (`src/data/videos.ts`); it is muted, looping, skipped on phones, with reduced motion and Save-Data, and has a still-image fallback.

## Demo mode and limitations (honest list)
- **Nothing is published.** Personalized previews live in this browser's localStorage. Requests are saved locally, not sent anywhere.
- To receive requests, replace the body of `submitRequest` in `src/lib/store.ts` with a `fetch()` to a form service (Formspree, Netlify Forms, your API).
- Analytics are local-only counters (`track()`); connect a privacy-friendly tool (Plausible, Umami) to see real data.
- Uploaded logos are stored as data URLs in localStorage (400 KB limit).
- Photos load from Unsplash's CDN. For production, download them into `public/` or your own CDN.
- Maps: sample sites show a placeholder. For real data the site embeds `https://www.google.com/maps?q=ADDRESS&output=embed` (no API key) or the owner's embed URL, with an "Open in Google Maps" fallback link.
- Sample testimonials are labelled as fictional; owner-supplied ones are labelled as unverified and require a permission checkbox.
- Template copy such as "fees discussed upfront" is generic and should be reviewed with each real business.

## Deploy
Static SPA. Deep links need a rewrite to `index.html`; configs are included.
- **Vercel:** import the repo (framework: Vite). `vercel.json` is included.
- **Netlify:** build `npm run build`, publish `dist`. `public/_redirects` is included.

## QA checklist
All five templates open from gallery buttons; each has services, booking CTA, testimonials, map/location fallback; no horizontal scroll at 375 px; form validation blocks missing required fields; optional fields can be blank; submission shows a confirmation that states demo mode.
