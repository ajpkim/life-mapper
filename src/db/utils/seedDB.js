const path = require("path")
const fs = require("fs").promises
const { openDB, closeDB } = require("./db")

async function seedDB() {
  try {
    const db = await openDB()
    const dataPath = path.join(__dirname, "seedData.json")
    const jsonData = await fs.readFile(dataPath, "utf8")
    const seedData = JSON.parse(jsonData)

    console.log("Seeding habits table.")
    for (const habit of seedData.habits) {
      const { id, name, active, display_num, created_at } = habit
      const insertHabitSql = `INSERT INTO habits (id, name, active, display_num, created_at) VALUES (?, ?, ?, ?, ?)`
      await db.run(insertHabitSql, [id, name, active, display_num, created_at])
    }

    console.log("Seeding habits stats table.")
    for (const habitStat of seedData.habit_stats) {
      const { habit_id, date, stat } = habitStat
      const insertHabitStatSql = `INSERT INTO habit_stats (habit_id, date, stat) VALUES (?, ?, ?)`
      await db.run(insertHabitStatSql, [habit_id, date, stat])
    }

    console.log("Seeding projects table.")
    for (const project of seedData.projects) {
      const { id, name } = project
      const insertSQL = `INSERT INTO projects (id, name) VALUES (?, ?)`
      await db.run(insertSQL, [id, name])
    }

    console.log("Seeded database.")
    await closeDB(db)
    console.log(seedData)
  } catch (error) {
    console.error("Failed to seed the database:", error.message)
  }
}

seedDB()
