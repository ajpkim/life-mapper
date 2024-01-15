const sqlite3 = require("sqlite3")
const { open } = require("sqlite")
const path = require("path")
const dbPath =
  process.env.NEXT_PUBLIC_DATABASE_PATH || path.join(__dirname, "habits.db")

async function openDb() {
  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  })
}

export async function getHabits() {
  const db = await openDb()
  const habits = await db.all("SELECT * FROM habits")
  await db.close()
  return habits
}

export async function getHabitsData() {
  const db = await openDb()
  const habits = await db.all("SELECT * FROM habits")
  for (let habit of habits) {
    const stats = await db.all(
      "SELECT * FROM habit_stats WHERE habit_id = ?",
      habit.id,
    )
    habit.stats = stats
  }
  await db.close()
  return habits
}
