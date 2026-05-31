"use client"

import { AsciiPortraitComparison } from "@/components/terminal/ascii-portrait-comparison"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function AboutSection({ mode = 'gui' }: { mode?: 'gui' | 'terminal' }) {
  const [data, setData] = useState<any>(null)
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch('/api/profile')
        const profile = await res.json()
        setData(profile)
      } catch (err) {
        console.error("Failed to fetch profile")
      }
    }
    fetchProfile()
  }, [])

  const profileLines = data ? [
    `identity:`,
    `  name: ${data.name}`,
    `  alias: ${data.alias}`,
    `  role: ${data.role}`,
    `  location: ${data.location}`,
    ``,
    `status:`,
    `  specialty: Neural Systems & Cloud Security`,
    ``,
    `philosophy: >`,
    `  Small problems are still problems.`
  ] : []

  useEffect(() => {
    if (mode === 'terminal' && data && visibleLines < profileLines.length) {
      const timer = setTimeout(() => {
        setVisibleLines(prev => prev + 1)
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [mode, data, visibleLines, profileLines.length])

  if (mode === 'terminal' && data) {
    return (
      <div className="space-y-6 font-mono">
         <div className="bg-teal-500/5 border border-teal-500/20 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 text-[8px] text-teal-500/20 uppercase tracking-widest">profile.yaml</div>
            <div className="text-xs md:text-sm text-teal-400 leading-relaxed whitespace-pre-wrap">
               <AnimatePresence>
                 {profileLines.slice(0, visibleLines).map((line, i) => (
                   <motion.div
                     key={i}
                     initial={{ opacity: 0, x: -5 }}
                     animate={{ opacity: 1, x: 0 }}
                     className="min-h-[1.2rem]"
                   >
                     {line || "\u00A0"}
                   </motion.div>
                 ))}
               </AnimatePresence>
               {visibleLines < profileLines.length && (
                 <span className="w-2 h-4 bg-teal-500 inline-block animate-pulse align-middle ml-1" />
               )}
            </div>
         </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
        <div className="md:w-1/3">
          <AsciiPortraitComparison />
          <div className="text-center font-mono text-[9px] text-teal-500/40 mt-4 uppercase tracking-[0.3em]">
            Biometric_Scan: Verified <br />
            ID: 0xPAJRIL_ARCH
          </div>
        </div>

        <div className="md:w-2/3 space-y-6">
          <div className="bg-teal-500/5 border border-teal-500/20 p-6 relative overflow-hidden font-mono text-xs md:text-sm text-teal-400 leading-relaxed whitespace-pre-wrap">
             <div className="absolute top-0 right-0 p-2 text-[8px] text-teal-500/20 uppercase tracking-widest">profile.yaml</div>
             {data ? (
               <pre>
{`identity:
  name: ${data.name}
  alias: ${data.alias}
  role: ${data.role}
  location: ${data.location}

bio: >
  ${data.bio}

contact:
  email: ${data.email}
  github: ${data.github}
  linkedin: ${data.linkedin}

philosophy: >
  Architecting solid ecosystems from 
  fundamental infrastructure to neural execution.`}
               </pre>
             ) : (
               <div className="animate-pulse">Loading Biometric Data...</div>
             )}
          </div>
        </div>
      </div>
    </div>
  )
}
