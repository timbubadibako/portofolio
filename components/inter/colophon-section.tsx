"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Mail, Terminal, Zap, Globe, Cpu } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function ColophonSection({ onModeSwitch }: { onModeSwitch?: (mode: 'gui' | 'terminal' | 'inter') => void }) {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(".footer-column", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 95%",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer ref={sectionRef} id="colophon" className="relative py-24 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-white/5 bg-black overflow-hidden z-10">
      <div ref={contentRef} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-12">
        
        {/* Column 1: Identity */}
        <div className="footer-column space-y-6">
           <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-teal-500 flex items-center justify-center text-black shadow-[0_0_20px_rgba(20,184,166,0.3)]">
                 <Zap className="h-4 w-4" />
              </div>
              <span className="font-mono text-sm font-black uppercase tracking-[0.2em] text-white">DevPortal // JRILYM</span>
           </div>
           <div className="space-y-3 font-mono text-[11px] text-white/30 uppercase leading-relaxed tracking-wider">
              <p className="text-white/60 font-bold">JRILYM TIMBUBADIBAKO</p>
              <p>M.S. IN CYBERSECURITY</p>
              <p>PACE UNIVERSITY, NEW YORK</p>
           </div>
        </div>

        {/* Column 2: Navigation */}
        <div className="footer-column space-y-6">
           <h4 className="font-mono text-[10px] font-bold text-teal-400 uppercase tracking-[0.3em] border-b border-white/5 pb-2">Explore_Network</h4>
           <ul className="space-y-4 font-mono text-xs uppercase tracking-widest">
              <li><button onClick={scrollToTop} className="text-white/40 hover:text-teal-400 transition-colors flex items-center gap-2">&gt; System_Root</button></li>
              <li><a href="#projects" className="text-white/40 hover:text-teal-400 transition-colors flex items-center gap-2">&gt; Deployments</a></li>
              <li><a href="#chronology" className="text-white/40 hover:text-teal-400 transition-colors flex items-center gap-2">&gt; Temporal_Log</a></li>
              <li><a href="#signals" className="text-white/40 hover:text-teal-400 transition-colors flex items-center gap-2">&gt; Field_Notes</a></li>
           </ul>
        </div>

        {/* Column 3: Transmission */}
        <div className="footer-column space-y-6">
           <h4 className="font-mono text-[10px] font-bold text-teal-400 uppercase tracking-[0.3em] border-b border-white/5 pb-2">Secure_Channels</h4>
           <div className="flex flex-col gap-3">
              <a href="#" className="flex items-center gap-4 text-white/40 hover:text-teal-400 transition-all group font-mono text-xs tracking-widest">
                 <div className="p-2 rounded-lg bg-white/5 group-hover:bg-teal-500/10 transition-colors">
                    <ExternalLink className="h-4 w-4" />
                 </div>
                 GITHUB_CORE
              </a>
              <a href="#" className="flex items-center gap-4 text-white/40 hover:text-teal-400 transition-all group font-mono text-xs tracking-widest">
                 <div className="p-2 rounded-lg bg-white/5 group-hover:bg-teal-500/10 transition-colors">
                    <ExternalLink className="h-4 w-4" />
                 </div>
                 NEURAL_NET
              </a>
              <a href="mailto:hello@jrilym.dev" className="flex items-center gap-4 text-white/40 hover:text-teal-400 transition-all group font-mono text-xs tracking-widest">
                 <div className="p-2 rounded-lg bg-white/5 group-hover:bg-teal-500/10 transition-colors">
                    <Mail className="h-4 w-4" />
                 </div>
                 DIRECT_SIGNAL
              </a>
           </div>
        </div>

        {/* Column 4: Terminal Trigger (Optimized) */}
        <div className="footer-column flex flex-col justify-end items-end gap-6">
           <div className="text-right space-y-2">
              <p className="font-mono text-[9px] text-white/20 uppercase tracking-widest leading-tight">
                 Authorized Access Only <br />
                 Level_03_Security_Clearance
              </p>
           </div>
           <button 
             onClick={() => onModeSwitch?.('terminal')}
             className="group flex items-center gap-4 p-2 pl-8 rounded-full border border-teal-500/20 bg-teal-500/5 hover:bg-teal-500/10 transition-all duration-500 hover:border-teal-500/50"
           >
             <span className="font-press-start text-[8px] text-teal-400/40 group-hover:text-teal-400 transition-colors uppercase tracking-tighter">
               RE_INITIALIZE_CLI
             </span>
             <div className="h-12 w-12 rounded-full bg-teal-500 flex items-center justify-center text-black shadow-[0_0_20px_rgba(20,184,166,0.2)] group-hover:shadow-[0_0_35px_rgba(20,184,166,0.5)] group-hover:scale-110 transition-all">
                <Terminal className="h-5 w-5" />
             </div>
           </button>
        </div>
      </div>

      <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[8px] uppercase tracking-[0.5em] text-white/10">
         <p>© 2026 JRILYM TIMBUBADIBAKO // DATA_STRUCTURES_VALIDATED</p>
         <div className="flex items-center gap-8">
            <span className="flex items-center gap-2"><Globe className="h-3 w-3" /> NY_METRO_NODE</span>
            <span className="flex items-center gap-2 font-bold text-teal-500/20 underline decoration-teal-500/10 underline-offset-4 tracking-[0.2em]">STABLE_CONNECTION</span>
         </div>
      </div>

      {/* Background decoration */}
      <div className="absolute -bottom-32 -right-32 w-[30vw] h-[30vw] bg-teal-500/[0.03] blur-[120px] rounded-full pointer-events-none" />
    </footer>
  )
}
