import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNotification } from '../contexts/NotificationContext'

export function useLeaveBalance() {
  const [balance, setBalance] = useState({
    total: 0,
    used: 0,
    pending: 0,
    remaining: 0,
    loading: true,
    error: null
  })
  const { showNotification } = useNotification()

  useEffect(() => {
    const fetchLeaveBalance = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('User not authenticated')

        const year = new Date().getFullYear()
        const startDate = `${year}-01-01`
        const endDate = `${year}-12-31`

        const { data: leaveRequests, error } = await supabase
          .from('leave_requests')
          .select('*')
          .eq('user_id', user.id)
          .gte('start_date', startDate)
          .lte('end_date', endDate)

        if (error) throw error

        const used = leaveRequests
          .filter(req => req.status === 'approved')
          .reduce((total, req) => total + calculateDuration(req.start_date, req.end_date), 0)

        const pending = leaveRequests
          .filter(req => req.status === 'pending')
          .reduce((total, req) => total + calculateDuration(req.start_date, req.end_date), 0)

        // Assuming 30 days annual leave
        const total = 30
        const remaining = total - used

        setBalance({
          total,
          used,
          pending,
          remaining,
          loading: false,
          error: null
        })
      } catch (error) {
        setBalance(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }))
        showNotification(error.message, 'error')
      }
    }

    fetchLeaveBalance()
  }, [showNotification])

  return balance
}

function calculateDuration(startDate, endDate) {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffTime = Math.abs(end - start)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
}