import { getTimeTableData } from '@/db/time'
import { getProjects } from '@/db/projects'

import TimeTable from './TimeTable'
import { AddTimeGoalForm } from './AddTimeGoalForm'
import { AddTimeLogForm } from './AddTimeLogForm'
import { getCurrentWeekBoundaries, dateToYYYYMMDD } from '@/utils'

const Time = async () => {
  const { startDate, endDate } = getCurrentWeekBoundaries()
  const projects = await getProjects()
  const timeTableData = await getTimeTableData({
    start_date: dateToYYYYMMDD(startDate),
    end_date: dateToYYYYMMDD(endDate),
  })

  if (!startDate || !projects) return null
  return (
    <div className="flex flex-col pl-20 pt-12">
      <TimeTable
        timeTableData={timeTableData}
        startDate={startDate}
        endDate={endDate}
      />
      <div className="mt-4 border-2">
        <AddTimeGoalForm projects={projects} />
      </div>
      <div className="mt-4 border-2">
        <AddTimeLogForm projects={projects} />
      </div>
    </div>
  )
}

export default Time
