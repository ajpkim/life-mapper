"use client"

import { getMonthName, getDaysInMonth } from "@/utils"
import Habit from "./Habit"
import { useEffect, useState } from "react"

const initialHabits = [
  { name: "rested" },
  { name: "exercise" },
  { name: "study" },
  { name: "read" },
  { name: "code" },
]

const Habits = () => {
  const [habits, setHabits] = useState(initialHabits)
  const [activeHabitIndex, setActiveHabitIndex] = useState(0)
  const [activeDay, setActiveDay] = useState(null)
  const [month, setMonth] = useState(null)
  const [year, setYear] = useState(null)
  const [daysInMonth, setDaysInMonth] = useState(0)

  useEffect(() => {
    const today = new Date()
    const day = today.getDate()
    const month = today.getMonth()
    const year = today.getFullYear()
    const daysInMonth = getDaysInMonth(month, year)
    setActiveDay(day)
    setMonth(month)
    setYear(year)
    setDaysInMonth(daysInMonth)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Tab") {
        event.preventDefault()
        setActiveHabitIndex((prev) => (prev + 1) % habits.length)
      }
      if (event.key === "ArrowRight") {
        event.preventDefault()
        setActiveDay((prev) => (prev % daysInMonth) + 1)
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        setActiveDay((prev) => (prev === 1 ? daysInMonth : prev - 1))
      }
      if (event.key === "ArrowUp") {
        event.preventDefault()
        setActiveDay((prev) => Math.max(prev - 7, 1))
      }
      if (event.key === "ArrowDown") {
        event.preventDefault()
        setActiveDay((prev) => Math.min(prev + 7, daysInMonth))
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [daysInMonth])

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
            isActive={index === activeHabitIndex}
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
