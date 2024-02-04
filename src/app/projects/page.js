"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import NewProjectModal from "./NewProjectModal"
import ConfigModal from "./ConfigModal"

const Projects = () => {
  const [projects, setProjects] = useState(null)
  const [isAddProjectMode, setIsAddProjectMode] = useState(false)
  const [isConfigMode, setIsConfigMode] = useState(false)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get("/api/projects/")
        console.log(data)
        setProjects(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchProjects()
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "n") {
        if (!isAddProjectMode && !isConfigMode) {
          event.preventDefault()
          setIsAddProjectMode(true)
        }
      }
      if (event.key === "c") {
        if (!isAddProjectMode) {
          event.preventDefault()
          setIsConfigMode(!isConfigMode)
        }
      }
      if (event.key === "Escape") {
        if (isAddProjectMode || isConfigMode) {
          event.preventDefault()
          handleModalClose()
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isAddProjectMode, isConfigMode])

  const handleModalClose = () => {
    setIsAddProjectMode(false)
    setIsConfigMode(false)
  }

  const handleNewProjectSubmit = async (name) => {
    try {
      const { data: project } = await axios.post("/api/projects", { name })
      setProjects((prevProjects) => [...prevProjects, project])
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteProject = async (project) => {
    try {
      await axios.delete(`/api/projects/${project.id}`)
      setProjects((prev) => prev.filter((p) => p.id !== project.id))
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdateProject = async (project) => {
    try {
      const { data: newProject } = await axios.patch(
        `/api/projects/${project.id}`,
        project,
      )
      setProjects((prevProjects) =>
        prevProjects.map((p) => (p.id === project.id ? project : p)),
      )
    } catch (error) {
      console.error(error)
    }
  }

  if (!projects) return <h1>Loading</h1>
  return (
    <div className="flex flex-1 pt-4 pl-64">
      <div>
        <NewProjectModal
          isOpen={isAddProjectMode}
          onClose={handleModalClose}
          onSubmit={handleNewProjectSubmit}
        />
        <ConfigModal
          isOpen={isConfigMode}
          onClose={handleModalClose}
          onUpdateProject={handleUpdateProject}
          onDeleteProject={handleDeleteProject}
          projects={projects}
        />
      </div>
      <div className="max-w-xl">
        <h1 className="text-2xl pb-4">PROJECTS</h1>
        {projects
          .filter((project) => project.active)
          .map((project, index) => (
            <p key={project.id}>{project.name}</p>
          ))}
      </div>
    </div>
  )
}

export default Projects
