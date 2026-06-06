# GUI 2.1 Revision Plan: The Mission Control Update

## 1. Global Navigation: The NvimTree Sidebar
- **Component**: `NvimTreeSidebar` (Replacing `SideNav`).
- **Toggle**: Persistent [ ☰ ] button (Top Left).
- **Profile**: Duotone (Black/Cyan) profile image + "JRILYM" bio.
- **Tree Navigation**: 
    - `~/root/identity` (Hero)
    - `~/root/arsenal` (Tech Stack)
    - `~/root/artifacts` (Projects)
    - `~/root/automation` (Scaffolding Hub)
    - `~/root/system_log` (Chronology)
    - `~/root/_Field_Notes/` (Static Markdown Reader)

## 2. Refined Sections

### ⚔️ Core Arsenal (Section 2)
- **Refinement**: Ensure the Neovim split-screen is fully 100vh and responsive.
- **State**: Category click in left panel -> instantaneous AJAX-like update of right panel buffer.

### 🎠 Horizontal Snap Artifacts (Section 3)
- **Layout**: `overflow-x-auto snap-x mandatory`.
- **Content**: 3 full-screen (100vw) cards: `STRIDE_IO`, `NEXIO`, `ASR_ENGINE`.
- **Detail**: Project cards focus on Mockups, Tech Stack, GitHub, and Case Study buttons.

### ⚡ System Log (Section 5)
- **Zigzag**: Perfected horizontal timeline with a solid center axis.
- **Tagging**: 
    - `[EDU]` Cyan (#22d3ee)
    - `[WORK]` Green (#4ade80)
    - `[CERT]` Orange (#fb923c)
- **Origin**: [NOW] status must be the first node on the Left.

### 🚀 Mission Control (Section 6)
- **Split**: 65% (Left) / 35% (Right).
- **Left (CTA)**: Large Slogan: *"Small problems is still problem."*
- **CTAs**: `[ INITIATE_CONNECTION ]` & `[ HIRE_AS_ARCHITECT ]`.
- **Right (Telemetry)**: 
    - GitHub Commit Graph (30 Days).
    - System Uptime / Active Focus readout.

## 3. The Scaffolding Hub (Section 4)
- **Logic**: Multi-step generation flow.
- **Output**: CLI boilerplate text box with [ COPY_TO_CLIPBOARD ] functionality.

---
*Status: Ready for GUI 2.1 Implementation.*
