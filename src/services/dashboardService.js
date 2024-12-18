import { supabase } from '../lib/supabaseClient'

export const dashboardService = {
  async getLeaveStatistics(timeframe = 6) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const today = new Date()
      const startDate = new Date(today.setMonth(today.getMonth() - timeframe))

      const { data, error } = await supabase
        .from('leave_requests')
        .select('*')
        .gte('start_date', startDate.toISOString())
        .eq('user_id', user.id)
        .order('start_date', { ascending: true })

      if (error) throw error

      // Process data into monthly statistics
      const monthlyStats = new Array(timeframe).fill(null).map((_, index) => {
        const month = new Date(today.getFullYear(), today.getMonth() - index, 1)
        const monthName = month.toLocaleString('default', { month: 'short' })
        const daysInMonth = data.filter(leave => {
          const leaveDate = new Date(leave.start_date)
          return leaveDate.getMonth() === month.getMonth() &&
                 leaveDate.getFullYear() === month.getFullYear()
        }).length

        return {
          month: monthName,
          days: daysInMonth
        }
      }).reverse()

      return { data: monthlyStats, error: null }
    } catch (error) {
      console.error('Error fetching leave statistics:', error)
      return { data: null, error: error.message }
    }
  },

  async getAttendanceStatistics() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const today = new Date()
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

      const { data, error } = await supabase
        .from('leave_requests')
        .select('*')
        .gte('start_date', startOfMonth.toISOString())
        .lte('end_date', today.toISOString())
        .eq('user_id', user.id)
        .eq('status', 'approved')

      if (error) throw error

      // Calculate working days excluding weekends
      const workingDays = this.getWorkingDaysInMonth()
      const leaveDays = data.reduce((total, leave) => {
        const start = new Date(leave.start_date)
        const end = new Date(leave.end_date)
        return total + this.getWorkingDaysBetweenDates(start, end)
      }, 0)

      return {
        data: {
          present: workingDays - leaveDays,
          absent: leaveDays
        },
        error: null
      }
    } catch (error) {
      console.error('Error fetching attendance statistics:', error)
      return { data: null, error: error.message }
    }
  },

  getWorkingDaysInMonth() {
    const today = new Date()
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    
    return this.getWorkingDaysBetweenDates(startOfMonth, endOfMonth)
  },

  getWorkingDaysBetweenDates(startDate, endDate) {
    let count = 0
    const curDate = new Date(startDate)
    while (curDate <= endDate) {
      const dayOfWeek = curDate.getDay()
      if (dayOfWeek !== 0 && dayOfWeek !== 6) count++
      curDate.setDate(curDate.getDate() + 1)
    }
    return count
  }
}