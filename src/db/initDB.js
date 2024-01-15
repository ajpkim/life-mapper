const sqlite3 = require("sqlite3").verbose()
const path = require("path")
const dbPath =
  process.env.NEXT_PUBLIC_DATABASE_PATH || path.join(__dirname, "habits.db")

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message)
    return
  }
  console.log("Connected to the SQLite database.")
})

const createHabitsTable = `
CREATE TABLE IF NOT EXISTS habits (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`

const createHabitStatsTable = `
CREATE TABLE IF NOT EXISTS habit_stats (
id INTEGER PRIMARY KEY AUTOINCREMENT,
habit_id INTEGER NOT NULL,
date DATE NOT NULL,
status BOOLEAN NOT NULL,
FOREIGN KEY (habit_id) REFERENCES habits(id)
)`

function createTable(sql, tableName) {
  db.run(sql, (err) => {
    if (err) {
      console.error(`Error creating ${tableName} table:`, err.message)
    } else {
      console.log(`${tableName} created successfully.`)
    }
  })
}

createTable(createHabitsTable, "Habit")
createTable(createHabitStatsTable, "Habit Stats")

db.close((err) => {
  if (err) {
    console.error(err.message)
  }
  console.log("Closed the database connection.")
})

//////////////////////////////////////////////////////////////////////
// Dynamic initialization func
//////////////////////////////////////////////////////////////////////
// async function initDB() {
//   const db = new sqlite3.Datebase(dbPath, (err) => {
//     if (err) {
//       console.log(err.message)
//       throw err
//     }
//     console.log("Connected to SQLite DB.")
//   })

//   const createHabitsTable = `
// CREATE TABLE IF NOT EXISTS habits (
// id INTEGER PRIMARY KEY AUTOINCREMENT
// name TEXT NOT NULL
// created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// )`

//   return new Promise((resolve, reject) => {
//     db.run(createHabitsTable, (err) => {
//       db.close()
//       if (err) {
//         console.error("Error creating habits table", err.message)
//         reject(err)
//       }
//       console.log("Habits table created successfully")
//       resolve()
//     })
//   })
// }

// module.exports = initDB
