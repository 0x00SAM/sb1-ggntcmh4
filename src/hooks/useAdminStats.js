import { useState, useEffect } from 'react'
import { adminService } from '../services/adminService'
import { useNotification } from '../contexts/NotificationContext'

export function useAdminStats() {
  const [stats, setStats] = useState({
    leaveStats: [],
    departmentStats: [],
    loading: true,
    error: null
  })
  const { showNotification } = useNotification()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await adminService.getAdminStatistics()
        if (error) throw new Error(error)

        setStats({
          ...data,
          loading: false,
          error: null
        })
      } catch (error) {
        setStats(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }))
        showNotification(error.message, 'error')
      }
    }

    fetchStats()

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('admin_stats')
      .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'leave_requests' },
          fetchStats)
      .subscribe()

    return () => subscription.unsubscribe()
  }, [showNotification])

  return stats
}