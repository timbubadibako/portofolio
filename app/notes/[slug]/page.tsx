"use client"

import React, { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { NvimSidebar } from "@/components/inter/nvim-sidebar"
import { DataStreamTransition } from "@/components/inter/data-stream-transition"
import { AnimatedNoise } from "@/components/inter/animated-noise"
import { FileText, ChevronLeft, Activity } from "lucide-react"
import Link from "next/link"

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
        <div className="max-w-4xl mx-auto w-full border-x border-white/5 bg-zinc-900/5 min-h-[80vh] flex flex-col">
           {/* Header */}
           <div className="p-6 border-b border-white/5 bg-zinc-900/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <FileText className="h-4 w-4 text-teal-500" />
                 <span className="text-[10px] uppercase tracking-widest text-white/40">Buffer:</span>
                 <span className="text-[10px] text-teal-400 font-bold uppercase tracking-widest">{slug}</span>
              </div>
              <Link href="/notes" className="text-[10px] text-white/20 hover:text-white transition-colors flex items-center gap-2">
                 <ChevronLeft className="h-3 w-3" /> [ BACK_TO_ARCHIVE ]
              </Link>
           </div>

           <div className="flex-1 p-8 md:p-16 overflow-y-auto custom-scrollbar">
              {isLoading ? (
                <div className="flex items-center gap-3 text-teal-500 animate-pulse">
                   <Activity className="h-4 w-4" /> [ READING_BUFFER... ]
                </div>
              ) : (
                <div className="prose prose-invert prose-teal max-w-none">
                   <div className="space-y-6 whitespace-pre-wrap leading-relaxed text-white/60">
                      {content}
                   </div>
                </div>
              )}
           </div>

           {/* Footer */}
           <div className="p-4 border-t border-white/5 bg-zinc-900/10 text-[8px] uppercase tracking-[0.4em] text-white/10 text-right">
              Kernel_Buffer_Stream: Verified
           </div>
        </div>
      </div>
    </div>
  )
}
