import initSqlJs from 'sql.js'

/**
 * SECURITY LAB KERNEL (WASM EDITION)
 * We use sql.js (WebAssembly) because native sqlite3 binaries 
 * are often incompatible with Vercel's serverless runtime environments.
 */

let dbInstance: any = null

export async function getSecurityDb() {
  if (dbInstance) return dbInstance

  console.log('🧪 INITIALIZING SECURITY_LAB_KERNEL [WASM]...')

  // Initialize the SQL.js engine
  const SQL = await initSqlJs({
    // Using a CDN for the WASM file to avoid complex Next.js static asset handling
    locateFile: file => `https://sql.js.org/dist/${file}`
  })

  const db = new SQL.Database()

  // Initialize table with dummy data
  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      password TEXT,
      clearance_level TEXT,
      secret_log TEXT
    )
  `)

  db.run(`
    INSERT INTO users (username, password, clearance_level, secret_log)
    VALUES 
    ('admin', 'classified_pajril_2026', 'LEVEL_05', 'The back door key is hidden in the terminal help command.'),
    ('guest', 'guest123', 'LEVEL_01', 'Welcome to the lab. Nothing interesting here.'),
    ('sys_operator', 'hardpass_99', 'LEVEL_03', 'Maintenance scheduled for 03:00 UTC.')
  `)

  console.log('✅ WASM_DATABASE_STABLE.')
  dbInstance = db
  return db
}

/**
 * Executing the raw, vulnerable query.
 */
export function queryAll(db: any, sql: string): any[] {
  try {
    const stmt = db.prepare(sql)
    const results = []
    
    while (stmt.step()) {
      results.push(stmt.getAsObject())
    }
    
    stmt.free()
    return results
  } catch (err: any) {
    console.error("❌ WASM_SQL_ERROR:", err.message)
    throw err
  }
}
