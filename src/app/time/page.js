"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import LoggedTimeTable from "./LoggedTimeTable"
import LogSessionModal from "./LogSessionModal"
import ConfigModal from "./ConfigModal"

const Timer = () => {
  const [timerConfig, setTimerConfig] = useState({
    minutes: 25,
    seconds: 0,
  })
  const initTimeRemaining = timerConfig.minutes * 60 + timerConfig.seconds
  const [timeRemaining, setTimeRemaining] = useState(initTimeRemaining)
  const [isDisplayLogsMode, setIsDisplayLogsMode] = useState(false)
  const [isWorkMode, setIsWorkMode] = useState(true)
  const [isSessionActive, setIsSessionActive] = useState(false)
  const [isConfigMode, setIsConfigMode] = useState(false)
  const [isLogSessionMode, setIsLogSessionMode] = useState(false)

  useEffect(() => {
    const newTimerLength = totalTimerSeconds()
    setTimeRemaining(newTimerLength)
  }, [timerConfig])

  useEffect(() => {
    let intervalId
    if (isSessionActive && timeRemaining > 0) {
      intervalId = setInterval(() => {
        setTimeRemaining(timeRemaining - 1)
      }, 1000)
    } else if (timeRemaining <= 0) {
      handleTimerEnd()
    }

    return () => clearInterval(intervalId)
  }, [timeRemaining, isSessionActive])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isSessionActive) {
        switch (event.key) {
          case "r":
            setTimeRemaining(totalTimerSeconds())
            break
          case "ArrowUp":
            handleUpdateTimerConfig("minutes", 1)
            break
          case "ArrowDown":
            handleUpdateTimerConfig("minutes", -1)
            break
          case "ArrowRight":
            handleUpdateTimerConfig("seconds", 1)
            break
          case "ArrowLeft":
            handleUpdateTimerConfig("seconds", -1)
            break
          case "1":
            setTimerConfig({ minutes: 5, seconds: 0 })
            break
          case "2":
            setTimerConfig({ minutes: 10, seconds: 0 })
            break
          case "3":
            setTimerConfig({ minutes: 25, seconds: 0 })
            break
          case "4":
            setTimerConfig({ minutes: 30, seconds: 0 })
            break
          case "5":
            setTimerConfig({ minutes: 60, seconds: 0 })
            break
        }
      }

      if (event.key === "b") {
        event.preventDefault()
        setIsWorkMode(!isWorkMode)
      }
      if (event.key === "c") {
        event.preventDefault()
        setIsConfigMode(!isConfigMode)
      }
      if (event.key === "l") {
        event.preventDefault()
        setIsDisplayLogsMode(!isDisplayLogsMode)
      }
      if (event.key === "Space") {
        event.preventDefault()
        setIsSessionActive(!isSessionActive)
      }
      if (event.key === "Escape") {
        if (isLogSessionMode || isConfigMode) {
          event.preventDefault()
          handleModalClose()
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [
    isSessionActive,
    isLogSessionMode,
    isConfigMode,
    isWorkMode,
    timerConfig,
    isDisplayLogsMode,
  ])

  const handleModalClose = () => {
    setIsLogSessionMode(false)
    setIsConfigMode(false)
  }

  const handleUpdateTimerConfig = async (field, delta) => {
    setTimerConfig((prevConfig) => {
      const newValue = Math.max(0, (prevConfig[field] + delta) % 60)
      return { ...prevConfig, [field]: newValue }
    })
  }

  const handleTimerEnd = async () => {
    const res = await axios.post("/api/time/notify")
    setIsSessionActive(false)
    if (isWorkMode && timeRemaining !== totalTimerSeconds()) {
      setIsLogSessionMode(true)
    }
  }

  const getElapsedTime = () => {
    return totalTimerSeconds() - timeRemaining
  }

  const handleCloseModal = () => {
    setIsLogSessionMode(false)
    setTimeRemaining(totalTimerSeconds())
  }

  const totalTimerSeconds = () => {
    return timerConfig.minutes * 60 + timerConfig.seconds
  }

  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60

  return (
    <div>
      <div className="pt-36 text-center w-full max-w-2xl mx-auto">
        {!isWorkMode && <p className="text-2xl">BREAK MODE</p>}
        <div className="text-8xl">{`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}</div>
        <div className="flex justify-center gap-4 mt-4">
          <button
            className="bg-emerald-500 hover:opacity-50 font-bold py-2 px-4 rounded"
            onClick={() => setIsSessionActive(!isSessionActive)}
          >
            {isSessionActive ? "Pause" : "Start"} Timer
          </button>
          <button
            className="bg-rose-500 hover:opacity-50 font-bold py-2 px-4 rounded"
            onClick={handleTimerEnd}
          >
            End Session
          </button>
          <LogSessionModal
            isOpen={isLogSessionMode}
            onClose={handleCloseModal}
            sessionSeconds={getElapsedTime()}
          />
          <ConfigModal
            isOpen={isConfigMode}
            onClose={handleCloseModal}
            timerConfig={timerConfig}
            updateConfig={handleUpdateTimerConfig}
          />
        </div>
        {isDisplayLogsMode && (
          <div className="mt-4 text-left w-full">
            <LoggedTimeTable />
          </div>
        )}
      </div>
    </div>
  )
}

export default Timer
