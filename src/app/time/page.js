import { getTimeTableData } from '@/db/time'
import TimeTable from './TimeTable'
import { AddTimeGoalForm } from './AddTimeGoalForm'
import { getCurrentWeekBoundaries, dateToYYYYMMDD } from '@/utils'

const Time = async () => {
  const { startDate, endDate } = getCurrentWeekBoundaries()
  const timeTableData = await getTimeTableData({
    start_date: dateToYYYYMMDD(startDate),
    end_date: dateToYYYYMMDD(endDate),
  })

  if (!startDate) return null
  return (
    <div className="pl-20 pt-12">
      <TimeTable
        timeTableData={timeTableData}
        startDate={startDate}
        endDate={endDate}
      />
      <AddTimeGoalForm />
    </div>
  )
}

export default Time
