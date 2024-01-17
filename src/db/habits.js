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

async function getNextDisplayNum() {
  const db = await openDb()
  const res = await db.get(
    "SELECT MAX(display_num) as maxDisplayNum FROM habits",
  )
  const nextDisplayNum = res.maxDisplayNum ? res.maxDisplayNum + 1 : 0
  await db.close()
  return nextDisplayNum
}

export async function createHabit(name) {
  const db = await openDb()
  const nextDisplayNum = await getNextDisplayNum()
  const res = await db.run(
    "INSERT INTO habits (name, active, display_num) VALUES (?, ?, ?)",
    [name, true, nextDisplayNum],
  )
  const habitId = res.lastID
  await db.close()

  return {
    id: habitId,
    name: name,
    active: true,
    display_num: nextDisplayNum,
    stats: [],
  }
}

export async function getHabitsData() {
  const db = await openDb()
  const habits = await db.all("SELECT * FROM habits ORDER BY display_num")
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

export async function updateHabit({ id, name, active, display_num }) {
  const db = await openDb()
  const res = await db.run(
    "UPDATE habits SET name = ?, active = ?, display_num = ? WHERE id = ?",
    [name, active, display_num, id],
  )
  await db.close()
  return { id, name, active, display_num }
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
