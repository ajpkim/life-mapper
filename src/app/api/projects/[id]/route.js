import { deleteProject, updateProject } from "@/db/projects"

export async function PATCH(request) {
  try {
    const project = await request.json()
    const updatedProject = await updateProject(project)
    return new Response(JSON.stringify(updatedProject), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error(`Error updating project ${id}:`, error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export async function DELETE(request) {
  const id = request.url.split("/").pop()
  console.log("Deleteing project id:", id)
  try {
    await deleteProject(id)
    return new Response(null, {
      status: 204,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
