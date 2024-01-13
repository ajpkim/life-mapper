"use client"

import { getMonthName } from "@/utils"
import Habit from "./Habit"
import { useEffect, useState } from "react"

const habits = [
  { name: "rested", isActive: true },
  { name: "exercise", isActive: false },
  { name: "study", isActive: false },
  { name: "read", isActive: false },
  { name: "code", isActive: false },
]

const Habits = () => {
  const [activeHabit, setActiveHabit] = useState(null)
  const [activeDay, setActiveDay] = useState(null)
  const [month, setMonth] = useState(null)
  const [year, setYear] = useState(null)

  useEffect(() => {
    const today = new Date()
    const day = today.getDate()
    const month = today.getMonth()
    const year = today.getFullYear()
    setActiveDay(day)
    setMonth(month)
    setYear(year)
  }, [])

  return (
    <div>
      <div className="pt-4 text-center">
        {getMonthName(month)}, {year}
      </div>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {habits.map((habit, index) => (
          <Habit
            key={index}
            name={habit.name}
            isActive={habit.isActive}
            activeDay={activeDay}
            month={month}
            year={year}
          />
        ))}
      </div>
    </div>
  )
}

export default Habits
