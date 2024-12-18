/** 
This module provides services for managing leave requests in Supabase.
It includes functions for creating, retrieving, updating, and deleting leave requests,
as well as subscribing to real-time updates for leave requests.
**/
import { supabase } from '../lib/supabaseClient'
import { formatDate } from '../utils/dateUtils'

export const leaveService = {
  async createLeaveRequest(leaveData) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('leave_requests')
        .insert([{
          user_id: user.id,
          type: leaveData.type,
          start_date: formatDate(leaveData.startDate),
          end_date: formatDate(leaveData.endDate),
          reason: leaveData.reason,
          status: 'pending'
        }])
        .select(`
          *,
          user_profiles:user_id (
            first_name,
            last_name,
            email
          )
        `)

      if (error) throw error
      return { data: data[0], error: null }
    } catch (error) {
      console.error('Error creating leave request:', error)
      return { data: null, error: error.message }
    }
  },

  async getLeaveRequests() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('leave_requests')
        .select(`
          *,
          user_profiles:user_id (
            first_name,
            last_name,
            email
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching leave requests:', error)
      return { data: null, error: error.message }
    }
  },

  async updateLeaveRequest(id, updates) {
    try {
      const { data, error } = await supabase
        .from('leave_requests')
        .update({
          ...updates,
          ...(updates.startDate && { start_date: formatDate(updates.startDate) }),
          ...(updates.endDate && { end_date: formatDate(updates.endDate) })
        })
        .eq('id', id)
        .select(`
          *,
          user_profiles:user_id (
            first_name,
            last_name,
            email
          )
        `)

      if (error) throw error
      return { data: data[0], error: null }
    } catch (error) {
      console.error('Error updating leave request:', error)
      return { data: null, error: error.message }
    }
  },

  async deleteLeaveRequest(id) {
    try {
      const { error } = await supabase
        .from('leave_requests')
        .delete()
        .eq('id', id)

      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Error deleting leave request:', error)
      return { error: error.message }
    }
  },

  subscribeToLeaveRequests(callback) {
    return supabase
      .channel('leave_requests_channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'leave_requests'
        },
        callback
      )
      .subscribe()
  }
}