const { openDb } = require("./utils/db")

export async function getProjects() {
  const db = await openDb()
  const projects = await db.all("SELECT * FROM projects")
  await db.close()
  return projects
}
