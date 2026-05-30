"use client"

import { cn } from "@/lib/utils"
import { Star, GitFork, Sparkles, Zap, ShieldCheck, Code2, Search } from "lucide-react"
import { ScrambleText } from "./scramble-text"

const projects = [
  {
    title: "E-Commerce POS",
    description: "Enterprise-grade Point of Sale system with offline synchronization and real-time inventory management.",
    tech: ["Flutter", "Supabase", "PostgreSQL"],
    link: "#",
    stars: 124,
    forks: 12,
    icon: Zap,
  },
  {
    title: "Neural Scaffolding",
    description: "AI-driven project generator using Gemini & Next.js.",
    tech: ["Next.js", "AI", "Prisma"],
    link: "#",
    stars: 89,
    forks: 5,
    icon: Sparkles,
  },
  {
    title: "Cyber Security Audit",
    description: "Automated vulnerability scanner for cloud infrastructure.",
    tech: ["Python", "Docker", "AWS"],
    link: "#",
    stars: 45,
    forks: 3,
    icon: ShieldCheck,
  }
]

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 bg-black min-h-screen z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
           <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-teal-500 font-bold">02 // DEPLOYMENTS</span>
              <h2 className="mt-4 font-press-start text-3xl md:text-5xl tracking-tighter uppercase terminal-text-glow text-white">
                <ScrambleText text="ARTIFACTS_COLLECTION" duration={1.2} />
              </h2>
           </div>
           <div className="flex flex-col items-end font-mono text-[9px] text-white/20 uppercase tracking-widest text-right">
              <span>Cluster_Node: Secure</span>
              <span>Uptime: 2.8k_Hours</span>
           </div>
        </div>

        {/* 
            PRECISE BENTO LAYOUT (8x4 Logic)
            Mapped to CSS 4-column Grid:
            - Left Main (2x2 units): col-span-2 row-span-2
            - Right Top (2x1 units): col-span-2 row-span-1
            - Right Bottom Left (1x1 unit): col-span-1 row-span-1
            - Right Bottom Right (1x1 unit): col-span-1 row-span-1 (Discover)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[280px]">
          
          {/* 1. PRIMARY PROJECT (LEFT 4x4) */}
          <ProjectCard 
            project={projects[0]} 
            className="lg:col-span-2 lg:row-span-2" 
          />

          {/* 2. SECONDARY PROJECT (RIGHT TOP 4x2) */}
          <ProjectCard 
            project={projects[1]} 
            className="lg:col-span-2 lg:row-span-1" 
          />

          {/* 3. TERTIARY PROJECT (RIGHT BOTTOM LEFT 2x2) */}
          <ProjectCard 
            project={projects[2]} 
            className="lg:col-span-1 lg:row-span-1" 
          />

          {/* 4. DISCOVER MORE (RIGHT BOTTOM RIGHT 2x2) */}
          <div className="relative group overflow-hidden rounded-[2.5rem] border-2 border-dashed border-teal-500/20 bg-teal-500/5 p-10 flex flex-col justify-center items-center transition-all duration-500 hover:border-teal-500/40 hover:bg-teal-500/10 cursor-pointer lg:col-span-1 lg:row-span-1">
             <div className="text-center space-y-4">
                <div className="h-12 w-12 rounded-full border border-teal-500/30 flex items-center justify-center mx-auto group-hover:bg-teal-500 group-hover:text-black transition-all duration-500">
                   <Search className="h-5 w-5 text-teal-400 group-hover:text-inherit" />
                </div>
                <div>
                   <span className="block font-press-start text-[10px] text-teal-400 uppercase tracking-tighter mb-2">
                      EXPLORE_ALL
                   </span>
                   <span className="font-mono text-[9px] text-teal-500/40 uppercase tracking-widest block leading-tight">
                      Discover more <br/> projects
                   </span>
                </div>
                <div className="flex gap-1.5 justify-center opacity-40">
                   <div className="w-1 h-1 rounded-full bg-teal-500 animate-pulse" />
                   <div className="w-1 h-1 rounded-full bg-teal-500 animate-pulse [animation-delay:200ms]" />
                   <div className="w-1 h-1 rounded-full bg-teal-500 animate-pulse [animation-delay:400ms]" />
                </div>
             </div>
             <a href="https://github.com" target="_blank" className="absolute inset-0 z-20" />
          </div>

        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, className }: { project: any, className?: string }) {
  return (
    <div className={cn(
      "group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-900/50 p-10 transition-all duration-500 hover:bg-zinc-900 hover:border-teal-500/40 hover:shadow-[0_0_50px_rgba(20,184,166,0.1)]",
      className
    )}>
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black border border-white/10 text-teal-400 transition-all duration-500 group-hover:bg-teal-500 group-hover:text-black">
            <project.icon className="h-6 w-6" />
          </div>
          <div className="flex gap-4 font-mono text-[10px] uppercase text-white/40">
            <span className="flex items-center gap-1"><Star className="h-3 w-3" /> {project.stars}</span>
            <span className="flex items-center gap-1"><GitFork className="h-3 w-3" /> {project.forks}</span>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-teal-400 transition-colors uppercase font-mono">
            {project.title}
          </h3>
          <p className="text-white/40 text-xs font-mono leading-relaxed line-clamp-3 group-hover:text-white/60 transition-colors">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tech.map((t: string) => (
              <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[8px] font-mono uppercase text-white/40">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #14b8a6 1px, transparent 0)', backgroundSize: '16px 16px' }} 
      />

      <a 
        href={project.link} 
        className="absolute inset-0 z-20 cursor-pointer"
        aria-label={`View ${project.title}`}
      />
    </div>
  )
}
