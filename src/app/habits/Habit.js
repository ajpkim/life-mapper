"use client"
import React from "react"
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

    return classNames(
      "w-6 h-6 rounded-sm flex justify-center items-center text-xs",
      isDone && "text-green-400",
      !isDone && !isFuture && "text-red-400",
      isFuture && "text-gray-400",
      isActive && day === activeDay && "border-2 border-black",
    )
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
              onClick={() => handleDateClick(day)}
              className={getDateClassClassNames(day)}
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
