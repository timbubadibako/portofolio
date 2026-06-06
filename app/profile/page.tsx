"use client"

import React, { useState, useEffect } from "react"
import { NvimSidebar } from "@/components/inter/nvim-sidebar"
import { DataStreamTransition } from "@/components/inter/data-stream-transition"
import { AnimatedNoise } from "@/components/inter/animated-noise"
import { ScrambleText } from "@/components/inter/scramble-text"
import { User, ShieldCheck, Cpu, Database, Globe, Brain, Terminal as TerminalIcon, Activity, Zap } from "lucide-react"
import { HolographicPortrait } from "@/components/inter/holographic-portrait"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { motion } from "framer-motion"

const skillData = [
  { subject: 'Frontend', A: 98, fullMark: 100 },
  { subject: 'Backend', A: 90, fullMark: 100 },
  { subject: 'AI/LLM', A: 95, fullMark: 100 },
  { subject: 'Infra', A: 85, fullMark: 100 },
  { subject: 'Mobile', A: 92, fullMark: 100 },
  { subject: 'Security', A: 88, fullMark: 100 },
]

export default function ProfilePage() {
  const [isScanning, setIsScanning] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsScanning(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-teal-500/30 overflow-y-auto flex flex-col font-mono custom-scrollbar">
      <div className="crt-overlay pointer-events-none z-[1000]" />
      <div className="scanlines pointer-events-none z-[1001]" />
      <AnimatedNoise opacity={0.03} />
      <DataStreamTransition />
      <NvimSidebar />

      <div className="flex-1 container mx-auto px-6 py-12 md:py-24 flex flex-col max-w-7xl relative z-10">
        
        {/* TOP PANEL: BIOMETRIC HEADER */}
        <div className="max-w-7xl mx-auto w-full border-x border-white/5 bg-zinc-900/5 min-h-[85vh] flex flex-col">
           
           <div className="p-8 md:p-12 border-b border-white/5 bg-zinc-900/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="space-y-4">
                 <div className="flex items-center gap-4">
                    <ShieldCheck className="h-5 w-5 text-teal-500" />
                    <span className="text-[10px] uppercase tracking-[0.4em] text-teal-500 font-bold">
                       IDENTITY // BIOMETRIC_VERIFIED
                    </span>
                 </div>
                 <h1 className="font-press-start text-3xl md:text-5xl tracking-tighter uppercase terminal-text-glow text-white leading-tight">
                    <ScrambleText text="SYIFA" duration={0.8} /> <br />
                    <span className="text-teal-500/40">PAJRIL YAUM</span>
                 </h1>
              </div>

              <div className="flex items-center gap-8 font-mono text-[9px] text-white/20 uppercase tracking-[0.3em]">
                 <div className="text-right">
                    <p>Auth_Status: Admin</p>
                    <p>Clearance: Level_03</p>
                 </div>
                 <div className="h-12 w-px bg-white/5" />
                 <div className="text-right">
                    <p>Node: West_Java_022</p>
                    <p>Uptime: 2,842h</p>
                 </div>
              </div>
           </div>

           <div className="flex-1 flex flex-col lg:flex-row">
              {/* LEFT: VISUAL & RADAR */}
              <div className="w-full lg:w-1/3 border-r border-white/5 p-8 md:p-12 space-y-12 bg-black/40">
                 <div className="relative">
                    <HolographicPortrait src="/assets/profile/profile.png" className="w-full" />
                    {isScanning && (
                      <motion.div 
                        initial={{ top: 0 }}
                        animate={{ top: "100%" }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-0.5 bg-teal-500 shadow-[0_0_15px_rgba(20,184,166,1)] z-50 pointer-events-none"
                      />
                    )}
                 </div>

                 <div className="space-y-6">
                    <span className="font-mono text-[10px] text-teal-500/60 uppercase tracking-[0.4em] block text-center">Neural_Competency_Mapping</span>
                    <div className="h-64 w-full">
                       <ResponsiveContainer width="100%" height="100%">
                          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                             <PolarGrid stroke="rgba(255,255,255,0.05)" />
                             <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 8, fontWeight: 'bold' }} />
                             <Radar
                                name="Pajril"
                                dataKey="A"
                                stroke="#14b8a6"
                                fill="#14b8a6"
                                fillOpacity={0.2}
                             />
                          </RadarChart>
                       </ResponsiveContainer>
                    </div>
                 </div>
              </div>

              {/* RIGHT: DEEP STATS */}
              <div className="flex-1 p-8 md:p-16 space-y-16 overflow-y-auto">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <StatBlock 
                      icon={Brain} 
                      label="AI_INTERFACING" 
                      value="ADVANCED" 
                      desc="Architecting RAG systems and neural prompt chains for automated context synchronization."
                    />
                    <StatBlock 
                      icon={Cpu} 
                      label="SYSTEM_HARDENING" 
                      value="HIGH_INTEGRITY" 
                      desc="Arch Linux (btw) user since 2021. Specialized in custom kernels and infrastructure security."
                    />
                    <StatBlock 
                      icon={Database} 
                      label="DATA_ORCHESTRATION" 
                      value="DISTRIBUTED" 
                      desc="Scalable PostgreSQL architectures with Prisma/Supabase and real-time synchronization."
                    />
                    <StatBlock 
                      icon={Globe} 
                      label="NETWORK_TOPOLOGY" 
                      value="SECURE_NODES" 
                      desc="Building modern web infrastructures with Next.js 16 and high-fidelity edge performance."
                    />
                 </div>

                 <div className="space-y-8 pt-16 border-t border-white/5">
                    <div className="flex items-center justify-between">
                       <h3 className="font-press-start text-xs text-white uppercase tracking-widest">Active_Buffer_Readout</h3>
                       <span className="font-mono text-[9px] text-teal-500 animate-pulse uppercase tracking-[0.3em]">LIVE_FEED</span>
                    </div>
                    <div className="bg-black/60 border border-white/5 p-8 space-y-6 font-mono text-xs leading-relaxed text-white/40 italic">
                       <p>"I believe that software engineering is not about writing code, but about maintaining the absolute integrity of digital ecosystems."</p>
                       <div className="flex items-center gap-6 not-italic font-normal">
                          <div className="flex items-center gap-3">
                             <TerminalIcon className="h-3 w-3 text-teal-500" />
                             <span className="text-[10px] text-white/60">ID: 0xPAJRIL_ARCH</span>
                          </div>
                          <div className="flex items-center gap-3">
                             <Zap className="h-3 w-3 text-teal-500" />
                             <span className="text-[10px] text-white/60">KERNEL: v1.1.0-STABLE</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="p-6 border-t border-white/5 bg-zinc-900/10 flex justify-between items-center text-[8px] uppercase tracking-[0.4em] text-white/10">
              <span>Biometric_Archive: UNLOCKED</span>
              <span>Ref: system_profile_v1.1.0.yaml</span>
           </div>
        </div>
      </div>
    </div>
  )
}

function StatBlock({ icon: Icon, label, value, desc }: { icon: any, label: string, value: string, desc: string }) {
  return (
    <div className="space-y-4 group">
       <div className="flex items-center gap-4">
          <div className="p-3 border border-white/5 bg-zinc-900/40 group-hover:border-teal-500/40 group-hover:bg-teal-500/5 transition-all duration-500">
             <Icon className="h-5 w-5 text-white/20 group-hover:text-teal-500 transition-colors" />
          </div>
          <div className="space-y-1">
             <span className="text-[9px] font-mono text-teal-500/60 uppercase tracking-[0.3em] font-black">{label}</span>
             <p className="text-sm font-bold text-white uppercase tracking-tight">{value}</p>
          </div>
       </div>
       <p className="text-[11px] font-mono leading-relaxed text-white/30 uppercase tracking-wider group-hover:text-white/50 transition-colors">
          {desc}
       </p>
    </div>
  )
}
