import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const localData = require('@/lib/data/chronology.json')
    return NextResponse.json(localData.map((item: any) => ({
      ts: item.ts || item.timestamp,
      role: item.role || item.title,
      org: item.org,
      desc: item.desc || item.description,
      type: item.type || "WORK"
    })))
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch chronology" }, { status: 500 })
  }
}
