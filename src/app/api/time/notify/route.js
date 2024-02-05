// This uses my window manager, i3, to provide an effective notifaction by auto-focusing the app workspace.

import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function POST() {
  try {
    const { stdout, stderr } = await execAsync('i3-msg workspace 19')
    if (stderr) {
      console.error(`stderr: ${stderr}`)
    }
    return new Response(JSON.stringify({ msg: 'Notification triggered' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error(`exec error: ${error}`)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
