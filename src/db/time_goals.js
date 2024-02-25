const { openDb } = require('./utils/db')

export async function createTimeGoal({
  project_id,
  start_date,
  end_date,
  seconds,
}) {
  const db = await openDb()
  const insertSQL = `INSERT INTO time_goals (project_id, start_date, end_date, seconds) VALUES (?, ?, ?, ?)`
  const res = await db.run(insertSQL, [
    project_id,
    start_date,
    end_date,
    seconds,
  ])
  const timeGoalId = es.lastID
  const timeGoalRes = await db.get('SELECT * FROM time_goals WHERE id = ?', [
    timeGoalId,
  ])
  await db.close()
  return timeGoalRes
}

export async function updateTimeGoal() {}

export async function deleteTimeGoal() {}
