import { useEffect, useState, useRef } from "react"

const NewHabitModal = ({ isOpen, onSubmit, onClose }) => {
  const [name, setName] = useState("")
  const inputRef = useRef(null)
  const modalRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
    setName("")
  }, [isOpen])

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault()
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    onSubmit(name)
    setName("")
  }

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-xl" ref={modalRef}>
        <input
          ref={inputRef}
          type="text"
          className="p-2 rounded w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Add Habit
        </button>
      </div>
    </div>
  )
}

export default NewHabitModal
