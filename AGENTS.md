# H. Rui Journal — Agent Rules

> **Source of truth** for any AI agent (Codex, Claude Code, Grok, etc.) working on this project.
> Read this file **in full** before making any changes.

---

## 1. Identity & Context

- **Project**: H. Rui Journal / 旅の記録 — a minimalist editorial photography journal
- **Author**: Tan Hou Rui
- **Hometown**: Malacca, Malaysia
- **Persona**: Serious amateur photographer focused on travel (especially Japan), street scenes, landscapes, architecture, quiet moments
- **Design philosophy**: Minimalism — clean typography, generous whitespace, imagery-first layout, zero unnecessary clutter
- **Repo**: `tanhourui/h-rui-journal` on GitHub

---

## 2. Tech Stack

| Layer | Tool | Notes |
|---|---|---|
| Framework | **Astro** (static site generator) | `astro.config.mjs` — `output: 'static'` |
| Languages | Astro components, vanilla JS, vanilla CSS | **No React, no Tailwind, no SCSS** |
| Fonts | `Plus Jakarta Sans` (body), `JetBrains Mono` (mono/UI) | Loaded via Google Fonts |
| Globe | D3.js + Canvas | `Globe.astro` (~1100 lines) — custom canvas renderer |
| Image processing | `sharp`, `exif-reader` | For offline image pipeline scripts |
| Package manager | npm | |
| Node version | 18+ | |

### Build & Dev Commands

```bash
npm run build        # Astro static build → dist/
npm run dev          # Dev server on port 3000
npm run preview      # Preview production build
```

**Windows note**: On Windows PowerShell, `npm` must be wrapped: `cmd /c "npm run build"`. The `&&` operator does not work in PowerShell — run commands sequentially.

---

## 3. Project Structure

```
├── src/
│   ├── components/
│   │   ├── Globe.astro          # Interactive D3 canvas globe with pins, arcs, cards
│   │   └── Sidebar.astro        # Left sidebar: brand, navigation tabs, destination panels, footer
│   ├── content/
│   │   ├── config.ts            # Zod schema for journey chapters
│   │   └── journeys/            # Markdown chapters by country
│   │       ├── japan/           # 13 chapters (japan19, japan23, japan24, japan25 eras)
│   │       ├── malaysia/        # 3 chapters (malacca, penang, merdeka)
│   │       ├── thailand/        # 2 chapters (bangkok, betong)
│   │       └── vietnam/         # 1 chapter (hanoi)
│   ├── data/                    # Image manifest JSON files (one per destination)
│   ├── layouts/
│   │   └── BaseLayout.astro     # Root layout — CSS variables, time-based palette switching
│   └── pages/
│       ├── index.astro          # Homepage — globe + sidebar
│       └── journey/[...slug].astro  # Chapter detail page
├── public/
│   ├── images/                  # Optimized JPGs organized by destination folder
│   │   ├── japan19/, japan23/, japan24/, japan25/
│   │   ├── malaysia/malacca/, malaysia/penang/, malaysia/merdeka/
│   │   ├── thailand/bangkok/, thailand/betong/
│   │   └── vietnam/hanoi/
│   ├── d3.min.js, topojson-client.min.js   # Globe dependencies
│   ├── world-data.js, country-dots.js      # Globe topology data
├── scripts/                     # Node.js utility scripts (CJS)
│   ├── inspect_all_chapters.cjs # ★ Validates all 19 chapters → prints [CLEAN] or [ISSUES]
│   ├── audit_coverage.cjs       # Checks manifest ↔ markdown image coverage
│   └── audit_refs.cjs           # Checks all image refs exist on disk
├── AGENTS.md                    # ← You are here
├── PROJECT_RULES.md             # Legacy rules (subset of this file)
└── package.json
```

---

## 4. Design System

### 4.1 Time-Based Palettes

The site auto-switches palette based on the visitor's local time. **All new CSS must use these variables**, never hardcoded colors:

| Variable | Day (09–18h) | Dawn (05–09h) | Dusk (18–05h) |
|---|---|---|---|
| `--bg-canvas` | `#F7F5EE` | `#EFF1ED` | `#121211` |
| `--card-surface` | `#FDFCF8` | `#F8FAF7` | `#1B1B19` |
| `--ink-primary` | `#21201D` | `#1C221E` | `#ECEBE7` |
| `--ink-muted` | `#848076` | `#79837D` | `#96948B` |
| `--sub-accent` | `#3E4D40` (Kyoto Moss) | `#2E4738` | `#E5A967` (Warm Amber) |
| `--sub-secondary` | `#5C4A3C` (Walnut) | `#4A564E` | `#C89B6D` |
| `--border-subtle` | `#E2DDD0` | `#D8E0D8` | `#2C2B27` |

### 4.2 Typography

- Body: `'Plus Jakarta Sans'` — weights 300–600
- Mono: `'JetBrains Mono'` — used in UI elements, sidebar, EXIF, pills
- Utility class: `.font-mono` applies `JetBrains Mono`

### 4.3 Visual Rules

- **No gradients**. No glassmorphism. No AI-purple.
- **No emoji** in UI components (use text abbreviations or SVG).
- Corner radius: 8px on cards, 4px on small elements — be consistent.
- Border style: `1px solid var(--border-subtle)` throughout.
- Transitions: subtle, 0.2–0.3s ease. No bouncy or spring animations.

---

## 5. Content Schema (Chapters)

Each chapter is a Markdown file in `src/content/journeys/{country}/`. The frontmatter schema is defined in `src/content/config.ts`.

### Required frontmatter fields:

```yaml
country: "japan"                    # Enum: malaysia, japan, thailand, vietnam, iceland
countryName: "Japan"
year: 2024
eraTitle: "Autumn Ginkgo"           # Optional
camera: "Leica / Xiaomi"            # Optional
stateName: "Tokyo: Autumn Ginkgo"
title: "Tokyo: Autumn Ginkgo"
chapterTitle: "Tokyo: Autumn Ginkgo / 東京 秋の銀杏"
order: 1                            # Sort order within same country+year
coords: [139.767, 35.681]           # [longitude, latitude]
coordsText: "35.681° N, 139.767° E"
date: "November 20-25, 2024"
desc: "Brief chapter description"
exif: "xiaomi 14 Ultra | LEICA 23mm f/1.6 1/50s ISO 500"
hero: "/images/japan24/xxx.jpg"
heroCaption: "Description of hero image"
```

### Optional media fields:

```yaml
heroAspect: "landscape"    # landscape | portrait | auto
sub1: "/images/..."
sub1Caption: "..."
sub1Exif: "..."
sub2: "/images/..."
sub2Caption: "..."
sub2Exif: "..."
gallery:
  - image: "/images/..."
    caption: "Visually accurate caption"
    exif: "camera | lens focal aperture shutter ISO"
```

### Body content (after `---`):

Bilingual prose blocks wrapped in `<div class="bilingual-block">`:
```html
<div class="bilingual-block">
  <div class="en-prose">English narrative paragraph</div>
  <div class="zh-prose">Chinese narrative paragraph</div>
</div>
```

---

## 6. Caption Editing Rules (CRITICAL)

> **Any agent editing captions MUST follow these rules. Violations will produce incorrect content.**

### 6.1 Visual Inspection Is Mandatory

- **NEVER** write or edit captions from file names, folder names, chapter titles, or EXIF metadata alone.
- **ALWAYS** visually inspect the actual image file first (open it, view its pixels).
- Identify the real contents: subjects, environment, lighting, action, composition.

### 6.2 Selective Intervention

- Only rewrite captions that are: mismatched, inaccurate, or generically clichéd.
- If the current caption accurately describes the frame — leave it alone.

### 6.3 Two-Tier Sentence Hierarchy

1. **First tier**: Observable physical details (subject + action/setting + light)
2. **Second tier**: Subtle interpretation or context (restrained, grounded)

### 6.4 Banned Words & Patterns

These words/phrases are **permanently banned** from captions and prose:

> "breathtaking", "picturesque", "stunning", "magical", "enchanting",
> "vibrant tapestry", "vibrant", "nestled in the heart of", "beacon of hope",
> "serene", "lush", "quaint", "timeless", "bustling"

Also banned:
- "As the sun sets...", "A testament to...", "A symphony of..."
- Technical clutter in narrative prose (don't shoehorn focal lengths into essays)

### 6.5 Tone

- **Adopt**: Observational, contemplative, tactile, disciplined photographer's journal voice
- **Reject**: Travel brochure copy, tourist marketing, AI poetic fluff

---

## 7. Prose Writing Rules

### 7.1 Chinese prose (zh-prose)

- Must read like a real person talking, not a machine translation or marketing copy
- Remove AI-typical patterns: excessive 的, 了, 着 stacking; parallel triplets; hollow rhetorical questions
- No colon-heavy sentence openers, no "不是……而是……" flip constructs

### 7.2 English prose (en-prose)

- Must match the Chinese version's tone and content (they describe the same trip)
- Natural, conversational, specific — not a template

---

## 8. Globe Component (`Globe.astro`)

- ~1100 lines of self-contained Astro + canvas + D3
- Renders an interactive globe with country outlines, travel route arcs, and location pins
- Pin label pills are rendered on canvas; connector hairlines extend from pill right edge to card column
- `window._activePinPillRight` stores the pill's right edge X coordinate (used by hairline rendering)
- DO NOT refactor into multiple files without explicit permission — it works as a single unit

---

## 9. Sidebar Component (`Sidebar.astro`)

- ~620 lines of Astro HTML + inline JS + scoped CSS
- Contains: brand block, destination navigation tabs, country chapter panels, time-atmosphere indicator pill, sidebar footer with social links
- Desktop-only class: `.desktop-only` — hidden on mobile
- Mobile: sidebar collapses to a horizontal compact strip

---

## 10. Verification Workflow

After **any** content or component change, run these in order:

```bash
# 1. Validate all chapters
node scripts/inspect_all_chapters.cjs
# Expected: all 19 chapters print [CLEAN]

# 2. Check image coverage (manifest ↔ markdown)
node scripts/audit_coverage.cjs
# Expected: 0 unreferenced images (except japan23_1012_kyoto_higashiyama_yukata_walk_033.jpg — intentionally removed)

# 3. Check all image refs exist on disk
node scripts/audit_refs.cjs
# Expected: Missing: 0

# 4. Build
npm run build
# Expected: exit code 0, 20 pages built
```

### Known build warnings (safe to ignore):
- `[WARN] Duplicate id "thailand/bangkok-chao-phraya"` — pre-existing, non-fatal

---

## 11. Git Workflow

- Branch: `main` (single branch)
- Remote: `origin` → `https://github.com/tanhourui/h-rui-journal.git`
- Commit messages: conventional format — `feat:`, `fix:`, `style:`, `revert:`, `chore:`
- Always verify build passes before pushing

---

## 12. What NOT to Do

1. **Don't install frameworks** (React, Vue, Tailwind, SCSS) without asking
2. **Don't refactor Globe.astro** into smaller files without permission
3. **Don't use emoji** in UI components
4. **Don't hardcode colors** — use CSS variables
5. **Don't write captions from filenames** — visual inspection is mandatory
6. **Don't use banned words** (see §6.4)
7. **Don't add heavy animations** — keep motion subtle and motivated
8. **Don't change the 3-palette time system** without permission
9. **Don't run `pip install` or `npm install` globally** — ask first
10. **Don't skip the verification workflow** after changes (see §10)

---

## 13. What to Prioritize

1. **Image accuracy**: Captions must describe what is actually visible in the photograph
2. **Design consistency**: All new CSS must use existing variables and match the editorial aesthetic
3. **Build stability**: Changes must not break the Astro build
4. **Tone**: Writing should sound like a real photographer's journal — restrained, specific, honest
5. **Challenge bad ideas**: Don't be a yes-man. Push back on decisions that would compromise quality.

---

## 14. Current State (as of 2026-09-10)

- **19 chapters** across 4 countries, all audited and `[CLEAN]`
- **372 images** referenced across all chapters, 0 missing
- All captions have been visually verified and corrected
- All zh-prose has been humanized (AI patterns removed)
- Globe connector line bug fixed (hairline no longer cuts through label pill)
- World clock widget was added and then removed (user decided against it)

---

## 15. Image Manifests

Each destination has a JSON manifest in `src/data/` mapping original filenames to web filenames:

```json
{
  "index": 16,
  "originalFile": "IMG_20250411_124201.jpg",
  "fileName": "bkk25_016.jpg",
  "webPath": "/images/thailand/bangkok/bkk25_016.jpg",
  "width": 2048,
  "height": 1536,
  "aspectRatio": 1.333,
  "camera": "Xiaomi 14 Ultra",
  "focal": 23,
  "fNumber": 1.63,
  "exposureTime": "1/33s",
  "iso": 320,
  "exif": "Xiaomi 14 Ultra · 23mm · ƒ/1.63 · 1/33s · ISO 320",
  "date": "2025-04-11T12:42:01.000Z",
  "gps": [100.61122, 14.46547]
}
```

Use these manifests to look up the `originalFile` → `fileName` mapping when the user references a photo by its original camera filename.

---

*Last updated: 2026-09-10 by Antigravity agent session.*
