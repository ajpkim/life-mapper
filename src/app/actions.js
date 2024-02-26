'use server'

import { revalidatePath } from 'next/cache'

export async function createTimeGoal(prevState, formData) {
  console.log(formData)
  revalidatePath('/')
  return { message: 'successfully ran server action!' }
}

export async function createTimeLog(prevState, formData) {
  console.log(formData)
  revalidatePath('/')
  return { message: 'successfully ran server action!' }
}
