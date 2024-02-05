import { useEffect, useState, useRef } from 'react'

const NewProjectModal = ({ isOpen, onSubmit, onClose }) => {
  const [name, setName] = useState('')
  const inputRef = useRef(null)
  const modalRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
    setName('')
  }, [isOpen])

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    onSubmit(name)
    setName('')
  }

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-700 bg-opacity-50"
      onClick={handleOutsideClick}
    >
      <div className="rounded-lg bg-zinc-950 p-6 shadow-xl" ref={modalRef}>
        <input
          ref={inputRef}
          type="text"
          className="w-full rounded bg-white p-2 text-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSubmit}
          className="mt-4 rounded bg-sky-500 p-2 text-white hover:bg-sky-700"
        >
          Add Project
        </button>
      </div>
    </div>
  )
}

export default NewProjectModal
