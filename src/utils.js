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
