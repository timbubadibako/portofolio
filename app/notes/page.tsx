"use client"

import React from "react"
import { NvimSidebar } from "@/components/inter/nvim-sidebar"
import { DataStreamTransition } from "@/components/inter/data-stream-transition"
import { AnimatedNoise } from "@/components/inter/animated-noise"
import { ScrambleText } from "@/components/inter/scramble-text"
import { FileText, ChevronRight, BookOpen } from "lucide-react"

export default function NotesPage() {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-teal-500/30 overflow-hidden flex flex-col font-mono">
      <div className="crt-overlay pointer-events-none z-[1000]" />
      <div className="scanlines pointer-events-none z-[1001]" />
      <AnimatedNoise opacity={0.03} />
      <DataStreamTransition />
      <NvimSidebar />

      <div className="flex-1 container mx-auto px-6 py-20 flex flex-col max-w-7xl relative z-10">
        <div className="max-w-4xl mx-auto w-full border-x border-white/5 bg-zinc-900/5 min-h-[80vh] flex flex-col">
           {/* Header */}
           <div className="p-8 md:p-12 border-b border-white/5 bg-zinc-900/20">
              <div className="flex items-center gap-4 mb-6">
                 <div className="h-10 w-10 border border-teal-500 bg-teal-500/10 flex items-center justify-center text-teal-400">
                    <BookOpen className="h-5 w-5" />
                 </div>
                 <span className="text-[10px] uppercase tracking-[0.4em] text-teal-500 font-bold">
                    MODULE // FIELD_NOTES
                 </span>
              </div>
              <h1 className="font-press-start text-3xl md:text-5xl tracking-tighter uppercase terminal-text-glow text-white leading-tight">
                 <ScrambleText text="KNOWLEDGE" duration={1} /> <br />
                 <span className="text-teal-500/40">ARCHIVE_v1</span>
              </h1>
           </div>

           {/* Placeholder Content */}
           <div className="flex-1 p-8 md:p-12 flex flex-col items-center justify-center space-y-8 opacity-40">
              <div className="h-24 w-24 border border-white/10 flex items-center justify-center animate-pulse">
                 <FileText className="h-10 w-10 text-white/20" />
              </div>
              <div className="text-center space-y-4">
                 <p className="font-mono text-xs uppercase tracking-[0.3em]">[ INITIALIZING_BUFFER_EXPLORER ]</p>
                 <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest max-w-sm">
                    Select a log from the NvimTree sidebar to begin reading technical documentation.
                 </p>
              </div>
              
              <div className="flex gap-4">
                 {[...Array(3)].map((_, i) => (
                   <div key={i} className="h-1 w-8 bg-white/5" />
                 ))}
              </div>
           </div>

           {/* Footer status */}
           <div className="p-6 border-t border-white/5 bg-zinc-900/10 flex justify-between items-center text-[8px] uppercase tracking-[0.4em] text-white/20">
              <span>Status: Awaiting_Selection</span>
              <span className="text-teal-500/40 animate-pulse">Neural_Link: Stable</span>
           </div>
        </div>
      </div>
    </div>
  )
}
