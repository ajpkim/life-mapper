'use server'

import { revalidatePath } from 'next/cache'
import { openDb } from '@/db/utils/db'
import { dateToYYYYMMDD } from '@/utils'

export async function upsertTimeGoal(prevState, formData) {
  const project_id = formData.get('project_id')
  const time_goal_hours = formData.get('time_goal_hours')
  const time_goal_minutes = formData.get('time_goal_minutes')
  const start_date = formData.get('start_date')
  const end_date = formData.get('end_date')
  const seconds = time_goal_hours * 3600 + time_goal_minutes * 60

  try {
    const db = await openDb()
    const selectSQL = `SELECT id FROM time_goals WHERE project_id = ? AND start_date = ? AND end_date = ?`
    const existingTimeGoal = await db.get(selectSQL, [
      project_id,
      start_date,
      end_date,
    ])

    if (existingTimeGoal) {
      const updateSQL = `UPDATE time_goals SET seconds = ? WHERE id = ?`
      await db.run(updateSQL, [seconds, existingTimeGoal.id])
    } else {
      const insertSQL = `INSERT INTO time_goals (project_id, start_date, end_date, seconds) VALUES (?, ?, ?, ?)`
      await db.run(insertSQL, [project_id, start_date, end_date, seconds])
    }

    await db.close()
    revalidatePath('/')

    return { message: 'Successfully upserted time goal!' }
  } catch (e) {
    return { message: 'Failed to upsert time goal' }
  }
}

export async function createTimeLog(prevState, formData) {
  console.log(formData)

  const project_id = formData.get('project_id')
  const time_log_hours = formData.get('time_log_hours')
  const time_log_minutes = formData.get('time_log_minutes')
  const date = formData.get('date')
  const seconds = time_log_hours * 3600 + time_log_minutes * 60

  console.log(seconds)

  try {
    const db = await openDb()
    const insertSQL = `INSERT INTO time_logs (project_id, date, seconds) VALUES (?, ?, ?)`
    await db.run(insertSQL, [project_id, date, seconds])
    await db.close()
    revalidatePath('/')
    return { message: 'Successfully upserted time goal!' }
  } catch (e) {
    return { message: 'Failed to upsert time goal' }
  }
}
