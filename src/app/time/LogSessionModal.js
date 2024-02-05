import classnames from 'classnames'
import { useEffect, useMemo, useState, useRef } from 'react'
import axios from 'axios'
import { formatDate } from '@/utils'

const LogSessionModal = ({ isOpen, onClose, sessionSeconds }) => {
  const [projects, setProjects] = useState([])

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
    const today = new Date()
    const date = formatDate(today)
    try {
      await axios.post(`/api/projects/${id}/time`, {
        seconds: sessionSeconds,
        date: date,
      })
    } catch (error) {
      console.error(error)
    }
    onClose()
  }

  const formatSessionTime = () => {
    const minutes = Math.floor(sessionSeconds / 60)
    const seconds = sessionSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-700 bg-opacity-50">
      <div className="rounded-lg bg-zinc-950 p-6 shadow-xl">
        <p className="mb-4 text-xl font-bold">
          Session Complete {formatSessionTime()}
        </p>
        <div className="">
          <ul>
            {projects.map((project) => (
              <li
                key={project.id}
                className="cursor-pointer rounded p-2 pl-8 text-left text-lg hover:bg-zinc-800"
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
          Skip
        </button>
      </div>
    </div>
  )
}

export default LogSessionModal
