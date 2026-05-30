"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ExternalLink, Terminal, Cpu, LayoutDashboard, Globe, Zap, Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { ThemeChanger } from "./theme-changer"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { id: "top", label: "System_Root", icon: Globe },
  { id: "projects", label: "Deployments", icon: Cpu },
  { id: "notes", label: "Signals", icon: Terminal },
  { id: "workbench", label: "Lab_Workbench", icon: LayoutDashboard },
]

export function Header() {
  const [activeSection, setActiveSection] = useState("top")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[200] transition-all duration-700",
        isScrolled ? "py-3 bg-gui-bg/60 backdrop-blur-2xl border-b border-white/5 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)]" : "py-6 bg-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-8 lg:px-12 flex items-center justify-between">
        <div 
          onClick={() => scrollToSection('top')} 
          className="group flex items-center gap-4 cursor-pointer"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-gui-accent/30 bg-gui-accent/5 font-mono text-gui-accent transition-all duration-500 group-hover:rotate-[360deg] group-hover:bg-gui-accent group-hover:text-gui-bg group-hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]">
            <Zap className="h-5 w-5" />
            <div className="absolute inset-0 rounded-2xl border border-gui-accent/20 animate-ping opacity-20" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-mono-tech text-base font-black tracking-[0.2em] text-gui-text uppercase">
              DevPortal<span className="text-gui-accent">.GUI</span>
            </span>
            <span className="text-[8px] font-mono text-gui-accent/40 uppercase tracking-[0.3em] mt-1">
              Neural_Link_Stable
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-[9px] uppercase tracking-[0.2em] font-bold transition-all duration-500 overflow-hidden group",
                activeSection === item.id ? "text-gui-bg" : "text-gui-text/40 hover:text-gui-text",
              )}
            >
              {activeSection === item.id && (
                <motion.div 
                  layoutId="active-nav-bg"
                  className="absolute inset-0 bg-gui-accent shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <item.icon className="h-3 w-3" />
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-6">
           <div className="hidden md:flex items-center gap-2">
              <ThemeChanger />
              <ThemeToggle />
           </div>

           <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gui-accent hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
           </button>
           
           <div className="hidden lg:block h-6 w-px bg-white/10" />
           
           <a 
             href="https://github.com" 
             target="_blank" 
             className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 font-mono text-[9px] uppercase tracking-widest text-gui-text/60 hover:text-gui-accent hover:border-gui-accent/30 transition-all duration-500 group"
           >
             <ExternalLink className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
             Source
           </a>
        </div>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mt-2 mx-6 p-6 rounded-[2.5rem] bg-gui-bg/95 backdrop-blur-3xl border border-white/10 shadow-2xl lg:hidden flex flex-col gap-3"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "flex items-center justify-between px-8 py-5 rounded-3xl font-mono text-xs uppercase tracking-[0.2em] font-bold transition-all",
                  activeSection === item.id ? "bg-gui-accent text-gui-bg" : "bg-white/5 text-gui-text/60 hover:bg-white/10"
                )}
              >
                <span className="flex items-center gap-4">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </span>
                <span className="opacity-20">❯</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
