"use client"

import { AsciiArt } from "@/components/terminal/ascii-art"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function ProjectsSection({ filter, mode = 'gui' }: { filter?: string, mode?: 'gui' | 'terminal' }) {
  const [projects, setProjects] = useState<any[]>([])
  const [visibleCount, setVisibleCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/projects')
        const data = await res.json()
        setProjects(data)
      } catch (err) {
        console.error("Failed to fetch projects")
      } finally {
        setIsLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const displayedProjects = filter 
    ? projects.filter(p => p.name?.toLowerCase().includes(filter.toLowerCase()) || p.id?.toLowerCase().includes(filter.toLowerCase()))
    : projects

  useEffect(() => {
    if (!isLoading && visibleCount < displayedProjects.length) {
      const timer = setTimeout(() => {
        setVisibleCount(prev => prev + 1)
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [visibleCount, displayedProjects.length, isLoading])

  if (isLoading) {
    return (
      <div className="text-teal-500/20 animate-pulse font-mono text-xs uppercase tracking-widest">
         [ SCANNING_ARTIFACT_REGISTRY... ]
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {!filter && <AsciiArt art="projects" />}

      <div className="space-y-8">
        <AnimatePresence>
          {displayedProjects.slice(0, visibleCount).map((project, idx) => (
            <motion.div
              key={project.id || project.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard 
                title={project.name || project.title}
                diagram={project.diagram}
                description={project.description}
                tech={Array.isArray(project.techStack) ? project.techStack.join(', ') : project.techStack}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {filter && visibleCount === displayedProjects.length && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] text-teal-500/40 uppercase tracking-widest animate-pulse mt-8 font-mono"
          >
            End of file: {filter}.md // Type 'ls -la projects/' to go back.
          </motion.p>
        )}
      </div>
    </div>
  )
}

function ProjectCard({ title, diagram, description, tech }: { title: string; diagram: string; description: string; tech: string }) {
  return (
    <div className="p-6 border border-teal-500/20 bg-teal-500/5 relative overflow-hidden group hover:border-teal-500/40 transition-all font-mono">
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-teal-500/40" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-teal-500/40" />

      <h3 className="text-white font-bold uppercase tracking-[0.2em] text-base mb-4 flex items-center gap-3">
         <span className="w-1.5 h-1.5 bg-teal-500 animate-pulse" />
         {title}
      </h3>
      
      {diagram && (
        <div className="bg-black/40 p-4 border border-teal-500/10 mb-6 overflow-x-auto no-scrollbar">
           <pre className="text-[10px] text-teal-500/50 leading-tight">
             {diagram}
           </pre>
        </div>
      )}

      <div className="space-y-4">
        <p className="text-sm text-teal-500/80 leading-relaxed">
          {description}
        </p>
        <div className="pt-4 border-t border-teal-500/10">
           <span className="text-[9px] text-teal-500/40 uppercase tracking-widest block mb-2">Build_Stack:</span>
           <p className="text-[11px] text-teal-400 font-bold uppercase tracking-tight">
             {tech}
           </p>
        </div>
      </div>
    </div>
  )
}
