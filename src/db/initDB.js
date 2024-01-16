const sqlite3 = require("sqlite3").verbose()
const path = require("path")
const { openDB, closeDB } = require("./db")

const createHabitsTable = `
CREATE TABLE IF NOT EXISTS habits (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL UNIQUE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`

const createHabitStatsTable = `
CREATE TABLE IF NOT EXISTS habit_stats (
id INTEGER PRIMARY KEY AUTOINCREMENT,
habit_id INTEGER NOT NULL,
date DATE NOT NULL,
stat BOOLEAN NOT NULL,
FOREIGN KEY (habit_id) REFERENCES habits(id)
)`

function createTable(db, sql, tableName) {
  db.run(sql, (err) => {
    if (err) {
      console.error(`Error creating ${tableName} table:`, err.message)
    } else {
      console.log(`${tableName} table created successfully.`)
    }
  })
}

async function initDBSchema() {
  const db = await openDB()
  createTable(db, createHabitsTable, "Habit")
  createTable(db, createHabitStatsTable, "Habit Stats")
  await closeDB(db)
}

initDBSchema()
