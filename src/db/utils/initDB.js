const { openDb } = require("./db")

const createHabitsTable = `
CREATE TABLE IF NOT EXISTS habits (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL UNIQUE,
active BOOLEAN NOT NULL DEFAULT TRUE,
display_num INTEGER,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`

const createHabitStatsTable = `
CREATE TABLE IF NOT EXISTS habit_stats (
id INTEGER PRIMARY KEY AUTOINCREMENT,
habit_id INTEGER NOT NULL,
date DATE NOT NULL,
stat BOOLEAN NOT NULL,
FOREIGN KEY (habit_id) REFERENCES habits(id) ON DELETE CASCADE
)`

const createProjectsTable = `
CREATE TABLE IF NOT EXISTS projects (
id INTEGER PRIMARY KEY AUTOINCREMENT,
active BOOLEAN NOT NULL DEFAULT TRUE,
name TEXT NOT NULL UNIQUE
)`

const createTimeLog = `
CREATE TABLE IF NOT EXISTS time_logs (
id INTEGER PRIMARY KEY AUTOINCREMENT,
seconds INTEGER NOT NULL,
project_id INTEGER NOT NULL,
FOREIGN KEY (project_id) REFERENCES projects(id)
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
  const db = await openDb()
  createTable(db, createHabitsTable, "Habit")
  createTable(db, createHabitStatsTable, "Habit Stats")
  createTable(db, createProjectsTable, "Projects")
  createTable(db, createTimeLog, "Time Logs")
  await db.close()
}

initDBSchema()
