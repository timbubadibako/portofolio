# Evolution Backlog & Cleanup

## 🛠️ UI/UX Enhancements (Retro-Futurism)
- [ ] **Glitch Engine:** Implement a robust `GlitchText` component using Framer Motion to randomly apply jitter/displacement.
- [ ] **Terminal Input Logic:** Ensure `sudo` password mask works across all browsers.
- [ ] **Section Transition:** Add a "Data Stream" animation when switching sections via SideNav.
- [ ] **Soundscape:** Integrate subtle mechanical clicking sounds for `SplitFlapText`.

## 🧹 Project Cleanup
- [ ] **Variant Removal:** Once all logic is adapted, delete `.variants/` to reduce bundle size and clutter.
- [ ] **Redundant Components:** Remove `components/gui/` (old version) and consolidate into `components/inter/`.
- [ ] **Unused Assets:** Scan `public/` for GitHub reference assets that are no longer needed.

## 🔗 Data Integration
- [ ] **Supabase Sync:** Connect `ProjectsSection` to fetch real data from the Supabase `Project` table.
- [ ] **Scaffolding Link:** Connect the `sudo scaffold` command to the actual `app/scaffold/page.tsx` UI.

## 🚀 Deployment
- [ ] **Vercel Analytics:** Enable real-time traffic monitoring.
- [ ] **SEO Optimization:** Update `Metadata` in `app/layout.tsx` for each mode.
