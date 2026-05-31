import { NextResponse } from 'next/server'
import { getSecurityDb, queryAll } from '@/lib/security-db'

export async function POST(req: Request) {
  let sql = ""
  try {
    const { username, password } = await req.json()
    const db = await getSecurityDb()

    /**
     * VULNERABLE BY DESIGN: SQL INJECTION POINT
     */
    sql = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'"
    
    // Execute the dangerous query
    const results = await queryAll(db, sql)

    return NextResponse.json({
      success: results.length > 0,
      executed_query: sql,
      data: results,
      node_status: "VULNERABLE_MODE_ACTIVE"
    })
  } catch (error: any) {
    console.error("SQL Lab Error:", error.message)
    return NextResponse.json({
      error: "SQL_EXECUTION_FAILED",
      message: error.message,
      executed_query: sql || "Query construction failed.",
      node_status: "CRITICAL_FAILURE"
    }, { status: 500 })
  }
}
