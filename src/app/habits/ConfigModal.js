import axios from "axios"
import classnames from "classnames"
import { useEffect, useMemo, useState, useRef } from "react"

const ConfigModal = ({ isOpen, onClose, onUpdateHabit, habits }) => {
  const modalRef = useRef(null)
  const [numActiveHabits, setNumActiveHabits] = useState(null)

  useEffect(() => {
    setNumActiveHabits(
      habits.reduce((acc, habit) => (habit.active ? acc + 1 : acc), 0),
    )
  }, [habits])

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose()
    }
  }

  const toggleHabitActive = async (habit) => {
    let updatedHabit
    if (habit.active) {
      updatedHabit = {
        ...habit,
        active: !habit.active,
        display_num: null,
      }
    } else {
      const nextDisplayNum =
        Math.max(...habits.map((habit) => habit.display_num)) + 1
      updatedHabit = {
        ...habit,
        active: !habit.active,
        display_num: nextDisplayNum,
      }
    }
    onUpdateHabit(updatedHabit)
  }

  const moveHabit = (habit, direction) => {
    /* Assumes habits are already sorted by display_num */
    const swapDisplayNums = (arr, i, j) => {
      const tmp = arr[i].display_num
      arr[i].display_num = arr[j].display_num
      arr[j].display_num = tmp
    }

    const newHabits = [...habits]
    const idx = habits.indexOf(habit)
    const newIdx = idx + direction
    swapDisplayNums(habits, idx, newIdx)

    onUpdateHabit(newHabits[idx])
    onUpdateHabit(newHabits[newIdx])
  }

  const shouldShowArrow = (index, direction) => {
    if (!habits[index].active) return false
    if (direction === "up") return index > 0
    if (direction === "down") return index < numActiveHabits - 1
    return false
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-xl" ref={modalRef}>
        <h3 className="text-xl font-bold mb-4">Habit Configuration</h3>
        <div>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Habit Name</th>
                <th className="px-4 py-2">Toggle</th>
                <th className="px-4 py-2">Reorder</th>
              </tr>
            </thead>
            <tbody>
              {habits.map((habit, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{habit.name}</td>
                  <td className="border px-4 py-2">
                    <button
                      className={`px-4 py-2 rounded ${habit.active ? "bg-red-400" : "bg-green-400"} text-white`}
                      onClick={() => toggleHabitActive(habit)}
                    >
                      {habit.active ? "Hide" : "Show"}
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className={classnames("mx-2 text-xl", {
                        invisible: !shouldShowArrow(index, "up"),
                      })}
                      onClick={() => moveHabit(habit, -1)}
                      disabled={index === 0}
                    >
                      ↑
                    </button>
                    <button
                      className={classnames("text-xl", {
                        invisible: !shouldShowArrow(index, "down"),
                      })}
                      onClick={() => moveHabit(habit, 1)}
                      disabled={!shouldShowArrow(index, "down")}
                    >
                      ↓
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ConfigModal
