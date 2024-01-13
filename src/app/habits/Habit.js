"use client"
import React from "react"
import classNames from "classnames"

const Habit = ({ name, isActive, activeDay, month, year }) => {
  const days = Array.from({ length: 30 }, (_, i) => i + 1)
  const activeStyle = isActive ? "bg-blue-500 text-white" : ""
  const activeDayStyle = "border-4 border-black border-rounded"

  return (
    <div className={`flex flex-col items-center`}>
      <div className={`p-2 flex flex-col items-center ${activeStyle}`}>
        <h1 className="">{name}</h1>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <div
              key={day}
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
