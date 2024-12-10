import { format, differenceInDays, isWeekend } from 'date-fns'

export const formatDate = (date) => {
  if (!date) return ''
  return format(new Date(date), 'MMM d, yyyy')
}

export const calculateWorkingDays = (startDate, endDate) => {
  if (!startDate || !endDate) return 0
  
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  let days = 0
  let current = start
  
  while (current <= end) {
    if (!isWeekend(current)) {
      days++
    }
    current.setDate(current.getDate() + 1)
  }
  
  return days
}

export const getDateRangeString = (startDate, endDate) => {
  if (!startDate || !endDate) return ''
  
  const start = format(new Date(startDate), 'MMM d')
  const end = format(new Date(endDate), 'MMM d, yyyy')
  
  return `${start} - ${end}`
}