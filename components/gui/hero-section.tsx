"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Terminal, ArrowRight, Shield, Rocket, Globe } from "lucide-react"

export function HeroSection() {
  return (
    <section id="top" className="relative px-6 lg:px-12 py-32 lg:py-48 overflow-hidden bg-gui-bg">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-20" 
        style={{ backgroundImage: 'radial-gradient(#22c55e 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} 
      />
      
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gui-accent/10 border border-gui-accent/20 text-gui-accent font-mono text-[10px] uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-top duration-700">
             <Shield className="h-3 w-3" /> System Integrity Validated
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-gui-text uppercase leading-[0.9] mb-8 animate-in fade-in slide-in-from-left duration-1000">
            Design <span className="text-transparent bg-clip-text bg-gradient-to-r from-gui-accent to-emerald-400">Systems</span> That Behave.
          </h1>
          
          <p className="text-lg md:text-xl text-gui-text/60 max-w-xl leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
            Professional Fullstack Developer specialized in high-performance architectures, 
            cyber-security interfaces, and AI-driven automation. 
          </p>

          <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
            <Button size="lg" className="bg-gui-accent hover:bg-gui-accent/90 text-gui-bg font-bold uppercase tracking-wider rounded-2xl group">
              Initialize Project <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" className="border-white/10 hover:bg-white/5 text-gui-text rounded-2xl">
              Download Manifest
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Status Indicators */}
      <div className="hidden lg:block absolute top-1/2 right-12 -translate-y-1/2 space-y-4 animate-in fade-in slide-in-from-right duration-1000 delay-700">
        {[
          { label: "Uptime", value: "99.9%", icon: Rocket },
          { label: "Location", value: "Earth-01", icon: Globe },
          { label: "Language", value: "TS/DART", icon: Terminal },
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-3xl border border-white/5 bg-gui-primary/20 backdrop-blur-xl w-48 transition-transform hover:scale-105">
            <stat.icon className="h-5 w-5 text-gui-accent mb-3" />
            <p className="text-gui-text/40 text-[10px] uppercase font-mono">{stat.label}</p>
            <p className="text-gui-text font-bold tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
