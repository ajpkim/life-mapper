import axios from 'axios'
import classnames from 'classnames'
import { useEffect, useMemo, useState, useRef } from 'react'

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

  const updateProject = async (project) => {
    console.log(project)
    onUpdateProject(project)
  }

  const deleteProject = (project) => {
    onDeleteProject(project)
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-700 bg-opacity-50"
      onClick={handleOutsideClick}
    >
      <div
        className="rounded-lg bg-zinc-950 px-20 py-6 shadow-xl"
        ref={modalRef}
      >
        <h3 className="mb-4 text-xl font-bold">Project Configuration</h3>
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
                      className={`rounded px-4 py-2 hover:opacity-70 ${project.active ? 'bg-emerald-500' : 'bg-rose-500'} text-white`}
                      onClick={() =>
                        updateProject({ ...project, active: !project.active })
                      }
                    >
                      {project.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    <button
                      className="rounded px-4 py-2 hover:opacity-70"
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
