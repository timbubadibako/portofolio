"use client"

import { ImageAsciiLogo } from "./image-ascii-logo"

const bootMessages = [
  "INITIALIZING KERNEL v6.8.0-DEVPORAL...",
  "LOADING NEURAL DRIVERS...",
  "ESTABLISHING SECURE HANDSHAKE...",
  "SYNCING WITH SUPABASE CLUSTER...",
  "DECRYPTING PORTFOLIO MANIFEST...",
  "STARTING CLI_DAEMON...",
  "READY FOR NEURAL INPUT.",
]

export default function BootSequence() {
  const currentMessageIndex = bootMessages.length // Show all as it's now embedded and timed by Terminal

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/[0.02] to-transparent pointer-events-none" />
      
      <div className="relative z-10 space-y-8 w-full max-w-3xl">
           <ImageAsciiLogo />

           <div className="space-y-1.5 border-l-2 border-teal-500/20 pl-6">
              {bootMessages.map((message, index) => (
                <div key={index} className="flex text-xs md:text-sm tracking-widest uppercase font-vt323 text-teal-400/80">
                  <span className="text-teal-500 font-bold mr-4">[{index.toString().padStart(2, '0')}]</span>
                  <span className="terminal-text-glow">{message}</span>
                  {index === currentMessageIndex - 1 && (
                    <span className="ml-2 h-4 w-2 bg-teal-500 animate-pulse" />
                  )}
                </div>
              ))}
           </div>
      </div>
    </div>
  )
}
