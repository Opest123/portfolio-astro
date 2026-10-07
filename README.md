# Stephen Enikanoselu — Portfolio (Astro)

My personal portfolio, rebuilt from Laravel + Blade + Alpine into **Astro** with **React islands** and **Tailwind CSS v4**.

The page is pre-rendered to static HTML at build time. Only the three interactive pieces ship JavaScript, and each one hydrates only when it's needed.

## Tech stack

| | |
|---|---|
| Framework | [Astro 7](https://docs.astro.build) |
| Interactive UI | React 19 (as islands) |
| Styling | Tailwind CSS v4 (CSS-first config in `src/styles/global.css`) |
| Contact form | [Astro Actions](https://docs.astro.build/en/guides/actions/) + Zod validation |
| Email | [Resend](https://resend.com) REST API |
| Hosting | Vercel (`@astrojs/vercel` adapter) |

## Getting started

Requires Node.js 22.12+ (24 recommended, to match Vercel).

```sh
npm install
cp .env.example .env   # optional, see "Environment variables"
npm run dev            # http://localhost:4321
```

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Build for production into `dist/` and `.vercel/output/` |
| `npm run preview` | Preview the production build locally |
| `npx astro check` | Type-check `.astro`, `.ts` and `.tsx` files |

## Project structure

```text
src/
├── pages/index.astro          # The single page, composes all sections
├── layouts/BaseLayout.astro   # <head>, fonts, scroll-reveal + active-nav script
├── components/
│   ├── Navigation.astro, Hero.astro, Marquee.astro, Footer.astro, ...
│   ├── sections/              # About, Education, Tech, Experience, Projects, Contact
│   └── islands/               # React components that run in the browser
│       ├── MobileMenu.tsx
│       ├── ContactForm.tsx
│       └── ScrollToTop.tsx
├── data/                      # All site content (edit these to update the portfolio)
│   ├── site.ts                # Name, email, socials, nav items, marquee words
│   ├── experience.ts
│   ├── projects.ts
│   └── skills.ts              # Education + tech stack
├── actions/index.ts           # Server-side contact form action (validation + send)
├── lib/
│   ├── html.ts                # escapeHtml()
│   └── email/                 # Reusable email pieces
│       ├── send.ts            # sendEmail() via Resend
│       ├── layout.ts          # Branded email shell
│       ├── components.ts      # row(), field(), button(), ...
│       └── templates/contact.ts
├── assets/images/             # Optimised at build time by astro:assets
└── styles/global.css          # Tailwind theme tokens + nb-* component classes
public/                        # Served as-is (favicons, SVGs)
```

## Updating content

All content lives in `src/data/`. Add a job, project or skill there and the sections update automatically.

To add a project, put a screenshot in `src/assets/images/`, import it in `src/data/projects.ts` and add an entry. Astro converts it to resized WebP files at build time.

## How the islands work

Every component is rendered to HTML on the server. A `client:*` directive tells Astro when to load React for that component in the browser:

| Component | Directive | Why |
|---|---|---|
| `MobileMenu` | `client:media="(max-width: 1023px)"` | Desktop visitors never download it |
| `ContactForm` | `client:visible` | Bottom of the page, loads when scrolled into view |
| `ScrollToTop` | `client:idle` | Not urgent, loads once the page settles |

Everything else, including scroll-reveal and active-nav highlighting, is static HTML plus one small vanilla `<script>` in `BaseLayout.astro`.

## Environment variables

Declared and type-checked in `astro.config.mjs` (`env.schema`), imported from `astro:env/server`.

| Variable | Required | Default | Notes |
|---|---|---|---|
| `RESEND_API_KEY` | No | none | Without it, contact emails are logged to the terminal instead of sent |
| `EMAIL_FROM` | No | `Portfolio <onboarding@resend.dev>` | Must be on a domain verified in Resend |
| `CONTACT_TO_EMAIL` | No | `stephenenikanoselu@gmail.com` | Where contact messages are delivered |

## Deployment

The site is static except for the contact form action, which the Vercel adapter deploys as a serverless function.

1. Import the repo in Vercel (framework preset: Astro).
2. Add the environment variables above in **Project → Settings → Environment Variables**.
3. Deploy.

To host somewhere else, swap `@astrojs/vercel` for that platform's adapter (for example `npx astro add netlify` or `npx astro add node`).
