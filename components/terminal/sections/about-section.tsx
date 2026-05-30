"use client"

import { AsciiArt } from "@/components/terminal/ascii-art"
import { AsciiPortraitComparison } from "@/components/terminal/ascii-portrait-comparison"

export function AboutSection() {
  return (
    <div className="space-y-6">
      <AsciiArt art="about" />

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/5">
          <AsciiPortraitComparison />
          <div className="text-center font-mono text-[10px] text-teal-500/60 mt-4 uppercase tracking-[0.2em]">
            Subject: JRILYM
            <br />
            Status: FULLSTACK_ARCHITECT
          </div>
        </div>

        <div className="space-y-4 md:w-3/5 font-mono text-sm leading-relaxed text-teal-500/80">
          <p>
            System Architect and Fullstack Developer specialized in creating high-integrity digital environments.
            My focus lies at the intersection of performance, security, and human-machine interaction.
          </p>

          <div className="p-4 border border-teal-500/20 rounded-xl bg-teal-500/5 backdrop-blur-md">
            <h3 className="text-teal-400 font-bold mb-3 uppercase tracking-widest text-xs">[ Core_Philosophy ]</h3>
            <div className="space-y-3 text-xs opacity-90">
              <p>
                &gt; I approach every "impossible" constraint as a missing driver. 
                Optimization is not a task; it is a fundamental system requirement.
              </p>
              <p>
                &gt; Driven by the "Defender Mindset" — whether on a football pitch or protecting enterprise endpoints, 
                maintaining system integrity is my primary objective.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-3 border border-teal-500/10 rounded-lg bg-black/40">
                <h4 className="text-[10px] text-teal-500/40 uppercase mb-1 font-bold">Specialty</h4>
                <p className="text-xs text-teal-400 font-bold">Neural Interfacing</p>
             </div>
             <div className="p-3 border border-teal-500/10 rounded-lg bg-black/40">
                <h4 className="text-[10px] text-teal-500/40 uppercase mb-1 font-bold">Deployment</h4>
                <p className="text-xs text-teal-400 font-bold">Cloud_Native</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
