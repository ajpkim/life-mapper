"use client"
import React, { useState } from "react"
import Habit from "./Habit"

const Habits = () => {
  const habits = ["rested", "exercise", "study", "read", "code"]
  const [activeDayIndex, setActiveDayIndex] = useState(null)

  const handleDayClick = (dayIndex) => {
    setActiveDayIndex(dayIndex)
  }

  return (
    <div className="bg-black text-white p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {habits.map((habit, index) => (
        <Habit
          key={habit}
          name={habit}
          activeDayIndex={activeDayIndex}
          onDayClick={handleDayClick}
        />
      ))}
    </div>
  )
}

export default Habits
