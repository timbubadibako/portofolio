"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const skillPackages = [
  { name: "pajril-web-stack", skills: ["Next.js", "TypeScript", "Tailwind", "Prisma"], progress: 98 },
  { name: "pajril-mobile-stack", skills: ["Flutter", "Dart", "Kotlin", "Swift"], progress: 92 },
  { name: "pajril-ai-data-stack", skills: ["Python", "PyTorch", "HuggingFace", "NLP"], progress: 88 },
  { name: "pajril-infra-security", skills: ["Arch Linux", "Docker", "AWS", "SecOps"], progress: 85 },
]

export function SkillsSection({ mode = 'gui' }: { mode?: 'gui' | 'terminal' }) {
  const [installedCount, setInstalledCount] = useState(0)

  useEffect(() => {
    if (installedCount < skillPackages.length) {
      const timer = setTimeout(() => {
        setInstalledCount(prev => prev + 1)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [installedCount])

  return (
    <div className="space-y-6 font-mono">
      <div className="text-teal-500 text-xs mb-4">
        <p className="font-bold">$ yay -S pajril-stack</p>
        <p className="opacity-60 mt-1">:: Resolving dependencies...</p>
        <p className="opacity-60">:: Looking for internal core packages...</p>
      </div>

      <div className="space-y-8">
        {skillPackages.slice(0, installedCount).map((pkg, idx) => (
          <div key={idx} className="space-y-3 animate-in fade-in slide-in-from-left duration-500">
            <div className="flex justify-between items-center text-[10px]">
               <div className="flex items-center gap-3">
                  <span className="text-teal-400 font-bold">[ INSTALLED ]</span>
                  <span className="text-white uppercase tracking-widest">{pkg.name}</span>
               </div>
               <span className="text-teal-500/40">{pkg.progress}%_STABLE</span>
            </div>

            <div className="flex flex-wrap gap-2">
               {pkg.skills.map(skill => (
                 <span key={skill} className="px-2 py-0.5 border border-teal-500/10 bg-teal-500/5 text-[9px] text-teal-400/80">
                   {skill}
                 </span>
               ))}
            </div>

            {/* Industrial Progress Bar */}
            <div className="flex gap-1 h-1 w-full max-w-md">
               {[...Array(20)].map((_, i) => (
                 <div 
                   key={i} 
                   className={`h-full flex-1 ${
                     i < (pkg.progress / 5) ? "bg-teal-500 shadow-[0_0_5px_rgba(20,184,166,0.5)]" : "bg-white/5"
                   }`}
                 />
               ))}
            </div>
          </div>
        ))}

        {installedCount === skillPackages.length && (
          <div className="pt-4 border-t border-teal-500/10">
             <p className="text-green-500 font-bold text-xs uppercase animate-pulse">
               (100%) CORE_STACK_INITIALIZED_SUCCESSFULLY
             </p>
          </div>
        )}
      </div>
    </div>
  )
}
