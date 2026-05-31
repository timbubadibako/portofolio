"use client"

import React, { useState } from 'react'
import { useProjectStore } from '@/store/useProjectStore'
import { generateProjectContext, generateMarkdownContext } from '@/lib/generator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Trash2, Download, Clipboard, Check, ChevronRight, ChevronLeft, Zap, Box, ShieldCheck, Terminal as TerminalIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrambleText } from '@/components/inter/scramble-text'
import { AnimatedNoise } from '@/components/inter/animated-noise'
import { NvimSidebar } from '@/components/inter/nvim-sidebar'
import { DataStreamTransition } from '@/components/inter/data-stream-transition'

export default function GeneratorPage() {
  const [step, setStep] = useState(1)
  const store = useProjectStore()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const context = generateMarkdownContext(store)
    navigator.clipboard.writeText(context)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const context = generateProjectContext(store)
    const blob = new Blob([JSON.stringify(context, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'project-context.json'
    a.click()
  }

  const nextStep = () => setStep(s => Math.min(s + 1, 5))
  const prevStep = () => setStep(s => Math.max(s - 1, 1))

  return (
    <div className="relative min-h-screen bg-black font-mono selection:bg-teal-500/30 overflow-y-auto flex flex-col custom-scrollbar">
      {/* Global Overlays */}
      <div className="crt-overlay pointer-events-none z-[1000]" />
      <div className="scanlines pointer-events-none z-[1001]" />
      <AnimatedNoise opacity={0.03} />
      <DataStreamTransition />
      <NvimSidebar />

      <div className="flex-1 container mx-auto px-6 py-12 md:py-24 flex flex-col max-w-6xl relative z-10">
        
        {/* Header Section */}
        <div className="mb-16 space-y-6">
           <div className="flex items-center gap-4">
              <div className="h-10 w-10 border border-teal-500 bg-teal-500/10 flex items-center justify-center text-teal-400">
                 <Zap className="h-5 w-5" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-teal-500 font-bold">
                 MODULE // PROJECT_GENERATOR
              </span>
           </div>
           <h1 className="font-press-start text-3xl md:text-5xl tracking-tighter uppercase terminal-text-glow text-white leading-tight">
              <ScrambleText text="PROJECT" duration={1} /> <br />
              <span className="text-teal-500/40">GENERATOR_v1.0.4</span>
           </h1>
           <p className="text-white/40 text-xs md:text-sm uppercase tracking-widest leading-relaxed max-w-xl border-l border-teal-500/20 pl-6">
              Establish high-integrity project blueprints and generate AI-ready context schemas for neural orchestration.
           </p>
        </div>

        {/* Steps Progress Bar */}
        <div className="mb-16 flex items-center gap-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <React.Fragment key={s}>
              <div 
                className={cn(
                  "flex h-10 w-10 items-center justify-center border font-mono text-xs transition-all duration-500",
                  step >= s 
                    ? "bg-teal-500 border-teal-400 text-black shadow-[0_0_20px_rgba(20,184,166,0.3)]" 
                    : "bg-black border-white/10 text-white/20"
                )}
              >
                0{s}
              </div>
              {s < 5 && (
                <div className={cn(
                  "h-px flex-1 transition-all duration-1000",
                  step > s ? "bg-teal-500/50" : "bg-white/5"
                )} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Form Container */}
        <div className="flex-1 bg-zinc-950 border border-white/5 relative overflow-hidden flex flex-col min-h-[500px]">
           {/* Corner Accents */}
           <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20 z-20" />
           <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20 z-20" />
           <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20 z-20" />
           <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20 z-20" />

           {/* Tab Bar Header */}
           <div className="bg-zinc-900/50 border-b border-white/5 p-4 flex items-center justify-between">
              <div className="flex items-center gap-4 font-mono text-[9px] uppercase tracking-widest text-white/40">
                 <TerminalIcon className="h-3.5 w-3.5 text-teal-500/40" />
                 <span>Buffer: /home/jrilym/scaffold/manifest.yaml</span>
              </div>
              <div className="flex gap-2">
                 <div className="w-2.5 h-2.5 bg-red-500/20 rounded-full" />
                 <div className="w-2.5 h-2.5 bg-amber-500/20 rounded-full" />
                 <div className="w-2.5 h-2.5 bg-emerald-500/20 rounded-full" />
              </div>
           </div>

           <div className="flex-1 p-8 md:p-12 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                  className="space-y-12 max-w-4xl"
                >
                   {step === 1 && (
                     <div className="space-y-8">
                       <div className="space-y-2">
                          <h3 className="font-mono text-xl font-bold text-white uppercase tracking-tight">Project_Metadata</h3>
                          <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest leading-loose">Identity parameters and objective definition</p>
                       </div>
                       <div className="grid gap-8">
                         <div className="space-y-3">
                           <label className="text-[10px] font-mono text-teal-500/60 uppercase tracking-widest font-black">Project Name</label>
                           <Input className="bg-white/[0.03] border-white/5 rounded-none h-14 font-mono text-white text-base focus:border-teal-500/40 transition-colors px-6" value={store.name} onChange={(e) => store.setName(e.target.value)} placeholder="e.g. NEURAL_INTERFACE" />
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="space-y-3">
                             <label className="text-[10px] font-mono text-teal-500/60 uppercase tracking-widest font-black">Type</label>
                             <Input className="bg-white/[0.03] border-white/5 rounded-none h-14 font-mono text-white text-base focus:border-teal-500/40 transition-colors px-6" value={store.type} onChange={(e) => store.setType(e.target.value)} placeholder="e.g. MOBILE_APP" />
                           </div>
                           <div className="space-y-3">
                             <label className="text-[10px] font-mono text-teal-500/60 uppercase tracking-widest font-black">Architecture</label>
                             <Input className="bg-white/[0.03] border-white/5 rounded-none h-14 font-mono text-white text-base focus:border-teal-500/40 transition-colors px-6" value={store.architecture} onChange={(e) => store.setArchitecture(e.target.value)} placeholder="e.g. HEXAGONAL" />
                           </div>
                         </div>
                         <div className="space-y-3">
                           <label className="text-[10px] font-mono text-teal-500/60 uppercase tracking-widest font-black">Objective / Description</label>
                           <textarea 
                             className="flex min-h-[160px] w-full border border-white/5 bg-white/[0.03] px-6 py-4 font-mono text-sm text-white focus:outline-none focus:border-teal-500/40 transition-colors leading-relaxed"
                             value={store.description} 
                             onChange={(e) => store.setDescription(e.target.value)}
                             placeholder="Define the primary system logic..."
                           />
                         </div>
                       </div>
                     </div>
                   )}

                   {step === 2 && (
                     <div className="space-y-8">
                        <div className="space-y-2">
                           <h3 className="font-mono text-xl font-bold text-white uppercase tracking-tight">Tech_Stack</h3>
                           <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest leading-loose">Define technical primitives and runtime environment</p>
                        </div>
                        <div className="grid gap-8">
                          <div className="space-y-3">
                            <label className="text-[10px] font-mono text-teal-500/60 uppercase tracking-widest font-black">Frontend Framework</label>
                            <Input className="bg-white/[0.03] border-white/5 rounded-none h-14 font-mono text-white text-base" value={store.techStack.frontend} onChange={(e) => store.setStack({ frontend: e.target.value })} placeholder="e.g. NEXT.JS" />
                          </div>
                          <div className="space-y-3">
                            <label className="text-[10px] font-mono text-teal-500/60 uppercase tracking-widest font-black">Language</label>
                            <Input className="bg-white/[0.03] border-white/5 rounded-none h-14 font-mono text-white text-base" value={store.techStack.language} onChange={(e) => store.setStack({ language: e.target.value })} placeholder="e.g. TYPESCRIPT" />
                          </div>
                          <div className="space-y-3">
                            <label className="text-[10px] font-mono text-teal-500/60 uppercase tracking-widest font-black">Persistence / Cloud</label>
                            <Input className="bg-white/[0.03] border-white/5 rounded-none h-14 font-mono text-white text-base" value={store.techStack.database_driver} onChange={(e) => store.setStack({ database_driver: e.target.value })} placeholder="e.g. SUPABASE" />
                          </div>
                        </div>
                     </div>
                   )}

                   {step === 3 && (
                     <div className="space-y-8">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                             <h3 className="font-mono text-xl font-bold text-white uppercase tracking-tight">Database_Blueprint</h3>
                             <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Relational schema mapping</p>
                          </div>
                          <Button size="sm" className="bg-teal-500 hover:bg-teal-400 text-black font-black rounded-none uppercase tracking-widest px-6 h-10" onClick={() => store.addTable({ name: 'new_table', columns: [] })}>
                            <Plus className="mr-2 h-4 w-4" /> ADD_ENTITY
                          </Button>
                        </div>
                        
                        <div className="space-y-8">
                          {store.databaseBlueprint.tables.map((table, tIdx) => (
                            <div key={tIdx} className="border border-white/10 bg-white/[0.02] p-8 relative overflow-hidden group">
                              <div className="absolute top-0 left-0 w-1 h-full bg-teal-500/20 group-hover:bg-teal-500 transition-colors" />
                              <div className="mb-6 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                   <Box className="h-4 w-4 text-teal-500/40" />
                                   <Input 
                                      className="max-w-[240px] font-bold bg-transparent border-none focus:ring-0 p-0 text-white uppercase text-lg tracking-tight"
                                      value={table.name} 
                                      onChange={(e) => {
                                        const newTables = [...store.databaseBlueprint.tables]
                                        newTables[tIdx].name = e.target.value
                                        useProjectStore.setState({ databaseBlueprint: { tables: newTables } })
                                      }}
                                   />
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => store.removeTable(table.name)} className="text-red-500/40 hover:text-red-500 hover:bg-red-500/5">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="space-y-4">
                                {table.columns.map((col, cIdx) => (
                                  <div key={cIdx} className="flex gap-4">
                                    <Input 
                                      className="bg-black/40 border-white/5 rounded-none h-12 font-mono text-xs text-white/60"
                                      placeholder="Field Name"
                                      value={col.name}
                                      onChange={(e) => {
                                        const newTables = [...store.databaseBlueprint.tables]
                                        newTables[tIdx].columns[cIdx].name = e.target.value
                                        useProjectStore.setState({ databaseBlueprint: { tables: newTables } })
                                      }}
                                    />
                                    <Input 
                                      className="bg-black/40 border-white/5 rounded-none h-12 font-mono text-xs text-white/60"
                                      placeholder="Data Type"
                                      value={col.type}
                                      onChange={(e) => {
                                        const newTables = [...store.databaseBlueprint.tables]
                                        newTables[tIdx].columns[cIdx].type = e.target.value
                                        useProjectStore.setState({ databaseBlueprint: { tables: newTables } })
                                      }}
                                    />
                                  </div>
                                ))}
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="w-full border-white/5 text-[9px] font-mono hover:bg-white/5 uppercase tracking-[0.2em]"
                                  onClick={() => {
                                    const newTables = [...store.databaseBlueprint.tables]
                                    newTables[tIdx].columns.push({ name: '', type: '' })
                                    useProjectStore.setState({ databaseBlueprint: { tables: newTables } })
                                  }}
                                >
                                  [ + REGISTER_FIELD ]
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                     </div>
                   )}

                   {step === 4 && (
                     <div className="space-y-8">
                        <div className="space-y-2">
                           <h3 className="font-mono text-xl font-bold text-white uppercase tracking-tight">AI_Protocols</h3>
                           <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest leading-loose">Constraint definition and environment initialization</p>
                        </div>
                        
                        <div className="space-y-12">
                          <div className="space-y-6">
                            <label className="text-[10px] font-mono text-teal-500/60 uppercase tracking-widest font-black flex items-center gap-4">
                               <ShieldCheck className="h-4 w-4" /> Coding_Rules
                            </label>
                            {store.strictCodingRules.map((rule, idx) => (
                              <div key={idx} className="flex gap-4">
                                <Input className="bg-white/[0.03] border-white/5 rounded-none h-12 font-mono text-sm" value={rule} onChange={(e) => {
                                  const newRules = [...store.strictCodingRules]
                                  newRules[idx] = e.target.value
                                  useProjectStore.setState({ strictCodingRules: newRules })
                                }} />
                                <Button variant="ghost" size="sm" onClick={() => store.removeRule(idx)} className="text-red-500/40">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button variant="outline" size="sm" onClick={() => store.addRule('')} className="w-full border-white/5 font-mono text-[9px] uppercase tracking-widest">
                              [ + ADD_CONSTRAINT ]
                            </Button>
                          </div>

                          <div className="space-y-6">
                            <label className="text-[10px] font-mono text-teal-500/60 uppercase tracking-widest font-black flex items-center gap-4">
                               <TerminalIcon className="h-4 w-4" /> Init_Command_Chain
                            </label>
                            {store.initializationCommandList.map((cmd, idx) => (
                              <div key={idx} className="flex gap-4">
                                <Input className="bg-black border-teal-500/20 rounded-none h-12 font-mono text-sm text-teal-400" value={cmd} onChange={(e) => {
                                  const newCmds = [...store.initializationCommandList]
                                  newCmds[idx] = e.target.value
                                  useProjectStore.setState({ initializationCommandList: newCmds })
                                }} />
                                <Button variant="ghost" size="sm" onClick={() => store.removeCommand(idx)} className="text-red-500/40">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button variant="outline" size="sm" onClick={() => store.addCommand('')} className="w-full border-white/5 font-mono text-[9px] uppercase tracking-widest">
                              [ + ADD_COMMAND ]
                            </Button>
                          </div>
                        </div>
                     </div>
                   )}

                   {step === 5 && (
                     <div className="space-y-12">
                        <div className="space-y-2">
                            <h3 className="font-mono text-xl font-bold text-white uppercase tracking-tight">System_Compiler_Output</h3>
                            <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest leading-loose">Verify the generated project manifest</p>
                        </div>
                        
                        <div className="relative group/cli">
                           <div className="absolute top-0 right-0 p-4 flex gap-4 z-20">
                              <button 
                                onClick={handleCopy}
                                className="flex items-center gap-2 px-4 py-2 border border-teal-500/20 bg-teal-500/5 text-teal-400 font-mono text-[9px] uppercase tracking-widest hover:bg-teal-500 hover:text-black transition-all"
                              >
                                 {copied ? <Check className="h-3.5 w-3.5" /> : <Clipboard className="h-3.5 w-3.5" />}
                                 {copied ? "COPIED" : "COPY_TO_CLIPBOARD"}
                              </button>
                           </div>
                           
                           <div className="border border-white/10 bg-black/60 p-8 pt-20 font-mono text-xs md:text-sm text-teal-500/80 max-h-[500px] overflow-y-auto custom-scrollbar relative">
                              <div className="absolute top-0 left-0 w-full h-10 bg-zinc-900/80 border-b border-white/5 flex items-center px-6 gap-3">
                                 <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                                 <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                                 <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                                 <span className="text-[9px] text-white/20 uppercase tracking-widest ml-4 italic">blueprint_manifest.yaml</span>
                              </div>
                              <pre className="whitespace-pre-wrap leading-relaxed">
                                 {`# !/bin/bash\n\n# Project: ${store.name}\n# Stack: ${store.techStack.frontend} | ${store.techStack.language}\n\necho "Initializing ${store.name} deployment protocol..."\n\n${generateMarkdownContext(store)}`}
                              </pre>
                           </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6">
                          <Button className="flex-1 bg-teal-500 hover:bg-teal-400 text-black font-black rounded-none h-14 uppercase tracking-[0.2em] text-xs shadow-[0_0_30px_rgba(20,184,166,0.3)]" onClick={handleDownload}>
                            <Download className="mr-3 h-4 w-4" /> DOWNLOAD_MANIFEST.JSON
                          </Button>
                        </div>
                     </div>
                   )}
                </motion.div>
              </AnimatePresence>
           </div>

           <div className="bg-zinc-900/30 border-t border-white/5 p-6 md:p-8 flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={prevStep} 
                disabled={step === 1}
                className="text-white/30 hover:text-white font-mono text-[10px] uppercase tracking-[0.4em] disabled:opacity-0"
              >
                <ChevronLeft className="mr-3 h-4 w-4" /> [ PREV_MODULE ]
              </Button>
              
              <div className="hidden sm:flex gap-3 items-center">
                 {[1, 2, 3, 4, 5].map((s) => (
                   <div key={s} className={cn("w-1.5 h-1.5 rotate-45 transition-all duration-500", step === s ? "bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,1)] scale-125" : "bg-white/10")} />
                 ))}
              </div>

              <Button 
                onClick={nextStep} 
                disabled={step === 5}
                className="bg-black hover:bg-teal-500 hover:text-black border border-white/10 font-mono text-[10px] uppercase tracking-[0.4em] disabled:opacity-0 h-10 px-6 transition-all"
              >
                [ NEXT_MODULE ] <ChevronRight className="ml-3 h-4 w-4" />
              </Button>
           </div>
        </div>

      </div>

      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </div>
  )
}
