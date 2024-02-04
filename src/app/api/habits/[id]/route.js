import { createOrUpdateHabitStat, deleteHabit, updateHabit } from "@/db/habits"

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
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export async function PATCH(request) {
  try {
    const { id, name, active, display_num, created_at } = await request.json()
    const updatedHabit = await updateHabit({
      id,
      name,
      active,
      display_num,
      created_at,
    })
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

export async function DELETE(request, params) {
  const { id } = params.params
  try {
    await deleteHabit(id)
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
