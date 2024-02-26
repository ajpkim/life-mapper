import { formatDate, secondsToHHMMSS, formatDateToMD } from '@/utils'

const TimeTable = async ({ timeTableData, startDate, endDate }) => {
  const rows = timeTableData.map(
    ({ project, timeGoalSeconds, timeLoggedSeconds }) => (
      <tr key={project.id} className="border-2">
        <td className="border-2 p-2">{project.name}</td>
        <td className="border-2 p-2">{secondsToHHMMSS(timeGoalSeconds)}</td>
        <td className="border-2 p-2">{secondsToHHMMSS(timeLoggedSeconds)}</td>
      </tr>
    ),
  )

  if (!timeTableData) return null

  return (
    <div>
      <h2 className="p-2 font-bold">
        {formatDateToMD(startDate)} - {formatDateToMD(endDate)}{' '}
      </h2>
      <table>
        <thead>
          <tr>
            <th className="border-2 p-2">Project Name</th>
            <th className="border-2 p-2">Time Goal</th>
            <th className="border-2 p-2">Time Logged</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  )
}

export default TimeTable
