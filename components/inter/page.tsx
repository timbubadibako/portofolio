"use client"

import { HeroSection } from "./hero-section"
import { ProjectsSection } from "./projects-section"
import { ChronologySection } from "./chronology-section"
import { CoreArsenalSection } from "./core-arsenal-section"
import { ScaffoldingHubSection } from "./scaffolding-hub-section"
import { MissionControlSection } from "./mission-control-section"
import { ColophonSection } from "./colophon-section"
import { SplitFlapAudioProvider } from "./split-flap-text"
import { SmoothScroll } from "./smooth-scroll"

export function Page({ onModeSwitch }: { onModeSwitch?: (mode: 'gui' | 'terminal' | 'inter') => void }) {
  return (
    <SmoothScroll>
      <SplitFlapAudioProvider>
        <div className="relative min-h-screen bg-black text-white selection:bg-teal-500/30 overflow-x-hidden">
          {/* Background Grid */}
          <div 
            className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" 
            style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
          />

          <div className="relative z-10">
            <HeroSection />
            
            {/* 
                PREVIEW SECTIONS 
                These sections serve as the "brief preview" on the root page.
                Sidebar links to their dedicated /page for full detail.
            */}
            <CoreArsenalSection />
            <ProjectsSection />
            <ScaffoldingHubSection />
            <ChronologySection />
            <MissionControlSection />
            
            <ColophonSection onModeSwitch={onModeSwitch} />
          </div>
        </div>
      </SplitFlapAudioProvider>
    </SmoothScroll>
  )
}
