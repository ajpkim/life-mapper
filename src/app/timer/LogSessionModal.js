import classnames from "classnames"
import { useEffect, useMemo, useState, useRef } from "react"
import axios from "axios"

const LogSessionModal = ({ isOpen, onClose, sessionSeconds }) => {
  if (!isOpen) return null

  const [projects, setProjects] = useState([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get("/api/projects/")
        setProjects(data)
      } catch (error) {
        console.error(error)
      }
    }
    const projects = fetchProjects()
  }, [])

  const handleProjectSelection = ({ id, name }) => {
    try {
      // const response = axios.post("/api/time")
      console.log(id, name)
    } catch (error) {
      console.error(error)
    }
  }

  const formatSessionTime = () => {
    const minutes = Math.floor(sessionSeconds / 60)
    const seconds = sessionSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="fixed inset-0 bg-zinc-700 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-950 p-6 rounded-lg shadow-xl">
        <p className="text-xl font-bold mb-4">
          Session Complete {formatSessionTime()}
        </p>
        <div className="">
          <ul>
            {projects.map((project) => (
              <li
                key={project.id}
                className="cursor-pointer hover:bg-zinc-800 p-2 rounded"
                onClick={() => handleProjectSelection(project)}
              >
                {project.name}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded"
        >
          Done
        </button>
      </div>
    </div>
  )
}

export default LogSessionModal
