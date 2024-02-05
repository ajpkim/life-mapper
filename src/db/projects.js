const { openDb } = require('./utils/db')

export async function getProjects() {
  const db = await openDb()
  const projects = await db.all('SELECT * FROM projects')
  await db.close()
  return projects
}

export async function createProject(name) {
  const db = await openDb()
  const insertSql = 'INSERT INTO projects (name) VALUES (?)'
  const res = db.run(insertSql, [name])
  const selectSql = 'SELECT * FROM projects WHERE name = ?'
  const projectRes = await db.get(selectSql, [name])
  await db.close()
  return projectRes
}

export async function updateProject(project) {
  console.log(project)
  const db = await openDb()
  const updateSql = 'UPDATE projects SET name = ?, active = ? WHERE id = ?'
  await db.run(updateSql, [project.name, project.id])
  await db.close()
}

export async function deleteProject(id) {
  const db = await openDb()
  const deleteSql = 'DELETE FROM projects WHERE id = ?'
  await db.run(deleteSql, [id])
  await db.close()
}
