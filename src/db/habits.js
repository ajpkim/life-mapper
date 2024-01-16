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

export async function createHabit(name) {
  console.log("ADDING HAB TO DB")
  const db = await openDb()
  const res = await db.run("INSERT INTO habits (name) VALUEs (?)", [name])
  const habitId = res.lastID

  await db.close()
  return { id: habitId, name: name, stats: [] }
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

export async function createOrUpdateHabitStat(name, date, stat) {
  const db = await openDb()
  const habit = await db.get("SELECT id FROM habits WHERE name = ?", name)

  if (!habit) {
    throw new Error("Habit not found:", name)
  }

  const currentStat = await db.get(
    "SELECT id FROM habit_stats WHERE habit_id = ? AND date = ?",
    habit.id,
    date,
  )

  if (currentStat) {
    await db.run(
      "UPDATE habit_stats SET stat = ? WHERE id = ?",
      stat,
      currentStat.id,
    )
  } else {
    await db.run(
      "INSERT INTO habit_stats (habit_id, date, stat) VALUES (?, ?, ?)",
      habit.id,
      date,
      stat,
    )
  }

  await db.close()
  return 1
}
