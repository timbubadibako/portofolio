"use client"

import { useEffect, useRef } from "react"

export function AnimatedNoise({ opacity = 0.05 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Create a small noise tile
    const size = 128
    canvas.width = size
    canvas.height = size
    
    const imageData = ctx.createImageData(size, size)
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
      const val = Math.random() * 255
      data[i] = val
      data[i + 1] = val
      data[i + 2] = val
      data[i + 3] = 255
    }

    ctx.putImageData(imageData, 0, 0)
  }, [])

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[600] mix-blend-overlay overflow-hidden"
      style={{ opacity }}
    >
      <canvas
        ref={canvasRef}
        className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 animate-noise-drift"
        style={{ 
          imageRendering: 'pixelated',
        }}
      />
    </div>
  )
}
