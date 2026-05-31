import { AsciiArt } from "@/components/terminal/ascii-art"

export function ProjectsSection({ filter, mode = 'gui' }: { filter?: string, mode?: 'gui' | 'terminal' }) {
  const projects = [
    {
      id: "stride_io_gps",
      title: "STRIDE_IO",
      diagram: `
  +-------------+     +----------------+     +----------------+
  | Mobile App  |---->| GPS Tracking   |---->| Gamification   |
  | (Flutter)   |     | (Real-time)    |     | Engine         |
  +-------------+     +----------------+     +----------------+
        |                    |                      |
        v                    v                      v
  +-------------+     +----------------+     +----------------+
  | Health Data |<----| API Gateway    |---->| Leaderboards   |
  +-------------+     +----------------+     +----------------+
`,
      description: "A gamified fitness application focused on high-precision GPS tracking and real-time social competition. Built with Flutter and Supabase.",
      tech: "Flutter, Dart, Supabase, Google Maps SDK"
    },
    {
      id: "nexio_marketplace",
      title: "NEXIO MARKETPLACE",
      diagram: `
  +-------------+     +----------------+     +----------------+
  | Web Portal  |---->| Auth & RLS     |---->| Transaction    |
  | (Next.js)   |     | (Supabase)     |     | Processing     |
  +-------------+     +----------------+     +----------------+
        |                                            |
        v                                            v
  +-------------+                            +----------------+
  | Inventory   |                            | Stripe / DB    |
  | Management  |                            | Integration    |
  +-------------+                            +----------------+
`,
      description: "Enterprise-grade e-commerce marketplace featuring real-time inventory management and secure server-side transactions.",
      tech: "Next.js, TypeScript, Tailwind CSS, Supabase"
    },
    {
      id: "speech_asr_ai",
      title: "ASR ENGINE",
      diagram: `
  +-------------+     +----------------+     +----------------+
  | Audio Input |---->| Feature        |---->| Transformer    |
  | (WAV/MP3)   |     | Extraction     |     | Model (AI)     |
  +-------------+     +----------------+     +----------------+
        |                                            |
        v                                            v
  +-------------+                            +----------------+
  | Waveform    |                            | Text Output    |
  | Analysis    |                            | (JSON/MD)      |
  +-------------+                            +----------------+
`,
      description: "Automatic Speech Recognition engine utilizing advanced transformer architectures for high-fidelity audio-to-text conversion.",
      tech: "Python, PyTorch, Librosa, HuggingFace"
    }
  ]

  const displayedProjects = filter 
    ? projects.filter(p => p.id === filter)
    : projects

  return (
    <div className="space-y-4">
      {!filter && <AsciiArt art="projects" />}

      <div className="space-y-8">
        {displayedProjects.map(project => (
          <ProjectCard 
            key={project.id}
            title={project.title}
            diagram={project.diagram}
            description={project.description}
            tech={project.tech}
          />
        ))}

        {filter && (
          <p className="text-[10px] text-teal-500/40 uppercase tracking-widest animate-pulse mt-8">
            End of file: {filter}.md // Type 'ls -la projects/' to go back.
          </p>
        )}
      </div>
    </div>
  )
}

function ProjectCard({ title, diagram, description, tech }: { title: string; diagram: string; description: string; tech: string }) {
  return (
    <div className="p-6 border border-teal-500/20 bg-teal-500/5 relative overflow-hidden group hover:border-teal-500/40 transition-all">
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-teal-500/40" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-teal-500/40" />

      <h3 className="text-white font-bold uppercase tracking-[0.2em] font-mono text-base mb-4 flex items-center gap-3">
         <span className="w-1.5 h-1.5 bg-teal-500 animate-pulse" />
         {title}
      </h3>
      
      <div className="bg-black/40 p-4 border border-teal-500/10 mb-6 overflow-x-auto no-scrollbar">
         <pre className="text-[10px] text-teal-500/50 font-mono leading-tight">
           {diagram}
         </pre>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-mono text-teal-500/80 leading-relaxed">
          {description}
        </p>
        <div className="pt-4 border-t border-teal-500/10">
           <span className="text-[9px] font-mono text-teal-500/40 uppercase tracking-widest block mb-2">Build_Stack:</span>
           <p className="text-[11px] text-teal-400 font-bold uppercase tracking-tight">
             {tech}
           </p>
        </div>
      </div>
    </div>
  )
}
