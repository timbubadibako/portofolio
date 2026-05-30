# Design Spec: Terminal-Style Developer Portal

**Date:** 2026-05-29
**Status:** Pending Approval
**Topic:** Terminal UI (TUI) Portfolio with Hybrid GUI Switch

## 1. Purpose & Vision
To create a high-impact, developer-centric portfolio page that functions as a functional Linux-style terminal. This interface serves as the entry point to the "Personal Developer Portal," allowing users to explore projects, bio, and scaffolding tools via commands, while offering a seamless transition to a modern GUI.

## 2. Interface Design (UI)
- **Layout:** 
  - Fullscreen container (`100vh`).
  - Standard margin: `48px` (Tailwind `p-12`) for a floating window effect.
  - Theme: Deep black background (`bg-zinc-950`) with high-contrast monospace typography (`font-mono`).
- **Prompt Style:** 
  - `guest@jrilym-portal:~$`
  - Blinking block or underscore cursor.
- **Visual Feedback:** 
  - Ghost text for autocompletion.
  - Smooth terminal-like text streaming for standard outputs.

## 3. Core Logic & Commands
- **Interaction Model:**
  - **Autocomplete:** Pressing `Tab` completes commands based on available syntax.
  - **Input Handling:** Real-time character tracking in a custom React state.
- **Display Modes:**
  - **Standard Stream:** Quick info (e.g., `whoami`) prints directly below.
  - **Virtual Buffer (Fullscreen Mode):** For complex lists (e.g., `projects`), the screen clears and enters a full-buffer view (like `less` or `vim`).
- **Command Syntax:**
  - `help`: Lists all available commands and descriptions.
  - `clear`: Clears the terminal history.
  - `whoami`: Displays developer bio.
  - `projects`: Enters Virtual Buffer mode to show project list.
  - `render --gui`: Triggers transition animation to the modern GUI portfolio.
  - `exit` or `cd ..`: Closes the current sub-window/buffer and returns to the main prompt.

## 4. Technical Architecture (Next.js & Zustand)
- **State Management:** `useTerminalStore` (Zustand)
  - `history: string[]`
  - `currentInput: string`
  - `mode: 'terminal' | 'buffer' | 'gui'`
  - `bufferContent: React.ReactNode`
- **Component Structure:**
  - `TerminalContainer`: Wrapper with 48px margin.
  - `CommandHistory`: Renders previous command/output pairs.
  - `PromptInput`: Custom input field with autocomplete logic.
  - `BufferOverlay`: Conditional component for Virtual Buffer views.

## 5. Success Criteria
- [ ] User can complete commands using `Tab`.
- [ ] Virtual Buffer opens for `projects` and closes ONLY via `exit` or `cd ..`.
- [ ] `render --gui` successfully switches the page layout to the GUI version.
- [ ] UI maintains 48px margin on all screen sizes.
