import { createHabit, getHabitsData } from "@/db/habits"

export async function GET(request) {
  try {
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

export async function POST(request) {
  try {
    const body = await request.json()
    const habit = await createHabit(body.name)
    return new Response(JSON.stringify(habit), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })

    // return new Response(JSON.stringify(), {
    //   status: 201,
    //   headers: { "Content-Type": "application/json" },
    // })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
