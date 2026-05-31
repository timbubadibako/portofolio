"use client"

export function ExperienceSection({ mode = 'gui' }: { mode?: 'gui' | 'terminal' }) {
  const experiences = [
    {
      timestamp: "2024.02.15 09:00",
      title: "Cyber Range Student Assistant",
      org: "Pace University, NY",
      type: "WORK",
      desc: "Architecting UX/UI for Con Edison Critical Infrastructure Training. Managing secure virtual sandboxes."
    },
    {
      timestamp: "2024.06.01 10:30",
      title: "Security Engineer Intern",
      org: "Cantonica, Inc., NY",
      type: "WORK",
      desc: "Infrastructure vulnerability scanning & SIEM optimization. MITRE ATT&CK risk prioritization."
    },
    {
      timestamp: "2022.11.01 08:00",
      title: "SOC Analyst",
      org: "LTIMindtree Ltd., Chennai",
      type: "WORK",
      desc: "Malware investigation & incident response. YAML-based detection engineering."
    },
    {
      timestamp: "2021.04.12 08:30",
      title: "Microsoft Threat Expert",
      org: "Mindtree Ltd., Chennai",
      type: "WORK",
      desc: "1,000+ threat hunts performed. EDR deployment and resolution orchestration."
    }
  ]

  return (
    <div className="space-y-4 font-mono">
      {experiences.map((exp, i) => (
        <div key={i} className="flex gap-4 group">
          <div className="text-[10px] text-teal-500/30 font-bold tabular-nums group-hover:text-teal-500/60 transition-colors">
            [{exp.timestamp}]
          </div>
          <div className="space-y-1">
             <div className="flex items-center gap-3">
                <span className="text-[9px] px-1.5 py-0.5 bg-green-500/20 text-green-400 font-bold">[{exp.type}]</span>
                <span className="text-white font-bold text-sm tracking-tight">{exp.title}</span>
             </div>
             <p className="text-[11px] text-teal-500/60 uppercase tracking-widest">{exp.org}</p>
             <p className="text-xs text-white/40 leading-relaxed max-w-2xl">{exp.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
