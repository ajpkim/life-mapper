import { createTimeGoal } from '@/db/time_goals'
import { formatDate, secondsToHHMMSS, formatDateToMD } from '@/utils'

const TimeTable = async ({ timeTableData, startDate, endDate }) => {
  const totalTimeGoalSeconds = timeTableData.reduce(
    (acc, obj) => acc + obj.timeGoalSeconds,
    0,
  )
  const totalTimeLoggedSeconds = timeTableData.reduce(
    (acc, obj) => acc + obj.timeLoggedSeconds,
    0,
  )

  const rows = timeTableData.map(
    ({ project, timeGoalSeconds, timeLoggedSeconds }) => (
      <tr key={project.id} className="border-2">
        <td className="border-2 p-2">{project.name}</td>
        <td className="border-2 p-2">{secondsToHHMMSS(timeGoalSeconds)}</td>
        <td className="border-2 p-2">{secondsToHHMMSS(timeLoggedSeconds)}</td>
      </tr>
    ),
  )
  const totalRow = (
    <tr className="border-2 bg-slate-900">
      <td className="border-2 p-2 font-bold">Total</td>
      <td className="border-2 p-2 font-bold">
        {secondsToHHMMSS(totalTimeGoalSeconds)}
      </td>
      <td className="border-2 p-2 font-bold">
        {secondsToHHMMSS(totalTimeLoggedSeconds)}
      </td>
    </tr>
  )
  const combinedRows = [...rows, totalRow]

  const addTimeGoal = async (formData) => {
    console.log('FORMING')
  }

  if (!timeTableData) return null

  return (
    <div>
      <h2 className="p-2 text-lg font-bold">
        {formatDateToMD(startDate)} - {formatDateToMD(endDate)}{' '}
      </h2>
      <table className="text-lg">
        <thead>
          <tr>
            <th className="border-2 bg-slate-900 p-2">Project Name</th>
            <th className="border-2 bg-slate-900 p-2">Time Goal</th>
            <th className="border-2 bg-slate-900 p-2">Time Logged</th>
          </tr>
        </thead>
        <tbody>{combinedRows}</tbody>
      </table>
    </div>
  )
}

export default TimeTable
