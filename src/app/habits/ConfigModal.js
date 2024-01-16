import { useEffect, useState, useRef } from "react"

const HabitConfigModal = ({ isOpen, onSubmit, onClose }) => {
  const [name, setName] = useState("")
  const modalRef = useRef(null)

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
        Habit Config
      </div>
    </div>
  )
}

export default HabitConfigModal
