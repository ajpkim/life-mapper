import { createOrUpdateHabitStat } from "@/db/habits"

export async function POST(request) {
  try {
    const { name, date, stat } = await request.json()
    await createOrUpdateHabitStat(name, date, stat)
    return new Response(
      JSON.stringify({ message: "Habit stat updated successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("Error in POST /api/habits/[name]:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
