import { getTimeLogsByProject } from '@/db/time'

export async function GET(request, params) {
  try {
    const params = request.nextUrl.searchParams
    const startDate = params.get('startDate')
    const endDate = params.get('endDate')
    const data = await getTimeLogsByProject({ startDate, endDate })
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
