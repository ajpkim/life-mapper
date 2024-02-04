import { useEffect, useState, useRef } from "react"

const ConfigModal = ({ isOpen, onClose, timerConfig, updateConfig }) => {
  const modalRef = useRef(null)

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose()
    }
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
          updateConfig("minutes", 1)
          break
        case "ArrowDown":
          updateConfig("minutes", -1)
          break
        case "ArrowRight":
          updateConfig("seconds", 1)
          break
        case "ArrowLeft":
          updateConfig("seconds", -1)
          break
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
    }

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, timerConfig])

  if (!isOpen) return null

  return (
    <div
      className="fixed bg-zinc-700 inset-0 bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOutsideClick}
    >
      <div
        className="bg-zinc-950 py-6 px-20 rounded-lg shadow-xl"
        ref={modalRef}
      >
        <h3 className="text-xl font-bold mb-4">Timer Config</h3>
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between">
            <span>Timer Length:</span>
            <span className="tabular-nums">
              {timerConfig.minutes}m {timerConfig.seconds}s
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:opacity-50 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default ConfigModal
