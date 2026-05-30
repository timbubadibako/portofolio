import { useProjectStore } from '@/store/useProjectStore'

export interface ProjectContext {
  $schema: string
  projectMeta: {
    name: string
    type: string
    description: string
    stack: {
      frontend: string
      language: string
      database_driver: string
    }
    architecture: string
  }
  databaseBlueprint: {
    tables: Array<{
      name: string
      columns: Record<string, string>
    }>
  }
  strictCodingRules: string[]
  initializationCommandList: string[]
}

export function generateProjectContext(state: ReturnType<typeof useProjectStore.getState>): ProjectContext {
  return {
    $schema: "https://pajril.dev/schemas/context-v1.json",
    projectMeta: {
      name: state.name,
      type: state.type,
      description: state.description,
      stack: state.techStack,
      architecture: state.architecture
    },
    databaseBlueprint: {
      tables: state.databaseBlueprint.tables.map(table => ({
        name: table.name,
        columns: table.columns.reduce((acc, col) => {
          acc[col.name] = col.type
          return acc
        }, {} as Record<string, string>)
      }))
    },
    strictCodingRules: state.strictCodingRules,
    initializationCommandList: state.initializationCommandList
  }
}

export function generateMarkdownContext(state: ReturnType<typeof useProjectStore.getState>): string {
  const context = generateProjectContext(state)
  
  return `
# Project Blueprint: ${context.projectMeta.name}

## Metadata
- **Type:** ${context.projectMeta.type}
- **Description:** ${context.projectMeta.description}
- **Architecture:** ${context.projectMeta.architecture}

## Tech Stack
- **Frontend:** ${context.projectMeta.stack.frontend}
- **Language:** ${context.projectMeta.stack.language}
- **Database/Driver:** ${context.projectMeta.stack.database_driver}

## Database Schema
${context.databaseBlueprint.tables.map(t => `
### Table: ${t.name}
${Object.entries(t.columns).map(([name, type]) => `- ${name}: ${type}`).join('\n')}
`).join('\n')}

## Coding Rules
${context.strictCodingRules.map(rule => `- ${rule}`).join('\n')}

## Initialization Commands
\`\`\`bash
${context.initializationCommandList.join('\n')}
\`\`\`
`.trim()
}
