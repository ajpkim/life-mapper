const { openDb } = require('./utils/db')
const { formatDate } = require('../utils')

export async function createTimeLog({ projectId, seconds, date }) {
  const db = await openDb()
  const insertSql = `INSERT INTO time_logs (project_id, seconds, date) VALUES (?, ?, ?)`
  await db.run(insertSql, [projectId, seconds, date])
  await db.close()
}

export async function getTimeLogsByProject({ startDate, endDate }) {
  const db = await openDb()
  const selectSql = `SELECT
time_logs.id,
time_logs.seconds,
time_logs.project_id,
time_logs.date,
projects.name AS project_name
FROM time_logs
JOIN projects ON time_logs.project_id = projects.id
WHERE time_logs.date BETWEEN ? AND ?
ORDER BY projects.name, time_logs.date
`
  const logs = await db.all(selectSql, [startDate, endDate])

  console.log(startDate, endDate)

  // let allProjectTime = 0
  const res = logs.reduce((acc, log) => {
    if (!acc[log.project_name]) {
      acc[log.project_name] = {
        logs: [],
        totalSeconds: 0,
      }
    }
    acc[log.project_name].logs.push(log)
    acc[log.project_name].totalSeconds += Number(log.seconds)
    // allProjectTime += log.seconds
    return acc
  }, {})
  // res.allProjectTime = allProjectTime
  return res
}

export async function getTodaysTimeLogs() {
  const today = new Date()
  const date = formatDate(today)
  const data = getTimeLogsByProject({ startDate: date, endDate: date })
  return data
}

export async function getTimeTableData({ start_date, end_date }) {
  const db = await openDb()
  const projects = await db.all('SELECT * FROM projects')
  const timeGoals = await db.all(
    `
    SELECT project_id, SUM(seconds) AS totalGoalSeconds
    FROM time_goals
    WHERE start_date <= ? AND end_date >= ?
    GROUP BY project_id`,
    [start_date, end_date],
  )
  const timeLogs = await db.all(
    `
    SELECT project_id, SUM(seconds) AS totalTimeLoggedSeconds
    FROM time_logs
    WHERE date BETWEEN ? AND ?
    GROUP BY project_id`,
    [start_date, end_date],
  )

  const combinedData = projects
    .map((project) => {
      const projectGoals = timeGoals.find(
        (goal) => goal.project_id === project.id,
      )
      const projectLogs = timeLogs.find((log) => log.project_id === project.id)
      return {
        project: project,
        timeGoalSeconds: projectGoals ? projectGoals.totalGoalSeconds : 0,
        timeLoggedSeconds: projectLogs ? projectLogs.totalTimeLoggedSeconds : 0,
      }
    })
    .filter((item) => item.timeGoalSeconds > 0 || item.timeLoggedSeconds > 0)
    .sort((a, b) => b.timeGoalSeconds - a.timeGoalSeconds)

  return combinedData
}
