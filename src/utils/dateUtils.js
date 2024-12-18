// Date formatting utilities
export const formatDate = (date) => {
    if (!date) return null
    return new Date(date).toISOString().split('T')[0]
  }
  
  export const validateDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return false
    const start = new Date(startDate)
    const end = new Date(endDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    return start >= today && end >= start
  }