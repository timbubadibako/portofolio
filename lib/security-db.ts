import initSqlJs from 'sql.js'
import fs from 'fs'
import path from 'path'

/**
 * SECURITY_LAB_KERNEL (Vercel-Compatible WASM Persistence)
 */
declare global {
  var sqlJsDb: any
}

export async function getSecurityDb() {
  if (global.sqlJsDb) return global.sqlJsDb

  console.log('🧪 INITIALIZING SECURITY_LAB_KERNEL [WASM_V2]...')

  try {
    const wasmPath = path.join(process.cwd(), 'public/sql-wasm.wasm')
    const buffer = fs.readFileSync(wasmPath)
    
    // Explicitly convert Node Buffer to ArrayBuffer for TypeScript/SQL.js compatibility
    const wasmBinary = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength)

    const SQL = await initSqlJs({
      wasmBinary: wasmBinary as ArrayBuffer
    })

    const db = new SQL.Database()

    db.run(`
      CREATE TABLE IF NOT EXISTS users (
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

    console.log('✅ WASM_DATABASE_KERNEL_STABLE.')
    global.sqlJsDb = db
    return db
  } catch (err: any) {
    console.error("❌ WASM_V2_INIT_FAILED:", err.message)
    throw new Error(`Kernel Initialization Failed: ${err.message}`)
  }
}

export function queryAll(db: any, sql: string): any[] {
  try {
    const results = db.exec(sql)
    if (results.length === 0) return []
    const columns = results[0].columns
    const values = results[0].values
    return values.map((row: any) => {
      const obj: any = {}
      columns.forEach((col: string, i: number) => {
        obj[col] = row[i]
      })
      return obj
    })
  } catch (err: any) {
    console.error("❌ SQL_ENGINE_CRASH:", err.message)
    throw err
  }
}
