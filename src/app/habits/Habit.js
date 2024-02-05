'use client'
import { useEffect, useRef } from 'react'
import axios from 'axios'
import classNames from 'classnames'
import { formatDate, getDaysInMonth } from '@/utils'

const Habit = ({
  name,
  createdAt,
  isActive,
  stats,
  today,
  activeDay,
  month,
  year,
  onDateClick,
  onUpdateStats,
}) => {
  const activeDayRef = useRef(null)

  useEffect(() => {
    if (isActive && activeDayRef.current) {
      activeDayRef.current.focus()
    }
  }, [activeDay, isActive, createdAt])

  const days = Array.from(
    { length: getDaysInMonth(month, year) },
    (_, i) => i + 1,
  )

  const handleDateClick = (day) => {
    onDateClick(day, name)
  }

  const getDateStat = (date) => {
    const stat = stats.find((habit_stat) => habit_stat.date === date)
    return stat ? stat.stat : 0
  }

  // TODO: Update to using actual Date objs everywhere
  const getDateClassNames = (day) => {
    const date = formatDate(new Date(year, month, day))
    const habitCreationDate = formatDate(new Date(createdAt))
    const isDone = getDateStat(date)
    const isFuture = date > formatDate(today)
    const isBeforeHabitCreated = date < habitCreationDate
    const isFocused = isActive && day === activeDay

    return classNames(
      'w-6 h-6 rounded-sm flex justify-center items-center text-xs',
      isDone && 'text-emerald-500',
      !isDone && !isFuture && !isBeforeHabitCreated && 'text-rose-500',
      isBeforeHabitCreated && !isDone && 'text-gray-400',
      isFuture && 'text-gray-400 blur-sm',
      isFuture && isFocused && 'text-gray-400 blur-none',
      isFocused && 'border-2 border-blue-400 outline-none',
    )
  }

  const toggleStat = async (day) => {
    const date = formatDate(new Date(year, month, day))
    const stat = !getDateStat(date)
    const payload = {
      name,
      date,
      stat,
    }
    try {
      const response = await axios.post(`/api/habits/${name}`, payload)

      if (onUpdateStats) {
        onUpdateStats(name, payload.stat, date)
      }
    } catch (error) {
      console.error('Error toggling habit status:', error)
    }
  }

  const handleKeyDown = (event, day) => {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleStat(day)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className={classNames('flex flex-col items-center border-2 p-2', {
          'border-blue-400': isActive,
          'border-transparent': !isActive,
        })}
      >
        <h1 className={classNames({ 'font-bold text-white': isActive })}>
          {name}
        </h1>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <div
              key={day}
              tabIndex={0}
              onClick={() => handleDateClick(day)}
              onKeyDown={(e) => handleKeyDown(e, day)}
              className={getDateClassNames(day)}
              ref={day === activeDay ? activeDayRef : null}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Habit
