const { openDb } = require("./utils/db")

export async function getProjects() {
  const db = await openDb()
  const projects = await db.all("SELECT * FROM projects")
  await db.close()
  return projects
}

export async function createProject(name) {
  const db = await openDb()
  const insertSql = "INSERT INTO projects (name) VALUES (?)"
  const res = db.run(insertSql, [name])
  const selectSql = "SELECT * FROM projects WHERE name = ?"
  const projectRes = await db.get(selectSql, [name])
  await db.close()
  console.log(projectRes)
  return projectRes
}