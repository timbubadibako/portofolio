import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const localData = require('@/lib/data/projects.json')
    return NextResponse.json(localData.map((p: any) => ({
      id: p.id,
      name: p.title,
      description: p.description,
      techStack: p.tech.split(', '),
      diagram: `
  +-------------+     +----------------+
  | [${p.id}]   |---->| SYSTEM_NODE    |
  +-------------+     +----------------+
`
    })))
  } catch (error) {
    return NextResponse.json({ error: "Failed to read local projects data" }, { status: 500 })
  }
}
