"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function SkillsSection({ mode = 'gui' }: { mode?: 'gui' | 'terminal' }) {
  const [skillPackages, setSkillPackages] = useState<any[]>([])
  const [installedCount, setInstalledCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (mode === 'terminal') {
      const termData = require('@/lib/data/terminal_data.json')
      setSkillPackages(termData.skills.map((s: any) => ({
        name: s.pkg,
        skills: s.items.split(', '),
        progress: s.stable
      })))
    } else {
      const guiData = require('@/lib/data/skills.json')
      setSkillPackages(guiData.map((s: any) => ({
        name: s.title,
        skills: s.skills.map((sk: any) => sk.name),
        progress: s.skills[0]?.level || 90
      })))
    }
    setIsLoading(false)
  }, [mode])

  useEffect(() => {
    if (!isLoading && installedCount < skillPackages.length) {
      const timer = setTimeout(() => {
        setInstalledCount(prev => prev + 1)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [installedCount, skillPackages.length, isLoading])

  if (isLoading) return null

  return (
    <div className="space-y-6 font-mono">
      <div className="text-teal-500 text-xs mb-4">
        <p className="font-bold flex items-center gap-3">
           <span className="animate-pulse">❯</span> yay -S pajril-stack
        </p>
        <p className="opacity-60 mt-1">:: Resolving dependencies...</p>
        <p className="opacity-60">:: Looking for internal core packages...</p>
      </div>

      <div className="space-y-8">
        <AnimatePresence>
          {skillPackages.slice(0, installedCount).map((pkg, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, x: -10, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="space-y-3 overflow-hidden"
            >
              <div className="flex justify-between items-center text-[10px]">
                 <div className="flex items-center gap-3">
                    <span className="text-teal-400 font-bold bg-teal-500/10 px-1">[ INSTALLED ]</span>
                    <span className="text-white uppercase tracking-widest">{pkg.name}</span>
                 </div>
                 <span className="text-teal-500/40 tabular-nums">{pkg.progress}%_STABLE</span>
              </div>

              <div className="flex flex-wrap gap-2">
                 {pkg.skills.map((skill: string) => (
                   <span key={skill} className="px-2 py-0.5 border border-teal-500/10 bg-teal-500/5 text-[9px] text-teal-400/80">
                     {skill}
                   </span>
                 ))}
              </div>

              <div className="flex gap-1 h-1 w-full max-w-md">
                 {[...Array(20)].map((_, i) => (
                   <div 
                     key={i} 
                     className={cn(
                        "h-full flex-1 transition-all duration-500",
                        i < (pkg.progress / 5) ? "bg-teal-500 shadow-[0_0_5px_rgba(20,184,166,0.5)]" : "bg-white/5"
                     )}
                   />
                 ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {installedCount === skillPackages.length && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-6 border-t border-teal-500/10"
          >
             <p className="text-green-500 font-bold text-xs uppercase animate-pulse flex items-center gap-3">
               <span className="h-1.5 w-1.5 bg-green-500 rounded-full" />
               (100%) CORE_STACK_SYNCED
             </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
