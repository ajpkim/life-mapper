import axios from 'axios'

export async function downloadData() {
  const { data } = await axios.get('/api/export')
  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'life_map_data.json'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function formatDate(date) {
  return date.toISOString().split('T')[0]
}

export function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate()
}

export function getMonthName(monthIndex) {
  const date = new Date()
  date.setMonth(monthIndex)
  return date.toLocaleString('en-US', { month: 'long' })
}

export function formatSeconds(seconds) {
  const min = Math.floor(seconds / 60)
  const minStr = min < 10 ? `0${min}` : `${min}`
  const sec = seconds % 60
  const secStr = sec < 10 ? `0${sec}` : `${sec}`
  return `${minStr}:${secStr}`
}

export function secondsToHHMMSS(seconds) {
  const hours = Math.floor(seconds / 60 ** 2)
  const hourStr = hours < 10 ? `0${hours}` : hours
  const remainder = seconds - hours * 60 ** 2
  const minutes = Math.floor(remainder / 60)
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes
  const sec = remainder % 60
  const secStr = sec < 10 ? `0${sec}` : sec

  let res = ''
  if (hours > 0) {
    res += `${hours}hr `
  }
  if (minutes > 0) {
    res += `${minutes}m `
  }
  if (sec > 0) {
    res += `${sec}s`
  }
  return res

  // `${hourStr}:${minutesStr}:${secStr}`
  // return `${hours}hr ${minutes}m ${sec}s`
}
