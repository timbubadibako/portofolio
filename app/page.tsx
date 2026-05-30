'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import Terminal from "@/components/terminal/terminal"
import BootSequence from "@/components/terminal/boot-sequence"
import { CRTToggle } from "@/components/terminal/crt-toggle"
import { Page as InterPage } from "@/components/inter/page"
import { SideNav } from "@/components/inter/side-nav"
import { AnimatedNoise } from "@/components/inter/animated-noise"

type DisplayMode = 'terminal' | 'gui'

export default function GrandControllerPage() {
  const [mode, setMode] = useState<DisplayMode>('terminal')
  const [booting, setBooting] = useState(true)

  useEffect(() => {
    if (mode === 'terminal') {
      const timer = setTimeout(() => {
        setBooting(false)
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [mode])

  // Apply overflow style to body to ensure scrolling works correctly for SideNav
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

  return (
    <div className="relative min-h-screen bg-black font-mono selection:bg-teal-500/30">
      {/* 
          GLOBAL OVERLAYS 
          Kept at root to ensure they are always on top and truly fixed
      */}
      <div className="crt-overlay pointer-events-none z-[1000]" />
      <div className="scanlines pointer-events-none z-[1001]" />
      <AnimatedNoise opacity={0.03} />
      
      {/* SideNav with its own internal AnimatePresence */}
      {mode === 'gui' && <SideNav />}

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
             <div
              className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
              style={{
                backgroundImage: 'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wp14013807.jpg-R0GMP9bCUVPW5Qfg2rbLlUeYSGymlM.jpeg")',
                backgroundPosition: "center 40%",
                filter: "brightness(0.4) contrast(1.2) grayscale(0.5)",
              }}
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className="absolute top-6 right-6 z-50">
              <CRTToggle />
            </div>

            <div className="container mx-auto px-6 py-12 h-screen flex flex-col relative z-10">
              {booting ? <BootSequence /> : <Terminal onModeSwitch={handleModeSwitch} />}
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
