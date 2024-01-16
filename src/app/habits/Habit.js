"use client"
import { useEffect, useRef } from "react"
import axios from "axios"
import classNames from "classnames"
import { formatDate, getDaysInMonth } from "@/utils"

const Habit = ({
  name,
  isActive,
  stats,
  today,
  activeDay,
  month,
  year,
  onDateClick,
}) => {
  const activeDayRef = useRef(null)

  useEffect(() => {
    // Only set focus if this habit is active and the ref is set
    if (isActive && activeDayRef.current) {
      activeDayRef.current.focus()
    }
  }, [activeDay, isActive])

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

  const getDateClassClassNames = (day) => {
    const date = formatDate(new Date(year, month, day))
    const isDone = getDateStat(date)
    const isFuture = date > today
    const isFocused = isActive && day === activeDay

    return classNames(
      "w-6 h-6 rounded-sm flex justify-center items-center text-xs",
      isDone && "text-green-400",
      !isDone && !isFuture && "text-red-400",
      isFuture && "text-gray-400",
      isFocused && "border-2 border-black outline-none",
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
    } catch (error) {
      console.error("Error toggling habit status:", error)
    }
  }

  const handleKeyDown = (event, day) => {
    if (event.key === "Enter" || event.key === " ") {
      toggleStat(day)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className={classNames("p-2 flex flex-col items-center border-2", {
          "border-blue-500": isActive,
          "border-transparent": !isActive,
        })}
      >
        <h1>{name}</h1>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <div
              key={day}
              tabIndex={0}
              onClick={() => handleDateClick(day)}
              onKeyDown={(e) => handleKeyDown(e, day)}
              className={getDateClassClassNames(day)}
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
