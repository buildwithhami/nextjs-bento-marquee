# Bento Marquee

A 3-column vertical marquee component built for Next.js 15, React 19, TypeScript, and Tailwind CSS v4. Features uniform cards, smooth CSS keyframe movement, and zero loop stutter.

---

## Features

- **Bi-Directional Motion**: Columns 1 and 3 scroll upward while Column 2 scrolls downward.
- **Seamless Loop**: Exact pixel height calculations prevent boundary snapping or drift.
- **Hover Interaction**: Pauses animation on column hover with a subtle card lift effect (`hover:-translate-y-1.5`).
- **Data Driven**: Content powered by a single structured JSON file (`data/bentoData.json`).
- **SSR Ready**: Clean server-side rendering with no hydration warnings.

---

## Project Structure

```text
bento-marquee/
├── app/
│   ├── globals.css          # Animation keyframes and fade masks
│   ├── layout.tsx           # Base layout configuration
│   └── page.tsx             # Main page entry
├── components/
│   └── BentoMarquee.tsx     # Core marquee component logic
├── data/
│   └── bentoData.json       # Column datasets and image links
└── README.md                # Documentation
```

---

## CSS Setup & Keyframes

Ensure your global stylesheet (e.g., `app/globals.css`) includes the required keyframe animations and touch-pause utility classes for the marquee to function correctly:

```css
@import "tailwindcss";

@keyframes marquee-scroll {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(0, calc(var(--marquee-distance) * -1), 0); }
}

.marquee-track {
  animation: marquee-scroll var(--marquee-duration, 30s) linear infinite;
  will-change: transform;
}

.marquee-track[data-direction="down"] {
  animation-direction: reverse;
}

.marquee-track.paused {
  animation-play-state: paused !important;
}

.marquee-col {
  contain: layout paint;
}

@media (hover: hover) and (pointer: fine) {
  .marquee-col:hover .marquee-track {
    animation-play-state: paused;
  }
}

```

## Getting Started

### 1. Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### 2. Development

Run the local development server:

```bash
npm run dev
```

Open `http://localhost:3000` to view the component in your browser.

---

## Data Configuration (`bentoData.json`)

Cards are structured in three column arrays (`column1`, `column2`, `column3`). Each entry expects an ID, image URL, and alt text:

```json
{
  "column1": [
    {
      "id": "c1-1",
      "imageUrl": "https://plus.unsplash.com/premium_photo-1681426687411-21986b0626a8?    w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
      "imageAlt": "Tech Visual Showcase"
    }
  ],
  "column2": [
    {
      "id": "c2-1",
      "imageUrl": "https://images.unsplash.com/photo-1700427296131-0cc4c4610fc6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
      "imageAlt": "Bento Marquee Asset"
    }
  ],
  "column3": [
    {
      "id": "c3-1",
      "imageUrl": "https://plus.unsplash.com/premium_photo-1714618993404-1c25dd17afb7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
      "imageAlt": "Bento Marquee Asset"
    }
  ]
}
```

---

## Customization

- **Speed**: Adjust the `SPEED` constant in `BentoMarquee.tsx` (default: `30` px/sec).
- **Height & Spacing**: Card dimensions (`240px`) and gaps (`24px`) are configured via `CARD_H` and `GAP` constants.
