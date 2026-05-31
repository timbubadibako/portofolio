"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"
import { TerminalIcon, X, Minus, Square, Lock, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AboutSection } from "@/components/terminal/sections/about-section"
import { EducationSection } from "@/components/terminal/sections/education-section"
import { SkillsSection } from "@/components/terminal/sections/skills-section"
import { ExperienceSection } from "@/components/terminal/sections/experience-section"
import { ProjectsSection } from "@/components/terminal/sections/projects-section"
import { CertificationsSection } from "@/components/terminal/sections/certifications-section"
import { ContactSection } from "@/components/terminal/sections/contact-section"
import { ImageAsciiLogo } from "@/components/terminal/image-ascii-logo"
import { GlitchText } from "@/components/inter/glitch-text"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/store/useAppStore"

type Command = {
  input: string
  output: React.ReactNode
  timestamp: Date
}

const COMMAND_LIST = [
  "reboot",
  "cat profile.txt",
  "yay -S pajril-stack",
  "ls -la projects/",
  "cat projects/stride_io_gps.md",
  "cat projects/nexio_marketplace.md",
  "cat projects/speech_asr_ai.md",
  "cat background.log",
  "cat contact.txt",
  "startx",
  "sudo generate",
  "clear",
  "help"
]

const NAV_SHORTCUTS = [
  { label: "Identity", cmd: "cat profile.txt" },
  { label: "Skills", cmd: "yay -S pajril-stack" },
  { label: "Projects", cmd: "ls -la projects/" },
  { label: "Log", cmd: "cat background.log" },
  { label: "Contact", cmd: "cat contact.txt" },
  { label: "GUI", cmd: "startx" },
]

const bootMessages = [
  "INITIALIZING KERNEL v6.8.0-DEVPORAL...",
  "LOADING NEURAL DRIVERS...",
  "ESTABLISHING SECURE HANDSHAKE...",
  "SYNCING WITH SUPABASE CLUSTER...",
  "DECRYPTING PORTFOLIO MANIFEST...",
  "STARTING CLI_DAEMON...",
  "READY FOR NEURAL INPUT.",
]

export default function Terminal({ onModeSwitch }: { onModeSwitch?: (mode: 'gui' | 'terminal' | 'inter') => void }) {
  const router = useRouter()
  const { setMode } = useAppStore()
  const [input, setInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<Command[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [currentSection, setCurrentSection] = useState<string | null>(null)
  const [ghostText, setGhostText] = useState("")
  const [isBooting, setIsBooting] = useState(true)
  const [bootMsgIndex, setBootMsgIndex] = useState(0)
  
  // sudo state
  const [isAwaitingPassword, setIsAwaitingPassword] = useState(false)
  const [sudoCommand, setSudoCommand] = useState("")
  
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [])

  // Unified Booting Logic inside Terminal Window
  useEffect(() => {
    if (isBooting) {
      if (bootMsgIndex < bootMessages.length) {
        const timer = setTimeout(() => {
          setBootMsgIndex(prev => prev + 1)
        }, 200)
        return () => clearTimeout(timer)
      } else {
        const finalizeTimer = setTimeout(() => {
          setIsBooting(false)
          setCommandHistory([
            {
              input: "system_init",
              output: (
                <div className="space-y-4">
                  <ImageAsciiLogo />
                  <div className="font-vt323 text-teal-500 text-lg terminal-text-glow leading-tight animate-in fade-in slide-in-from-left duration-1000">
                    <p>[SYSTEM ONLINE]</p>
                    <p>Welcome to PAJRIL_SH v1.1.0. Authorized access only.</p>
                    <p>Type <span className="text-white font-bold underline cursor-pointer" onClick={() => { setInput('help'); }}>help</span> to view available system commands.</p>
                  </div>
                </div>
              ),
              timestamp: new Date(),
            },
          ])
        }, 500)
        return () => clearTimeout(finalizeTimer)
      }
    }
  }, [isBooting, bootMsgIndex])

  // MutationObserver to handle auto-scroll for staggered content animations
  useEffect(() => {
    if (!terminalRef.current) return

    const observer = new MutationObserver(() => {
      scrollToBottom()
    })

    observer.observe(terminalRef.current, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true
    })

    return () => observer.disconnect()
  }, [scrollToBottom])

  useEffect(() => {
    if (!isBooting) {
      inputRef.current?.focus()
      const handleClick = () => inputRef.current?.focus()
      document.addEventListener("click", handleClick)
      return () => document.removeEventListener("click", handleClick)
    }
  }, [isBooting])

  useEffect(() => {
    scrollToBottom()
  }, [commandHistory, isBooting, bootMsgIndex, currentSection, scrollToBottom])

  useEffect(() => {
    if (input.trim() && !isAwaitingPassword) {
      const match = COMMAND_LIST.find(cmd => cmd.startsWith(input.toLowerCase()))
      if (match && match !== input.toLowerCase()) {
        setGhostText(match)
      } else {
        setGhostText("")
      }
    } else {
      setGhostText("")
    }
  }, [input, isAwaitingPassword])

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (isBooting) return

    const rawInput = input.trim()
    if (!rawInput) return

    if (isAwaitingPassword) {
      handlePasswordSubmit(rawInput)
      return
    }

    const commandToProcess = rawInput.toLowerCase()
    let output: React.ReactNode

    if (commandToProcess === 'reboot') {
      window.location.reload()
      return
    }

    if (commandToProcess === 'startx' && onModeSwitch) {
      setCommandHistory(prev => [...prev, {
        input: 'startx',
        output: <p className="text-teal-400 animate-pulse">Initializing X Server... Glitch detected... Launching GUI Mode.</p>,
        timestamp: new Date()
      }])
      setTimeout(() => {
        setMode('gui')
        onModeSwitch('gui')
      }, 1000)
      setInput("")
      return
    }

    if (commandToProcess.startsWith('sudo ')) {
      const target = commandToProcess.split(' ')[1]
      setSudoCommand(target)
      setIsAwaitingPassword(true)
      setCommandHistory(prev => [...prev, {
        input: commandToProcess,
        output: <p className="text-white font-bold flex items-center gap-2 mt-2"><Lock className="h-3.5 w-3.5 text-teal-500" /> [AUTHENTICATION_REQUIRED] Password for root:</p>,
        timestamp: new Date()
      }])
      setInput("")
      return
    }

    switch (commandToProcess) {
      case "help":
        output = (
          <div className="space-y-4 text-teal-500 font-vt323 text-base terminal-text-glow">
            <p className="font-bold text-white uppercase tracking-widest border-b border-teal-500/20 pb-2">[ Available Commands ]</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
              {COMMAND_LIST.map(cmd => (
                <div key={cmd} className="flex justify-between border-b border-teal-500/5 pb-1 group cursor-pointer" onClick={() => setInput(cmd)}>
                  <span className="text-white font-bold group-hover:text-teal-400 transition-colors uppercase tracking-tight">{cmd}</span>
                  <span className="text-teal-500/40 text-[10px] uppercase tracking-tighter self-center">Ready</span>
                </div>
              ))}
            </div>
          </div>
        )
        setCurrentSection(null)
        break

      case "cat profile.txt": 
        output = <AboutSection mode="terminal" />
        setCurrentSection("profile")
        break

      case "yay -s pajril-stack":
        output = <SkillsSection mode="terminal" />
        setCurrentSection("skills")
        break

      case "ls -la projects/":
        output = (
          <div className="space-y-3 font-mono text-sm">
            <p className="text-white/40">drwxr-xr-x  2 pajril users  4096 May 31 00:00 .</p>
            <p className="text-white/40">drwxr-xr-x 12 pajril users  4096 May 31 00:00 ..</p>
            <div className="space-y-1">
              <p className="text-teal-400 group cursor-pointer" onClick={() => setInput("cat projects/stride_io_gps.md")}>-rw-r--r--  1 pajril users  2048 May 31 00:00 stride_io_gps.md</p>
              <p className="text-teal-400 group cursor-pointer" onClick={() => setInput("cat projects/nexio_marketplace.md")}>-rw-r--r--  1 pajril users  2048 May 31 00:00 nexio_marketplace.md</p>
              <p className="text-teal-400 group cursor-pointer" onClick={() => setInput("cat projects/speech_asr_ai.md")}>-rw-r--r--  1 pajril users  2048 May 31 00:00 speech_asr_ai.md</p>
            </div>
            <p className="mt-4 text-[10px] text-teal-500/40 uppercase tracking-widest animate-pulse">
              HINT: Type 'cat projects/[name].md' to read file contents.
            </p>
          </div>
        )
        setCurrentSection("projects")
        break

      case "cat projects/stride_io_gps.md":
      case "cat projects/nexio_marketplace.md":
      case "cat projects/speech_asr_ai.md":
        output = <ProjectsSection filter={commandToProcess.split('/').pop()?.replace('.md', '')} mode="terminal" />
        setCurrentSection("projects")
        break

      case "cat background.log":
        output = (
          <div className="space-y-8">
            <ExperienceSection mode="terminal" />
            <EducationSection mode="terminal" />
            <CertificationsSection mode="terminal" />
          </div>
        )
        setCurrentSection("background")
        break

      case "cat contact.txt":
        output = <ContactSection mode="terminal" />
        setCurrentSection("contact")
        break

      case "clear":
        setCommandHistory([])
        setCurrentSection(null)
        setInput("")
        return

      default:
        output = (
          <div className="text-red-500 font-vt323">
            <GlitchText text={`ERROR: Command '${commandToProcess}' not found.`} intensity="high" /> 
            <p className="mt-1">Type &apos;help&apos; for assistance.</p>
          </div>
        )
        setCurrentSection(null)
    }

    setCommandHistory((prev) => [
      ...prev,
      {
        input: commandToProcess,
        output,
        timestamp: new Date(),
      },
    ])

    setInput("")
    setHistoryIndex(-1)
  }

  const handlePasswordSubmit = (pass: string) => {
    if (pass === "smallproblems") {
      setCommandHistory(prev => [...prev, {
        input: "********",
        output: <p className="text-green-500 font-bold tracking-[0.5em] mt-2 animate-pulse">[ ACCESS_GRANTED ]</p>,
        timestamp: new Date()
      }])
      
      if (sudoCommand === "generate" || sudoCommand === "scaffold" || sudoCommand === "builder") {
        setTimeout(() => {
           router.push('/generator')
        }, 1000)
      }
    } else {
      setCommandHistory(prev => [...prev, {
        input: "********",
        output: (
          <div className="text-red-500 font-bold mt-2 space-y-1">
             <GlitchText text="[ ACCESS_DENIED ]" intensity="high" />
             <p className="text-[10px] uppercase flex items-center gap-2"><ShieldAlert className="h-3 w-3" /> sudo: 1 incorrect password attempt</p>
          </div>
        ),
        timestamp: new Date()
      }])
    }
    
    setIsAwaitingPassword(false)
    setSudoCommand("")
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault()
      if (ghostText) setInput(ghostText)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex].input)
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex].input)
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden border border-teal-500/30 bg-black/80 backdrop-blur-2xl relative">
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-teal-500/50 z-20" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-teal-500/50 z-20" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-teal-500/50 z-20" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-teal-500/50 z-20" />

      {/* Header Bar */}
      <div className="bg-teal-500/5 border-b border-teal-500/20 p-3 md:p-4 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 mr-3 md:mr-6">
             <div className="w-3 h-3 bg-red-500/30 border border-red-500/50 cursor-pointer hover:bg-red-500/70 transition-colors flex items-center justify-center group"><X className="h-2 w-2 opacity-0 group-hover:opacity-100 text-white" /></div>
             <div className="w-3 h-3 bg-amber-500/30 border border-amber-500/50 cursor-pointer hover:bg-amber-500/70 transition-colors flex items-center justify-center group"><Minus className="h-2 w-2 opacity-0 group-hover:opacity-100 text-white" /></div>
             <div className="w-3 h-3 bg-emerald-500/30 border border-emerald-500/50 cursor-pointer hover:bg-emerald-500/70 transition-colors flex items-center justify-center group"><Square className="h-2 w-2 opacity-0 group-hover:opacity-100 text-white" /></div>
          </div>
          <TerminalIcon className="h-4 w-4 text-teal-500" />
          <span className="text-[10px] md:text-xs font-mono text-teal-500/80 uppercase tracking-[0.3em] font-bold">
            archnemesis: ~/zshrc
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
           <div className="h-1 w-1 bg-teal-500 animate-pulse shadow-[0_0_8px_rgba(20,184,166,1)]" />
           <span className="text-[9px] font-mono text-teal-500/40 uppercase tracking-[0.4em] font-bold">guest@archnemesis</span>
        </div>
      </div>

      {/* History Window */}
      <div 
        ref={terminalRef} 
        className="flex-1 p-0 overflow-y-auto custom-scrollbar relative bg-black/20 flex flex-col"
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-0" style={{ backgroundImage: 'radial-gradient(circle, #14b8a6 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="relative z-10 flex-1 flex flex-col">
           {isBooting ? (
             <div className="w-full h-full flex flex-col items-center justify-center relative bg-black/40">
                <div className="relative z-10 space-y-8 w-full max-w-3xl px-8">
                   <ImageAsciiLogo />
                   <div className="space-y-1.5 border-l-2 border-teal-500/20 pl-6">
                      {bootMessages.slice(0, bootMsgIndex).map((message, index) => (
                        <div key={index} className="flex text-[10px] md:text-xs tracking-widest uppercase font-vt323 text-teal-400/80">
                          <span className="text-teal-500 font-bold mr-4">[{index.toString().padStart(2, '0')}]</span>
                          <span className="terminal-text-glow">{message}</span>
                          {index === bootMsgIndex - 1 && (
                            <span className="ml-2 h-4 w-2 bg-teal-500 animate-pulse" />
                          )}
                        </div>
                      ))}
                   </div>
                </div>
             </div>
           ) : (
             <div className="relative z-10 p-4 md:p-8">
               {commandHistory.map((cmd, index) => (
                 <div key={index} className="mb-8 last:mb-0">
                   {cmd.input !== "system_init" && (
                     <div className="flex items-center text-teal-500/40 font-mono text-[10px] mb-3 uppercase tracking-[0.2em] border-l border-teal-500/20 pl-4">
                       <span className="text-teal-500 mr-3 font-bold">❯</span>
                       <span className="text-white/80">{cmd.input}</span>
                       <span className="ml-auto text-[8px] opacity-30 font-bold">{cmd.timestamp.toLocaleTimeString()}</span>
                     </div>
                   )}
                   <div className="mt-2">{cmd.output}</div>
                 </div>
               ))}
             </div>
           )}
        </div>
      </div>

      {/* Input Bar */}
      <div className={cn(
        "bg-teal-500/5 border-t border-teal-500/10 p-4 md:p-6 relative z-10 transition-opacity duration-500",
        isBooting ? "opacity-0 pointer-events-none" : "opacity-100"
      )}>
        <form onSubmit={handleSubmit} className="flex items-center group">
          <span className="text-teal-500 font-black mr-4 text-lg animate-pulse">❯</span>
          <div className="relative flex-1">
            {ghostText && (
              <span className="absolute top-0 left-0 text-teal-900 font-mono text-base pointer-events-none tracking-tight">
                {ghostText}
              </span>
            )}
            <input
              ref={inputRef}
              type={isAwaitingPassword ? "password" : "text"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-none outline-none font-mono text-teal-400 text-base caret-teal-400 selection:bg-teal-500/40 tracking-tight"
              aria-label="Terminal input"
              autoComplete="off"
              spellCheck="false"
              placeholder={isAwaitingPassword ? "[password_required]" : ""}
            />
          </div>
        </form>
      </div>

      {/* Quick Access Nav */}
      <div className={cn(
        "px-4 md:px-6 pb-4 md:pb-6 pt-2 flex flex-wrap justify-center gap-2 overflow-x-auto no-scrollbar relative z-10 transition-opacity duration-500",
        isBooting ? "opacity-0 pointer-events-none" : "opacity-100"
      )}>
        {NAV_SHORTCUTS.map((shortcut) => (
          <Button
            key={shortcut.label}
            variant="outline"
            size="sm"
            onClick={() => {
              setInput(shortcut.cmd)
              inputRef.current?.focus()
            }}
            className="text-[9px] uppercase font-mono bg-black hover:bg-teal-500 hover:text-black text-teal-500 border-teal-500/20 h-7 px-4 rounded-none transition-all duration-300 font-bold tracking-widest"
          >
            {shortcut.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
