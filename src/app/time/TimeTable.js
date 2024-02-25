'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { formatDate, secondsToHHMMSS, formatDateToMD } from '@/utils'

const TimeTable = ({ startDate, endDate }) => {
  const [tableData, setTableData] = useState(10)

  useEffect(() => {
    const fetchTableData = async () => {
      const { data } = await axios.get('/api/timegoals/', {
        params: { startDate, endDate },
      })
      setTableData(data)
    }
    fetchTableData()
  }, [startDate, endDate])

  // Testing the CREATE
  useEffect(() => {
    const foo = async () => {
      const params = { startDate, endDate, projectId: 1, seconds: 100 }
      const { data } = await axios.post('/api/timegoals/', params)
      console.log('Back in client ddata:', data)
    }
    foo()
  }, [])

  if (!tableData) return null
  return <div>{JSON.stringify(tableData)}</div>
}

export default TimeTable
