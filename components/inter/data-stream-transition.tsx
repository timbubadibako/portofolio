"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function DataStreamTransition() {
  const [isActive, setIsOpen] = useState(false)

  // Listen for custom transition event
  useEffect(() => {
    const handleTransition = () => {
      setIsOpen(true)
      setTimeout(() => setIsOpen(false), 800)
    }
    window.addEventListener('section-transition', handleTransition)
    return () => window.removeEventListener('section-transition', handleTransition)
  }, [])

  return (
    <AnimatePresence>
      {isActive && (
        <div className="fixed inset-0 z-[2000] pointer-events-none overflow-hidden">
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: "-100%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col justify-around opacity-20"
          >
             {[...Array(20)].map((_, i) => (
               <div key={i} className="h-px w-full bg-teal-500 shadow-[0_0_20px_rgba(20,184,166,1)]" />
             ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-teal-500/5 backdrop-blur-sm"
          />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[10px] text-teal-400 uppercase tracking-[1em] animate-pulse">
             RE_ROUTING_DATA_STREAM...
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
