"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "hero", label: "01 // IDENTITY", desc: "System_Root" },
  { id: "projects", label: "02 // DEPLOYMENTS", desc: "Artifacts" },
  { id: "chronology", label: "03 // CHRONOLOGY", desc: "Logs" },
  { id: "signals", label: "04 // SIGNALS", desc: "Archive" },
  { id: "principles", label: "05 // PRINCIPLES", desc: "Core" },
  { id: "colophon", label: "06 // TRANSMISSION", desc: "Link" },
]

export function SideNav() {
  const [activeSection, setActiveSection] = useState("hero")

  const handleScroll = useCallback(() => {
    // Manual scroll tracking for high precision
    const scrollPosition = window.scrollY + window.innerHeight / 2
    
    for (const item of navItems) {
      const element = document.getElementById(item.id)
      if (element) {
        const { top, bottom } = element.getBoundingClientRect()
        const absoluteTop = top + window.scrollY
        const absoluteBottom = bottom + window.scrollY
        
        if (scrollPosition >= absoluteTop && scrollPosition <= absoluteBottom) {
          setActiveSection(item.id)
          break
        }
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="fixed left-0 top-0 z-[700] h-screen w-8 md:w-14 flex flex-col justify-center border-r border-white/5 bg-black/20 backdrop-blur-3xl pointer-events-none">
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
         <div className="w-0.5 h-12 bg-gradient-to-b from-teal-500/50 to-transparent" />
      </div>

      <div className="flex flex-col gap-10 px-2 pointer-events-auto">
        {navItems.map(({ id, label, desc }) => (
          <button 
            key={id} 
            onClick={() => scrollToSection(id)} 
            className="group relative flex flex-col items-center justify-center transition-all duration-300"
            aria-label={`Navigate to ${label}`}
          >
            {/* Nav Label (Vertical) */}
            <span
              className={cn(
                "absolute -right-6 font-mono text-[7px] font-bold uppercase tracking-[0.4em] rotate-90 origin-right transition-all duration-500 whitespace-nowrap",
                activeSection === id ? "text-teal-400 opacity-100" : "text-white/10 opacity-0 group-hover:opacity-40",
              )}
            >
              {desc}
            </span>

            {/* The Dot / Icon */}
            <div className="relative flex items-center justify-center">
               <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-all duration-500",
                  activeSection === id 
                    ? "bg-teal-400 scale-[1.5] shadow-[0_0_15px_rgba(20,184,166,0.8)]" 
                    : "bg-white/10 group-hover:bg-white/30",
                )}
              />
              {activeSection === id && (
                <div className="absolute inset-0 rounded-full border border-teal-500/50 animate-ping opacity-20 scale-[2.5]" />
              )}
            </div>
            
            {/* Tooltip on Right */}
            <div className="absolute left-10 bg-black/90 border border-white/10 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none translate-x-2 group-hover:translate-x-0 hidden lg:block">
               <span className="font-mono text-[8px] font-bold text-teal-400 whitespace-nowrap tracking-widest">{label}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[7px] text-white/5 vertical-rl uppercase tracking-widest">
         Neural_Link
      </div>
    </nav>
  )
}
