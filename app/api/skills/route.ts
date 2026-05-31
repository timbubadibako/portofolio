import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const localData = require('@/lib/data/skills.json')
    return NextResponse.json(localData.map((s: any) => ({
      category: s.title,
      name: s.title,
      level: s.skills[0]?.level || 90,
      items: s.skills.map((sk: any) => sk.name)
    })))
  } catch (error) {
    return NextResponse.json({ error: "Failed to read local skills data" }, { status: 500 })
  }
}
