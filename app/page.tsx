'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import Terminal from "@/components/terminal/terminal"
import { Page as InterPage } from "@/components/inter/page"
import { NvimSidebar } from "@/components/inter/nvim-sidebar"
import { DataStreamTransition } from "@/components/inter/data-stream-transition"
import { AnimatedNoise } from "@/components/inter/animated-noise"
import { useAppStore } from '@/store/useAppStore'

export default function GrandControllerPage() {
  const { mode, setMode } = useAppStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Apply overflow style to body
  useEffect(() => {
    if (mode === 'gui') {
      document.body.style.overflow = 'auto'
    } else {
      document.body.style.overflow = 'hidden'
    }
  }, [mode])

  const handleModeSwitch = (newMode: 'gui' | 'terminal' | 'inter') => {
    if (newMode === 'inter' || newMode === 'gui') {
      setMode('gui')
    } else {
      setMode('terminal')
    }
  }

  if (!mounted) return null

  return (
    <div className="relative min-h-screen bg-black font-mono selection:bg-teal-500/30 overflow-x-hidden">
      <div className="crt-overlay pointer-events-none z-[1000]" />
      <div className="scanlines pointer-events-none z-[1001]" />
      <AnimatedNoise opacity={0.03} />
      <DataStreamTransition />
      
      {mode === 'gui' && <NvimSidebar />}

      <AnimatePresence mode="wait">
        {mode === 'terminal' && (
          <motion.main
            key="terminal-mode"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="relative z-10 h-screen overflow-hidden"
          >
             <div className="fixed inset-0 z-0 bg-black">
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none" 
                style={{ 
                  backgroundImage: 'radial-gradient(circle, #14b8a6 1px, transparent 1px)', 
                  backgroundSize: '32px 32px' 
                }} 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-teal-500/[0.02] to-transparent" />
            </div>

            <div className="container mx-auto px-6 py-12 h-screen flex flex-col items-center justify-center relative z-10">
              <div id="terminal-root" className="w-full max-w-5xl h-[85vh] md:h-[80vh] flex flex-col px-0 md:px-0">
                <Terminal onModeSwitch={handleModeSwitch} />
              </div>
            </div>
          </motion.main>
        )}

        {mode === 'gui' && (
          <motion.main
            key="gui-mode"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 min-h-screen bg-gui-bg"
          >
            <InterPage onModeSwitch={handleModeSwitch} />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}
