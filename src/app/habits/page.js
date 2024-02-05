'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Habit from './Habit'
import NewHabitModal from './NewHabitModal'
import ControlsModal from './ControlsModal'
import ConfigModal from './ConfigModal'
import { downloadData, formatDate, getMonthName, getDaysInMonth } from '@/utils'

const Habits = () => {
  const [habits, setHabits] = useState(null)
  const [numActiveHabits, setNumActiveHabits] = useState(0)
  const [activeHabitIndex, setActiveHabitIndex] = useState(0)
  const [activeDate, setActiveDate] = useState(formatDate(new Date()))
  const [today, setToday] = useState(formatDate(new Date()))
  const [activeDay, setActiveDay] = useState(null)
  const [month, setMonth] = useState(null)
  const [year, setYear] = useState(null)
  const [daysInMonth, setDaysInMonth] = useState(0)
  const [isAddHabitMode, setIsAddHabitMode] = useState(false)
  const [isReorderMode, setIsReorderMode] = useState(false)
  const [isConfigMode, setIsConfigMode] = useState(false)
  const [isControlsMode, setIsControlsMode] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const today = new Date()
    const day = today.getDate()
    const month = today.getMonth()
    const year = today.getFullYear()
    const daysInMonth = getDaysInMonth(month, year)
    setActiveDay(day)
    setToday(today)
    setMonth(month)
    setYear(year)
    setDaysInMonth(daysInMonth)
  }, [])

  useEffect(() => {
    const fetchHabitsData = async () => {
      try {
        const response = await axios.get('/api/habits')
        setHabits(response.data)
      } catch (error) {
        console.error('Error fetching habit:', error)
      }
    }
    fetchHabitsData()
  }, [])

  useEffect(() => {
    if (habits !== null) {
      setNumActiveHabits(
        habits.reduce((acc, habit) => (habit.active ? acc + 1 : acc), 0),
      )
      if (habits.length === 0) {
        setIsAddHabitMode(true)
      }
    }
  }, [habits])

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Active habit navigation
      if (event.key === 'Tab' && !event.shiftKey) {
        event.preventDefault()
        setActiveHabitIndex((prev) => (prev + 1) % numActiveHabits)
      }
      if (event.key === 'Tab' && event.shiftKey) {
        event.preventDefault()
        setActiveHabitIndex((prev) =>
          prev === 0 ? numActiveHabits - 1 : prev - 1,
        )
      }
      if (event.key === 'ArrowRight' && event.shiftKey) {
        event.preventDefault()
        setActiveHabitIndex((prev) =>
          prev === numActiveHabits - 1 ? 0 : prev + 1,
        )
      }
      if (event.key === 'ArrowLeft' && event.shiftKey) {
        event.preventDefault()
        setActiveHabitIndex((prev) =>
          prev === 0 ? numActiveHabits - 1 : prev - 1,
        )
      }
      if (event.key === 'ArrowUp' && event.shiftKey) {
        event.preventDefault()
        setActiveHabitIndex((prev) => Math.max(prev - 3, 0))
      }
      if (event.key === 'ArrowDown' && event.shiftKey) {
        event.preventDefault()
        setActiveHabitIndex((prev) => Math.min(prev + 3, numActiveHabits - 1))
      }
      // Active day navigation
      if (event.key === 'ArrowRight' && !event.shiftKey) {
        event.preventDefault()
        setActiveDay((prev) => (prev % daysInMonth) + 1)
      }
      if (event.key === 'ArrowLeft' && !event.shiftKey) {
        event.preventDefault()
        setActiveDay((prev) => (prev === 1 ? daysInMonth : prev - 1))
      }
      if (event.key === 'ArrowUp' && !event.shiftKey) {
        event.preventDefault()
        setActiveDay((prev) => Math.max(prev - 7, 1))
      }
      if (event.key === 'ArrowDown' && !event.shiftKey) {
        event.preventDefault()
        setActiveDay((prev) => Math.min(prev + 7, daysInMonth))
      }
      // Show controls
      if (event.key === '?') {
        if (!isAddHabitMode && !isConfigMode) {
          setIsControlsMode(true)
          setIsModalOpen(true)
        }
      }
      // Export data
      if (event.key === 'e') {
        if (!isAddHabitMode && !isConfigMode) {
          event.preventDefault()
          downloadData()
        }
      }
      // Add new habit
      if (event.key === 'n') {
        if (!isAddHabitMode && !isConfigMode) {
          event.preventDefault()
          setIsAddHabitMode(true)
        }
      }
      // Habit config mode
      if (event.key === 'c') {
        if (!isAddHabitMode) {
          event.preventDefault()
          setIsConfigMode(!isConfigMode)
        }
      }
      // Habit config mode
      if (event.key === 't') {
        if (!isAddHabitMode && !isConfigMode) {
          event.preventDefault()
          setActiveDay(today.getDate())
        }
      }
      // Return to main habits page
      if (event.key === 'Escape') {
        event.preventDefault()
        handleModalClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [
    daysInMonth,
    habits,
    isReorderMode,
    isConfigMode,
    isAddHabitMode,
    numActiveHabits,
  ])

  const getActiveDate = () => {
    return new Date(year, month, activeDay)
  }

  const handleDateClick = (day, name) => {
    const newActiveHabitIndex = habits.findIndex((habit) => habit.name === name)
    setActiveDay(day)
    setActiveHabitIndex(newActiveHabitIndex)
  }

  const handleModalClose = () => {
    setIsControlsMode(false)
    setIsConfigMode(false)
    setIsAddHabitMode(false)
  }

  const handleNewHabitSubmit = async (name) => {
    try {
      const response = await axios.post('/api/habits', { name })
      setHabits([...habits, response.data])
      setIsAddHabitMode(false)
    } catch (error) {
      // TODO: Provide useful modal telling user that they tried to create a duplicate habit
      console.error('Error adding new habit:', error)
    }
  }

  const handleUpdateHabit = async ({
    id,
    name,
    active,
    display_num,
    created_at,
  }) => {
    try {
      const response = await axios.patch(`/api/habits/${id}`, {
        id,
        name,
        active,
        display_num,
        created_at,
      })
      setHabits((prevHabits) =>
        prevHabits
          .map((habit) => {
            if (habit.id === id) {
              return { ...response.data, stats: habit.stats }
            }
            return habit
          })
          .sort((a, b) => {
            if (a.display_num === null) return 1
            if (b.display_num === null) return -1
            return a.display_num - b.display_num
          }),
      )
    } catch (error) {
      console.error(`Error updating habit ${id}:`, error)
    }
  }

  const handleDeleteHabit = async (habit) => {
    try {
      await axios.delete(`/api/habits/${habit.id}`)
      setHabits((prevHabits) => prevHabits.filter((h) => h.id !== habit.id))
    } catch (error) {
      console.error(`Error deleting habit ${habit.id}`, error)
    }
  }

  const updateHabitStats = (name, updatedStat, date) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) => {
        if (habit.name === name) {
          // Upserting the new habit stat value
          const statIndex = habit.stats.findIndex((stat) => stat.date === date)
          const updatedStats =
            statIndex >= 0
              ? habit.stats.map((stat, index) =>
                  index === statIndex ? { ...stat, stat: updatedStat } : stat,
                )
              : [...habit.stats, { date, stat: updatedStat }]
          return { ...habit, stats: updatedStats }
        }
        return habit
      }),
    )
  }

  if (habits === null) return <div>Loading...</div>

  return (
    <div className="text-gray-200">
      <div>
        <ControlsModal isOpen={isControlsMode} onClose={handleModalClose} />
        <ConfigModal
          isOpen={isConfigMode}
          onClose={handleModalClose}
          onUpdateHabit={handleUpdateHabit}
          onDeleteHabit={handleDeleteHabit}
          habits={habits}
          numActiveHabits={numActiveHabits}
        />
        <NewHabitModal
          isOpen={isAddHabitMode}
          onSubmit={handleNewHabitSubmit}
          onClose={handleModalClose}
        />
      </div>
      <div className="relative pt-4">
        <div className="text-center">
          {`${getActiveDate().toLocaleString('en-us', { weekday: 'long' })} ${activeDay} ${getMonthName(month)}, ${year}`}
        </div>
        <div className="absolute right-0 top-0 pr-32 pt-6 font-light italic">
          Press ? to see controls
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
        {habits
          .filter((habit) => habit.active)
          .map((habit, index) => (
            <Habit
              key={index}
              name={habit.name}
              createdAt={habit.created_at}
              isActive={index === activeHabitIndex}
              stats={habit.stats}
              today={today}
              activeDay={activeDay}
              month={month}
              year={year}
              onDateClick={handleDateClick}
              onUpdateStats={updateHabitStats}
            />
          ))}
      </div>
    </div>
  )
}

export default Habits
