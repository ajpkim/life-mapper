import axios from 'axios'
import classnames from 'classnames'
import { useEffect, useMemo, useState, useRef } from 'react'

const ConfigModal = ({
  isOpen,
  onClose,
  onUpdateHabit,
  onDeleteHabit,
  habits,
  numActiveHabits,
}) => {
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

  const deleteHabit = (habit) => {
    onDeleteHabit(habit)
  }

  const shouldShowArrow = (index, direction) => {
    if (!habits[index].active) return false
    if (direction === 'up') return index > 0
    if (direction === 'down') return index < numActiveHabits - 1
    return false
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-700 bg-opacity-50"
      onClick={handleOutsideClick}
    >
      <div
        className="rounded-lg bg-zinc-950 px-20 py-6 shadow-xl"
        ref={modalRef}
      >
        <h3 className="mb-4 text-xl font-bold">Habit Configuration</h3>
        <div>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Habit Name</th>
                <th className="px-4 py-2">Reorder</th>
                <th className="px-4 py-2">Toggle</th>
                <th className="px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {habits.map((habit, index) => (
                <tr key={index}>
                  <td className="border border-gray-600 px-4 py-2">
                    {habit.name}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    <button
                      className={classnames(
                        'mx-2 p-1 text-xl hover:opacity-70',
                        {
                          invisible: !shouldShowArrow(index, 'up'),
                        },
                      )}
                      onClick={() => moveHabit(habit, -1)}
                      disabled={index === 0}
                    >
                      ↑
                    </button>
                    <button
                      className={classnames('p-1 text-xl hover:opacity-70', {
                        invisible: !shouldShowArrow(index, 'down'),
                      })}
                      onClick={() => moveHabit(habit, 1)}
                      disabled={!shouldShowArrow(index, 'down')}
                    >
                      ↓
                    </button>
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    <button
                      className={`rounded px-4 py-2 hover:opacity-70 ${habit.active ? 'bg-emerald-500' : 'bg-rose-500'} text-white`}
                      onClick={() => toggleHabitActive(habit)}
                    >
                      {habit.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    <button
                      className="rounded px-4 py-2 hover:opacity-70"
                      onClick={() => deleteHabit(habit)}
                    >
                      X
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
