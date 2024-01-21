const path = require("path")
const fs = require("fs").promises
const { openDB, closeDB } = require("./db")

async function importDB(filepath) {
  try {
    const db = await openDB()
    const dataPath = path.resolve(filepath)
    const jsonData = await fs.readFile(dataPath, "utf8")
    const importData = JSON.parse(jsonData)

    console.log("Importing habits.")
    for (const habit of importData) {
      const { id, name, active, display_num, created_at } = habit
      const insertHabitSql = `INSERT INTO habits (id, name, active, display_num, created_at) VALUES (?, ?, ?, ?, ?)`
      await db.run(insertHabitSql, [id, name, active, display_num, created_at])

      console.log("Importing habit stats.")
      for (const stat of habit.stats) {
        const insertHabitStatSql = `INSERT INTO habit_stats (habit_id, date, stat) VALUES (?, ?, ?)`
        await db.run(insertHabitStatSql, [habit.id, stat.date, stat.stat])
      }
    }

    console.log("Imported database.")
    await closeDB(db)
  } catch (error) {
    console.error("Failed to import the database:", error.message)
  }
}

const filepath = process.argv[2]
importDB(filepath)
