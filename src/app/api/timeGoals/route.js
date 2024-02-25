import { useSearchParams } from 'next/navigation'
import {
  getTimeGoals,
  createTimeGoal,
  updateTimeGoal,
  DeleteTimeGoal,
} from '@/db/time_goals'

export async function GET(request, params) {
  try {
    const params = request.nextUrl.searchParams
    const startDate = params.get('startDate')
    const endDate = params.get('endDate')

    const timeGoals = await getTimeGoals({ startDate, endDate })

    return Response.json({ startDate, endDate })
  } catch (error) {
    console.log('CATCHING GET API')

    // return Response.error(error)

    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
