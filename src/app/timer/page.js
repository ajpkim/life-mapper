"use client"
import { useEffect, useState } from "react"
import axios from "axios"

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(10)
  const [timerIsRunning, setTimerIsRunning] = useState(false)

  useEffect(() => {
    let intervalId
    if (timerIsRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft <= 0) {
      handleTimerEnd()
    }

    return () => clearInterval(intervalId)
  }, [timeLeft, timerIsRunning])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        setTimerIsRunning(!timerIsRunning)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [timerIsRunning])

  const handleTimerEnd = async () => {
    const res = await axios.post("/api/timer")
    setTimerIsRunning(false)
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
            onClick={() => setTimerIsRunning(!timerIsRunning)}
          >
            {timerIsRunning ? "Pause" : "Start"} Timer
          </button>
          <button
            className="bg-rose-500 hover:opacity-50 font-bold py-2 px-4 rounded"
            onClick={handleTimerEnd}
          >
            End Session
          </button>
        </div>
      </div>
    </div>
  )
}

export default Timer
