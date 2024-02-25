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
    return Response.json({ timeGoals })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export async function POST(request, params) {
  try {
    const { startDate, endDate, projectId, seconds } = await request.json()
    const timeGoal = await createTimeGoal({
      start_date: startDate,
      end_date: endDate,
      seconds,
      project_id: projectId,
    })
    return Response.json(timeGoal)
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
