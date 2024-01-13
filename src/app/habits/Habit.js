"use client"
import React from "react"

const Habit = ({ name, activeDayIndex, onDayClick }) => {
  const totalDays = 30

  return (
    <div className="flex flex-col items-center">
      <div className="text-sm font-bold mb-1">{name}</div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: totalDays }, (_, index) => (
          <button
            key={index}
            className={`w-6 h-8 rounded-sm flex justify-center items-center text-xs ${
              index === activeDayIndex ? "bg-blue-500" : "bg-gray-700"
            }`}
            onClick={() => onDayClick(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Habit
