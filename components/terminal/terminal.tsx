"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { TerminalIcon, X, Minus, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AboutSection } from "@/components/terminal/sections/about-section"
import { EducationSection } from "@/components/terminal/sections/education-section"
import { SkillsSection } from "@/components/terminal/sections/skills-section"
import { ExperienceSection } from "@/components/terminal/sections/experience-section"
import { ProjectsSection } from "@/components/terminal/sections/projects-section"
import { CertificationsSection } from "@/components/terminal/sections/certifications-section"
import { ContactSection } from "@/components/terminal/sections/contact-section"
import { ImageAsciiLogo } from "@/components/terminal/image-ascii-logo"
import { useRouter } from "next/navigation"

type Command = {
  input: string
  output: React.ReactNode
  timestamp: Date
}

const COMMAND_LIST = [
  "about",
  "education",
  "skills",
  "experience",
  "projects",
  "certifications",
  "contact",
  "clear",
  "help",
  "scan",
  "render --gui",
  "sudo"
]

export default function Terminal({ onModeSwitch }: { onModeSwitch?: (mode: 'gui' | 'terminal' | 'inter') => void }) {
  const router = useRouter()
  const [input, setInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<Command[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [currentSection, setCurrentSection] = useState<string | null>(null)
  const [ghostText, setGhostText] = useState("")
  
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

  useEffect(() => {
    inputRef.current?.focus()
    const handleClick = () => inputRef.current?.focus()
    document.addEventListener("click", handleClick)

    setCommandHistory([
      {
        input: "boot",
        output: (
          <div className="space-y-4">
            <ImageAsciiLogo />
            <div className="font-vt323 text-teal-500 text-lg terminal-text-glow leading-tight animate-in fade-in slide-in-from-left duration-1000">
              <p>[SYSTEM BOOT SUCCESSFUL]</p>
              <p>Welcome to the DevPortal v1.0.4. Authorized access only.</p>
              <p>Type <span className="text-white font-bold underline cursor-pointer" onClick={() => { setInput('help'); }}>help</span> to view available system commands.</p>
            </div>
          </div>
        ),
        timestamp: new Date(),
      },
    ])

    return () => document.removeEventListener("click", handleClick)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [commandHistory, currentSection, scrollToBottom])

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

    const rawInput = input.trim()
    if (!rawInput) return

    if (isAwaitingPassword) {
      handlePasswordSubmit(rawInput)
      return
    }

    const commandToProcess = rawInput.toLowerCase()
    
    // Check for sudo
    if (commandToProcess.startsWith('sudo ')) {
      const target = commandToProcess.split(' ')[1]
      setSudoCommand(target)
      setIsAwaitingPassword(true)
      setCommandHistory(prev => [...prev, {
        input: commandToProcess,
        output: <p className="text-white font-bold">Password for guest:</p>,
        timestamp: new Date()
      }])
      setInput("")
      return
    }

    let output: React.ReactNode

    if (commandToProcess === 'render --gui' && onModeSwitch) {
      onModeSwitch('gui')
      setInput("")
      return
    }

    switch (commandToProcess) {
      case "help":
        output = (
          <div className="space-y-2 text-teal-500 font-vt323 text-base terminal-text-glow">
            <p className="font-bold text-white uppercase tracking-widest">[ Available Commands ]</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
              {COMMAND_LIST.map(cmd => (
                <div key={cmd} className="flex justify-between border-b border-teal-500/10 pb-1">
                  <span className="text-white font-bold">{cmd}</span>
                  <span className="text-teal-500/60 text-xs uppercase tracking-tighter">Ready</span>
                </div>
              ))}
            </div>
          </div>
        )
        setCurrentSection(null)
        break

      case "about": output = <AboutSection />; setCurrentSection("about"); break
      case "education": output = <EducationSection />; setCurrentSection("education"); break
      case "skills": output = <SkillsSection />; setCurrentSection("skills"); break
      case "experience": output = <ExperienceSection />; setCurrentSection("experience"); break
      case "projects": output = <ProjectsSection />; setCurrentSection("projects"); break
      case "certifications": output = <CertificationsSection />; setCurrentSection("certifications"); break
      case "contact": output = <ContactSection />; setCurrentSection("contact"); break

      case "clear":
        setCommandHistory([])
        setCurrentSection(null)
        setInput("")
        return

      case "scan":
        output = (
          <div className="space-y-2 text-teal-500 font-vt323">
            <p className="animate-pulse">Initializing deep sector scan...</p>
            <pre className="text-xs my-2 text-teal-500/40">
              {`
[0.00s] PING root.devportal.v1
[0.12s] RECV 64 bytes from 127.0.0.1
[0.25s] SCANNING /usr/bin/portfolios...
[0.45s] INTEGRITY CHECK: OK
[0.60s] NEURAL DECORATOR: ONLINE
`}
            </pre>
            <p className="text-green-500 font-bold">SYSTEM SECURE. ALL SIGNALS OPTIMAL.</p>
          </div>
        )
        setCurrentSection(null)
        break
      
      case "sudo":
        output = <p className="text-white/40 italic">Usage: sudo [command]</p>
        setCurrentSection(null)
        break

      default:
        output = (
          <p className="text-red-500 font-vt323">
            ERROR: Command &apos;{commandToProcess}&apos; not found. Type &apos;help&apos; for assistance.
          </p>
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
    if (pass === "timbubadibako") {
      setCommandHistory(prev => [...prev, {
        input: "*******",
        output: <p className="text-green-500 font-bold tracking-widest">[ AUTHENTICATION SUCCESSFUL ]</p>,
        timestamp: new Date()
      }])
      
      // Execute the actual sudo command
      if (sudoCommand === "scaffold" || sudoCommand === "builder") {
        setCommandHistory(prev => [...prev, {
          input: "system",
          output: <p className="text-teal-400 animate-pulse">Launching Scaffolding Hub Interface...</p>,
          timestamp: new Date()
        }])
        setTimeout(() => {
           router.push('/scaffold')
        }, 1500)
      } else {
        setCommandHistory(prev => [...prev, {
          input: "system",
          output: <p className="text-white/40">Command &apos;{sudoCommand}&apos; authorized but not mapped to a GUI component.</p>,
          timestamp: new Date()
        }])
      }
    } else {
      setCommandHistory(prev => [...prev, {
        input: "*******",
        output: <p className="text-red-500 font-bold">sudo: 1 incorrect password attempt</p>,
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
    <div className="flex flex-col h-full overflow-hidden border border-teal-500/20 rounded-2xl bg-black/80 backdrop-blur-xl shadow-[0_0_50px_-12px_rgba(20,184,166,0.3)]">
      {/* Header Bar */}
      <div className="bg-teal-500/10 border-b border-teal-500/30 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-2 mr-4">
             <div className="w-3 h-3 rounded-full bg-red-500/40 border border-red-500/60 cursor-pointer hover:bg-red-500/80 transition-colors flex items-center justify-center group"><X className="h-2 w-2 opacity-0 group-hover:opacity-100" /></div>
             <div className="w-3 h-3 rounded-full bg-amber-500/40 border border-amber-500/60 cursor-pointer hover:bg-amber-500/80 transition-colors flex items-center justify-center group"><Minus className="h-2 w-2 opacity-0 group-hover:opacity-100" /></div>
             <div className="w-3 h-3 rounded-full bg-emerald-500/40 border border-emerald-500/60 cursor-pointer hover:bg-emerald-500/80 transition-colors flex items-center justify-center group"><Square className="h-2 w-2 opacity-0 group-hover:opacity-100" /></div>
          </div>
          <TerminalIcon className="h-4 w-4 text-teal-400" />
          <span className="text-[10px] md:text-xs font-mono text-teal-400/60 uppercase tracking-[0.2em] font-bold">
            SESSION_ROOT // GUEST@DEVPORAL {currentSection ? `:: /${currentSection}` : ":: ~"}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
           <div className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
           <span className="text-[9px] font-mono text-teal-500/40 uppercase tracking-widest">Signal: Stable</span>
        </div>
      </div>

      {/* History Window */}
      <div 
        ref={terminalRef} 
        className="flex-1 p-8 overflow-y-auto custom-scrollbar relative"
      >
        {commandHistory.map((cmd, index) => (
          <div key={index} className="mb-8 last:mb-0">
            {cmd.input !== "boot" && (
              <div className="flex items-center text-teal-500/30 font-mono text-[10px] mb-2 uppercase tracking-widest">
                <span className="text-teal-400 mr-3 font-bold">$</span>
                <span>{cmd.input}</span>
                <span className="ml-auto text-[8px] opacity-50">{cmd.timestamp.toLocaleTimeString()}</span>
              </div>
            )}
            <div className="mt-1">{cmd.output}</div>
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <div className="bg-black/40 border-t border-teal-500/10 p-6">
        <form onSubmit={handleSubmit} className="flex items-center group">
          <span className="text-teal-400 font-bold mr-4 text-lg animate-pulse">❯</span>
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
      <div className="px-6 pb-6 pt-2 flex flex-wrap justify-center gap-2 overflow-x-auto no-scrollbar">
        {COMMAND_LIST.slice(0, 9).map((cmd) => (
          <Button
            key={cmd}
            variant="outline"
            size="sm"
            onClick={() => {
              setInput(cmd)
              setTimeout(() => {
                const fakeEvent = { preventDefault: () => {} } as React.FormEvent
                handleSubmit(fakeEvent)
                inputRef.current?.focus()
              }, 50)
            }}
            className="text-[9px] uppercase font-mono bg-teal-500/5 hover:bg-teal-500/20 text-teal-400 border-teal-500/10 h-7 px-3 rounded-lg backdrop-blur-md"
          >
            {cmd}
          </Button>
        ))}
      </div>
    </div>
  )
}
