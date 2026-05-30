"use client"

import { useRef, useEffect, useState } from "react"
import { HighlightText } from "@/components/inter/highlight-text"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"
import { ScrambleText } from "./scramble-text"
import { ChevronDown, ExternalLink, Cpu, Terminal, Shield, Workflow } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

gsap.registerPlugin(ScrollTrigger)

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
  icon: any
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    id: "ai",
    title: "AI_ENGINEERING",
    icon: Cpu,
    skills: [
      { 
        name: "NEURAL_PROMPTING", 
        level: 95, 
        description: "Advanced prompt architecture for LLMs and automated context propagation.", 
        projectLink: "#projects",
        asciiIcon: "[::]" 
      },
      { 
        name: "RAG_ARCHITECTURES", 
        level: 88, 
        description: "Vector DB integration, semantic search, and retrieval-augmented generation.", 
        projectLink: "#projects",
        asciiIcon: "/>RAG" 
      },
      { 
        name: "MODEL_FINE_TUNING", 
        level: 75, 
        description: "Dataset preparation, PEFT, and weight adjustment for domain-specific tasks.",
        asciiIcon: "{FT}"
      },
    ]
  },
  {
    id: "web",
    title: "WEB_ARCHITECTURE",
    icon: Workflow,
    skills: [
      { 
        name: "NEXT.JS_16", 
        level: 98, 
        description: "App Router, Server Actions, Turbopack, and high-performance rendering.", 
        projectLink: "#projects",
        asciiIcon: "<N/>"
      },
      { 
        name: "TAILWIND_V4", 
        level: 95, 
        description: "Modern styling, complex theme engines, and performant CSS-in-JS alternatives.", 
        projectLink: "#projects",
        asciiIcon: "(*)#" 
      },
      { 
        name: "BACKEND_SYSTEMS", 
        level: 90, 
        description: "Prisma, Supabase, PostgreSQL, and distributed database architectures.", 
        projectLink: "#projects",
        asciiIcon: "[DB]" 
      },
    ]
  },
  {
    id: "security",
    title: "CYBER_DEFENSE",
    icon: Shield,
    skills: [
      { 
        name: "PENETRATION_TESTING", 
        level: 85, 
        description: "Vulnerability assessment, network scanning, and infrastructure auditing.", 
        projectLink: "#projects",
        asciiIcon: "[#X]"
      },
      { 
        name: "THREAT_HUNTING", 
        level: 92, 
        description: "EDR monitoring, incident triaging, and IOC documentation.", 
        asciiIcon: "?!TH" 
      },
      { 
        name: "INFRA_SECURITY", 
        level: 80, 
        description: "Cloud-native security, Docker hardening, and AWS IAM policies.",
        asciiIcon: "|SEC|"
      },
    ]
  }
]

export function PrinciplesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [expandedCategory, setExpandedCategory] = useState<string | null>("ai")

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="principles" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 bg-black/10">
      <div ref={headerRef} className="mb-24 px-6 md:px-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-teal-400 font-bold">05 // PRINCIPLES</span>
        <h2 className="mt-4 font-press-start text-3xl md:text-5xl tracking-tighter uppercase terminal-text-glow">
          <ScrambleText text="CORE_COMPETENCIES" duration={1.2} />
        </h2>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-6">
        {skillCategories.map((cat) => (
          <div 
            key={cat.id} 
            className={cn(
              "group rounded-[2.5rem] border transition-all duration-700 overflow-hidden",
              expandedCategory === cat.id ? "bg-white/[0.03] border-teal-500/40 shadow-[0_20px_80px_-20px_rgba(20,184,166,0.1)]" : "bg-black/40 border-white/5 hover:border-white/10"
            )}
          >
            {/* Category Header */}
            <button 
              onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
              className="w-full flex items-center justify-between p-10 text-left"
            >
              <div className="flex items-center gap-8">
                 <div className={cn(
                   "h-16 w-16 rounded-2xl flex items-center justify-center transition-all duration-500",
                   expandedCategory === cat.id ? "bg-teal-500 text-black shadow-[0_0_30px_rgba(20,184,166,0.4)] rotate-6" : "bg-white/5 text-white/20"
                 )}>
                    <cat.icon className="h-8 w-8" />
                 </div>
                 <div>
                    <h3 className={cn(
                      "font-mono text-2xl font-black tracking-tighter transition-colors uppercase",
                      expandedCategory === cat.id ? "text-white" : "text-white/30 group-hover:text-white/50"
                    )}>
                      {cat.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                       <span className={cn(
                         "text-[9px] font-mono uppercase tracking-[0.3em]",
                         expandedCategory === cat.id ? "text-teal-400" : "text-white/10"
                       )}>
                          Interface_Link: {expandedCategory === cat.id ? "CONNECTED" : "STANDBY"}
                       </span>
                    </div>
                 </div>
              </div>
              <div className={cn(
                "h-10 w-10 rounded-full border border-white/5 flex items-center justify-center transition-all duration-500",
                expandedCategory === cat.id ? "bg-teal-500/10 border-teal-500/40 rotate-180" : "bg-white/5"
              )}>
                 <ChevronDown className={cn(
                   "h-5 w-5 transition-colors",
                   expandedCategory === cat.id ? "text-teal-400" : "text-white/20"
                 )} />
              </div>
            </button>

            {/* Expanded Content */}
            <AnimatePresence>
              {expandedCategory === cat.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                   <div className="px-10 pb-16 pt-4 space-y-16 border-t border-white/5">
                      {cat.skills.map((skill, idx) => (
                        <div key={idx} className="group/skill space-y-6">
                           <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                              <div className="flex gap-6 flex-1">
                                 <div className="font-mono text-lg text-teal-500 font-bold opacity-40 group-hover/skill:opacity-100 transition-opacity pt-1">
                                    {skill.asciiIcon}
                                 </div>
                                 <div className="space-y-2">
                                    <h4 className="font-mono text-lg font-bold text-white uppercase tracking-tight group-hover/skill:text-teal-400 transition-colors">
                                       {skill.name}
                                    </h4>
                                    <p className="font-mono text-xs text-white/30 leading-relaxed max-w-xl group-hover/skill:text-white/50 transition-colors">
                                       {skill.description}
                                    </p>
                                 </div>
                              </div>
                              <div className="flex flex-col items-end gap-2 shrink-0">
                                 <div className="flex items-baseline gap-3">
                                    <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">Efficiency</span>
                                    <span className="font-press-start text-[10px] text-teal-400">{skill.level}%</span>
                                 </div>
                                 {skill.projectLink && (
                                   <a 
                                     href={skill.projectLink} 
                                     className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/5 bg-white/5 font-mono text-[9px] uppercase tracking-widest text-white/40 hover:bg-teal-500 hover:text-black hover:border-teal-500 transition-all duration-300"
                                   >
                                      Hands_On_Artifact <ExternalLink className="h-2.5 w-2.5" />
                                   </a>
                                 )}
                              </div>
                           </div>
                           
                           {/* Stylized Progress Bar */}
                           <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden relative">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 2, ease: "circOut", delay: 0.2 }}
                                className="h-full bg-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.4)] relative"
                              >
                                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                              </motion.div>
                           </div>
                        </div>
                      ))}
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[40vw] h-[40vw] bg-teal-500/5 blur-[150px] rounded-full pointer-events-none -translate-x-1/2" />
    </section>
  )
}
