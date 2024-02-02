import axios from "axios"
import classnames from "classnames"
import { useEffect, useMemo, useState, useRef } from "react"

const ConfigModal = ({
  isOpen,
  onClose,
  onUpdateProject,
  onDeleteProject,
  projects,
}) => {
  const modalRef = useRef(null)

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose()
    }
  }

  const toggleProjectActive = async (project) => {
    const updatedProject = {
      ...project,
      active: !project.active,
    }
    onUpdateProject(updatedProject)
  }

  const moveProject = (project, direction) => {
    /* Assumes projects are already sorted by display_num */
    const swapDisplayNums = (arr, i, j) => {
      const tmp = arr[i].display_num
      arr[i].display_num = arr[j].display_num
      arr[j].display_num = tmp
    }

    const newProjects = [...projects]
    const idx = projects.indexOf(project)
    const newIdx = idx + direction
    swapDisplayNums(projects, idx, newIdx)

    onUpdateProject(newProjects[idx])
    onUpdateProject(newProjects[newIdx])
  }

  const deleteProject = (project) => {
    onDeleteProject(project)
  }

  const shouldShowArrow = (index, direction) => {
    if (!projects[index].active) return false
    if (direction === "up") return index > 0
    if (direction === "down") return index < numActiveProjects - 1
    return false
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed bg-zinc-700 inset-0 bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOutsideClick}
    >
      <div
        className="bg-zinc-950 py-6 px-20 rounded-lg shadow-xl"
        ref={modalRef}
      >
        <h3 className="text-xl font-bold mb-4">Project Configuration</h3>
        <div>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Project Name</th>
                <th className="px-4 py-2">Toggle</th>
                <th className="px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={index}>
                  <td className="border border-gray-600 px-4 py-2">
                    {project.name}
                  </td>

                  <td className="border border-gray-600 px-4 py-2">
                    <button
                      className={`px-4 py-2 rounded hover:opacity-70 ${project.active ? "bg-emerald-500" : "bg-rose-500"} text-white`}
                      onClick={() => toggleProjectActive(project)}
                    >
                      {project.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    <button
                      className="px-4 py-2 rounded hover:opacity-70"
                      onClick={() => deleteProject(project)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ConfigModal
