import { createTimeLog } from "@/db/time"

export async function POST(request, params) {
  try {
    const { id: projectId } = params.params
    const { seconds, date } = await request.json()
    createTimeLog({ projectId, seconds, date })
    return new Response(null, {
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
