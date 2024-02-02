import { getProjects, createProject } from "@/db/projects"

export async function GET(request) {
  try {
    const projects = await getProjects()
    return new Response(JSON.stringify(projects), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const project = await createProject(body.name)
    return new Response(JSON.stringify(project), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
