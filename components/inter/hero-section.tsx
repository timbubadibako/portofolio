"use client"

import { useEffect, useRef } from "react"
import { ScrambleText, ScrambleTextOnHover } from "@/components/inter/scramble-text"
import { SplitFlapText, SplitFlapMuteToggle } from "@/components/inter/split-flap-text"
import { AnimatedNoise } from "@/components/inter/animated-noise"
import { BitmapChevron } from "@/components/inter/bitmap-chevron"
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
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center pl-6 md:pl-28 pr-6 md:pr-12 overflow-hidden">
      <AnimatedNoise opacity={0.03} />

      {/* Left vertical labels */}
      <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-teal-500/40 -rotate-90 origin-left block whitespace-nowrap">
          SYSTEM_IDENTITY // v1.0.4
        </span>
      </div>

      {/* Main content */}
      <div ref={contentRef} className="flex-1 w-full relative z-10">
        <div className="relative">
          <div className="space-y-4">
             <div className="flex flex-col">
                <SplitFlapText text="JRILYM" speed={60} />
                <SplitFlapText text="TIMBUBADIBAKO" speed={80} />
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
          <ScrambleText text="SYSTEM ARCHITECT & FULLSTACK DEVELOPER" duration={1.5} delayMs={500} /> <br />
          <span className="text-white/40">
            <ScrambleText text="Specialized in High-Integrity Digital Environments" duration={2} delayMs={1000} />
          </span>
        </h2>

        <div className="mt-16 flex items-center gap-8">
          <a
            href="#projects"
            onClick={(e) => scrollToSection(e, 'projects')}
            className="group inline-flex items-center gap-3 border border-teal-500/30 px-8 py-4 font-mono text-xs uppercase tracking-widest text-teal-400 hover:border-teal-400 hover:bg-teal-400/10 transition-all duration-300"
          >
            <ScrambleTextOnHover text="Initialize Deployments" as="span" duration={0.6} />
            <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45" />
          </a>
          <a
            href="#signals"
            onClick={(e) => scrollToSection(e, 'signals')}
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors duration-200"
          >
            <ScrambleTextOnHover text="Access_Signal_Archives" duration={0.4} />
          </a>
        </div>
      </div>

      {/* Background Graphic */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-full pointer-events-none opacity-10">
         <div className="w-full h-full border-l border-teal-500/20 flex flex-col justify-center gap-12 pl-12">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-px w-full bg-gradient-to-r from-teal-500 to-transparent" />
            ))}
         </div>
      </div>
      
      {/* Scroll Hint */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20">
         <div className="w-px h-12 bg-gradient-to-b from-teal-500 to-transparent animate-bounce" />
         <span className="font-mono text-[8px] uppercase tracking-[0.5em]">Scroll_To_Navigate</span>
      </div>
    </section>
  )
}
