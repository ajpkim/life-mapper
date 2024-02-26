import { getTimeTableData } from '@/db/time'
import TimeTable from './TimeTable'
import { getCurrentWeekBoundaries } from '@/utils'

const Time = async () => {
  const { startDate, endDate } = getCurrentWeekBoundaries()
  const timeTableData = await getTimeTableData({
    start_date: startDate,
    end_date: endDate,
  })

  if (!startDate) return null
  return (
    <div className="pl-20 pt-12">
      <TimeTable timeTableData={timeTableData} />
    </div>
  )
}

export default Time
