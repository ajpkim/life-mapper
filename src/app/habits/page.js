"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import Habit from "./Habit"
import { formatDate, getMonthName, getDaysInMonth } from "@/utils"

const Habits = () => {
  const [habits, setHabits] = useState(null)
  const [activeHabitIndex, setActiveHabitIndex] = useState(0)
  const [today, setToday] = useState(formatDate(new Date()))
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
    const fetchHabitsData = async () => {
      try {
        const response = await axios.get("/api/habits")
        setHabits(response.data)
      } catch (error) {
        console.error("Error fetching habit:", error)
      }
    }
    fetchHabitsData()
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "1") {
        event.preventDefault()
        fetch("api/init")
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error("Error:", error))
      }
      if (event.key === "Tab" && !event.shiftKey) {
        event.preventDefault()
        setActiveHabitIndex((prev) => (prev + 1) % habits.length)
      }
      if (event.key === "Tab" && event.shiftKey) {
        event.preventDefault()
        setActiveHabitIndex((prev) =>
          prev === 0 ? habits.length - 1 : prev - 1,
        )
      }
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
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
  }, [daysInMonth, habits])

  const handleDateClick = (day, name) => {
    const newActiveHabitIndex = habits.findIndex((habit) => habit.name === name)
    setActiveDay(day)
    setActiveHabitIndex(newActiveHabitIndex)
  }

  if (habits === null) {
    return <div>Loading...</div> // You can replace this with a spinner or a suitable loading component
  }

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
            stats={habit.stats}
            today={today}
            activeDay={activeDay}
            month={month}
            year={year}
            onDateClick={handleDateClick}
          />
        ))}
      </div>
    </div>
  )
}

export default Habits
