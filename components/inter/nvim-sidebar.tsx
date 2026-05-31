"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { 
  Menu, X, ChevronRight, Folder, FileText, 
  User, Terminal, Mail, ExternalLink,
  BookOpen, Globe, Shield, Zap, Box, Clock, Activity, Cpu, Monitor
} from "lucide-react"
import Image from "next/image"

interface NavItem {
  id: string
  label: string
  icon: any
  path: string
  type: 'file' | 'folder'
}

const navItems: NavItem[] = [
  { id: "hero", label: "identity.sys", icon: FileText, path: "~/root/identity", type: 'file' },
  { id: "principles", label: "arsenal/", icon: Folder, path: "~/root/arsenal", type: 'folder' },
  { id: "projects", label: "artifacts/", icon: Folder, path: "~/root/artifacts", type: 'folder' },
  { id: "scaffold", label: "generator/", icon: Folder, path: "~/root/generator", type: 'folder' },
  { id: "chronology", label: "system_log.log", icon: FileText, path: "~/root/system_log", type: 'file' },
  { id: "mission_control", label: "mission_ctrl/", icon: Folder, path: "~/root/mission_ctrl", type: 'folder' },
]

export function NvimSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [notes, setNotes] = useState<string[]>([])
  const [selectedNote, setSelectedIdNote] = useState<string | null>(null)
  const [noteContent, setNoteContent] = useState<string>("")
  const [isNoteLoading, setIsNoteLoading] = useState(false)

  useEffect(() => {
    setNotes(['welcome_log.md', 'architecture.md', 'security_audit.log'])
  }, [])

  useEffect(() => {
    if (selectedNote) {
       setIsNoteLoading(true)
       fetch(`/content/notes/${selectedNote}`)
         .then(res => res.text())
         .then(text => {
            setNoteContent(text)
            setIsNoteLoading(false)
         })
         .catch(err => {
            setNoteContent("ERROR: Failed to load buffer data.")
            setIsNoteLoading(false)
         })
    }
  }, [selectedNote])

  const scrollToSection = (id: string) => {
    window.dispatchEvent(new CustomEvent('section-transition'))

    const element = document.getElementById(id)
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" })
      }, 100)
      setIsOpen(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3
      const sections = ["hero", "principles", "projects", "scaffold", "chronology", "mission_control"]
      
      for (const id of sections) {
        const element = document.getElementById(id)
        if (element) {
          const { top, bottom } = element.getBoundingClientRect()
          const absTop = top + window.scrollY
          const absBottom = bottom + window.scrollY
          if (scrollPosition >= absTop && scrollPosition <= absBottom) {
            setActiveSection(id)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed top-6 left-6 z-[800] h-10 w-10 border flex items-center justify-center transition-all duration-500",
          isOpen 
            ? "bg-teal-500 border-teal-400 text-black shadow-[0_0_20px_rgba(20,184,166,0.5)]" 
            : "bg-black/80 border-white/10 text-white/40 hover:border-teal-500/50 hover:text-teal-400 backdrop-blur-md"
        )}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[750]"
            />

            <motion.aside
              initial={{ x: -400 }}
              animate={{ x: 0 }}
              exit={{ x: -400 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-zinc-950 border-r border-white/5 z-[760] flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-white/5 bg-zinc-900/20">
                 <div className="relative w-24 h-24 mb-6 group overflow-hidden border border-teal-500/30 bg-zinc-900">
                    <div className="absolute inset-0 bg-teal-500 mix-blend-color z-10 opacity-40 pointer-events-none" />
                    
                    <Image 
                      src="/assets/profile/profile.png" 
                      alt="PAJRIL" 
                      fill
                      className="object-cover grayscale contrast-125"
                      onError={(e) => {
                        (e.target as any).style.display = 'none'
                      }}
                    />
                    
                    <div className="absolute inset-0 flex items-center justify-center text-teal-500/10 -z-10">
                       <User className="w-12 h-12" />
                    </div>

                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-teal-500/60" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-teal-500/60" />
                 </div>
                 
                 <div className="space-y-1">
                    <h2 className="font-press-start text-[10px] text-white uppercase tracking-tighter">PAJRIL_ARCH</h2>
                    <p className="font-mono text-[9px] text-teal-500/60 uppercase tracking-[0.2em]">AI & Fullstack Developer</p>
                 </div>
                 <p className="mt-4 font-mono text-[10px] text-white/20 leading-relaxed uppercase tracking-wider">
                    "Small problems are <br /> still problems."
                 </p>
              </div>

              <div className="flex-1 py-6 overflow-y-auto custom-scrollbar">
                 <div className="px-6 mb-2">
                    <span className="font-mono text-[8px] text-white/20 uppercase tracking-[0.3em]">Explorer: ~/root</span>
                 </div>
                 <div className="space-y-1 p-2">
                    {navItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-2 font-mono text-xs transition-all duration-200 group relative",
                          activeSection === item.id 
                            ? "text-teal-400 bg-teal-500/5" 
                            : "text-white/30 hover:text-white/60 hover:bg-white/5"
                        )}
                      >
                         <ChevronRight className={cn(
                           "h-3 w-3 transition-transform",
                           activeSection === item.id ? "rotate-90 text-teal-500" : "opacity-0 group-hover:opacity-100"
                         )} />
                         <item.icon className={cn("h-4 w-4 shrink-0", activeSection === item.id ? "text-teal-500" : "opacity-20")} />
                         <span className="truncate tracking-tight">{item.label}</span>
                         
                         {activeSection === item.id && (
                           <div className="absolute right-4 h-1.5 w-1.5 bg-teal-500 animate-pulse" />
                         )}

                         <div className="absolute left-full ml-4 bg-black border border-white/10 px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150 pointer-events-none translate-x-2 group-hover:translate-x-0 hidden lg:block z-[900]">
                            <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-teal-500/40" />
                            <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-teal-500/40" />
                            <span className="font-mono text-[8px] font-bold text-teal-400 whitespace-nowrap tracking-[0.2em]">{item.label}</span>
                         </div>
                      </button>
                    ))}
                 </div>

                 <div className="mt-8 px-4 space-y-4">
                    <div className="flex items-center gap-2 px-4 text-white/20">
                       <BookOpen className="h-3 w-3" />
                       <span className="font-mono text-[8px] uppercase tracking-widest">_Field_Notes</span>
                    </div>
                    <ul className="space-y-1 p-2">
                       {notes.map(note => (
                         <li 
                           key={note}
                           onClick={() => setSelectedIdNote(note)}
                           className="flex items-center gap-3 px-8 py-1.5 font-mono text-[10px] text-white/20 hover:text-teal-500/60 cursor-pointer transition-colors group"
                         >
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">»</span>
                            {note}
                         </li>
                       ))}
                    </ul>
                 </div>
              </div>

              <div className="p-6 border-t border-white/5 bg-black/40 space-y-4">
                 <div className="flex gap-4">
                    <a href="https://github.com/timbubadibako" target="_blank" className="p-2 border border-white/5 bg-white/5 text-white/20 hover:text-teal-400 hover:border-teal-500/30 transition-all">
                       <Globe className="h-4 w-4" />
                    </a>
                    <a href="https://www.linkedin.com/in/syifa-pajril-yaum-730162264/" target="_blank" className="p-2 border border-white/5 bg-white/5 text-white/20 hover:text-teal-400 hover:border-teal-500/30 transition-all">
                       <Monitor className="h-4 w-4" />
                    </a>
                    <a href="mailto:pjrlywm@gmail.com" className="p-2 border border-white/5 bg-white/5 text-white/20 hover:text-teal-400 hover:border-teal-500/30 transition-all">
                       <Mail className="h-4 w-4" />
                    </a>
                 </div>
                 <div className="font-mono text-[7px] text-white/10 uppercase tracking-[0.4em]">
                    Build: stable_v1.1.0 <br />
                    Kernel: 6.8.0-pajril
                 </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
         {selectedNote && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-[1000] flex items-center justify-center p-6 md:p-20"
            >
               <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setSelectedIdNote(null)} />
               <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="relative w-full max-w-4xl max-h-[80vh] bg-zinc-950 border border-white/10 flex flex-col shadow-2xl"
               >
                  <div className="p-4 border-b border-white/5 bg-zinc-900/30 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
                     <div className="flex items-center gap-3">
                        <FileText className="h-3 w-3 text-teal-500" />
                        <span className="text-white/60">Buffer:</span>
                        <span className="text-teal-400 font-bold">{selectedNote}</span>
                     </div>
                     <button onClick={() => setSelectedIdNote(null)} className="text-white/20 hover:text-white transition-colors">
                        [ :q! ]
                     </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-8 md:p-12 font-mono text-sm leading-relaxed text-white/60 custom-scrollbar">
                     {isNoteLoading ? (
                        <div className="flex items-center gap-3 text-teal-500 animate-pulse">
                           <Activity className="h-4 w-4" /> [ READING_BUFFER... ]
                        </div>
                     ) : (
                        <div className="prose prose-invert prose-teal max-w-none">
                           <h1 className="text-white text-xl font-press-start mb-8 tracking-tighter uppercase underline decoration-teal-500/20 underline-offset-8">
                              {selectedNote.replace('.md', '').replace('.log', '').replace('_', ' ')}
                           </h1>
                           <p className="text-teal-500/40 text-[10px] uppercase mb-12 tracking-[0.5em]">--- Begin_Transmission ---</p>
                           
                           <div className="space-y-6 whitespace-pre-wrap">
                              {noteContent}
                           </div>

                           <p className="text-teal-500/40 text-[10px] uppercase mt-12 tracking-[0.5em]">--- End_of_Buffer ---</p>
                        </div>
                     )}
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
    </>
  )
}
