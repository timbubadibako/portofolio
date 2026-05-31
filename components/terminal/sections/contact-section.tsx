"use client"

import { Mail, Phone, Globe, ExternalLink } from "lucide-react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function ContactSection({ mode = 'gui' }: { mode?: 'gui' | 'terminal' }) {
  const [data, setData] = useState<any>(null)
  const [visibleItems, setVisibleLines] = useState(0)

  useEffect(() => {
    if (mode === 'terminal') {
      const termData = require('@/lib/data/terminal_data.json')
      setData(termData.contact)
    }
  }, [mode])

  const contactItems = data ? [
    { label: "EMAIL", value: data.email, href: `mailto:${data.email}` },
    { label: "GITHUB", value: `github.com/${data.github}`, href: `https://github.com/${data.github}` },
    { label: "LINKEDIN", value: `linkedin.com/in/${data.linkedin}`, href: `https://linkedin.com/in/${data.linkedin}` }
  ] : []

  useEffect(() => {
    if (mode === 'terminal' && data && visibleItems < contactItems.length) {
      const timer = setTimeout(() => {
        setVisibleLines(prev => prev + 1)
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [mode, data, visibleItems, contactItems.length])

  if (mode === 'terminal' && data) {
    return (
      <div className="space-y-4 font-mono">
        <p className="text-teal-500 font-bold tracking-widest text-[10px] uppercase">-- Terminal_Transmission_Channel --</p>
        <div className="space-y-2 border-l border-teal-500/20 pl-6">
           <AnimatePresence>
             {contactItems.slice(0, visibleItems).map((item, i) => (
               <motion.p
                 key={i}
                 initial={{ opacity: 0, x: -5 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="min-h-[1.2rem]"
               >
                 <span className="text-white/40">{item.label}:</span>{" "}
                 <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-teal-400 underline">
                   {item.value}
                 </a>
               </motion.p>
             ))}
           </AnimatePresence>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 font-mono">
      <pre className="text-[10px] md:text-xs text-teal-500/60 leading-none">
{`
+-------------------------------------------------------------+
|                                                             |
|   CONTACT_CHANNELS // SECURE_TRANSMISSION_PROTOCOL          |
|                                                             |
+-------------------------------------------------------------+
`}
      </pre>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-4 border-l border-teal-500/20">
        <ContactItem 
          label="EMAIL"
          value="pjrlywm@gmail.com"
          href="mailto:pjrlywm@gmail.com"
        />
        <ContactItem 
          label="PHONE"
          value="+62 XXX-XXXX-XXXX"
          href="tel:0"
        />
        <ContactItem 
          label="GITHUB"
          value="github.com/timbubadibako"
          href="https://github.com/timbubadibako"
        />
        <ContactItem 
          label="LINKEDIN"
          value="linkedin.com/in/syifa-pajril-yaum-730162264/"
          href="https://www.linkedin.com/in/syifa-pajril-yaum-730162264/"
        />
      </div>

      <div className="pt-4 mt-6 border-t border-teal-500/10">
         <p className="text-[10px] text-teal-500/40 uppercase tracking-[0.4em]">
           Awaiting incoming signals...
         </p>
      </div>
    </div>
  )
}

function ContactItem({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <div className="space-y-1 group">
      <span className="text-[9px] text-teal-500 font-bold tracking-widest uppercase opacity-40 group-hover:opacity-100 transition-opacity">
        {label}:
      </span>
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block text-sm text-white group-hover:text-teal-400 transition-colors underline decoration-teal-500/20 underline-offset-4"
      >
        {value}
      </a>
    </div>
  )
}
