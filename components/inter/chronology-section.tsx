"use client"

import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrambleText } from "./scramble-text"
import { GraduationCap, Briefcase, Activity } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface TimelineItem {
  id: number
  type: 'education' | 'experience'
  title: string
  subtitle: string
  period: string
  icon: any
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    type: 'education',
    title: "High School Certification",
    subtitle: "Focus: Math & Physics",
    period: "2016 - 2018",
    icon: GraduationCap,
  },
  {
    id: 2,
    type: 'education',
    title: "B.Tech Information Technology",
    subtitle: "SRM University, India",
    period: "2018 - 2022",
    icon: GraduationCap,
  },
  {
    id: 3,
    type: 'experience',
    title: "Microsoft Threat Expert",
    subtitle: "Mindtree Ltd, Chennai",
    period: "2021 - 2022",
    icon: Briefcase,
  },
  {
    id: 4,
    type: 'experience',
    title: "SOC Analyst",
    subtitle: "LTIMindtree Ltd, Chennai",
    period: "2022 - 2023",
    icon: Briefcase,
  },
  {
    id: 5,
    type: 'education',
    title: "M.S. in Cybersecurity",
    subtitle: "Pace University, NY",
    period: "2023 - 2025",
    icon: GraduationCap,
  },
  {
    id: 6,
    type: 'experience',
    title: "Cyber Range Assistant",
    subtitle: "Pace University",
    period: "Feb 2024 - PRESENT",
    icon: Briefcase,
  },
  {
    id: 7,
    type: 'experience',
    title: "Security Engineer Intern",
    subtitle: "Cantonica, Inc., NY",
    period: "Jun 2024 - Sep 2024",
    icon: Briefcase,
  },
]

export function ChronologySection() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

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
  }, [])

  return (
    <section 
      id="chronology" 
      ref={containerRef} 
      className="relative py-32 pl-8 md:pl-14 bg-black/10 overflow-hidden min-h-screen border-b border-white/5"
    >
      <div className="w-full">
        <div className="flex items-center justify-between mb-16 px-12">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-teal-500 font-bold">03 // CHRONOLOGY</span>
            <h2 className="mt-4 font-press-start text-3xl md:text-5xl tracking-tighter uppercase terminal-text-glow text-white">
              <ScrambleText text="TEMPORAL_LOG" duration={1} />
            </h2>
          </div>
          <div className="hidden lg:block p-4 border border-white/5 rounded-2xl bg-white/5 text-[9px] font-mono text-white/30 uppercase tracking-[0.2em]">
            Data_Retention: Permanent <br />
            Sync_Protocol: 0x88AF
          </div>
        </div>

        {/* 
            TIMELINE VIEWPORT: 
            True edge-to-edge by removing px-20 and using w-full.
        */}
        <div className="timeline-viewport relative py-40 overflow-x-auto scrollbar-hide no-scrollbar w-full">
          {/* Background Line */}
          <div className="timeline-main-line absolute top-1/2 left-0 w-[3000px] h-[2px] bg-gradient-to-r from-teal-500/80 via-teal-500/20 to-transparent z-0" />

          <div className="flex items-center gap-0 w-max px-0 relative z-10">
            {timelineData.map((item, index) => {
              const isEducation = item.type === 'education'
              return (
                <div
                  key={item.id}
                  className={cn(
                    "timeline-node relative flex flex-col items-center w-80",
                    isEducation ? "top-node mb-[350px]" : "bottom-node mt-[350px]"
                  )}
                >
                  {/* Vertical Linkage */}
                  <div className={cn(
                    "absolute w-px bg-white/10 group-hover:bg-teal-500/40 transition-colors duration-500",
                    isEducation ? "h-[175px] bottom-[-175px]" : "h-[175px] top-[-175px]"
                  )} />

                  {/* Node Dot */}
                  <div className={cn(
                    "absolute h-3 w-3 rounded-full border-2 bg-black transition-all duration-500 shadow-[0_0_15px_rgba(20,184,166,0)] group-hover:shadow-[0_0_20px_rgba(20,184,166,1)]",
                    isEducation ? "bottom-[-181px] border-teal-500" : "top-[-181px] border-teal-500"
                  )} />

                  {/* Card UI */}
                  <div className={cn(
                    "group relative p-10 rounded-[2.5rem] border border-white/10 bg-zinc-900/40 backdrop-blur-2xl transition-all duration-700 hover:bg-zinc-900 hover:border-teal-500/40 w-full shadow-2xl",
                    isEducation ? "text-right" : "text-left"
                  )}>
                    <div className="flex flex-col gap-4">
                      <div className={cn(
                        "flex items-center gap-4",
                        isEducation ? "flex-row-reverse" : "flex-row"
                      )}>
                        <div className="h-12 w-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20 shadow-lg group-hover:bg-teal-500 group-hover:text-black group-hover:rotate-12 transition-all duration-500">
                          <item.icon className="h-6 w-6" />
                        </div>
                        <span className="font-mono text-[11px] text-teal-500 font-bold uppercase tracking-[0.2em]">{item.period}</span>
                      </div>

                      <div>
                        <h4 className="text-white font-bold uppercase tracking-tight text-lg leading-[1.1] group-hover:text-teal-400 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-white/30 text-xs font-mono uppercase tracking-widest">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="absolute inset-0 -z-10 bg-teal-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              )
            })}

            {/* Real-time Tracking Node */}
            <div className="flex flex-col items-center w-80 ml-20">
              <div className="relative">
                <div className="h-8 w-8 bg-teal-500 rounded-full animate-ping opacity-20" />
                <div className="absolute inset-0 h-8 w-8 bg-teal-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(20,184,166,0.5)]">
                  <Activity className="h-4 w-4 text-black" />
                </div>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-teal-400 font-black mt-10 text-center animate-pulse">
                SYNCING_TEMPORAL_DATA...
              </span>
            </div>
          </div>
        </div>

        {/* Scroll Interaction Guide */}
        {/* <div className="mt-24 p-10 border border-white/5 bg-white/[0.02] rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 mr-12">
          <div className="flex items-center gap-6">
            <div className="px-4 py-2 rounded-xl bg-black border border-white/10 font-mono text-[10px] text-teal-500/60 tracking-[0.3em] uppercase">
              Shift + Scroll
            </div>
            <span className="font-mono text-[10px] text-white/20 uppercase tracking-[0.2em]">Traverse the chronological data stream</span>
          </div>
          <div className="flex gap-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/5" />
            ))}
          </div>
        </div> */}
      </div>
    </section>
  )
}
