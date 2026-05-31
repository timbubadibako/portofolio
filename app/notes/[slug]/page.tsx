"use client"

import React, { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { NvimSidebar } from "@/components/inter/nvim-sidebar"
import { DataStreamTransition } from "@/components/inter/data-stream-transition"
import { AnimatedNoise } from "@/components/inter/animated-noise"
import { FileText, ChevronLeft, Activity, Tag, Calendar, Terminal } from "lucide-react"
import Link from "next/link"
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import 'highlight.js/styles/atom-one-dark.css'

export default function NoteDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchNote() {
      if (!slug) return
      try {
        const res = await fetch(`/content/notes/${slug}`)
        if (!res.ok) throw new Error("Not found")
        const text = await res.text()
        setContent(text)
      } catch (err) {
        setContent("ERROR: Failed to load buffer data. Check if the file exists in /public/content/notes/")
      } finally {
        setIsLoading(false)
      }
    }
    fetchNote()
  }, [slug])

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-teal-500/30 overflow-y-auto flex flex-col font-mono custom-scrollbar">
      <div className="crt-overlay pointer-events-none z-[1000]" />
      <div className="scanlines pointer-events-none z-[1001]" />
      <AnimatedNoise opacity={0.03} />
      <DataStreamTransition />
      <NvimSidebar />

      <div className="flex-1 container mx-auto px-6 py-20 flex flex-col max-w-7xl relative z-10">
        <div className="max-w-5xl mx-auto w-full border border-white/5 bg-[#050505] min-h-[85vh] flex flex-col shadow-2xl relative">
           
           {/* Terminal Window Decoration */}
           <div className="absolute top-0 left-0 w-full h-1 bg-teal-500/20" />
           <div className="absolute -left-[1px] top-0 h-full w-[1px] bg-gradient-to-b from-teal-500/20 via-transparent to-transparent" />

           {/* Header / Buffer Info */}
           <div className="p-4 md:p-6 border-b border-white/5 bg-zinc-900/30 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-teal-500/40 border border-teal-500/20 shadow-[0_0_10px_rgba(20,184,166,0.2)]" />
                 </div>
                 <div className="h-4 w-px bg-white/10 mx-2" />
                 <div className="flex items-center gap-3">
                    <Terminal className="h-3.5 w-3.5 text-teal-500/60" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Buffer:</span>
                    <span className="text-[10px] text-teal-400 font-bold uppercase tracking-widest">{slug}</span>
                 </div>
              </div>
              <Link href="/notes" className="text-[9px] text-white/20 hover:text-white transition-all flex items-center gap-2 group uppercase tracking-[0.3em] font-bold">
                 <ChevronLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" /> [ :q! ]
              </Link>
           </div>

           {/* Main Content Area: Enforce Monospace and Industrial Styling */}
           <div className="flex-1 p-8 md:p-16 overflow-y-auto custom-scrollbar bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.03),transparent_40%)]">
              {isLoading ? (
                <div className="flex items-center gap-3 text-teal-500 animate-pulse font-mono text-xs uppercase tracking-[0.3em]">
                   <Activity className="h-4 w-4" /> [ LOADING_KRNL_BUFFER... ]
                </div>
              ) : (
                <div className="max-w-none text-white/70 font-mono text-xs md:text-sm leading-relaxed space-y-8">
                   <ReactMarkdown 
                     remarkPlugins={[remarkGfm]} 
                     rehypePlugins={[rehypeRaw, rehypeHighlight]}
                     components={{
                        h1: ({children}) => <h1 className="text-teal-500 font-bold text-lg md:text-xl uppercase tracking-[0.2em] border-b border-teal-500/20 pb-4 mb-8 flex items-center gap-4"><span className="h-4 w-1 bg-teal-500" />{children}</h1>,
                        h2: ({children}) => <h2 className="text-white font-bold text-sm md:text-base uppercase tracking-widest mt-12 mb-6 flex items-center gap-3"><span className="text-teal-500/40">#</span> {children}</h2>,
                        h3: ({children}) => <h3 className="text-teal-400/80 font-bold text-xs uppercase tracking-wider mt-8 mb-4">## {children}</h3>,
                        p: ({children}) => <p className="mb-6 opacity-80 leading-7">{children}</p>,
                        ul: ({children}) => <ul className="space-y-3 mb-8 list-none">{children}</ul>,
                        li: ({children}) => <li className="flex gap-4 items-start"><span className="text-teal-500/40 font-bold mt-1">»</span><span className="opacity-90">{children}</span></li>,
                        code: ({node, className, children, ...props}) => {
                          const match = /language-(\w+)/.exec(className || '')
                          return !match ? (
                            <code className="bg-white/5 text-teal-300 px-1.5 py-0.5 rounded-sm border border-white/5" {...props}>
                              {children}
                            </code>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          )
                        },
                        pre: ({children}) => <pre className="bg-black/60 border border-white/5 p-6 md:p-8 my-8 overflow-x-auto no-scrollbar relative group transition-all hover:border-teal-500/20">{children}</pre>,
                        table: ({children}) => (
                           <div className="my-10 border border-white/5 bg-white/[0.02] overflow-x-auto">
                              <table className="w-full text-left border-collapse">{children}</table>
                           </div>
                        ),
                        thead: ({children}) => <thead className="bg-teal-500/5 text-teal-500 border-b border-white/10">{children}</thead>,
                        th: ({children}) => <th className="p-4 text-[10px] font-bold uppercase tracking-widest">{children}</th>,
                        td: ({children}) => <td className="p-4 border-b border-white/5 text-[11px] opacity-60 font-mono tracking-tight">{children}</td>,
                        blockquote: ({children}) => <div className="border-l-2 border-teal-500/20 pl-8 my-8 italic text-white/40 leading-relaxed">{children}</div>,
                        hr: () => <hr className="border-white/5 my-12" />
                     }}
                   >
                     {content}
                   </ReactMarkdown>
                </div>
              )}
           </div>

           {/* Footer / Status Bar */}
           <div className="p-3 md:px-8 border-t border-white/5 bg-[#080808] flex justify-between items-center text-[7px] md:text-[8px] uppercase tracking-[0.4em] text-white/20">
              <div className="flex gap-8">
                 <span className="flex items-center gap-3 text-teal-500/40"><Calendar className="h-2.5 w-2.5" /> TIMESTAMP: 2026.05.31</span>
                 <span className="flex items-center gap-3"><Tag className="h-2.5 w-2.5" /> TYPE: TECHNICAL_BLUEPRINT</span>
              </div>
              <div className="flex items-center gap-6">
                 <span className="hidden md:inline">Kernel_Buffer: STABLE</span>
                 <span className="text-teal-500 font-black animate-pulse">[ LINK_ACTIVE ]</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
