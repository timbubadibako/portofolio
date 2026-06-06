"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlitchTextProps {
  text: string
  className?: string
  glitchSpeed?: number
  intensity?: "low" | "medium" | "high"
  trigger?: "always" | "hover"
}

export function GlitchText({ 
  text, 
  className, 
  glitchSpeed = 4000, 
  intensity = "medium",
  trigger = "always" 
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    if (trigger === "hover") return

    const triggerGlitch = () => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 150)
      
      const nextDelay = glitchSpeed + Math.random() * 3000
      timer = setTimeout(triggerGlitch, nextDelay)
    }

    let timer = setTimeout(triggerGlitch, glitchSpeed)
    return () => clearTimeout(timer)
  }, [glitchSpeed, trigger])

  const intensityMap = {
    low: { dist: 2, opacity: 0.3 },
    medium: { dist: 4, opacity: 0.5 },
    high: { dist: 8, opacity: 0.8 }
  }

  const { dist, opacity } = intensityMap[intensity]

  return (
    <div 
      className={cn("relative inline-block", className)}
      onMouseEnter={() => trigger === "hover" && setIsGlitching(true)}
      onMouseLeave={() => trigger === "hover" && setIsGlitching(false)}
    >
      <motion.span
        animate={isGlitching ? {
          x: [0, -dist, dist, -dist, 0],
          y: [0, dist/2, -dist/2, dist/2, 0],
          transition: { duration: 0.15, ease: "linear" }
        } : { x: 0, y: 0 }}
        className="relative z-10 block whitespace-nowrap"
      >
        {text}
      </motion.span>
      
      <AnimatePresence>
        {isGlitching && (
          <>
            {/* Red Shift */}
            <motion.span
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: opacity, x: dist, skewX: 20 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="absolute inset-0 z-0 text-red-500/50 pointer-events-none mix-blend-screen whitespace-nowrap"
            >
              {text}
            </motion.span>
            {/* Cyan Shift */}
            <motion.span
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: opacity, x: -dist, skewX: -20 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="absolute inset-0 z-0 text-cyan-400/50 pointer-events-none mix-blend-screen whitespace-nowrap"
            >
              {text}
            </motion.span>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
