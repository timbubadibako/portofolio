import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function GET() {
  try {
    const notesDirectory = path.join(process.cwd(), 'public/content/notes')
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(notesDirectory)) {
      return NextResponse.json([])
    }

    const fileNames = fs.readdirSync(notesDirectory)
    const allNotesData = fileNames
      .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.log'))
      .map(fileName => {
        const id = fileName
        const fullPath = path.join(notesDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        return {
          id,
          title: matterResult.data.title || fileName.replace(/\.md$/, '').replace(/\.log$/, '').replace(/_/g, ' '),
          date: matterResult.data.date || 'UNSET',
          tag: matterResult.data.tag || 'SYSTEM',
          ...matterResult.data,
        }
      })

    return NextResponse.json(allNotesData)
  } catch (error) {
    console.error("Error reading notes:", error)
    return NextResponse.json({ error: "Failed to read notes" }, { status: 500 })
  }
}
