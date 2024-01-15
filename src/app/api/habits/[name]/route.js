import { getHabitsData } from "@/db/habits"

export async function POST(request) {
  try {
    console.log("HAHAHA")
    const habits = await getHabitsData()
    return new Response(JSON.stringify(habits), {
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
