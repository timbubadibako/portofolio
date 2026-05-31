# V2 Multi-Page Architecture Roadmap
*Status: INITIALIZING*

## 🎯 Primary Objective
Transition the current Single-Page (SPA) scroll architecture into a high-performance Multi-Page (MPA) routing system to enhance modularity and support deep-linking for specific sectors (Notes, Projects, Profile).

## 🛠️ Planned Routes

| Path | Purpose | Content Type |
|:---|:---|:---|
| `/` | System Entry | Identity Root (Preview) |
| `/notes` | Field Notes | Full-screen Markdown Reader |
| `/notes/:slug` | Note Detail | Surgical view of a specific log |
| `/generator` | Project Hub | Unlocked Scaffolding Generator |
| `/profile` | Biometric Profile | Expanded Personal Bio & Persona |
| `/archive` | Project Gallery | Full deployment list (Non-buffer) |

## 🏗️ Technical Requirements

### 1. NvimTree Sidebar Refactor
- Change `scrollToSection` logic to standard Next.js `router.push()` or `<Link />`.
- Implement a global layout to persist the Sidebar and Terminal/GUI mode preference across routes.

### 2. Note Detail Routing
- Dynamically fetch and render Markdown files from `public/content/notes/` based on the URL slug.
- Maintain the "Buffer Editor" aesthetic for individual notes.

### 3. State Preservation
- Use local storage or a centralized store (Zustand) to remember if the user is in "Terminal" or "GUI" mode when navigating between pages.

### 4. Root Page Optimization
- Maintain the `/` root as a high-fidelity preview/identity section with smooth-scroll logic for quick scanning, while delegating complex modules to dedicated pages.

---
*Created by Gemini CLI // v1.1.0*
