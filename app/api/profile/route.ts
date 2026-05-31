import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const localData = require('@/lib/data/terminal_data.json')
    return NextResponse.json({
      name: localData.profile.identity.name,
      alias: localData.profile.identity.alias,
      role: localData.profile.identity.role,
      location: localData.profile.identity.location,
      bio: "AI & Fullstack Developer based in West Java. Specializing in high-integrity digital ecosystems and neural automation.",
      email: localData.contact.email,
      github: localData.contact.github,
      linkedin: localData.contact.linkedin
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to read local profile data" }, { status: 500 })
  }
}
