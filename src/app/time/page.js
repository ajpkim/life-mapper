'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import LoggedTimeTable from './LoggedTimeTable'
import LogSessionModal from './LogSessionModal'
import ManualLogModal from './ManualLogModal'
import ConfigModal from './ConfigModal'

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
  const [isManualLogMode, setIsManualLogMode] = useState(false)

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
      if (!isSessionActive && !isManualLogMode && !isLogSessionMode) {
        switch (event.key) {
          case 'r':
            setTimeRemaining(totalTimerSeconds())
            break
          case 'ArrowUp':
            handleUpdateTimerConfig('minutes', 1)
            break
          case 'ArrowDown':
            handleUpdateTimerConfig('minutes', -1)
            break
          case 'ArrowRight':
            handleUpdateTimerConfig('seconds', 1)
            break
          case 'ArrowLeft':
            handleUpdateTimerConfig('seconds', -1)
            break
          case '1':
            setTimerConfig({ minutes: 5, seconds: 0 })
            break
          case '2':
            setTimerConfig({ minutes: 10, seconds: 0 })
            break
          case '3':
            setTimerConfig({ minutes: 25, seconds: 0 })
            break
          case '4':
            setTimerConfig({ minutes: 30, seconds: 0 })
            break
          case '5':
            setTimerConfig({ minutes: 60, seconds: 0 })
            break
        }
      }

      if (event.key === 'b') {
        event.preventDefault()
        setIsWorkMode(!isWorkMode)
      }
      if (event.key === 'm') {
        event.preventDefault()
        setIsManualLogMode(true)
      }
      if (event.key === 'c') {
        event.preventDefault()
        setIsConfigMode(!isConfigMode)
      }
      if (event.key === 'l') {
        event.preventDefault()
        setIsDisplayLogsMode(!isDisplayLogsMode)
      }
      if (event.key === 'Space') {
        event.preventDefault()
        setIsSessionActive(!isSessionActive)
      }
      if (event.key === 'Escape') {
        if (isLogSessionMode || isConfigMode || isManualLogMode) {
          event.preventDefault()
          handleModalClose()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    isSessionActive,
    isLogSessionMode,
    isConfigMode,
    isWorkMode,
    timerConfig,
    isDisplayLogsMode,
    isManualLogMode,
  ])

  const handleModalClose = () => {
    setIsLogSessionMode(false)
    setIsConfigMode(false)
    setIsManualLogMode(false)
  }

  const handleUpdateTimerConfig = async (field, delta) => {
    setTimerConfig((prevConfig) => {
      const newValue = Math.max(0, (prevConfig[field] + delta) % 60)
      return { ...prevConfig, [field]: newValue }
    })
  }

  const handleTimerEnd = async () => {
    const res = await axios.post('/api/time/notify')
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
    setIsManualLogMode(false)
    setIsConfigMode(false)
    setTimeRemaining(totalTimerSeconds())
  }

  const totalTimerSeconds = () => {
    return timerConfig.minutes * 60 + timerConfig.seconds
  }

  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60

  return (
    <div>
      <div className="mx-auto w-full max-w-2xl pt-36 text-center">
        {!isWorkMode && <p className="text-2xl">BREAK MODE</p>}
        <div className="text-8xl">{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</div>
        <div className="mt-4 flex justify-center gap-4">
          <button
            className="rounded bg-emerald-500 px-4 py-2 font-bold hover:opacity-50"
            onClick={() => setIsSessionActive(!isSessionActive)}
          >
            {isSessionActive ? 'Pause' : 'Start'} Timer
          </button>
          <button
            className="rounded bg-rose-500 px-4 py-2 font-bold hover:opacity-50"
            onClick={handleTimerEnd}
          >
            End Session
          </button>
          <LogSessionModal
            isOpen={isLogSessionMode}
            onClose={handleCloseModal}
            sessionSeconds={getElapsedTime()}
          />
          <ManualLogModal isOpen={isManualLogMode} onClose={handleCloseModal} />
          <ConfigModal
            isOpen={isConfigMode}
            onClose={handleCloseModal}
            timerConfig={timerConfig}
            updateConfig={handleUpdateTimerConfig}
          />
        </div>
        {isDisplayLogsMode && (
          <div className="mt-4 w-full text-left">
            <LoggedTimeTable />
          </div>
        )}
      </div>
    </div>
  )
}

export default Timer
