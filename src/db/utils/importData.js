const path = require("path")
const fs = require("fs").promises
const { openDb } = require("./db")
const { importData } = require("./db")

async function loadData(inputFile) {
  const jsonDataString = await fs.readFile(inputFile, "utf8")
  const jsonData = JSON.parse(jsonDataString)
  await importData(jsonData)
}

const filepath = process.argv[2]
loadData(filepath)
