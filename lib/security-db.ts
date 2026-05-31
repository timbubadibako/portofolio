import sqlite3 from 'sqlite3'

/**
 * DATABASE STABILIZATION (v1.1.3)
 * Using global object to persist the in-memory SQLite instance in development.
 */
declare global {
  var securityDb: sqlite3.Database | undefined
}

export async function getSecurityDb(): Promise<sqlite3.Database> {
  // Return existing instance if available
  if (global.securityDb) {
    return global.securityDb
  }

  console.log('🧪 INITIALIZING SECURITY_LAB_KERNEL [IN-MEMORY]...')

  return new Promise((resolve, reject) => {
    const database = new sqlite3.Database(':memory:', (err) => {
      if (err) {
        console.error("❌ KERNEL_PANIC: SQLite initialization failed:", err.message)
        return reject(err)
      }
      
      // Force sequential execution to ensure tables are ready before query
      database.serialize(() => {
        // Create table
        database.run(`
          CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            password TEXT,
            clearance_level TEXT,
            secret_log TEXT
          )
        `, (err) => {
          if (err) console.error("❌ SCHEMA_ERROR:", err.message)
        })

        // Seed data
        const stmt = database.prepare("INSERT INTO users (username, password, clearance_level, secret_log) VALUES (?, ?, ?, ?)")
        stmt.run('admin', 'classified_pajril_2026', 'LEVEL_05', 'The back door key is hidden in the terminal help command.')
        stmt.run('guest', 'guest123', 'LEVEL_01', 'Welcome to the lab. Nothing interesting here.')
        stmt.run('sys_operator', 'hardpass_99', 'LEVEL_03', 'Maintenance scheduled for 03:00 UTC.')
        stmt.finalize(() => {
          console.log('✅ SECURITY_DATABASE_POPULATED_AND_STABLE.')
          global.securityDb = database
          resolve(database)
        })
      })
    })
  })
}

/**
 * Promisified query wrapper for async/await support in API routes.
 */
export function queryAll(database: sqlite3.Database, sql: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    database.all(sql, (err, rows) => {
      if (err) {
        console.error("❌ SQL_QUERY_FAILED:", err.message)
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}
