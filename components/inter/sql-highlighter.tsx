"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface SqlHighlighterProps {
  query: string
  className?: string
}

export function SqlHighlighter({ query, className }: SqlHighlighterProps) {
  if (!query) return null

  // Splitting logic to identify comments
  const parts = query.split(/(--.*$)/)

  const highlightSql = (text: string) => {
    // Keywords to highlight
    const keywords = ["SELECT", "FROM", "WHERE", "AND", "OR", "UNION", "INSERT", "INTO", "VALUES", "CREATE", "TABLE", "IF", "NOT", "EXISTS"]
    
    // Split by spaces but keep delimiters
    const tokens = text.split(/(\s+|'[^']*'|[(),=])/g)

    return tokens.map((token, i) => {
      const upperToken = token.toUpperCase().trim()
      
      // Keywords (Blue/Purple)
      if (keywords.includes(upperToken)) {
        return <span key={i} className="text-teal-400 font-bold">{token}</span>
      }
      
      // Strings (Green)
      if (token.startsWith("'") && token.endsWith("'")) {
        return <span key={i} className="text-emerald-400">{token}</span>
      }
      
      // Operators/Punctuation (White/Grey)
      if (["=", "*", "(", ")", ","].includes(token)) {
        return <span key={i} className="text-white/40">{token}</span>
      }

      // Default (White/Dull)
      return <span key={i} className="text-white/80">{token}</span>
    })
  }

  return (
    <code className={cn("font-mono text-sm block leading-relaxed", className)}>
      {parts.map((part, index) => {
        if (part.startsWith("--")) {
          // It's a comment - make it look "inactive"
          return (
            <span key={index} className="text-white/20 italic line-through decoration-white/10">
              {part}
            </span>
          )
        }
        // It's active SQL
        return <React.Fragment key={index}>{highlightSql(part)}</React.Fragment>
      })}
    </code>
  )
}
