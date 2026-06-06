"use client"

import React, { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { 
  Globe, ExternalLink, Monitor, Signal, 
  ChevronRight, FileCode
} from "lucide-react"
import { GlitchText } from "./glitch-text"
import { motion, AnimatePresence } from "framer-motion"

interface Artifact {
  id: string
  title: string
  subtitle: string
  description: string
  problem: string
  tech: string
  status: string
  github: string
  caseStudy: string
  mockupLabel: string
}

export function ProjectsSection() {
  const [artifacts, setArtifacts] = useState<Artifact[]>([])
  const [selectedId, setSelectedId] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const data = require('@/lib/data/projects.json')
    setArtifacts(data)
    setSelectedId(data[0].id)
    setIsLoading(false)
  }, [])

  if (isLoading) return null
  
  const activeArtifact = artifacts.find(a => a.id === selectedId)!

  return (
    <section id="projects" className="relative min-h-screen bg-black overflow-hidden flex flex-col border-b border-white/5">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col border-x border-white/5 bg-zinc-900/5 relative z-10">
        {/* HEADER BAR (VIM STYLE) */}
        <div className="flex border-b border-white/5 bg-zinc-900/20 font-mono text-[10px] uppercase tracking-widest">
           <div className="w-full md:w-[30%] p-4 border-r border-white/5 flex items-center gap-3">
              <span className="text-teal-500">//</span> [ LATEST_PROJECTS ]
           </div>
           <div className="flex-1 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <span className="text-teal-500">//</span> Project Details : <span className="text-white font-bold">[{activeArtifact.title}]</span>
              </div>
              <div className="hidden lg:flex items-center gap-6 text-white/20">
                 <span>MODE: READ-ONLY</span>
                 <span>ENCODING: UTF-8</span>
              </div>
           </div>
        </div>

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* LEFT PANEL: MANIFEST (30%) */}
          <div className="w-full md:w-[30%] border-r border-white/5 flex flex-col bg-black/40">
             <div className="flex-1 py-8">
                <div className="space-y-1">
                   {artifacts.map((artifact) => (
                     <button
                       key={artifact.id}
                       onClick={() => setSelectedId(artifact.id)}
                       className={cn(
                         "w-full flex items-center justify-between px-8 py-4 font-mono text-sm transition-all duration-300 group",
                         selectedId === artifact.id 
                           ? "text-teal-400 bg-teal-500/5 border-l-2 border-teal-500" 
                           : "text-white/20 hover:text-white/60 hover:bg-white/5 border-l-2 border-transparent"
                       )}
                     >
                        <div className="flex items-center gap-4">
                           <span className={cn(
                             "text-[10px] font-bold",
                             selectedId === artifact.id ? "text-teal-500" : "opacity-0 group-hover:opacity-40"
                           )}>
                              {selectedId === artifact.id ? "*" : " "}
                           </span>
                           <span className="tracking-tighter uppercase font-bold">{artifact.title}</span>
                        </div>
                        
                        {selectedId === artifact.id && (
                          <span className="text-[8px] px-1.5 py-0.5 border border-teal-500/30 bg-teal-500/10 text-teal-400 font-bold">
                             [ACTV]
                          </span>
                        )}
                     </button>
                   ))}
                </div>

                {/* ACTION: DISCOVER MORE */}
                <div className="mt-12 px-8">
                   <a 
                     href="https://github.com/timbubadibako" 
                     target="_blank"
                     className="inline-flex items-center gap-3 text-white/40 hover:text-teal-400 font-mono text-[10px] uppercase tracking-[0.2em] transition-all group"
                   >
                      &gt; [ View All Projects ↗ ]
                      <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                   </a>
                </div>
             </div>

             <div className="p-6 border-t border-white/5 bg-zinc-900/10 font-mono text-[8px] text-white/10 uppercase tracking-[0.4em] space-y-2">
                <p>Total_Artifacts: 0{artifacts.length}</p>
                <p>Buffer_Status: Optimized</p>
             </div>
          </div>

          {/* RIGHT PANEL: PREVIEW BUFFER (70%) */}
          <div className="flex-1 bg-zinc-950/40 relative flex flex-col">
             <AnimatePresence mode="wait">
                <motion.div
                  key={selectedId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "circOut" }}
                  className="flex-1 flex flex-col p-8 md:p-16 lg:p-20 overflow-y-auto custom-scrollbar"
                >
                   <div className="relative aspect-video w-full max-w-5xl mx-auto border border-white/10 bg-black overflow-hidden group">
                      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20 group-hover:border-teal-500/50 transition-colors z-20" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20 group-hover:border-teal-500/50 transition-colors z-20" />
                      
                      <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/50">
                         <Monitor className="h-12 w-12 text-white/5 animate-pulse" />
                         <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                      </div>

                      <div className="absolute bottom-6 left-6 z-30">
                         <div className="px-4 py-2 border border-teal-500/30 bg-black/60 backdrop-blur-md font-mono text-[9px] text-teal-400 uppercase tracking-widest flex items-center gap-3">
                            <span className="h-1.5 w-1.5 bg-teal-500 animate-ping rounded-full" />
                            Rendering_Visual_Buffer... 100%
                         </div>
                      </div>
                   </div>

                   {/* PROJECT METADATA */}
                   <div className="mt-12 max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
                      <div className="space-y-6">
                         <div className="space-y-2">
                            <span className="font-mono text-[10px] text-teal-500/60 uppercase tracking-[0.4em] font-black">
                               {activeArtifact.subtitle}
                            </span>
                            <h3 className="font-press-start text-2xl md:text-4xl text-white uppercase tracking-tighter">
                               <GlitchText text={activeArtifact.id} intensity="low" />
                            </h3>
                         </div>
                         <p className="font-mono text-sm text-white/50 leading-relaxed uppercase tracking-wider">
                            {activeArtifact.description}
                         </p>
                      </div>

                      <div className="space-y-8 lg:border-l lg:border-white/5 lg:pl-12">
                         <div className="space-y-4">
                            <div className="flex items-center gap-4 text-white/40 font-mono text-[10px] uppercase tracking-widest">
                               <FileCode className="h-4 w-4 text-teal-500/40" />
                               <span>&gt; Tech Stack : <span className="text-teal-400 font-bold">{activeArtifact.tech}</span></span>
                            </div>
                            <div className="flex items-center gap-4 text-white/40 font-mono text-[10px] uppercase tracking-widest">
                               <Signal className="h-4 w-4 text-teal-500/40" />
                               <span>&gt; Status : <span className="text-green-500 font-bold">{activeArtifact.status}</span></span>
                            </div>
                         </div>

                         <div className="flex flex-wrap gap-4 pt-4">
                            <a 
                              href={activeArtifact.github} 
                              className="px-6 py-2 bg-teal-500 text-black font-mono text-[9px] font-black uppercase tracking-widest hover:bg-teal-400 transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] flex items-center gap-3"
                            >
                               <Globe className="h-3.5 w-3.5" /> [ View Repository ]
                            </a>
                            <a 
                              href={activeArtifact.caseStudy} 
                              className="px-6 py-2 border border-white/10 bg-white/5 text-white/40 font-mono text-[9px] font-black uppercase tracking-widest hover:border-teal-500/50 hover:text-white transition-all flex items-center gap-3"
                            >
                               [ Case Study ] <ExternalLink className="h-3 w-3" />
                            </a>
                         </div>
                      </div>
                   </div>
                </motion.div>
             </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-[-1]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
    </section>
  )
}
