"use client"

import { cn } from "@/lib/utils"
import { Star, GitFork, ExternalLink, Sparkles, Code2, ShieldCheck, Zap } from "lucide-react"

const projects = [
  {
    title: "E-Commerce POS",
    description: "Enterprise-grade Point of Sale system with offline synchronization and real-time inventory management.",
    tech: ["Flutter", "Supabase", "PostgreSQL"],
    link: "#",
    stars: 124,
    forks: 12,
    icon: Zap,
    gridClass: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Neural Scaffolding",
    description: "AI-driven project generator using Gemini & Next.js.",
    tech: ["Next.js", "AI", "Prisma"],
    link: "#",
    stars: 89,
    forks: 5,
    icon: Sparkles,
    gridClass: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Cyber Security Audit",
    description: "Automated vulnerability scanner for cloud infrastructure.",
    tech: ["Python", "Docker", "AWS"],
    link: "#",
    stars: 45,
    forks: 3,
    icon: ShieldCheck,
    gridClass: "md:col-span-1 md:row-span-1",
  },
  {
    title: "OpenSource Lib",
    description: "Utility library for mono-repo management.",
    tech: ["TypeScript", "NPM"],
    link: "#",
    stars: 210,
    forks: 45,
    icon: Code2,
    gridClass: "md:col-span-2 md:row-span-1",
  }
]

export function ProjectsGrid() {
  return (
    <section id="projects" className="px-6 lg:px-12 py-24 bg-gui-bg text-gui-text">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">
              Strategic <span className="text-gui-accent">Deployments</span>
            </h2>
            <p className="text-gui-text/40 mt-4 max-w-md font-mono text-sm uppercase tracking-widest">
              Selected artifacts from the digital frontier.
            </p>
          </div>
          <div className="flex gap-2">
             <div className="h-2 w-2 rounded-full bg-gui-accent animate-ping" />
             <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gui-accent">System Active</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[240px]">
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              className={cn(
                "group relative overflow-hidden rounded-3xl border border-white/5 bg-gui-primary/30 p-8 transition-all duration-500 hover:bg-gui-primary/50 hover:border-gui-accent/20",
                project.gridClass
              )}
            >
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gui-bg border border-white/5 text-gui-accent transition-transform group-hover:scale-110">
                    <project.icon className="h-6 w-6" />
                  </div>
                  <div className="flex gap-4 font-mono text-[10px] uppercase text-gui-text/30">
                    <span className="flex items-center gap-1"><Star className="h-3 w-3" /> {project.stars}</span>
                    <span className="flex items-center gap-1"><GitFork className="h-3 w-3" /> {project.forks}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:text-gui-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gui-text/50 text-sm line-clamp-2 mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-gui-bg/50 border border-white/5 text-[9px] font-mono uppercase text-gui-text/40 group-hover:text-gui-text/70 transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative Background Element */}
              <div className="absolute -right-8 -bottom-8 h-40 w-40 bg-gui-accent/5 blur-[80px] rounded-full transition-all duration-700 group-hover:bg-gui-accent/10" />
              
              <a 
                href={project.link} 
                className="absolute inset-0 z-20 cursor-pointer"
                aria-label={`View ${project.title}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
