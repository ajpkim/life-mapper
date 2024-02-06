'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { formatSeconds, secondsToHHMMSS } from '@/utils'

const LoggedTimeTable = ({ startDate, endDate }) => {
  const [logs, setLogs] = useState(null)
  const [totalTime, setTotalTime] = useState(0)

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data } = await axios.get('/api/time/today')
        setLogs(data)
        const totalTime = Object.entries(data).reduce(
          (total, [projectName, projectData]) => {
            return (total += Number(projectData.totalSeconds))
          },
          0,
        )
        setTotalTime(totalTime)
      } catch (error) {
        console.error(error)
      }
    }
    fetchLogs()
  }, [])

  if (!logs) return null

  return (
    <div className="py-8 pl-48 text-xl">
      <p className="py-4 font-bold">
        Total Time ➔ {secondsToHHMMSS(totalTime)}
      </p>
      {Object.entries(logs).map(([projectName, projectData]) => (
        <div className="pt-2 text-lg" key={projectName}>
          <h3 className="">
            {projectName}: {secondsToHHMMSS(projectData.totalSeconds)}
          </h3>
        </div>
      ))}
    </div>
  )
}

export default LoggedTimeTable
