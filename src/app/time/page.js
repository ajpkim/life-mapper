'use client'
import { useEffect, useState } from 'react'
import TimeTable from './TimeTable'
import { formatDate } from '@/utils'

const Time = () => {
  const [startDate, setStartDate] = useState('2024-02-19')
  const [endDate, setEndDate] = useState('2024-02-25')

  return (
    <div>
      <h1>Hi</h1>
      <TimeTable startDate={startDate} endDate={endDate} />
    </div>
  )
}

export default Time
