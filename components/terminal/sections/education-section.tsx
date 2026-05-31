"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function EducationSection({ mode = 'gui' }: { mode?: 'gui' | 'terminal' }) {
  const [education, setEducation] = useState<any[]>([])
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    const termData = require('@/lib/data/terminal_data.json')
    setEducation(termData.education.map((edu: any) => ({
      timestamp: edu.ts,
      title: edu.degree,
      org: edu.org,
      type: "EDU",
      desc: edu.desc
    })))
  }, [mode])

  useEffect(() => {
    if (visibleCount < education.length) {
      const timer = setTimeout(() => {
        setVisibleCount(prev => prev + 1)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [visibleCount, education.length])

  return (
    <div className="space-y-4 font-mono mt-8">
      <p className="text-[10px] text-teal-500/20 font-bold uppercase tracking-[0.5em] mb-6">-- Academic_Records --</p>
      <AnimatePresence>
        {education.slice(0, visibleCount).map((edu, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-4 group"
          >
            <div className="text-[10px] text-teal-500/30 font-bold tabular-nums group-hover:text-teal-500/60 transition-colors">
              [{edu.timestamp}]
            </div>
            <div className="space-y-1">
               <div className="flex items-center gap-3">
                  <span className="text-[9px] px-1.5 py-0.5 bg-cyan-500/20 text-cyan-400 font-bold">[{edu.type}]</span>
                  <span className="text-white font-bold text-sm tracking-tight">{edu.title}</span>
               </div>
               <p className="text-[11px] text-teal-500/60 uppercase tracking-widest">{edu.org}</p>
               <p className="text-xs text-white/40 leading-relaxed max-w-2xl">{edu.desc}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
