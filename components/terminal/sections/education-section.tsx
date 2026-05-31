"use client"

export function EducationSection({ mode = 'gui' }: { mode?: 'gui' | 'terminal' }) {
  const education = [
    {
      timestamp: "2023.08.20 09:00",
      title: "M.S. in Cybersecurity",
      org: "Pace University, NY",
      type: "EDU",
      desc: "GPA: 3.77. Focused on Network Defense, Ethical Hacking, and Threat Intelligence."
    },
    {
      timestamp: "2016.07.01 08:30",
      title: "B.Tech Information Technology",
      org: "SRM University, India",
      type: "EDU",
      desc: "GPA: 3.61. Core Foundation in Computer Science & Cyber Forensics."
    }
  ]

  return (
    <div className="space-y-4 font-mono mt-8">
      <p className="text-[10px] text-teal-500/20 font-bold uppercase tracking-[0.5em] mb-6">-- Academic_Records --</p>
      {education.map((edu, i) => (
        <div key={i} className="flex gap-4 group">
          <div className="text-[10px] text-teal-500/30 font-bold tabular-nums group-hover:text-teal-500/60 transition-colors">
            [{edu.timestamp}]
          </div>
          <div className="space-y-1">
             <div className="flex items-center gap-3">
                <span className="text-[9px] px-1.5 py-0.5 bg-cyan-500/20 text-cyan-400 font-bold">[{edu.type}]</span>
                <span className="text-white font-bold text-sm tracking-tight">{edu.title}</span>
             </div>
             <p className="text-[11px] text-teal-500/60 uppercase tracking-widest">{edu.org}</p>
             <p className="text-xs text-white/40 leading-relaxed max-w-2xl">{edu.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
