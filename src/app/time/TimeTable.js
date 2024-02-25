'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { formatDate, secondsToHHMMSS, formatDateToMD } from '@/utils'

const TimeTable = ({ startDate, endDate }) => {
  const [tableData, setTableData] = useState(10)

  useEffect(() => {
    const fetchTableData = async () => {
      const { data } = await axios.get('/api/timeGoals/', {
        params: { startDate, endDate },
      })
      setTableData(data)
    }
    fetchTableData()
  }, [startDate, endDate])

  if (!tableData) return null
  return <div>{JSON.stringify(tableData)}</div>
}

export default TimeTable
