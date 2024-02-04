import axios from "axios"

export async function downloadData() {
  const { data } = await axios.get("/api/export")
  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = "life_map_data.json"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function formatDate(date) {
  return date.toISOString().split("T")[0]
}

export function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate()
}

export function getMonthName(monthIndex) {
  const date = new Date()
  date.setMonth(monthIndex)
  return date.toLocaleString("en-US", { month: "long" })
}
