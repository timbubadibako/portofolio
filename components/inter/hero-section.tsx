"use client"

import { useEffect, useRef } from "react"
import { ScrambleText } from "@/components/inter/scramble-text"
import { GlitchText } from "@/components/inter/glitch-text"
import { SplitFlapText, SplitFlapMuteToggle } from "@/components/inter/split-flap-text"
import { HolographicPortrait } from "@/components/inter/holographic-portrait"
import { ChevronRight, Sparkles } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center overflow-hidden border-b border-white/5">
      {/* Left vertical labels - Fixed position relative to viewport or section? 
          Keeping them relative to section for now but outside the max-w container.
      */}
      <div className="absolute left-4 md:left-14 top-1/2 -translate-y-1/2 z-20">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-teal-500/40 -rotate-90 origin-left block whitespace-nowrap">
          SYSTEM_IDENTITY // v1.1.0
        </span>
      </div>

      <div className="max-w-7xl mx-auto w-full px-8 md:px-24 relative z-10 border-x border-white/5 bg-zinc-900/[0.02]">
        <div ref={contentRef} className="w-full flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* LEFT PANEL: TEXT & CTAs */}
          <div className="flex-1 w-full lg:max-w-2xl">
          <div className="relative">
            <div className="space-y-2 md:space-y-4">
               <div className="flex flex-col">
                  <SplitFlapText text="SYIFA" speed={60} />
                  <SplitFlapText text="PAJRIL YAUM" speed={80} />
               </div>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <SplitFlapMuteToggle />
              <div className="h-px w-12 bg-teal-500/20" />
              <span className="font-mono text-[10px] text-teal-500/40 uppercase tracking-widest flex items-center gap-2">
                 <div className="w-1 h-1 rounded-full bg-teal-500 animate-pulse" />
                 Audio_Signals_Enabled
              </span>
            </div>
          </div>

          <h2 className="font-mono text-teal-400/80 text-[clamp(0.8rem,2vw,1.2rem)] mt-12 tracking-[0.2em] uppercase max-w-xl leading-relaxed">
            <GlitchText text="AI & FULLSTACK DEVELOPER" intensity="low" /> <br />
            <span className="text-white/40">
              <ScrambleText text="Architecting solid ecosystems from fundamental infrastructure to neural execution." duration={2} delayMs={1000} />
            </span>
          </h2>

          <div className="flex flex-col sm:flex-row gap-6 mt-16">
            <button 
               onClick={(e) => scrollToSection(e as any, 'projects')}
               className="px-8 py-4 border border-teal-500/30 bg-teal-500/5 text-teal-400 font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-teal-500 hover:text-black transition-all duration-500 group flex items-center gap-4"
             >
                [ EXPLORE_LATEST_PROJECTS ]
                <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
             </button>
             <button 
               onClick={(e) => scrollToSection(e as any, 'chronology')}
               className="px-8 py-4 border border-white/10 bg-white/5 text-white/40 font-mono text-[10px] uppercase tracking-[0.3em] hover:border-teal-500/50 hover:text-white transition-all duration-500 flex items-center gap-4"
             >
                [ ACCESS_SYSTEM_LOG ]
                <Sparkles className="h-3 w-3 text-teal-500/40" />
             </button>
          </div>
        </div>

        {/* RIGHT PANEL: HOLOGRAPHIC PORTRAIT */}
        <div className="hidden lg:block w-full max-w-sm xl:max-w-md">
           <HolographicPortrait src="/assets/profile/profile.png" className="w-full" />
        </div>
      </div>
      </div>

      {/* Background Graphic Overlay */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-full pointer-events-none opacity-5">
         <div className="w-full h-full border-l border-teal-500/20 flex flex-col justify-center gap-12 pl-12">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-px w-full bg-gradient-to-r from-teal-500 to-transparent" />
            ))}
         </div>
      </div>
      
      {/* Scroll Hint */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20 hidden md:flex">
         <div className="w-px h-12 bg-gradient-to-b from-teal-500 to-transparent animate-bounce" />
         <span className="font-mono text-[8px] uppercase tracking-[0.5em]">Scroll_To_Navigate</span>
      </div>
    </section>
  )
}

