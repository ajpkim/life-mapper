const sqlite3 = require("sqlite3").verbose()
const { open } = require("sqlite")
const path = require("path")
const dbPath =
  process.env.NEXT_PUBLIC_DATABASE_PATH ||
  path.join(__dirname, "../life_map.db")

async function openDb() {
  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  })
}

async function importData(jsonData) {
  const db = await openDb()
  for (const [tableName, rows] of Object.entries(jsonData)) {
    for (const row of rows) {
      const columns = Object.keys(row).join(", ")
      const placeholders = Object.keys(row)
        .map((_) => "?")
        .join(", ")
      const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`
      await db.run(sql, Object.values(row))
    }
  }
}

async function exportData() {
  const db = await openDb()
  const tables = await db.all(
    "SELECT name FROM sqlite_master WHERE type='table'",
  )
  const data = {}
  for (const { name } of tables) {
    const rows = await db.all(`SELECT * FROM ${name}`)
    data[name] = rows
  }
  return data
}

module.exports = { openDb, exportData, importData }
