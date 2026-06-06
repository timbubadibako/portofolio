"use client"

import React from "react"
import { NvimSidebar } from "@/components/inter/nvim-sidebar"
import { DataStreamTransition } from "@/components/inter/data-stream-transition"
import { AnimatedNoise } from "@/components/inter/animated-noise"
import { ChronologySection } from "@/components/inter/chronology-section"
import { ScrambleText } from "@/components/inter/scramble-text"
import { Clock } from "lucide-react"

export default function BackgroundPage() {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-teal-500/30 overflow-hidden flex flex-col font-mono">
      <div className="crt-overlay pointer-events-none z-[1000]" />
      <div className="scanlines pointer-events-none z-[1001]" />
      <AnimatedNoise opacity={0.03} />
      <DataStreamTransition />
      <NvimSidebar />

      <div className="flex-1 py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-8 md:px-24 mb-16 space-y-4">
           <div className="flex items-center gap-4">
              <div className="h-10 w-10 border border-teal-500 bg-teal-500/10 flex items-center justify-center text-teal-400">
                 <Clock className="h-5 w-5" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-teal-500 font-bold">
                 MODULE // SEQUENTIAL_LOG
              </span>
           </div>
           <h1 className="font-press-start text-3xl md:text-5xl tracking-tighter uppercase terminal-text-glow text-white leading-tight">
              <ScrambleText text="BACKGROUND" duration={1} />
           </h1>
        </div>
        
        <ChronologySection />
      </div>
    </div>
  )
}
