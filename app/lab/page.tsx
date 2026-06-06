"use client"

import React, { useState } from "react"
import { NvimSidebar } from "@/components/inter/nvim-sidebar"
import { DataStreamTransition } from "@/components/inter/data-stream-transition"
import { AnimatedNoise } from "@/components/inter/animated-noise"
import { ScrambleText } from "@/components/inter/scramble-text"
import { ShieldAlert, Terminal as TerminalIcon, Database, Lock, Unlock, Eye, Info, Activity, AlertTriangle, Fingerprint } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { SqlHighlighter } from "@/components/inter/sql-highlighter"

export default function SecurityLabPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [results, setResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInject = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResults(null)
    try {
      const res = await fetch('/api/security/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await res.json()
      setResults(data)
    } catch (err) {
      setResults({ error: "CONNECTION_TIMEOUT", message: "Node kernel unreachable." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#020202] text-white selection:bg-teal-500/30 overflow-y-auto flex flex-col font-mono custom-scrollbar">
      <div className="crt-overlay pointer-events-none z-[1000] opacity-[0.03]" />
      <div className="scanlines pointer-events-none z-[1001]" />
      <AnimatedNoise opacity={0.02} />
      <DataStreamTransition />
      <NvimSidebar />

      <div className="flex-1 container mx-auto px-6 py-12 md:py-24 flex flex-col max-w-7xl relative z-10">
        
        {/* Module Title */}
        <div className="mb-16 space-y-4">
           <div className="flex items-center gap-4">
              <div className="h-8 w-8 border border-white/10 flex items-center justify-center text-white/20">
                 <Database className="h-4 w-4" />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/40 font-bold">
                 UNIKU // CENTRAL_ARCHIVE_GATEWAY
              </span>
           </div>
           <h1 className="font-press-start text-xl md:text-2xl tracking-tighter uppercase text-white leading-tight">
              <ScrambleText text="SECURE_AUTH_NODE" duration={1} />
           </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 flex-1">
           
           {/* Left: Natural Login Form */}
           <div className="space-y-12">
              <div className="bg-zinc-900/40 border border-white/5 p-8 md:p-12 relative overflow-hidden backdrop-blur-md">
                 <div className="absolute top-0 right-0 p-4">
                    <Fingerprint className="h-6 w-6 text-white/5" />
                 </div>
                 
                 <div className="mb-12 space-y-2 border-l border-teal-500/40 pl-6">
                    <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em]">Administrative Login</h3>
                    <p className="text-[9px] text-white/40 uppercase tracking-widest leading-relaxed">
                       Enter your credentials to access the secure document repository. Unauthorized attempts are logged.
                    </p>
                 </div>

                 <form onSubmit={handleInject} className="space-y-8">
                    <div className="space-y-3 group">
                       <label className="text-[8px] text-white/30 uppercase font-black tracking-[0.3em] group-focus-within:text-teal-500 transition-colors">Username</label>
                       <input 
                         type="text" 
                         value={username}
                         onChange={(e) => setUsername(e.target.value)}
                         className="w-full bg-black/40 border border-white/5 p-5 text-sm font-mono text-white focus:outline-none focus:border-teal-500/40 transition-all placeholder:text-white/5"
                         placeholder="e.g. system_admin"
                       />
                    </div>
                    <div className="space-y-3 group">
                       <label className="text-[8px] text-white/30 uppercase font-black tracking-[0.3em] group-focus-within:text-teal-500 transition-colors">Password</label>
                       <input 
                         type="password" 
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                         className="w-full bg-black/40 border border-white/5 p-5 text-sm font-mono text-white focus:outline-none focus:border-teal-500/40 transition-all placeholder:text-white/5"
                         placeholder="••••••••"
                       />
                    </div>
                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-14 bg-white/5 border border-white/10 text-white/60 font-black uppercase tracking-[0.4em] text-[10px] hover:bg-teal-500 hover:text-black hover:border-teal-400 transition-all flex items-center justify-center gap-4"
                    >
                       {isLoading ? <Activity className="h-4 w-4 animate-spin text-teal-500" /> : "PROCEED_LOGIN"}
                    </button>
                 </form>
              </div>

              <div className="bg-zinc-900/20 border-l border-white/10 p-6 space-y-6">
                 <div className="flex items-center gap-3 text-[9px] text-white/40 font-bold uppercase tracking-widest italic">
                    <Info className="h-3 w-3" /> Technical_Briefing
                 </div>
                 <p className="text-[9px] text-white/20 uppercase leading-loose tracking-widest">
                    This gateway uses a single-string SQL execution pattern. To demonstrate logical bypass, utilize SQL metacharacters like <code className="text-teal-500">'</code> and <code className="text-teal-500">--</code> within the username buffer.
                 </p>
              </div>
           </div>

           {/* Right: Technical Diagnostic Readout */}
           <div className="bg-[#050505] border border-white/5 flex flex-col min-h-[500px] relative overflow-hidden">
              <div className="p-4 border-b border-white/5 bg-zinc-900/20 flex items-center justify-between">
                 <div className="flex items-center gap-3 font-mono text-[8px] uppercase tracking-[0.3em] text-white/20">
                    <TerminalIcon className="h-3 w-3" />
                    <span>Debugger: kernel_stream_0x22</span>
                 </div>
                 <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/20" />
                    <div className="w-2 h-2 rounded-full bg-amber-500/20" />
                    <div className="w-2 h-2 rounded-full bg-teal-500/20" />
                 </div>
              </div>

              <div className="flex-1 p-8 md:p-12 font-mono overflow-y-auto custom-scrollbar">
                 <AnimatePresence mode="wait">
                    {!results ? (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-10"
                      >
                         <Activity className="h-10 w-10 animate-pulse" />
                         <p className="uppercase tracking-[0.5em] text-[8px]">Listening for incoming DB signals...</p>
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-12"
                      >
                         {/* SQL SYNTAX HIGHLIGHTER */}
                         <div className="space-y-4">
                            <div className="flex items-center gap-4">
                               <span className="h-px flex-1 bg-white/5" />
                               <span className="text-[8px] text-teal-500/40 font-bold uppercase tracking-[0.5em]">Executed_SQL</span>
                               <span className="h-px flex-1 bg-white/5" />
                            </div>
                            <div className="bg-black p-6 border border-white/5 rounded-sm shadow-inner relative overflow-hidden group">
                               <div className="absolute top-0 left-0 w-full h-full bg-teal-500/[0.01] pointer-events-none" />
                               <SqlHighlighter query={results.executed_query} />
                            </div>
                         </div>

                         {/* Result Feed */}
                         <div className="space-y-6">
                            <div className="flex items-center justify-between">
                               <h3 className="text-[9px] text-white/60 font-bold uppercase tracking-widest flex items-center gap-3">
                                  <Unlock className="h-3 w-3 text-teal-500" /> Kernel_Data_Output
                               </h3>
                               <span className="text-[8px] text-white/10 uppercase tracking-widest">{results.data?.length || 0} Records</span>
                            </div>
                            
                            <div className="space-y-4">
                               {results.data && results.data.length > 0 ? (
                                 results.data.map((row: any, i: number) => (
                                   <div key={i} className="p-5 border border-white/5 bg-zinc-900/20 space-y-4 relative group hover:border-teal-500/20 transition-colors">
                                      <div className="flex justify-between items-center text-[10px]">
                                         <span className="text-white font-bold tracking-widest">{row.username}</span>
                                         <span className="text-[8px] text-teal-400 font-bold bg-teal-500/10 px-2 py-0.5 border border-teal-500/20">ACCESS_{row.clearance_level}</span>
                                      </div>
                                      <div className="p-4 bg-black/40 border border-white/5 text-[11px] leading-relaxed text-white/50 italic font-serif italic border-l-teal-500/40 border-l-2">
                                         {row.secret_log}
                                      </div>
                                      <div className="flex justify-between text-[8px] text-white/10 uppercase tracking-widest font-mono">
                                         <span>ID: {row.id}</span>
                                         <span>Hash: MD5_{row.password.substring(0, 8)}...</span>
                                      </div>
                                   </div>
                                 ))
                               ) : (
                                 <div className="p-16 border border-dashed border-white/5 flex flex-col items-center justify-center text-center opacity-20 space-y-4">
                                    <Lock className="h-6 w-6" />
                                    <p className="uppercase tracking-[0.3em] text-[8px]">Logical Gate Blocked. <br />Access Request Denied.</p>
                                 </div>
                               )}
                            </div>
                         </div>

                         {results.error && (
                           <div className="p-6 border border-red-500/20 bg-red-500/5 space-y-3">
                              <div className="flex items-center gap-3 text-red-500 font-bold uppercase tracking-widest text-[9px]">
                                 <AlertTriangle className="h-3.5 w-3.5" /> Internal_Kernel_Error
                              </div>
                              <pre className="text-red-400/70 text-[10px] leading-relaxed whitespace-pre-wrap">{results.message}</pre>
                           </div>
                         )}

                         <div className="pt-8 border-t border-white/5 flex justify-between items-center text-[7px] uppercase tracking-[0.4em] text-white/10">
                            <span>Diagnostic_Node: West_Java_022</span>
                            <span className={cn(results.success ? "text-teal-500 font-bold" : "text-red-500/40 animate-pulse")}>
                               {results.success ? "[ SYSTEM_BREACHED ]" : "[ LOCKDOWN_ACTIVE ]"}
                            </span>
                         </div>
                      </motion.div>
                    )}
                 </AnimatePresence>
              </div>
           </div>
        </div>

      </div>

      <div className="absolute inset-0 pointer-events-none opacity-[0.01] z-0" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </div>
  )
}
