"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function ExperienceSection({ mode = 'gui' }: { mode?: 'gui' | 'terminal' }) {
  const [experiences, setExperiences] = useState<any[]>([])
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    const termData = require('@/lib/data/terminal_data.json')
    setExperiences(termData.experience.map((exp: any) => ({
      timestamp: exp.ts,
      title: exp.role,
      org: exp.org,
      type: "WORK",
      desc: exp.desc
    })))
  }, [mode])

  useEffect(() => {
    if (visibleCount < experiences.length) {
      const timer = setTimeout(() => {
        setVisibleCount(prev => prev + 1)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [visibleCount, experiences.length])

  return (
    <div className="space-y-4 font-mono">
      <AnimatePresence>
        {experiences.slice(0, visibleCount).map((exp, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-4 group"
          >
            <div className="text-[10px] text-teal-500/30 font-bold tabular-nums group-hover:text-teal-500/60 transition-colors">
              [{exp.timestamp}]
            </div>
            <div className="space-y-1">
               <div className="flex items-center gap-3">
                  <span className="text-[9px] px-1.5 py-0.5 bg-green-500/20 text-green-400 font-bold">[{exp.type}]</span>
                  <span className="text-white font-bold text-sm tracking-tight">{exp.title}</span>
               </div>
               <p className="text-[11px] text-teal-500/60 uppercase tracking-widest">{exp.org}</p>
               <p className="text-xs text-white/40 leading-relaxed max-w-2xl">{exp.desc}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
