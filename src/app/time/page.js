'use client'
import { useEffect, useState } from 'react'
import LoggedTime from './LoggedTime'
import { formatDate } from '@/utils'

const Time = () => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(new Date())

  useEffect(() => {
    setStartDate(getStartOfWeek(endDate))
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 't':
          setStartDate(new Date())
          break
        case 'w':
          setStartDate(getStartOfWeek(endDate))
          break
        case 'm':
          setStartDate(getStartOfMonth(endDate))
          break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [startDate, endDate])

  function getStartOfWeek(date) {
    const start = new Date(date)
    const day = start.getDay()
    const difference = day === 0 ? -6 : 1 - day // if Sunday, go back 6 days; otherwise, go to the last Monday
    start.setDate(start.getDate() + difference)
    start.setHours(0, 0, 0, 0)
    return start
  }

  const getStartOfMonth = (date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    return startOfMonth
  }

  if (!startDate || !endDate) return null

  return (
    <div className="pl-24 pt-8">
      <LoggedTime startDate={startDate} endDate={endDate} />
    </div>
  )
}

export default Time
