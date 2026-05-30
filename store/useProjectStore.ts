import { create } from 'zustand'

interface TableColumn {
  name: string
  type: string
}

interface Table {
  name: string
  columns: TableColumn[]
}

interface ProjectState {
  name: string
  type: string
  description: string
  techStack: {
    frontend: string
    language: string
    database_driver: string
  }
  architecture: string
  databaseBlueprint: {
    tables: Table[]
  }
  strictCodingRules: string[]
  initializationCommandList: string[]
  
  // Actions
  setName: (name: string) => void
  setType: (type: string) => void
  setDescription: (desc: string) => void
  setStack: (stack: Partial<ProjectState['techStack']>) => void
  setArchitecture: (arch: string) => void
  addTable: (table: Table) => void
  removeTable: (tableName: string) => void
  addRule: (rule: string) => void
  removeRule: (index: number) => void
  addCommand: (cmd: string) => void
  removeCommand: (index: number) => void
  reset: () => void
}

export const useProjectStore = create<ProjectState>((set) => ({
  name: '',
  type: '',
  description: '',
  techStack: {
    frontend: '',
    language: '',
    database_driver: '',
  },
  architecture: '',
  databaseBlueprint: {
    tables: [],
  },
  strictCodingRules: [],
  initializationCommandList: [],

  setName: (name) => set({ name }),
  setType: (type) => set({ type }),
  setDescription: (description) => set({ description }),
  setStack: (stack) => set((state) => ({ 
    techStack: { ...state.techStack, ...stack } 
  })),
  setArchitecture: (architecture) => set({ architecture }),
  addTable: (table) => set((state) => ({
    databaseBlueprint: {
      tables: [...state.databaseBlueprint.tables, table]
    }
  })),
  removeTable: (tableName) => set((state) => ({
    databaseBlueprint: {
      tables: state.databaseBlueprint.tables.filter(t => t.name !== tableName)
    }
  })),
  addRule: (rule) => set((state) => ({
    strictCodingRules: [...state.strictCodingRules, rule]
  })),
  removeRule: (index) => set((state) => ({
    strictCodingRules: state.strictCodingRules.filter((_, i) => i !== index)
  })),
  addCommand: (cmd) => set((state) => ({
    initializationCommandList: [...state.initializationCommandList, cmd]
  })),
  removeCommand: (index) => set((state) => ({
    initializationCommandList: state.initializationCommandList.filter((_, i) => i !== index)
  })),
  reset: () => set({
    name: '',
    type: '',
    description: '',
    techStack: { frontend: '', language: '', database_driver: '' },
    architecture: '',
    databaseBlueprint: { tables: [] },
    strictCodingRules: [],
    initializationCommandList: [],
  }),
}))
