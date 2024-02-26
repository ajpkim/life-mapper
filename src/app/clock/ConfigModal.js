import { useEffect, useState, useRef } from 'react'

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
        case 'ArrowUp':
          updateConfig('minutes', 1)
          break
        case 'ArrowDown':
          updateConfig('minutes', -1)
          break
        case 'ArrowRight':
          updateConfig('seconds', 1)
          break
        case 'ArrowLeft':
          updateConfig('seconds', -1)
          break
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, timerConfig])

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
        <h3 className="mb-4 text-xl font-bold">Timer Config</h3>
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
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:opacity-50"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default ConfigModal
