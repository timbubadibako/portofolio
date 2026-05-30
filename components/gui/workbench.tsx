"use client"

import { cn } from "@/lib/utils"
import { ExternalLink, GitBranch, Radio, Cpu, HardDrive, Layout } from "lucide-react"

const wipItems = [
  {
    id: 1,
    name: "next16-docker-starter",
    description: "Next.js 16 containerized boilerplate with cross-layer state management.",
    progress: 85,
    lastUpdated: "4H AGO",
    url: "#",
    icon: Cpu,
  },
  {
    id: 2,
    name: "handbuilt-linux",
    description: "Minimal LFS implementation with custom init systems and zero-bloat kernels.",
    progress: 62,
    lastUpdated: "2D AGO",
    url: "#",
    icon: HardDrive,
  },
  {
    id: 3,
    name: "neural-decorator",
    description: "AI prompt engineering engine for standardized project manifest generation.",
    progress: 94,
    lastUpdated: "LIVE",
    url: "#",
    icon: Radio,
  },
  {
    id: 4,
    name: "interface-studies",
    description: "Experimental UI components exploring human-machine interaction patterns.",
    progress: 78,
    lastUpdated: "1W AGO",
    url: "#",
    icon: Layout,
  },
]

export function Workbench() {
  return (
    <section id="workbench" className="px-6 lg:px-12 py-24 bg-gui-bg text-gui-text border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">
              Active <span className="text-gui-accent">Workbench</span>
            </h2>
            <p className="text-gui-text/40 mt-4 max-w-md font-mono text-sm uppercase tracking-widest">
              Live telemetry from concurrent development streams.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gui-accent/20 bg-gui-accent/5">
             <div className="h-1.5 w-1.5 rounded-full bg-gui-accent animate-pulse" />
             <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gui-accent font-bold">Engine: Online</span>
          </div>
        </div>

        <div className="rounded-[2.5rem] border border-white/5 bg-gui-primary/10 overflow-hidden backdrop-blur-3xl shadow-2xl">
          {/* Header Simulation */}
          <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-8 py-6">
            <div className="flex items-center gap-4">
               <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
               </div>
               <div className="h-4 w-px bg-white/10 mx-2" />
               <span className="font-mono text-xs text-gui-text/40 uppercase tracking-widest flex items-center gap-2">
                 <GitBranch className="h-3 w-3" /> main-cluster / experiments
               </span>
            </div>
            <div className="hidden sm:block font-mono text-[10px] text-gui-accent/60 uppercase tracking-tighter">
               Total Assets: 142 // Bandwidth: 82MBPS
            </div>
          </div>

          <div className="divide-y divide-white/5">
            {wipItems.map((item, index) => (
              <a
                key={item.id}
                href={item.url}
                className="group flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 transition-all duration-500 hover:bg-white/5"
              >
                <div className="flex items-start gap-6 flex-1">
                  <div className="p-4 rounded-2xl bg-gui-bg border border-white/5 text-gui-text/40 group-hover:text-gui-accent group-hover:border-gui-accent/30 transition-all duration-500">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-bold text-lg tracking-tight group-hover:text-gui-accent transition-colors">
                        {item.name}
                      </h4>
                      <ExternalLink className="h-3 w-3 text-white/10 group-hover:text-gui-accent transition-colors" />
                    </div>
                    <p className="text-sm text-gui-text/40 max-w-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-8 pl-[4.5rem] md:pl-0">
                  <div className="flex flex-col gap-2 w-32 md:w-48">
                    <div className="flex justify-between font-mono text-[10px] uppercase tracking-tighter text-gui-text/30">
                       <span>Stability</span>
                       <span className="text-gui-accent">{item.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                      <div
                        className="h-full bg-gui-accent transition-all duration-1000 ease-out relative"
                        style={{ width: `${item.progress}%` }}
                      >
                         <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-mono text-gui-text/20 uppercase tracking-widest">Last Sync</p>
                     <p className="text-xs font-bold text-gui-text/60">{item.lastUpdated}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Footer Bar */}
          <div className="bg-white/5 border-t border-white/5 px-8 py-5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-gui-text/30">
             <div className="flex gap-6">
                <span className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-gui-accent" /> RT-FEED</span>
                <span className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-white/20" /> DATABASE: OK</span>
             </div>
             <div className="animate-pulse">Waiting for remote signals...</div>
          </div>
        </div>
      </div>
    </section>
  )
}
