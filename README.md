# Xai — Intelligence Workspace

A high-end, scroll-driven AI product experience prototype built with **Next.js**, **React Three Fiber**, and **GSAP**. This project was developed as a technical assessment showcasing front-end engineering craft: 3D visualization, choreographed scroll animation, and production-grade component architecture.

**Live Demo:** [xai-prototype.vercel.app](https://xai-prototype.vercel.app/)
**Design File:** _[(https://www.figma.com/design/iNJqjqszv4GBEBhkKPzI9z/Xai-%E2%80%94-Intelligence?t=44nvgiXN9bpOy1Rm-1)]_
**Repository:** [github.com/faysalhasanmd/xai-prototype](https://github.com/faysalhasanmd/xai-prototype)

---

## Overview

Xai is a fictional AI product landing page built to demonstrate how raw data becomes "live intelligence" through four distinct, narrative-driven sections. Every section pairs a visual metaphor (particles, hexagon lattices, a resolving 3D sphere) with real interaction — scroll, mouse, and touch — instead of static imagery.

| Section                   | Purpose                                                    | Core Technique                                                                                        |
| ------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Hero**                  | First impression: raw data as a living particle cloud      | React Three Fiber particle field morphing from scatter → grid on scroll                               |
| **InsightFlow**           | Explains the 3-stage pipeline (Ingest → Analyze → Insight) | Framer Motion scroll-triggered timeline with hover-flip cards                                         |
| **IntelligenceDashboard** | Shows the product's dashboard UI in context                | Animated preview mockup                                                                               |
| **WowMoment**             | Closing "wow" moment: chaos resolving into order           | GSAP ScrollTrigger pinning a Three.js point cloud that self-organizes into a Fibonacci-sphere lattice |

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **3D Rendering:** React Three Fiber, Three.js
- **Animation:** Framer Motion, GSAP + ScrollTrigger
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Language:** JavaScript (JSX)

---

## Project Architecture

The codebase is organized around a **single-responsibility folder pattern** — every visual section is its own directory with data, hooks, and sub-components split out, rather than one monolithic file. This keeps each piece independently readable, testable, and reusable.

```
src/
├── app/
│   ├── layout.js
│   └── page.jsx                 # Composes all sections
│
└── components/
    ├── Hero/
    │   ├── index.jsx             # Section composition + event wiring
    │   ├── Header.jsx            # Nav bar + mobile burger trigger
    │   ├── MobileMenu.jsx        # Slide-down mobile nav panel
    │   ├── HeroContent.jsx       # Badge, heading, CTAs
    │   ├── canvas/
    │   │   └── ParticleField.jsx # Three.js particle system
    │   ├── hooks/
    │   │   └── useParticleCount.js
    │   └── animations/
    │       └── variants.js
    │
    ├── InsightFlow/
    │   ├── index.jsx              # Section composition
    │   ├── AnimatedIcon.jsx
    │   ├── AnimatedContentCard.jsx
    │   ├── CenterNode.jsx
    │   ├── StageMotif.jsx         # Per-stage SVG illustration
    │   ├── data/
    │   │   └── stages.js          # Pipeline stage content/config
    │   └── animations/
    │       └── variants.js
    │
    ├── dashboard/
    │   └── IntelligenceDashboard.jsx
    │
    └── WowMoment/
        ├── index.jsx               # Section composition
        ├── SectionHeader.jsx
        ├── LeftHUD.jsx             # Lattice engine status panel
        ├── RightHUD.jsx            # System integrity readout
        ├── SectionFooter.jsx
        ├── canvas/
        │   └── DataCluster.jsx     # Three.js point cloud + edges
        ├── utils/
        │   └── geometry.js         # Fibonacci sphere, edge-building math
        └── hooks/
            ├── useResponsiveCamera.js
            ├── usePointerTracking.js
            ├── useWowMomentScroll.js  # GSAP ScrollTrigger setup
            └── useHUDSync.js          # rAF-driven HUD text sync
```

### Why this structure

- **Data/config separated from UI** — e.g. `InsightFlow/data/stages.js` holds all copy and colors, so content edits never touch component logic.
- **Custom hooks isolate side effects** — scroll tracking, pointer tracking, and camera responsiveness are each their own hook, independently testable and reusable across sections.
- **Heavy math extracted from components** — `WowMoment/utils/geometry.js` contains pure, framework-agnostic functions (no React/Three imports needed to reason about the math).
- **Presentational components stay dumb** — HUD panels, headers, and cards receive refs/props and render; they don't own state or side effects.

---

## Key Engineering Highlights

- **Scroll-synchronized 3D:** Camera-independent particle systems driven by scroll progress refs (not React state) to avoid unnecessary re-renders at 60fps.
- **GSAP ScrollTrigger pinning:** The closing section pins in place while a point cloud mathematically resolves from random scatter into a golden-ratio (Fibonacci) sphere with nearest-neighbor edges.
- **Responsive 3D tuning:** Particle counts and camera distance adapt per breakpoint (mobile / tablet / desktop) rather than simply hiding the 3D layer.
- **Direct DOM updates for HUD text:** Live percentage/status readouts bypass React's render cycle via refs, keeping the animation loop smooth.
- **Full touch parity:** Every mouse-driven interaction (pointer tracking, hover states) has a corresponding touch handler.

---

## Animation & Interaction Decisions

A short walkthrough video explaining the key animation and interaction choices in this project (scroll-linked 3D, GSAP pinning, hover-driven micro-interactions, and why they're implemented the way they are) is available here:

🎥 **Video walkthrough:** _[add Google Drive or YouTube link]_

**Summary of what's covered in the video:**

- Why scroll progress is tracked via refs instead of React state (performance at 60fps)
- How the Hero particle field morphs from a random cloud into a grid using linear interpolation tied to scroll position
- Why GSAP ScrollTrigger (not Framer Motion) was chosen specifically for the pinned WowMoment section, and how the pin + scrub combination works
- The reasoning behind splitting hover states (front/back card flip in InsightFlow) using `AnimatePresence`
- Responsive trade-offs made for 3D content (lower particle counts and adjusted camera distance on mobile instead of hiding the canvas)

---

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it locally.

---

## Deployment

Deployed on **Vercel**: [xai-prototype.vercel.app](https://xai-prototype.vercel.app/)

---

## About the Developer

**Faysal Hasan** — MERN / Full-Stack Developer
BSc in CSE, Green University of Bangladesh (2026)

- Portfolio: [faysalhasanmd.github.io](https://faysalhasanmd.github.io)
- GitHub: [github.com/faysalhasanmd](https://github.com/faysalhasanmd)

This project was built as part of a technical assessment for **Raco AI Technologies**, demonstrating front-end engineering ability across animation, 3D graphics, and scalable component architecture.
