import { getTimeTableData } from '@/db/time'
import { getProjects } from '@/db/projects'

import TimeTable from './TimeTable'
import ToggleFormVisibility from './ToggleFormVisibility'
import { AddTimeGoalForm } from './AddTimeGoalForm'
import { AddTimeLogForm } from './AddTimeLogForm'
import { getCurrentWeekBoundaries, dateToYYYYMMDD } from '@/utils'

const Time = async () => {
  const { startDate, endDate } = getCurrentWeekBoundaries()
  const projects = await getProjects()
  const timeTableData = await getTimeTableData({
    start_date: startDate,
    end_date: endDate,
  })

  if (!startDate || !projects) return null
  return (
    <div className="flex pl-20 pt-12">
      <TimeTable
        timeTableData={timeTableData}
        startDate={startDate}
        endDate={endDate}
      />
      <div className="flex flex-col pl-12 pt-4">
        <div className="mt-4">
          <ToggleFormVisibility text={'Add Goal'}>
            <AddTimeGoalForm
              projects={projects}
              startDate={startDate}
              endDate={endDate}
            />
          </ToggleFormVisibility>
        </div>
        <div className="mt-4">
          <ToggleFormVisibility text={'Add Log'}>
            <AddTimeLogForm
              projects={projects}
              startDate={startDate}
              endDate={endDate}
            />
          </ToggleFormVisibility>
        </div>
      </div>
    </div>
  )
}

export default Time
