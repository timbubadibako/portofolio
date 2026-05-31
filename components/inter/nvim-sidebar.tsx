"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { 
  Menu, X, ChevronRight, Folder, FileText, 
  User, Terminal, Mail, ExternalLink,
  BookOpen, Globe, Shield, Zap, Box, Clock, Activity, Cpu, Monitor, Settings
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavItem {
  id: string
  label: string
  icon: any
  path: string
  href: string
  type: 'file' | 'folder'
}

const navItems: NavItem[] = [
  { id: "identity", label: "identity.sys", icon: FileText, path: "~/root/identity", href: "/", type: 'file' },
  { id: "profile", label: "profile.bio", icon: User, path: "~/root/profile", href: "/profile", type: 'file' },
  { id: "lab", label: "security_lab/", icon: Shield, path: "~/root/security_lab", href: "/lab", type: 'folder' },
  { id: "projects", label: "artifacts/", icon: Folder, path: "~/root/artifacts", href: "/projects", type: 'folder' },
  { id: "generator", label: "generator/", icon: Zap, path: "~/root/generator", href: "/generator", type: 'file' },
  { id: "background", label: "system_log.log", icon: Clock, path: "~/root/system_log", href: "/background", type: 'file' },
  { id: "notes", label: "_Field_Notes/", icon: BookOpen, path: "~/root/_Field_Notes", href: "/notes", type: 'folder' },
]

export function NvimSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const [notes, setNotes] = useState<any[]>([])

  useEffect(() => {
    async function fetchNotesList() {
      try {
        const res = await fetch('/api/notes')
        const data = await res.json()
        if (Array.isArray(data)) {
          setNotes(data)
        }
      } catch (err) {
        console.error("Failed to fetch notes index")
      }
    }
    fetchNotesList()
  }, [])

  const checkIsActive = (itemHref: string) => {
    if (itemHref === '/' && pathname === '/') return true
    if (itemHref !== '/' && pathname.startsWith(itemHref)) return true
    return false
  }

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
                    {navItems.map((item) => {
                      const isActive = checkIsActive(item.href)
                      
                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={() => {
                             window.dispatchEvent(new CustomEvent('section-transition'))
                             setIsOpen(false)
                          }}
                          className={cn(
                            "w-full flex items-center gap-3 px-4 py-2 font-mono text-xs transition-all duration-200 group relative",
                            isActive 
                              ? "text-teal-400 bg-teal-500/5" 
                              : "text-white/30 hover:text-white/60 hover:bg-white/5"
                          )}
                        >
                           <ChevronRight className={cn(
                             "h-3 w-3 transition-transform",
                             isActive ? "rotate-90 text-teal-500" : "opacity-0 group-hover:opacity-100"
                           )} />
                           <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-teal-500" : "opacity-20")} />
                           <span className="truncate tracking-tight">{item.label}</span>
                           
                           {isActive && (
                             <div className="absolute right-4 h-1.5 w-1.5 bg-teal-500 animate-pulse" />
                           )}

                           <div className="absolute left-full ml-4 bg-black border border-white/10 px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150 pointer-events-none translate-x-2 group-hover:translate-x-0 hidden lg:block z-[900]">
                              <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-teal-500/40" />
                              <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-teal-500/40" />
                              <span className="font-mono text-[8px] font-bold text-teal-400 whitespace-nowrap tracking-[0.2em]">{item.label}</span>
                           </div>
                        </Link>
                      )
                    })}
                 </div>

                 <div className="mt-8 px-4 space-y-4">
                    <div className="flex items-center gap-2 px-4 text-white/20">
                       <BookOpen className="h-3 w-3" />
                       <span className="font-mono text-[8px] uppercase tracking-widest">_Field_Notes</span>
                    </div>
                    <ul className="space-y-1 p-2">
                       {notes.map(note => (
                         <li key={note.id}>
                           <Link 
                             href={`/notes/${note.id}`}
                             onClick={() => {
                                window.dispatchEvent(new CustomEvent('section-transition'))
                                setIsOpen(false)
                             }}
                             className={cn(
                               "flex items-center gap-3 px-8 py-1.5 font-mono text-[10px] transition-colors group",
                               pathname === `/notes/${note.id}` ? "text-teal-400" : "text-white/20 hover:text-teal-500/60"
                             )}
                           >
                              <span className={cn(
                                "transition-opacity",
                                pathname === `/notes/${note.id}` ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                              )}>»</span>
                              {note.id}
                           </Link>
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
    </>
  )
}
