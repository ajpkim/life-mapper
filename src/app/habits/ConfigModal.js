import axios from "axios"
import { useEffect, useState, useRef } from "react"

const ConfigModal = ({ isOpen, onClose, onUpdateHabit, habits }) => {
  const modalRef = useRef(null)

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
                <th className="px-4 py-2">Actions</th>
                <th className="px-4 py-2">Display Number</th>
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
                  <td className="border px-4 py-2">{habit.display_num}</td>
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
