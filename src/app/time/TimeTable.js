import { getProjects } from '@/db/projects'

import axios from 'axios'
import { formatDate, secondsToHHMMSS, formatDateToMD } from '@/utils'

const TimeTable = async ({ timeTableData }) => {
  const projects = await getProjects()

  const rows = timeTableData.map(
    ({ project, timeGoalSeconds, timeLoggedSeconds }) => (
      <tr key={project.id}>
        <td>{project.name}</td>
        <td>{secondsToHHMMSS(timeGoalSeconds)}</td>
        <td>{secondsToHHMMSS(timeLoggedSeconds)}</td>
      </tr>
    ),
  )

  if (!timeTableData) return null

  return (
    <table>
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Time Goal (HH:MM:SS)</th>
          <th>Time Logged (HH:MM:SS)</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

export default TimeTable
