"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function CertificationsSection({ mode = 'gui' }: { mode?: 'gui' | 'terminal' }) {
  const [certifications, setCertifications] = useState<any[]>([])
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    const termData = require('@/lib/data/terminal_data.json')
    setCertifications(termData.certifications.map((cert: any) => ({
      timestamp: cert.ts,
      title: cert.title,
      org: cert.org,
      type: "CERT",
      desc: cert.desc || ""
    })))
  }, [mode])

  useEffect(() => {
    if (visibleCount < certifications.length) {
      const timer = setTimeout(() => {
        setVisibleCount(prev => prev + 1)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [visibleCount, certifications.length])

  return (
    <div className="space-y-4 font-mono mt-8">
      <p className="text-[10px] text-teal-500/20 font-bold uppercase tracking-[0.5em] mb-6">-- Validation_Logs --</p>
      <AnimatePresence>
        {certifications.slice(0, visibleCount).map((cert, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-4 group"
          >
            <div className="text-[10px] text-teal-500/30 font-bold tabular-nums group-hover:text-teal-500/60 transition-colors">
              [{cert.timestamp}]
            </div>
            <div className="space-y-1">
               <div className="flex items-center gap-3">
                  <span className="text-[9px] px-1.5 py-0.5 bg-orange-500/20 text-orange-400 font-bold">[{cert.type}]</span>
                  <span className="text-white font-bold text-sm tracking-tight">{cert.title}</span>
               </div>
               <p className="text-[11px] text-teal-500/60 uppercase tracking-widest">{cert.org}</p>
               {cert.desc && <p className="text-xs text-white/40 leading-relaxed max-w-2xl">{cert.desc}</p>}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
