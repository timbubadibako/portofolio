"use client"

import React from "react"

export function AsciiPortraitComparison() {
  // Static placeholder ASCII portrait until user provides their own
  return (
    <div className="bg-black p-4 border border-teal-500/20 relative overflow-hidden group">
      <pre className="text-teal-500/60 font-mono text-[6px] md:text-[8px] leading-none text-center">
{`
         .MMMMMMM.
       .MMMMMMMMMMM.
      .MMMMMMMMMMMMM.
      MMMMMMMMMMMMMMM
      MMMMMMMMMMMMMMM
      MMMMMMMMMMMMMMM
      .MMMMMMMMMMMMM.
       .MMMMMMMMMMM.
         'MMMMMMM'
            MMM
          .MMMMM.
        .MMMMMMMMM.
      .MMMMMMMMMMMMM.
`}
      </pre>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
      <div className="text-[8px] font-mono text-teal-500/40 text-center mt-2 uppercase tracking-[0.2em]">
         [ P_LOAD_USER_IMG ]
      </div>
    </div>
  )
}
