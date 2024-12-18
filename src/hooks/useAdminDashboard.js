import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useAdminDashboard() {
  const [summaryData, setSummaryData] = useState({
    newRequests: 0,
    pendingApprovals: 0,
    rejections: 0,
    totalRequests: 0,
    loading: true,
    error: null
  })

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const today = new Date()
        const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString()

        const [newRequests, pendingRequests, rejectedRequests, totalRequests] = await Promise.all([
          supabase
            .from('leave_requests')
            .select('count', { count: 'exact' })
            .gte('created_at', startOfDay),
          
          supabase
            .from('leave_requests')
            .select('count', { count: 'exact' })
            .eq('status', 'pending'),
          
          supabase
            .from('leave_requests')
            .select('count', { count: 'exact' })
            .eq('status', 'rejected'),
          
          supabase
            .from('leave_requests')
            .select('count', { count: 'exact' })
        ])

        setSummaryData({
          newRequests: newRequests.count || 0,
          pendingApprovals: pendingRequests.count || 0,
          rejections: rejectedRequests.count || 0,
          totalRequests: totalRequests.count || 0,
          loading: false,
          error: null
        })
      } catch (error) {
        setSummaryData(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }))
      }
    }

    fetchSummaryData()

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('leave_requests_changes')
      .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'leave_requests' },
          () => fetchSummaryData())
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return summaryData
}