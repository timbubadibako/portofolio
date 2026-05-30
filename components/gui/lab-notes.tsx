"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ArrowRight, BookOpen, Clock, Tag } from "lucide-react"

const notes = [
  {
    id: 1,
    title: "Building a Linux distro from scratch",
    excerpt: "Learnings from compiling the kernel, configuring BusyBox, and creating bootable ISOs with Syslinux.",
    date: "Nov 2025",
    category: "SYSTEMS",
    color: "from-blue-500/10 to-cyan-500/10",
    accent: "text-blue-400",
  },
  {
    id: 2,
    title: "MCP protocol in LLM apps",
    excerpt:
      "Implementing Model Context Protocol for seamless AI model interactions with vector databases in RAG apps.",
    date: "Apr 2025",
    category: "AI / ML",
    color: "from-purple-500/10 to-pink-500/10",
    accent: "text-purple-400",
  },
  {
    id: 3,
    title: "Next.js 16 + Tailwind v4",
    excerpt: "Exploring the new features in Next.js 16 and migrating to Tailwind CSS v4's new configuration system.",
    date: "Dec 2024",
    category: "FRONTEND",
    color: "from-emerald-500/10 to-teal-500/10",
    accent: "text-emerald-400",
  },
  {
    id: 4,
    title: "Self-hosting LLMs with FastAPI",
    excerpt: "Running Llama2 locally and building a personal chatbot API for natural language tasks.",
    date: "Oct 2023",
    category: "BACKEND",
    color: "from-orange-500/10 to-amber-500/10",
    accent: "text-orange-400",
  },
]

export function LabNotes() {
  return (
    <section id="notes" className="px-6 lg:px-12 py-24 bg-gui-bg text-gui-text border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">
              Lab <span className="text-gui-accent">Notes</span>
            </h2>
            <p className="text-gui-text/40 mt-4 max-w-md font-mono text-sm uppercase tracking-widest">
              Technical findings and thoughts from the workbench.
            </p>
          </div>
          <div className="flex items-center gap-4 text-gui-text/30 font-mono text-[10px] uppercase">
            <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> 24 Articles</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Updated Weekly</span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {notes.map((note, index) => (
            <article
              key={note.id}
              className={cn(
                "group relative cursor-pointer overflow-hidden rounded-3xl border border-white/5 bg-gui-primary/20 p-8 transition-all duration-500 hover:bg-gui-primary/40 hover:border-white/10",
              )}
            >
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                  note.color,
                )}
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 flex items-center justify-between">
                  <div className={cn("flex items-center gap-2 font-mono text-[10px] font-bold tracking-widest uppercase", note.accent)}>
                    <Tag className="h-3 w-3" />
                    {note.category}
                  </div>
                  <span className="font-mono text-[10px] text-gui-text/30 uppercase tracking-tighter">{note.date}</span>
                </div>

                <h3 className="mb-4 text-2xl font-bold tracking-tight transition-colors duration-300 group-hover:text-gui-accent">
                  {note.title}
                </h3>

                <p className="text-gui-text/50 text-sm leading-relaxed mb-8 flex-1">
                  {note.excerpt}
                </p>

                <div className="flex items-center gap-2 font-mono text-[10px] uppercase font-bold tracking-widest text-gui-accent opacity-60 group-hover:opacity-100 transition-opacity">
                  <span>Open Entry</span>
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>

              {/* Status Indicator */}
              <div className="absolute top-8 right-8 h-1 w-1 rounded-full bg-white/10" />
            </article>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
           <button className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 font-mono text-xs uppercase tracking-widest text-gui-text hover:bg-gui-accent hover:text-gui-bg hover:border-gui-accent transition-all duration-500">
             Load More Signal Archives
           </button>
        </div>
      </div>
    </section>
  )
}
