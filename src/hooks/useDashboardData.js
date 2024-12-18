import { useState, useEffect } from 'react'
import { dashboardService } from '../services/dashboardService'

export function useDashboardData(timeframe = 6) {
  const [statistics, setStatistics] = useState({
    leaveStats: [],
    attendance: { present: 0, absent: 0 },
    loading: true,
    error: null
  })

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [leaveStats, attendanceStats] = await Promise.all([
          dashboardService.getLeaveStatistics(timeframe),
          dashboardService.getAttendanceStatistics()
        ])

        if (leaveStats.error) throw new Error(leaveStats.error)
        if (attendanceStats.error) throw new Error(attendanceStats.error)

        setStatistics({
          leaveStats: leaveStats.data,
          attendance: attendanceStats.data,
          loading: false,
          error: null
        })
      } catch (error) {
        setStatistics(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }))
      }
    }

    fetchDashboardData()
  }, [timeframe])

  return statistics
}