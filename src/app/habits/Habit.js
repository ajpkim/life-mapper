"use client"
import React from "react"
import classNames from "classnames"
import { getDaysInMonth } from "@/utils"

const Habit = ({ name, isActive, activeDay, month, year, onDateClick }) => {
  const days = Array.from(
    { length: getDaysInMonth(month, year) },
    (_, i) => i + 1,
  )
  const activeStyle = isActive ? "bg-blue-500 text-white" : ""
  const activeDayStyle = "border-4 border-black border-rounded"

  const handleDateClick = (day) => {
    onDateClick(day, name)
  }

  // useEffect(() => {})

  const formatActiveDate = () => {
    const date = new Date(year, month, activeDay)
    return date.toISOString().split("T")[0]
  }

  return (
    <div className={`flex flex-col items-center`}>
      <div className={`p-2 flex flex-col items-center ${activeStyle}`}>
        <h1 className="">{name}</h1>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <div
              key={day}
              onClick={() => handleDateClick(day)}
              className={classNames(
                "w-6 h-6 rounded-sm flex justify-center items-center text-xs",
                { [activeDayStyle]: isActive && day === activeDay },
              )}
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
