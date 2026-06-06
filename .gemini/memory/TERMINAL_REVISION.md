# Terminal CLI Phase 1 Revision Plan

## 1. Commands & Output Mapping

| Current Logic | Revised Command | Visual Output Style |
|:---|:---|:---|
| Boot Logic | `reboot` (Auto) | Loading progress bar `[###---]` + ASCII "TIMBUBADIBAKO" |
| About | `cat profile.txt` | JSON/YAML formatting (UNIKU, Lab Asst, Arch Linux, Physical Log) |
| Skills | `yay -S jrilym-stack` | Installation simulation with multi-category progress bars |
| Projects | `ls -la projects/` | Directory listing with `.md` files. Sub-command: `cat projects/<name>.md` |
| Experience | `cat background.log` | Chronological log with timestamps [YYYY.MM.DD HH:mm] |
| Contact | `cat contact.txt` | Cyber-industrial ASCII box with clickable hyperlinks |
| Mode Switch | `startx` | Extreme glitch effect transition -> Redirect to GUI mode |

## 2. Interaction Overhaul
- **Smart Buttons:** Clicking a button at the bottom will **not** execute immediately. It will populate the input field with the logical command (e.g., clicking "Projects" types `ls projects/` and prompts the user to type a specific file).
- **Command Suggestions:** When `ls projects/` is run, the output will list valid filenames and provide a "hint" line (e.g., `HINT: type 'cat projects/stride_io.md' to view details`).
- **Tab Autocomplete:** Update to support filenames inside virtual directories (like `projects/`).
- **Visual Cleanup:** Remove all legacy "About", "Skills" headers from sections; make them look like raw file readouts.

## 3. Persona Alignment
- **Theme:** "Arch Linux / System Admin" persona.
- **Vibe:** Technical, efficient, no-nonsense. 
- **Font:** Fixed-width JetBrains Mono / VT323 only.
