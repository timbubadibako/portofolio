"use client"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrambleText } from "./scramble-text"
import { GraduationCap, Briefcase, Award, Activity } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const iconMap: Record<string, any> = {
  briefcase: Briefcase,
  award: Award,
  "graduation-cap": GraduationCap
}

interface TimelineItem {
  id: number
  type: 'education' | 'experience' | 'certification'
  title: string
  subtitle: string
  period: string
  icon: string
  tag: string
}

export function ChronologySection() {
  const [timelineData, setTimelineData] = useState<TimelineItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const data = require('@/lib/data/chronology.json')
    setTimelineData(data)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (isLoading || !containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(".timeline-main-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 2,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: ".timeline-viewport",
          start: "top 80%",
        },
      })

      gsap.from(".timeline-node", {
        opacity: 0,
        y: (i, target) => (target.classList.contains('top-node') ? -40 : 40),
        stagger: 0.15,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".timeline-viewport",
          start: "top 75%",
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [isLoading])

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'education': return "text-cyan-400 bg-cyan-500/10 border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]"
      case 'experience': return "text-green-400 bg-green-500/10 border-green-500/20 shadow-[0_0_15px_rgba(74,222,128,0.1)]"
      case 'certification': return "text-orange-400 bg-orange-500/10 border-orange-500/20 shadow-[0_0_15px_rgba(251,146,60,0.1)]"
      default: return "text-teal-400 bg-teal-500/10 border-teal-500/20"
    }
  }

  const getTagColor = (type: string) => {
    switch (type) {
      case 'education': return "text-cyan-500"
      case 'experience': return "text-green-500"
      case 'certification': return "text-orange-500"
      default: return "text-teal-500"
    }
  }

  if (isLoading) return null

  return (
    <section 
      id="chronology" 
      ref={containerRef} 
      className="relative py-32 bg-black overflow-hidden min-h-screen border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col border-x border-white/5 bg-zinc-900/5 relative z-10 px-8 md:px-12">
        <div className="flex items-center justify-between mb-12 md:mb-20 pr-12">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-teal-500 font-bold flex items-center gap-4">
              <span className="h-px w-12 bg-teal-500/30" />
              05 // SYSTEM_LOG
            </span>
            <h2 className="mt-4 font-press-start text-3xl md:text-5xl tracking-tighter uppercase terminal-text-glow text-white">
              <ScrambleText text="BACKGROUND" duration={1} />
            </h2>
          </div>
          <div className="hidden lg:block p-4 border border-white/10 bg-zinc-900/10 text-[9px] font-mono text-white/30 uppercase tracking-[0.2em] relative">
            <div className="absolute top-0 left-0 w-1 h-1 bg-teal-500/40" />
            <div className="absolute bottom-0 right-0 w-1 h-1 bg-teal-500/40" />
            Flow_Direction: PRESENT &gt;&gt; PAST <br />
            Archive_Status: UNLOCKED
          </div>
        </div>

        <div className="timeline-viewport relative py-40 overflow-x-auto scrollbar-hide no-scrollbar w-full">
          {/* Background Line */}
          <div className="timeline-main-line absolute top-1/2 left-0 w-[3000px] h-[2px] bg-gradient-to-r from-teal-500/80 via-teal-500/20 to-transparent z-0" />

          <div className="flex items-center gap-0 w-max px-0 relative z-10">
            
            {/* STARTING NODE [NOW] */}
            <div className="flex flex-col items-center w-80 mr-12">
              <div className="relative">
                <div className="h-12 w-12 border border-teal-500/40 flex items-center justify-center animate-pulse bg-teal-500/5">
                   <Activity className="h-6 w-6 text-teal-500" />
                </div>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-teal-500 font-black mt-6 text-center">
                [ PRESENT ]
              </span>
            </div>

            {timelineData.map((item, index) => {
              const isTop = index % 2 === 0
              const styles = getTypeStyles(item.type)
              const tagColor = getTagColor(item.type)
              const Icon = iconMap[item.icon] || Briefcase
              
              return (
                <div
                  key={item.id}
                  className={cn(
                    "timeline-node relative flex flex-col items-center w-72 md:w-96",
                    isTop ? "top-node mb-[220px] md:mb-[380px]" : "bottom-node mt-[220px] md:mt-[380px]"
                  )}
                >
                  {/* Vertical Linkage */}
                  <div className={cn(
                    "absolute w-px bg-white/10 group-hover:bg-teal-500/40 transition-colors duration-500",
                    isTop ? "h-[110px] md:h-[190px] bottom-[-110px] md:bottom-[-190px]" : "h-[110px] md:h-[190px] top-[-110px] md:top-[-190px]"
                  )} />

                  {/* Node Dot */}
                  <div className={cn(
                    "absolute h-3 w-3 border bg-black transition-all duration-500 z-20",
                    isTop ? "bottom-[-116px] md:bottom-[-196px]" : "top-[-116px] md:top-[-196px]",
                    item.type === 'education' ? "border-cyan-500" : item.type === 'experience' ? "border-green-500" : "border-orange-500"
                  )} />

                  {/* Card UI (Sharp) */}
                  <div className={cn(
                    "group relative p-8 border border-white/10 bg-zinc-900/40 backdrop-blur-xl transition-all duration-500 hover:bg-zinc-900 hover:border-white/30 w-full",
                    isTop ? "text-right" : "text-left"
                  )}>
                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20" />

                    <div className="flex flex-col gap-4">
                      <div className={cn(
                        "flex items-center gap-4",
                        isTop ? "flex-row-reverse" : "flex-row"
                      )}>
                        <div className={cn(
                          "h-10 w-10 border flex items-center justify-center transition-all duration-500 group-hover:invert",
                          styles
                        )}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                           <span className={cn("font-mono text-[9px] font-black uppercase tracking-widest", tagColor)}>
                             [{item.tag}]
                           </span>
                           <span className="font-mono text-[10px] text-white/20 font-bold uppercase tracking-[0.2em]">{item.period}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-white font-bold uppercase tracking-tight text-base md:text-lg leading-tight group-hover:text-teal-400 transition-colors font-mono">
                          {item.title}
                        </h4>
                        <p className="text-white/20 text-[10px] md:text-xs font-mono uppercase tracking-widest mt-1">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* END NODE [BEGINNING] */}
            <div className="flex flex-col items-center w-80 ml-12">
               <div className="h-8 w-8 border border-white/10 flex items-center justify-center rotate-45">
                  <div className="h-2 w-2 bg-white/20" />
               </div>
               <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/10 font-bold mt-6">
                 [ 2023 ]
               </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
