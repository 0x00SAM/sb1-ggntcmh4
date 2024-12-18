import { supabase } from '../lib/supabaseClient'

export const adminService = {
  // Employee Management
  async getEmployees(searchQuery = '') {
    try {
      let query = supabase
        .from('user_profiles')
        .select(`
          *,
          leave_requests (
            id,
            type,
            start_date,
            end_date,
            status,
            created_at
          )
        `)
        .order('created_at', { ascending: false })

      if (searchQuery) {
        query = query.or(`first_name.ilike.%${searchQuery}%,last_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`)
      }

      const { data, error } = await query
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching employees:', error)
      return { data: null, error: error.message }
    }
  },

  // Leave Management
  async updateLeaveStatus(leaveId, status, reason = '') {
    try {
      const { data, error } = await supabase
        .from('leave_requests')
        .update({ 
          status,
          admin_comment: reason,
          updated_at: new Date().toISOString()
        })
        .eq('id', leaveId)
        .select()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error updating leave status:', error)
      return { data: null, error: error.message }
    }
  },

  async bulkUpdateLeaveStatus(leaveIds, status) {
    try {
      const { data, error } = await supabase
        .from('leave_requests')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .in('id', leaveIds)
        .select()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error bulk updating leave status:', error)
      return { data: null, error: error.message }
    }
  },

  // Statistics
  async getAdminStatistics(timeframe = 6) {
    try {
      const today = new Date()
      const startDate = new Date(today.setMonth(today.getMonth() - timeframe))

      const [leaveStats, departmentStats] = await Promise.all([
        supabase
          .from('leave_requests')
          .select('*')
          .gte('created_at', startDate.toISOString()),
        
        supabase
          .from('user_profiles')
          .select(`
            id,
            department,
            leave_requests (
              id,
              status
            )
          `)
      ])

      if (leaveStats.error) throw leaveStats.error
      if (departmentStats.error) throw departmentStats.error

      return {
        data: {
          leaveStats: leaveStats.data,
          departmentStats: departmentStats.data
        },
        error: null
      }
    } catch (error) {
      console.error('Error fetching admin statistics:', error)
      return { data: null, error: error.message }
    }
  }
}