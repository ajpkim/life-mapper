import classnames from 'classnames'
import { useEffect, useMemo, useState, useRef } from 'react'
import axios from 'axios'
import { formatDate, secondsToHHMMSS } from '@/utils'

const ManualLogModal = ({ isOpen, onClose }) => {
  const [projects, setProjects] = useState([])
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    setTotalSeconds(hours * 3600 + minutes * 60 + seconds)
  }, [hours, minutes, seconds])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get('/api/projects/')
        setProjects(data)
      } catch (error) {
        console.error(error)
      }
    }
    const projects = fetchProjects()
  }, [])

  const logTimeToProject = async ({ id, name }) => {
    if (totalSeconds === 0) return

    try {
      await axios.post(`/api/projects/${id}/time`, {
        seconds: totalSeconds,
        date: formatDate(date),
      })
    } catch (error) {
      console.error(error)
    }
    onClose()
  }

  const handleDateChange = (event) => {
    const dateObj = new Date(event.target.value)
    setDate(dateObj)
  }

  const handleHoursChange = (event) => {
    const value = event.target.value
    if (value === '' || (/^\d+$/.test(value) && parseInt(value, 10) >= 0)) {
      setHours(value)
    }
  }

  const handleMinutesChange = (event) => {
    const value = event.target.value
    if (
      value === '' ||
      (/^\d+$/.test(value) &&
        parseInt(value, 10) >= 0 &&
        parseInt(value, 10) < 60)
    ) {
      setMinutes(value)
    }
  }

  const handleSecondsChange = (event) => {
    const value = event.target.value
    if (
      value === '' ||
      (/^\d+$/.test(value) &&
        parseInt(value, 10) >= 0 &&
        parseInt(value, 10) < 60)
    ) {
      setSeconds(value)
    }
  }
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-700 bg-opacity-50">
      <div className="rounded-lg bg-zinc-950 p-6 shadow-xl">
        <p className="mb-4 text-xl font-bold">Log Time</p>
        <div className="pl-8 text-left">
          <label className="mb-2 block">
            <input
              type="date"
              value={formatDate(date)}
              onChange={handleDateChange}
              className="block w-full rounded border-gray-300 p-1 text-black"
            />
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={hours || ''}
              onChange={handleHoursChange}
              className="w-12 rounded border-gray-300 p-2 text-center text-black"
              placeholder="hr"
            />
            <input
              type="text"
              value={minutes || ''}
              onChange={handleMinutesChange}
              className="w-12 rounded border-gray-300 p-2 text-center text-black"
              placeholder="min"
            />
            <input
              type="text"
              value={seconds || ''}
              onChange={handleSecondsChange}
              className="w-12 rounded border-gray-300 p-2 text-center text-black"
              placeholder="sec"
            />
          </div>
        </div>
        <div className="pt-2">
          <ul>
            {projects.map((project) => (
              <li
                key={project.id}
                tabIndex={0}
                className="cursor-pointer rounded p-2 pl-8 text-left hover:bg-zinc-800"
                onClick={() => logTimeToProject(project)}
              >
                {project.name}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={onClose}
          className="mt-4 rounded bg-rose-500 px-4 py-2 text-white"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default ManualLogModal
