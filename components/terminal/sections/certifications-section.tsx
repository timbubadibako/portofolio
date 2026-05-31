"use client"

export function CertificationsSection({ mode = 'gui' }: { mode?: 'gui' | 'terminal' }) {
  const certifications = [
    {
      timestamp: "2024.12.01 14:00",
      title: "Microsoft Certified Security Operations Associate (SC-200)",
      org: "Microsoft",
      type: "CERT",
      desc: "Validation of expertise in security engineering and incident management."
    },
    {
      timestamp: "2024.10.15 11:30",
      title: "National Cyber League (NCL) Competitor",
      org: "Cyber Skyline",
      type: "CERT",
      desc: "Applied skills in cryptography, log analysis, and network forensics."
    },
    {
      timestamp: "2024.08.01 10:00",
      title: "DBS x Dicoding Cloud Program",
      org: "Dicoding Indonesia",
      type: "CERT",
      desc: "Advanced cloud architectural patterns and managed services deployment."
    }
  ]

  return (
    <div className="space-y-4 font-mono mt-8">
      <p className="text-[10px] text-teal-500/20 font-bold uppercase tracking-[0.5em] mb-6">-- Validation_Logs --</p>
      {certifications.map((cert, i) => (
        <div key={i} className="flex gap-4 group">
          <div className="text-[10px] text-teal-500/30 font-bold tabular-nums group-hover:text-teal-500/60 transition-colors">
            [{cert.timestamp}]
          </div>
          <div className="space-y-1">
             <div className="flex items-center gap-3">
                <span className="text-[9px] px-1.5 py-0.5 bg-orange-500/20 text-orange-400 font-bold">[{cert.type}]</span>
                <span className="text-white font-bold text-sm tracking-tight">{cert.title}</span>
             </div>
             <p className="text-[11px] text-teal-500/60 uppercase tracking-widest">{cert.org}</p>
             <p className="text-xs text-white/40 leading-relaxed max-w-2xl">{cert.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
