# Aayush Gnawali — Portfolio

A single-page portfolio built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, and Framer Motion. Dark by default, minimal glassmorphism, no gradient-blob clichés — see the design notes below for the reasoning.

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

```bash
npm run build   # production build, static-optimized
npm run start   # serve the production build
npm run lint    # ESLint
```

## Updating content

Everything text-based lives in **one file**: `src/data/resume.ts`. Update your role, experience, projects, skills, certifications, or bio there — every section (and the chat assistant) reads from it automatically, so content never drifts out of sync.

The on-site assistant's answers live in `src/data/chatKnowledgeBase.ts`. It is a **local keyword-matched FAQ engine, not an LLM call** — fast, free to host, and it can never say anything that isn't already on the page. Add new trigger phrases or answers there if you want it to handle more questions.

## Replacing placeholders

- **Résumé PDF**: replace `public/resume.pdf` with your real résumé (a functional placeholder generated from your current content is included so the download button works out of the box).
- **Profile photo**: the hero currently shows an "AG" initials placeholder. Swap it for a real photo by replacing the `<div>` in `src/components/sections/Hero.tsx` with a Next.js `<Image>` pointing at an image you add to `public/`.
- **Project screenshots**: `ProjectCard.tsx` renders a schematic browser-chrome placeholder for each project. Replace with real screenshots (add images to `public/projects/` and swap in an `<Image>`) once available.
- **Domain**: `siteUrl` in `src/app/layout.tsx`, `sitemap.ts`, and `robots.ts` is set to a placeholder domain — update it once you have a real one, for correct Open Graph tags and sitemap.

## Design notes

- **No route-per-page**: despite the brief listing seven "pages," this is built as a single scrolling experience with anchored sections (`#about`, `#projects`, etc.) and a scroll-spy nav — the standard pattern for modern product/portfolio sites (Linear, Vercel, Stripe) and what "smooth scroll + active section highlighting" actually implies.
- **Signature visual**: instead of a generic gradient blob, the hero background is a small animated node graph (`api · auth · db · queue · deploy · monitor`) — an abstraction of what this candidate actually builds, not decoration.
- **Fonts**: this build environment has no network access to Google Fonts, so it currently ships with a refined system-font stack (`-apple-system, Segoe UI, Inter, Roboto...` for body, `ui-monospace` for tags). If you want to pin exact Inter/JetBrains Mono files, either re-enable `next/font/google` in `src/app/layout.tsx` (works fine once deployed, e.g. on Vercel) or self-host the font files in `public/fonts` and reference them via `next/font/local`.
- **Chat widget**: fully client-side, no external API, no server cost. It's a small keyword-scored matcher over `chatKnowledgeBase.ts`, with a simulated typing delay for feel — nothing is actually "thinking."
- **Contact form**: this is a static site with no backend, so the form hands off to the visitor's own email client via a pre-filled `mailto:` link rather than pretending to submit somewhere. If you add a backend later (e.g. a small serverless function, Formspree, or Resend), swap the `handleSubmit` logic in `src/components/sections/Contact.tsx`.
- **Accessibility**: visible focus rings everywhere, skip-to-content link, `prefers-reduced-motion` respected globally (see `globals.css`), semantic headings, alt text/aria-labels on icon-only controls.

## Deploying

This is a standard Next.js app — deploys cleanly to Vercel (`vercel deploy`), Netlify, or any Node host. No environment variables are required since there's no external API dependency.

## Stack

Next.js · TypeScript · Tailwind CSS v4 · Framer Motion · lucide-react
