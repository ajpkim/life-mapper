'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { formatDate, secondsToHHMMSS, formatDateToMD } from '@/utils'

const LoggedTime = ({ startDate, endDate }) => {
  const [projects, setProjects] = useState(null)
  const [timeLogs, setTimeLogs] = useState(null)

  useEffect(() => {
    const fetchTimeLogs = async () => {
      const { data } = await axios.get('/api/time/', {
        params: { startDate, endDate },
      })
      setTimeLogs(data)
    }
    fetchTimeLogs()
  }, [startDate, endDate])

  const maxTimeInSeconds = 50 * 60 * 60
  const getBarWidth = (projectSeconds) => {
    return (parseInt(projectSeconds, 10) / maxTimeInSeconds) * 100
  }

  if (!timeLogs) return null
  return (
    <div>
      <h1 className="mb-2 text-lg font-bold">Logged Time</h1>
      <h2 className="text-md mb-2 font-bold">
        {formatDateToMD(startDate)} - {formatDateToMD(endDate)}
      </h2>

      <div className="pl-2">
        {Object.keys(timeLogs).map((projectName) => {
          const project = timeLogs[projectName]
          const widthPercent = getBarWidth(project.totalSeconds)
          return (
            <div key={projectName} className="mb-2">
              <div className="text-sm font-semibold">
                {projectName} {secondsToHHMMSS(project.totalSeconds)}
              </div>
              <div className="relative h-4 w-full overflow-hidden rounded-md">
                <div
                  className="flex h-full items-center justify-start bg-emerald-500 px-2"
                  style={{ width: `${Math.min(widthPercent, 100)}%` }}
                >
                  <span className="text-xs text-white"></span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LoggedTime
