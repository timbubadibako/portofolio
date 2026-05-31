"use client"

import React from "react"
import { NvimSidebar } from "@/components/inter/nvim-sidebar"
import { DataStreamTransition } from "@/components/inter/data-stream-transition"
import { AnimatedNoise } from "@/components/inter/animated-noise"
import { ScrambleText } from "@/components/inter/scramble-text"
import { User, ShieldCheck } from "lucide-react"
import { HolographicPortrait } from "@/components/inter/holographic-portrait"

export default function ProfilePage() {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-teal-500/30 overflow-hidden flex flex-col font-mono">
      <div className="crt-overlay pointer-events-none z-[1000]" />
      <div className="scanlines pointer-events-none z-[1001]" />
      <AnimatedNoise opacity={0.03} />
      <DataStreamTransition />
      <NvimSidebar />

      <div className="flex-1 container mx-auto px-6 py-20 flex flex-col max-w-7xl relative z-10">
        <div className="max-w-6xl mx-auto w-full border-x border-white/5 bg-zinc-900/5 min-h-[80vh] flex flex-col md:flex-row">
           {/* Left: Bio Data */}
           <div className="flex-1 p-8 md:p-16 border-r border-white/5 space-y-12">
              <div className="space-y-6">
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

              <div className="space-y-8 max-w-xl">
                 <p className="text-sm md:text-base text-white/60 leading-relaxed uppercase tracking-widest">
                    AI & Fullstack Developer based in West Java. Specializing in high-integrity digital ecosystems and neural automation.
                 </p>
                 <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                    <div className="space-y-2">
                       <span className="text-[8px] text-white/20 uppercase tracking-[0.5em]">Current_Role</span>
                       <p className="text-xs text-teal-400 font-bold uppercase">System Architect</p>
                    </div>
                    <div className="space-y-2">
                       <span className="text-[8px] text-white/20 uppercase tracking-[0.5em]">Clearance</span>
                       <p className="text-xs text-teal-400 font-bold uppercase">Level_03_Admin</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Right: Visual */}
           <div className="w-full md:w-1/3 p-8 md:p-16 flex items-center justify-center bg-black/20">
              <HolographicPortrait src="/assets/profile/profile.png" className="w-full max-w-sm" />
           </div>
        </div>
      </div>
    </div>
  )
}
