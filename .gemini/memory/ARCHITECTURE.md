# Project Architecture: DevPortal v1.0.4

## 1. Vision
A multi-mode developer portfolio that bridges the gap between low-level system interaction (Terminal) and high-fidelity product showcase (GUI).

## 2. Core Stack
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4 (Industrial Retro-Futurism Theme)
- **Database:** Supabase (PostgreSQL)
- **ORM:** Prisma 7
- **State Management:** Zustand (Project Scaffolding & UI State)
- **Animations:** GSAP (Scroll-driven) & Framer Motion (Transitions)

## 3. UI Modes
### A. Terminal Mode (Default Entry)
- **Aesthetic:** CRT Phosphor, Scanlines, ASCII Art.
- **Logic:** Custom command parser, Tab autocomplete, `sudo` auth system.
- **Goal:** Demonstrates technical depth, CLI mastery, and "hacker" persona.

### B. GUI Mode (Unified 'Inter' Style)
- **Aesthetic:** Brutalist-Tech, Glassmorphism, 48px floating margins.
- **Navigation:** Precision fixed side-dots with scroll-tracking.
- **Sections:** Identity, Deployments (Bento Grid), Chronology (Zigzag Timeline), Signals (Archive), Principles (Skills Accordion), Transmission (Footer).

## 4. Key Directories
- `app/`: Routing and main controller logic.
- `components/inter/`: Integrated GUI components.
- `components/terminal/`: TUI components and sections.
- `components/ui/`: Reusable shadcn/ui-pattern components.
- `.variants/`: Reference code (to be cleaned up).
