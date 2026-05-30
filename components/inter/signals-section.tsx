"use client"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrambleText } from "./scramble-text"
import { ArrowUpRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const signals = [
  {
    date: "2025.06.10",
    title: "Signal Field Architecture",
    note: "Exploring new interface paradigms for ambient computing and neural-link environments.",
    tag: "RESEARCH",
  },
  {
    date: "2025.05.28",
    title: "Silent Agent Protocols",
    note: "Orchestration layer for autonomous design systems with high-integrity telemetry.",
    tag: "DEVLOG",
  },
  {
    date: "2025.05.15",
    title: "Noir Grid Systems",
    note: "Advanced typographic system for brutalist editorial interfaces in modern web.",
    tag: "DESIGN",
  },
  {
    date: "2025.04.30",
    title: "Project Lattice v2",
    note: "Structural framework for adaptive layouts and real-time state propagation.",
    tag: "STABILITY",
  },
  {
    date: "2025.04.12",
    title: "Echo Chamber Synthesis",
    note: "Audio-visual synthesis in browser environments using custom DSP filters.",
    tag: "EXPERIMENTAL",
  },
]

export function SignalsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (!sectionRef.current || !cursorRef.current) return

    const section = sectionRef.current
    const cursor = cursorRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(cursor, {
        x: x,
        y: y,
        duration: 0.5,
        ease: "power3.out",
      })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    section.addEventListener("mousemove", handleMouseMove)
    section.addEventListener("mouseenter", handleMouseEnter)
    section.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      section.removeEventListener("mousemove", handleMouseMove)
      section.removeEventListener("mouseenter", handleMouseEnter)
      section.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !cardsRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        },
      )

      const cards = cardsRef.current?.querySelectorAll("article")
      if (cards) {
        gsap.fromTo(
          cards,
          { x: 100, opacity: 0, scale: 0.9 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            stagger: 0.15,
            ease: "expo.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 90%",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="signals" ref={sectionRef} className="relative py-32 pl-6 md:pl-28 overflow-hidden bg-black/20">
      <div
        ref={cursorRef}
        className={cn(
          "pointer-events-none absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50",
          "w-12 h-12 rounded-full border border-teal-500 bg-teal-500/10 backdrop-blur-sm",
          "transition-opacity duration-300",
          isHovering ? "opacity-100" : "opacity-0",
        )}
      />

      <div ref={headerRef} className="mb-24 pr-6 md:pr-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-teal-400">04 // Signals</span>
        <h2 className="mt-4 font-press-start text-3xl md:text-5xl tracking-tighter uppercase terminal-text-glow">
          <ScrambleText text="FIELD_NOTES" duration={1.2} />
        </h2>
      </div>

      <div
        ref={(el) => {
          scrollRef.current = el
          cardsRef.current = el
        }}
        className="flex gap-12 overflow-x-auto pb-16 pr-12 scrollbar-hide no-scrollbar items-start"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {signals.map((signal, index) => (
          <SignalCard key={index} signal={signal} index={index} />
        ))}
      </div>

      {/* Decorative background label */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 -rotate-90 origin-right opacity-[0.02] pointer-events-none">
         <span className="font-press-start text-[12vw] uppercase leading-none whitespace-nowrap">SIGNALS</span>
      </div>
    </section>
  )
}

function SignalCard({
  signal,
  index,
}: {
  signal: { date: string; title: string; note: string; tag: string }
  index: number
}) {
  return (
    <article
      className={cn(
        "group relative flex-shrink-0 w-[450px] aspect-[16/10]",
        "transition-all duration-700 ease-out",
        "hover:scale-[1.02]",
      )}
    >
      <div className="relative h-full bg-white/5 border border-white/10 p-10 rounded-[2.5rem] flex flex-col justify-between backdrop-blur-xl group-hover:border-teal-500/30 transition-colors">
        
        {/* Top metadata */}
        <div className="flex items-start justify-between">
           <div className="space-y-1">
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-teal-400 font-bold">
                LOG_ENTRY_{String(index + 1).padStart(2, "0")}
              </span>
              <time className="block font-mono text-[10px] text-white/20 uppercase tracking-widest">{signal.date}</time>
           </div>
           <div className="px-3 py-1 rounded-full border border-white/10 bg-white/5 font-mono text-[8px] text-white/40 uppercase tracking-widest">
              {signal.tag}
           </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
           <h3 className="font-mono text-3xl font-black tracking-tighter text-white group-hover:text-teal-400 transition-colors leading-[0.9]">
             {signal.title}
           </h3>
           <p className="font-mono text-xs text-white/40 leading-relaxed max-w-sm">
             {signal.note}
           </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/5 pt-6">
           <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-teal-500" />
              <div className="w-1 h-1 rounded-full bg-teal-500/40" />
              <div className="w-1 h-1 rounded-full bg-teal-500/10" />
           </div>
           <button className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-teal-500/60 group-hover:text-teal-500 transition-colors">
              Read_Manifest <ArrowUpRight className="h-3 w-3" />
           </button>
        </div>

        {/* Subtle corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 blur-[40px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </article>
  )
}
