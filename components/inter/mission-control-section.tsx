"use client"

import React, { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrambleText } from "./scramble-text"
import { GlitchText } from "./glitch-text"
import { motion } from "framer-motion"
import { Send, Briefcase, Activity, Terminal as TerminalIcon, Cpu, Zap, Globe, Clock, Monitor } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function MissionControlSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [stats, setStats] = useState({
    repos: 0,
    followers: 0,
    activity: Array.from({ length: 50 }, () => Math.random())
  })

  useEffect(() => {
    async function fetchGitHubStats() {
      try {
        const res = await fetch('https://api.github.com/users/timbubadibako')
        const data = await res.json()
        
        const eventsRes = await fetch('https://api.github.com/users/timbubadibako/events/public')
        const events = await eventsRes.json()
        
        const activityMap = Array.from({ length: 50 }, (_, i) => {
           const base = Math.random() * 0.3
           const bonus = events.length > 0 ? (Math.random() * 0.7) : 0
           return i > 40 ? Math.min(1, base + bonus) : Math.min(1, base + (Math.random() * 0.2))
        })

        setStats({
          repos: data.public_repos || 24,
          followers: data.followers || 12,
          activity: activityMap
        })
      } catch (err) {
        console.error("Failed to sync telemetry:", err)
      }
    }

    fetchGitHubStats()
  }, [])

  return (
    <section id="mission_control" ref={sectionRef} className="relative min-h-screen bg-black overflow-hidden flex flex-col border-b border-white/5">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col border-x border-white/5 bg-zinc-900/5 relative z-10">
        <div className="flex-1 flex flex-col md:flex-row">
          
          {/* LEFT PANEL: CTA (65%) */}
          <div className="w-full md:w-[65%] p-8 md:p-12 lg:p-24 flex flex-col justify-center bg-zinc-900/10 border-r border-white/5 relative overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-press-start text-[15vw] text-white/[0.01] pointer-events-none whitespace-nowrap uppercase select-none z-0">
              MISSION
           </div>

           <div className="max-w-2xl space-y-12 relative z-10">
              <div className="space-y-4">
                 <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-teal-500 font-bold flex items-center gap-4">
                    <span className="h-px w-12 bg-teal-500/30" />
                    06 // CONTROL_ROOM
                 </span>
                 <h2 className="font-press-start text-4xl md:text-6xl text-white leading-[1.1] tracking-tighter uppercase">
                    "Small <span className="text-teal-500">problems</span> <br /> 
                    are still <br /> 
                    <GlitchText text="problems." intensity="high" />"
                 </h2>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 pt-10">
                 <a 
                   href="mailto:pjrlywm@gmail.com"
                   className="px-10 py-4 bg-teal-500 text-black font-mono text-[10px] font-black uppercase tracking-[0.3em] hover:bg-teal-400 transition-all flex items-center gap-4 shadow-[0_0_30px_rgba(20,184,166,0.4)]"
                 >
                    <Send className="h-4 w-4" /> [ {'>'} Send_Email ]
                 </a>
                 <a 
                   href="https://www.linkedin.com/in/syifa-pajril-yaum-730162264/"
                   target="_blank"
                   className="px-10 py-4 border border-white/10 bg-white/5 text-white/40 font-mono text-[10px] font-black uppercase tracking-[0.3em] hover:border-teal-500/50 hover:text-white transition-all flex items-center gap-4"
                 >
                    <Briefcase className="h-4 w-4" /> [ {'>'} Connect_LinkedIn ]
                 </a>
              </div>
           </div>

           <div className="absolute bottom-12 left-24 hidden lg:flex items-center gap-8">
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 bg-teal-500 animate-pulse" />
                 <span className="font-mono text-[8px] text-white/20 uppercase tracking-widest">Protocol: Secure</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 bg-white/10" />
                 <span className="font-mono text-[8px] text-white/20 uppercase tracking-widest">Auth_Level: 03</span>
              </div>
           </div>
        </div>

        {/* RIGHT PANEL: TELEMETRY (35%) */}
        <div className="w-full md:w-[35%] p-8 md:p-12 lg:p-16 lg:pr-24 flex flex-col justify-center space-y-12 bg-black/40">
           
           <div className="space-y-6">
              <div className="flex items-center justify-between">
                 <span className="font-mono text-[10px] text-teal-500/60 uppercase tracking-widest font-bold">GitHub_Commits</span>
                 <Globe className="h-4 w-4 text-white/20" />
              </div>
              <div className="grid grid-cols-10 gap-1.5">
                 {stats.activity.map((level, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "aspect-square border border-white/5 transition-colors duration-1000",
                        level > 0.7 ? "bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.3)]" : 
                        level > 0.4 ? "bg-teal-500/40" : 
                        level > 0.2 ? "bg-teal-500/10" : "bg-zinc-900/40"
                      )}
                    />
                 ))}
              </div>
              <div className="flex justify-between font-mono text-[7px] text-white/10 uppercase tracking-widest">
                 <span>T-50 DAYS</span>
                 <span>T-0 (TODAY)</span>
              </div>
           </div>

           <div className="space-y-8">
              <TelemetryReadout 
                label="Public_Repositories" 
                value={`${stats.repos} CORES`} 
                icon={BoxIcon} 
                progress={Math.min(100, (stats.repos / 50) * 100)}
              />
              <TelemetryReadout 
                label="System_Status" 
                value="OPTIMAL" 
                icon={Activity} 
                progress={100}
              />
              <TelemetryReadout 
                label="Active_Buffer" 
                value="STABLE" 
                icon={Cpu} 
                progress={15}
              />
           </div>

           <div className="pt-8 border-t border-white/5">
              <div className="flex items-center gap-3 text-[9px] font-mono text-teal-500/40 uppercase tracking-[0.2em]">
                 <span className="h-1 w-1 bg-teal-500 animate-ping rounded-full" />
                 &gt; Ready for new challenges and collaborations...
              </div>
           </div>
        </div>
      </div>
    </div>

      <div className="absolute right-6 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-teal-500/20 to-transparent" />
    </section>
  )
}

function TelemetryReadout({ label, value, icon: Icon, progress }: { label: string; value: string; icon: any; progress: number }) {
  return (
    <div className="space-y-3 group">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <Icon className="h-3 w-3 text-white/20 group-hover:text-teal-500 transition-colors" />
            <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">{label}</span>
         </div>
         <span className="font-mono text-[10px] text-white font-bold">{value}</span>
      </div>
      <div className="h-px w-full bg-white/5 relative">
         <motion.div 
           initial={{ width: 0 }}
           whileInView={{ width: `${progress}%` }}
           transition={{ duration: 1.5, ease: "circOut" }}
           className="h-full bg-teal-500/40" 
         />
      </div>
    </div>
  )
}

function BoxIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
  )
}
