import Link from 'next/link'
import { Terminal, LayoutDashboard, Rocket } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Terminal className="h-6 w-6" />
          <span className="text-lg font-bold tracking-tight">DevPortal</span>
        </div>
        
        <div className="flex items-center gap-6">
          <Link 
            href="/" 
            className="flex items-center gap-1.5 text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
          >
            <LayoutDashboard className="h-4 w-4" />
            Portfolio
          </Link>
          <Link 
            href="/scaffold" 
            className="flex items-center gap-1.5 text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
          >
            <Rocket className="h-4 w-4" />
            Scaffold
          </Link>
        </div>
      </div>
    </nav>
  )
}
