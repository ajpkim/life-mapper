import { createOrUpdateHabitStat, updateHabit } from "@/db/habits"

// TODO: move this to /api/habits/stats
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

export async function PATCH(request) {
  try {
    const { id, name, active, display_num } = await request.json()
    const updatedHabit = await updateHabit({ id, name, active, display_num })
    return new Response(JSON.stringify(updatedHabit), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error(`Error updating habit ${id}:`, error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
