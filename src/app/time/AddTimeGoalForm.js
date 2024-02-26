'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { createTimeGoal } from '@/app/actions'

const initialState = {
  message: null,
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      className="rounded bg-emerald-500 p-2 hover:opacity-50"
      type="submit"
      aria-disabled={pending}
    >
      Add
    </button>
  )
}

export function AddTimeGoalForm({ projects }) {
  const [state, formAction] = useFormState(createTimeGoal, initialState)

  return (
    <div>
      <h2 className="font-bold">Add/Update Time Goal</h2>
      <form action={formAction} className="space-y-4 pt-2">
        <div className="flex items-center">
          <select
            id="project"
            name="project_id"
            required
            className="mr-2 w-52 border-2 p-1"
          >
            <option value="">Select Project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <label htmlFor="time_goal_hours" className="mr-2">
            Hours:
          </label>
          <input
            type="number"
            id="time_goal_hours"
            name="time_goal_hours"
            min="0"
            className="mr-2 w-16 border-2 p-1"
          />
          <label htmlFor="time_goal_minutes" className="mr-2">
            Minutes:
          </label>
          <input
            type="number"
            id="time_goal_minutes"
            name="time_goal_minutes"
            min="0"
            className="w-16 border-2 p-1"
          />
        </div>

        <SubmitButton />

        <p aria-live="polite" className="sr-only" role="status">
          {state?.message}
        </p>
      </form>
    </div>
  )
}
