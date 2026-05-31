"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Plus, ChevronRight, Zap, Box, Lock, Terminal as TerminalIcon, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScrambleText } from './scramble-text'
import { motion } from 'framer-motion'

export function ScaffoldingHubSection() {
  return (
    <section id="scaffold" className="relative min-h-screen bg-black overflow-hidden flex flex-col border-b border-white/5">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col border-x border-white/5 bg-zinc-900/5 relative z-10">
        <div className="flex-1 flex flex-col md:flex-row">
          
          {/* LEFT PANEL: COPYWRITING */}
          <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-24 flex flex-col justify-center border-r border-white/5 bg-zinc-900/10">
           <div className="max-w-md space-y-8">
              <div className="space-y-4">
                 <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-teal-500 font-bold flex items-center gap-4">
                    <span className="h-px w-12 bg-teal-500/30" />
                    04 // PROJECT_GENERATOR
                 </span>
                 <h2 className="font-press-start text-3xl md:text-5xl tracking-tighter uppercase terminal-text-glow text-white leading-tight">
                    <ScrambleText text="PROJECT" duration={1} /> <br />
                    <span className="text-teal-500/40">GENERATOR_v1</span>
                 </h2>
              </div>
              
              <p className="font-mono text-sm md:text-base text-white/40 leading-relaxed uppercase tracking-wider">
                 "Automate the setup, <br /> 
                 <span className="text-white/80">focus on the core logic.</span>"
              </p>

              <div className="space-y-6 pt-8">
                 <div className="flex gap-4 items-start">
                    <div className="p-2 border border-teal-500/20 bg-teal-500/5 text-teal-500">
                       <Zap className="h-4 w-4" />
                    </div>
                    <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest leading-relaxed">
                       Generate AI-ready project context schemas in JSON or Markdown.
                    </p>
                 </div>
                 <div className="flex gap-4 items-start">
                    <div className="p-2 border border-teal-500/20 bg-teal-500/5 text-teal-500">
                       <Box className="h-4 w-4" />
                    </div>
                    <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest leading-relaxed">
                       Standardize database blueprints and coding rules for neural orchestration.
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* RIGHT PANEL: PREVIEW / LOCK STATE */}
        <div className="flex-1 p-6 md:p-12 lg:p-20 bg-black/40 relative flex items-center justify-center overflow-hidden">
           {/* Decorative Grid for Preview */}
           <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #14b8a6 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
           
           <div className="relative max-w-lg w-full">
              {/* Corner Accents */}
              <div className="absolute -top-12 -left-12 w-24 h-24 border-t border-l border-teal-500/20" />
              <div className="absolute -bottom-12 -right-12 w-24 h-24 border-b border-r border-teal-500/20" />

              <div className="space-y-12 relative z-10">
                 <div className="space-y-2 text-center md:text-left">
                    <span className="font-mono text-[10px] text-teal-500/60 uppercase tracking-[0.4em] font-black flex items-center justify-center md:justify-start gap-4">
                       <Lock className="h-3 w-3" /> [ RESTRICTED_MODULE ]
                    </span>
                    <h3 className="font-mono text-2xl font-bold text-white uppercase tracking-tight leading-tight">
                       Initialize Root Access to <br /> 
                       Standardize Blueprints
                    </h3>
                 </div>

                 <div className="p-8 border border-white/10 bg-zinc-950/60 backdrop-blur-xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-teal-500/20" />
                    <div className="space-y-6">
                       <div className="space-y-4">
                          <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest leading-loose">
                             Authentication required. Please unlock via system terminal.
                          </p>
                          <div className="bg-black p-4 border-l-2 border-teal-500 font-mono text-[11px] space-y-2">
                             <div className="flex items-center gap-3 text-teal-400">
                                <TerminalIcon className="h-3 w-3" />
                                <span>&gt; sudo generate</span>
                             </div>
                             <div className="flex items-center gap-3 text-white/20 italic">
                                <ShieldCheck className="h-3 w-3" />
                                <span>Password: smallproblems</span>
                             </div>
                          </div>
                       </div>
                       
                       <Button 
                         onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                         }}
                         className="w-full bg-teal-500 hover:bg-teal-400 text-black font-black rounded-none h-12 uppercase tracking-widest text-[10px] shadow-[0_0_20px_rgba(20,184,166,0.2)]"
                       >
                          Return to System_Root
                       </Button>
                    </div>
                 </div>

                 <div className="flex items-center gap-6 opacity-20 justify-center md:justify-start">
                    <div className="flex gap-1.5">
                       {[...Array(3)].map((_, i) => (
                         <div key={i} className="w-1 h-1 bg-teal-500 rounded-full" />
                       ))}
                    </div>
                    <span className="font-mono text-[8px] uppercase tracking-[0.6em] text-white">Wait_For_Handshake</span>
                 </div>
              </div>
           </div>
        </div>
        </div>
        </div>

        <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-[-1]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </section>
  )
}
