import classnames from "classnames"
import { useEffect, useMemo, useState, useRef } from "react"
import axios from "axios"

const LogSessionModal = ({ isOpen, onClose, length }) => {
  if (!isOpen) return null

  const [projects, setProjects] = useState([])

  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     try {
  //       const projects = await axios.get("/api/projects/")
  //       setProjects(projects)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   fetchProjects()
  // }, [])

  return (
    <div className="fixed inset-0 bg-zinc-700 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-950 p-6 rounded-lg shadow-xl">
        <p>DONE</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default LogSessionModal
