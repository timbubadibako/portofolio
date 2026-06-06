"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function HolographicPortrait({ src, className }: { src: string, className?: string }) {
  return (
    <div className={cn("relative group", className)}>
      {/* Outer Glow Container */}
      <div className="absolute inset-0 bg-teal-500/10 blur-[100px] rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-1000" />
      
      {/* The Image Wrapper with Duotone Filter */}
      <div className="relative w-full aspect-[4/5] border border-teal-500/20 bg-zinc-950 overflow-hidden">
        {/* Duotone Layer (Mix Blend Mode) */}
        <div className="absolute inset-0 bg-teal-500 mix-blend-color z-10 opacity-60 pointer-events-none" />
        
        {/* Main Image */}
        <Image 
          src={src} 
          alt="PAJRIL_BIO_SCAN" 
          fill
          priority
          className="object-cover grayscale contrast-125 brightness-75 group-hover:scale-105 transition-transform duration-[2s] ease-out"
        />

        {/* Scanline & Grid Overlays */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-20">
           <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(20,184,166,0.1)_50%)] bg-[length:100%_4px]" />
           <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, rgba(20,184,166,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,184,166,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        </div>

        {/* Holographic Jitter/Glitch Overlays */}
        <motion.div 
          animate={{
            x: [0, -2, 2, -1, 0],
            opacity: [0, 0.2, 0, 0.1, 0],
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "linear"
          }}
          className="absolute inset-0 z-30 bg-cyan-400/10 mix-blend-screen pointer-events-none"
        />

        {/* Framing Corners */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-teal-500/40" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-teal-500/40" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-teal-500/40" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-teal-500/40" />

        {/* Biometric Metadata Labels */}
        <div className="absolute top-8 right-8 z-40 text-right space-y-1 font-mono text-[8px] text-teal-400/40 uppercase tracking-widest leading-none">
           <p>Scan_Type: Biometric</p>
           <p>Status: Authenticated</p>
           <p>Origin: 127.0.0.1</p>
        </div>

        <div className="absolute bottom-8 left-8 z-40 space-y-1 font-mono text-[8px] text-teal-400/40 uppercase tracking-widest leading-none">
           <p>Identity: PAJRIL_YAUM</p>
           <p>Node: West_Java_022</p>
        </div>
      </div>

      {/* Decorative Outer Axis */}
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-4 h-px bg-teal-500/20" />
      <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-4 h-px bg-teal-500/20" />
    </div>
  )
}
