const sqlite3 = require("sqlite3").verbose()
const path = require("path")
const dbPath =
  process.env.NEXT_PUBLIC_DATABASE_PATH || path.join(__dirname, "habits.db")

async function openDB() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error(err.message)
        reject(err)
      } else {
        console.log("Connected to the SQLite database at:", dbPath)
        resolve(db)
      }
    })
  })
}

async function closeDB(db) {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        console.error(err.message)
        reject(err)
      } else {
        console.log("Closed the database connection.")
        resolve()
      }
    })
  })
}

module.exports = { openDB, closeDB }
