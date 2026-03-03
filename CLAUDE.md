# CLAUDE.md — Wedding Website (svatba-web)

## Project Overview

Wedding website for **Michaela & Robert**, wedding date **June 6, 2026**.
Czech-language static site with RSVP form, gallery, timeline, and FAQ.

## Tech Stack

- **Pure vanilla HTML5 + CSS3 + JavaScript** — no frameworks, no build tools, no npm
- **Fonts**: Google Fonts (Playfair Display for headers, Inter for body)
- **Form backend**: Netlify Forms (via `netlify` attribute on `<form>`)
- **Hosting**: Netlify (static, auto-deployed from GitHub)
- **Repo**: https://github.com/mondrikrob/mondrikovi.git

## File Structure

```
svatba-web/
├── index.html      # All page sections (single-page app)
├── script.js       # All JS functionality
├── styles.css      # All styles and responsive design
└── img/            # Hero + gallery images
    ├── hero-photo.jpg
    └── gallery-1.jpg … gallery-7.jpg
```

## Running Locally

No build step. Just open `index.html` in a browser.

## Code Conventions

- **No build tools** — do not introduce npm, webpack, vite, or any bundler
- **No frameworks** — keep everything in vanilla HTML/CSS/JS
- **Single files** — all HTML in `index.html`, all CSS in `styles.css`, all JS in `script.js`
- **Comments** — existing comments are in a mix of Czech and English; follow whichever fits the context
- **Language**: UI content is in Czech

## CSS Variables (Color Palette)

```css
--main-color: #8B5A87        /* Purple */
--secondary-color: #5D3C5A   /* Dark purple */
--light-pink: #FFE3E5
--accent-cream: #FEBFC7
--accent-lavender: #CBBDD7
--text-dark: #2d2d2d
--text-light: #666666
```

## Responsive Breakpoints

- Default: desktop
- `≤768px`: tablet — nav stacks vertically, hero shrinks
- `≤480px`: mobile — single-column gallery, smaller text

## Key Sections in index.html

| Section | ID | Description |
|---|---|---|
| Hero | `#home` | Names, date, location |
| Details | `#details` | Ceremony/reception cards |
| Program | `#program` | Timeline of the day |
| Gallery | `#gallery` | 6 images + lightbox |
| RSVP | `#rsvp` | Dynamic form → Netlify Forms |
| FAQ | `#faq` | Accordion Q&A |

## Key JavaScript Features (script.js)

- Smooth scroll with 80px header offset
- FAQ accordion (one open at a time)
- Dynamic RSVP form: fields shown/hidden based on attendance selection (1 person / 2 people / not attending)
- Netlify form submit handler with confirmation message
- Gallery lightbox (modal, close on click-outside or Escape)
- Mobile hamburger menu (toggled for ≤768px)
- Scroll animations via Intersection Observer
- Header blur/translucency on scroll

## Wedding Details (content reference)

- **Ceremony**: Zámek Milotice, 12:15
- **Reception**: Kulturní dům Svatobořice-Mistřín, 14:30
- **Dress code**: Elegant casual — no white, ivory, or champagne

## Git Workflow

Commits are made directly to `main` and auto-deploy to Netlify.
Push to deploy. No CI/CD config file — Netlify detects static site automatically.

## What NOT to Do

- Do not add a package.json or any npm dependencies
- Do not split into multiple HTML files or add a router
- Do not add TypeScript or a CSS preprocessor
- Do not add a test framework — manual browser testing is sufficient
- Do not add a `netlify.toml` unless custom redirects/headers are needed
