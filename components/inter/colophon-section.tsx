"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Mail, Terminal, Zap, Globe, MapPin } from "lucide-react"

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
    <footer ref={sectionRef} id="colophon" className="relative bg-black overflow-hidden z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto w-full border-x border-white/5 bg-zinc-900/5 px-8 md:px-12 py-24 relative z-10">
        <div ref={contentRef} className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-12">
        
          {/* Column 1: Identity */}
          <div className="footer-column space-y-8">
             <div className="flex items-center gap-4">
                <div className="h-10 w-10 border border-teal-500 bg-black flex items-center justify-center text-teal-500 shadow-[0_0_20px_rgba(20,184,166,0.2)]">
                   <Zap className="h-5 w-5" />
                </div>
                <span className="font-mono text-xs font-black uppercase tracking-[0.2em] text-white">Syifa Pajril Yaum</span>
             </div>
             <div className="space-y-4 font-mono text-[10px] text-white/20 uppercase leading-relaxed tracking-widest">
                <div className="space-y-1">
                   <p className="text-teal-500/60 font-bold">SYIFA PAJRIL YAUM</p>
                   <p>AI_&_FULLSTACK_DEVELOPER_v1.1.0</p>
                </div>
                <div className="space-y-1 flex items-center gap-2">
                   <MapPin className="h-3 w-3 text-teal-500/40" />
                   <p>Kuningan, West Java</p>
                </div>
             </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="footer-column space-y-6">
             <h4 className="font-mono text-[9px] font-bold text-teal-500 uppercase tracking-[0.3em] border-b border-white/10 pb-3 inline-block">Explore_Network</h4>
             <ul className="space-y-4 font-mono text-[10px] uppercase tracking-widest">
                <li><button onClick={scrollToTop} className="text-white/30 hover:text-teal-500 transition-colors flex items-center gap-2 group"><span className="opacity-0 group-hover:opacity-100 transition-opacity">[&gt;]</span> System_Root</button></li>
                <li><a href="#projects" className="text-white/30 hover:text-teal-500 transition-colors flex items-center gap-2 group"><span className="opacity-0 group-hover:opacity-100 transition-opacity">[&gt;]</span> Artifacts</a></li>
                <li><a href="#chronology" className="text-white/30 hover:text-teal-500 transition-colors flex items-center gap-2 group"><span className="opacity-0 group-hover:opacity-100 transition-opacity">[&gt;]</span> System_Log</a></li>
                <li><a href="#mission_control" className="text-white/30 hover:text-teal-500 transition-colors flex items-center gap-2 group"><span className="opacity-0 group-hover:opacity-100 transition-opacity">[&gt;]</span> Control_Room</a></li>
             </ul>
          </div>

          {/* Column 3: Transmission */}
          <div className="footer-column space-y-6">
             <h4 className="font-mono text-[9px] font-bold text-teal-500 uppercase tracking-[0.3em] border-b border-white/10 pb-3 inline-block">Secure_Channels</h4>
             <div className="flex flex-col gap-4">
                <a href="https://github.com/timbubadibako" target="_blank" className="flex items-center gap-4 text-white/30 hover:text-teal-500 transition-all group font-mono text-[10px] tracking-widest uppercase">
                   <div className="p-2 border border-white/5 bg-zinc-900/40 group-hover:border-teal-500/40 group-hover:bg-teal-500/5 transition-all">
                      <ExternalLink className="h-4 w-4" />
                   </div>
                   GITHUB_CORE
                </a>
                <a href="mailto:pjrlywm@gmail.com" className="flex items-center gap-4 text-white/30 hover:text-teal-500 transition-all group font-mono text-[10px] tracking-widest uppercase">
                   <div className="p-2 border border-white/5 bg-zinc-900/40 group-hover:border-teal-500/40 group-hover:bg-teal-500/5 transition-all">
                      <Mail className="h-4 w-4" />
                   </div>
                   DIRECT_SIGNAL
                </a>
             </div>
          </div>

          {/* Column 4: Terminal Trigger */}
          <div className="footer-column flex flex-col justify-end items-end gap-8">
             <div className="text-right space-y-2">
                <p className="font-mono text-[8px] text-white/10 uppercase tracking-[0.4em] leading-loose">
                   Authorized Access Only <br />
                   Level_03_Security_Clearance
                </p>
             </div>
             <button 
               onClick={() => onModeSwitch?.('terminal')}
               className="group flex items-center gap-6 p-1 pl-10 border border-teal-500/30 bg-black hover:bg-teal-500/5 transition-all duration-500 hover:border-teal-500 hover:shadow-[0_0_30px_rgba(20,184,166,0.3)]"
             >
               <span className="font-press-start text-[8px] text-teal-500/40 group-hover:text-teal-500 transition-colors uppercase tracking-tight">
                 [ RE_INITIALIZE_CLI ]
               </span>
               <div className="h-12 w-12 border border-teal-500 bg-teal-500 text-black flex items-center justify-center shadow-[0_0_20px_rgba(20,184,166,0.3)] transition-all">
                  <Terminal className="h-5 w-5" />
               </div>
             </button>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[8px] uppercase tracking-[0.5em] text-white/10">
           <p>© 2026 SYIFA PAJRIL YAUM // PORTFOLIO_WEB_v1.1.0</p>
           <div className="flex items-center gap-8">
              <span className="flex items-center gap-2"><Globe className="h-3 w-3" /> INDONESIA_NODE</span>
              <span className="flex items-center gap-2 font-bold text-teal-500/10 tracking-[0.2em]">STABLE_CONNECTION</span>
           </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute -bottom-32 -right-32 w-[30vw] h-[30vw] bg-teal-500/[0.03] blur-[120px] rounded-full pointer-events-none" />
    </footer>
  )
}
