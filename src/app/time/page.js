"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import LogSessionModal from "./LogSessionModal"

const Timer = () => {
  const [sessionLength, setSessionLength] = useState(1500)
  const [timeLeft, setTimeLeft] = useState(2)
  const [sessionIsActive, setSessionIsActive] = useState(false)
  const [logSessionMode, setLogSessionMode] = useState(false)

  useEffect(() => {
    let intervalId
    if (sessionIsActive && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft <= 0) {
      setLogSessionMode(true)
      handleTimerEnd()
    }

    return () => clearInterval(intervalId)
  }, [timeLeft, sessionIsActive])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        setSessionIsActive(!sessionIsActive)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [sessionIsActive])

  const handleTimerEnd = async () => {
    const res = await axios.post("/api/timer")
    setSessionIsActive(false)
  }

  const handleCloseModal = () => {
    setLogSessionMode(false)
    setTimeLeft(sessionLength)
  }

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div>
      <div className="pt-36 text-center">
        <div className="text-8xl">{`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}</div>
        <div className="flex justify-center gap-4 mt-4">
          <button
            className="bg-emerald-500 hover:opacity-50 font-bold py-2 px-4 rounded"
            onClick={() => setSessionIsActive(!sessionIsActive)}
          >
            {sessionIsActive ? "Pause" : "Start"} Timer
          </button>
          <button
            className="bg-rose-500 hover:opacity-50 font-bold py-2 px-4 rounded"
            onClick={handleTimerEnd}
          >
            End Session
          </button>
          <LogSessionModal
            isOpen={logSessionMode}
            onClose={handleCloseModal}
            sessionSeconds={sessionLength}
          />
        </div>
      </div>
    </div>
  )
}

export default Timer
