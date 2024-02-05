import { getTodaysTimeLogs } from "@/db/time"

export async function GET(request) {
  try {
    const logs = await getTodaysTimeLogs()
    return new Response(JSON.stringify(logs), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
