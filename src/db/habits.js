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

export async function importJSON(filepath) {
  const db = await openDb()
  const data = await fs.readFile(dataPath, "utf8")
  for (const habit of data) {
    await db.run(
      "INSERT INTO habits (id, name, active, display_num, created_at) VALUES (?, ?, ?, ?, ?)",
      [habit.id, habit.name, habit.active, habit.display_num, habit.created_at],
    )
    for (const stat of habit.stats) {
      await db.run(
        "INSERT INTO habit_stats (id, habit_id, date, stat) VALUES (?, ?, ?, ?)",
        [stat.id, habit.id, stat.date, stat.stat],
      )
    }
  }
  await db.close()
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
  const insertRes = await db.run(
    "INSERT INTO habits (name, active, display_num) VALUES (?, ?, ?)",
    [name, true, nextDisplayNum],
  )
  const habitId = insertRes.lastID
  const habitRes = await db.get("SELECT * FROM habits WHERE id = ?", [habitId])
  await db.close()
  return {
    ...habitRes,
    stats: [],
  }
}

export async function deleteHabit(id) {
  const db = await openDb()
  await db.run("DELETE FROM habits WHERE id = ?", [id])
  await db.close()
}

export async function getHabitsData() {
  const db = await openDb()
  const habits = await db.all(`
SELECT * FROM habits
ORDER BY CASE WHEN display_num IS NULL THEN 1 ELSE 0 END,
display_num
`)
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

export async function updateHabit({
  id,
  name,
  active,
  display_num,
  created_at,
}) {
  const db = await openDb()
  const res = await db.run(
    "UPDATE habits SET name = ?, active = ?, display_num = ?, created_at = ? WHERE id = ?",
    [name, active, display_num, created_at, id],
  )
  await db.close()
  return { id, name, active, display_num, created_at }
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
