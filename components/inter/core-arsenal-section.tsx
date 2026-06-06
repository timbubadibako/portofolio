"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"
import { ScrambleText } from "./scramble-text"
import { GlitchText } from "./glitch-text"
import { Cpu, Shield, Workflow, ExternalLink, ChevronRight, Folder, FileJson } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

gsap.registerPlugin(ScrollTrigger)

const iconMap: Record<string, any> = {
  workflow: Workflow,
  cpu: Cpu,
  shield: Shield
}

interface Skill {
  name: string
  level: number
  description: string
  projectLink?: string
  asciiIcon: string
}

interface SkillCategory {
  id: string
  title: string
  icon: string
  path: string
  skills: Skill[]
}

export function CoreArsenalSection() {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([])
  const [selectedId, setSelectedId] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const data = require('@/lib/data/skills.json')
    setSkillCategories(data)
    setSelectedId(data[0].id)
    setIsLoading(false)
  }, [])

  if (isLoading) return null

  const selectedCategory = skillCategories.find(c => c.id === selectedId)!

  return (
    <section 
      ref={sectionRef} 
      id="principles" 
      className="relative min-h-screen bg-black overflow-hidden flex flex-col border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col border-x border-white/5 bg-zinc-900/5 relative z-10">
        {/* SECTION HEADER */}
        <div className="py-12 px-8 md:px-12 border-b border-white/5 bg-zinc-900/20">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-teal-500 font-bold flex items-center gap-4">
            <span className="h-px w-12 bg-teal-500/30" />
            02 // CORE_ARSENAL
          </span>
          <h2 className="mt-4 font-press-start text-2xl md:text-4xl tracking-tighter uppercase terminal-text-glow text-white">
            <ScrambleText text="TECH_STACK_OVERVIEW" duration={1.2} />
          </h2>
        </div>

        {/* NEOVIM SPLIT-SCREEN LAYOUT */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* LEFT PANEL: FILE TREE */}
        <div className="w-full md:w-80 lg:w-96 border-r border-white/5 flex flex-col bg-black/40 h-[30vh] md:h-auto">
           <div className="p-4 border-b border-white/5 bg-zinc-900/20 flex items-center justify-between shrink-0">
              <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest flex items-center gap-2">
                 <Folder className="h-3 w-3" /> EXPLORER: CORE
              </span>
           </div>
           <div className="flex-1 p-2 space-y-1">
              {skillCategories.map((cat) => {
                const Icon = iconMap[cat.icon] || Workflow
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedId(cat.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 font-mono text-xs transition-all duration-300 relative group",
                      selectedId === cat.id 
                        ? "bg-teal-500/10 text-teal-400 border-l-2 border-teal-500" 
                        : "text-white/30 hover:bg-white/5 hover:text-white/60 border-l-2 border-transparent"
                    )}
                  >
                     <span className={cn(
                       "transition-transform duration-300",
                       selectedId === cat.id ? "rotate-90 text-teal-500" : "opacity-0 group-hover:opacity-100"
                     )}>
                        <ChevronRight className="h-3 w-3" />
                     </span>
                     <Icon className={cn("h-4 w-4 shrink-0", selectedId === cat.id ? "text-teal-500" : "opacity-20")} />
                     <span className="truncate tracking-tight uppercase font-bold">{cat.path}</span>
                     
                     {selectedId === cat.id && (
                       <div className="absolute right-4">
                          <div className="h-1.5 w-1.5 bg-teal-500 animate-pulse" />
                       </div>
                     )}
                  </button>
                )
              })}
           </div>
           
           <div className="p-4 border-t border-white/5 text-[8px] font-mono text-white/10 uppercase tracking-widest">
              [SYSTEM_STATUS: STABLE]
           </div>
        </div>

        {/* RIGHT PANEL: BUFFER / EDITOR */}
        <div className="flex-1 flex flex-col relative bg-black/60">
           {/* Tab Bar */}
           <div className="flex bg-zinc-900/30 border-b border-white/5 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-2 px-6 py-3 border-r border-white/5 bg-black/40 border-t-2 border-t-teal-500">
                 <FileJson className="h-3 w-3 text-teal-500" />
                 <span className="font-mono text-[10px] text-teal-400 font-bold uppercase tracking-widest">
                    {selectedCategory.id}.json
                 </span>
              </div>
              <div className="flex-1" />
              <div className="px-6 py-3 font-mono text-[9px] text-white/10 hidden lg:block">
                 LN: {selectedCategory.skills.length} // COL: 100
              </div>
           </div>

           {/* Content Buffer */}
           <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedId}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                  className="space-y-12 max-w-4xl mx-auto lg:mx-0"
                >
                   <div className="space-y-2">
                      <span className="font-mono text-[10px] text-teal-500/40 uppercase tracking-[0.4em]">Initialize_Artifact_Manifest</span>
                      <h3 className="text-3xl font-mono font-black text-white uppercase tracking-tight">
                         <GlitchText text={selectedCategory.title} intensity="low" />
                      </h3>
                   </div>

                   <div className="grid grid-cols-1 gap-10">
                      {selectedCategory.skills.map((skill, idx) => (
                        <div key={idx} className="group/skill space-y-4">
                           <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                              <div className="flex gap-6 flex-1">
                                 <div className="font-mono text-lg text-teal-500 font-bold opacity-30 group-hover/skill:opacity-100 transition-opacity shrink-0">
                                    {skill.asciiIcon}
                                 </div>
                                 <div className="space-y-2">
                                    <h4 className="font-mono text-xl font-bold text-white uppercase tracking-tight group-hover/skill:text-teal-400 transition-colors">
                                       {skill.name}
                                    </h4>
                                    <p className="font-mono text-xs text-white/30 leading-relaxed max-w-2xl group-hover/skill:text-white/50 transition-colors">
                                       {skill.description}
                                    </p>
                                 </div>
                              </div>
                              <div className="flex flex-col items-end gap-3 shrink-0">
                                 <div className="flex items-baseline gap-3">
                                    <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">Mastery</span>
                                    <span className="font-press-start text-[10px] text-teal-500">{skill.level}%</span>
                                 </div>
                                 {skill.projectLink && (
                                   <a 
                                     href={skill.projectLink} 
                                     className="flex items-center gap-2 px-4 py-1.5 border border-white/10 bg-white/5 font-mono text-[9px] uppercase tracking-widest text-white/40 hover:bg-teal-500 hover:text-black hover:border-teal-500 transition-all duration-300"
                                   >
                                      ACCESS_CASE_STUDY <ExternalLink className="h-3 w-3" />
                                   </a>
                                 )}
                              </div>
                           </div>
                           
                           {/* Industrial Progress Bar */}
                           <div className="h-[3px] w-full bg-white/5 relative overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 1.5, ease: "circOut", delay: 0.1 }}
                                className="h-full bg-teal-500 relative"
                              >
                                 <div className="absolute inset-0 bg-white/30 animate-pulse" />
                              </motion.div>
                              {/* Background scale markers */}
                              <div className="absolute inset-0 flex justify-between pointer-events-none opacity-20">
                                 {[...Array(20)].map((_, i) => (
                                   <div key={i} className="w-px h-full bg-white/20" />
                                 ))}
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </motion.div>
              </AnimatePresence>
           </div>
        </div>
        </div>
        </div>

        {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-[-1]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </section>
  )
}
