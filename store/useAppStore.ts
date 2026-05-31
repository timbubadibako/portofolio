import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  mode: 'terminal' | 'gui'
  setMode: (mode: 'terminal' | 'gui') => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      mode: 'terminal',
      setMode: (mode) => set({ mode }),
    }),
    {
      name: 'app-mode-storage',
    }
  )
)
