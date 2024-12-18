/**
Provides functionality for managing leave requests. 
It uses the `useState` and `useEffect` hooks from React to manage state and side effects.
The hook also subscribes to real-time updates from the `leaveService` 
to keep the leave requests in sync with the server.
**/
import { useState, useEffect, useCallback } from 'react'
import { leaveService } from '../services/leaveService'
import { useNotification } from '../contexts/NotificationContext'
import { validateDateRange } from '../utils/dateUtils'

export function useLeaveRequests() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { showNotification } = useNotification()

  const fetchLeaveRequests = useCallback(async () => {
    setLoading(true)
    try {
      const { data, error } = await leaveService.getLeaveRequests()
      if (error) throw new Error(error)
      setRequests(data)
      setError(null)
    } catch (err) {
      setError(err.message)
      showNotification(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }, [showNotification])

  useEffect(() => {
    fetchLeaveRequests()

    const subscription = leaveService.subscribeToLeaveRequests((payload) => {
      try {
        if (payload.eventType === 'INSERT') {
          setRequests(prev => [payload.new, ...prev])
        } else if (payload.eventType === 'UPDATE') {
          setRequests(prev => 
            prev.map(request => 
              request.id === payload.new.id ? payload.new : request
            )
          )
        } else if (payload.eventType === 'DELETE') {
          setRequests(prev => 
            prev.filter(request => request.id !== payload.old.id)
          )
        }
      } catch (err) {
        console.error('Error handling real-time update:', err)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [fetchLeaveRequests])

  const createLeaveRequest = async (leaveData) => {
    if (!validateDateRange(leaveData.startDate, leaveData.endDate)) {
      showNotification('Invalid date range', 'error')
      return { success: false, error: 'Invalid date range' }
    }

    try {
      const { data, error } = await leaveService.createLeaveRequest(leaveData)
      if (error) throw new Error(error)
      showNotification('Leave request created successfully', 'success')
      return { success: true, data }
    } catch (err) {
      showNotification(err.message, 'error')
      return { success: false, error: err.message }
    }
  }

  const updateLeaveRequest = async (id, updates) => {
    if (updates.startDate && updates.endDate && 
        !validateDateRange(updates.startDate, updates.endDate)) {
      showNotification('Invalid date range', 'error')
      return { success: false, error: 'Invalid date range' }
    }

    try {
      const { data, error } = await leaveService.updateLeaveRequest(id, updates)
      if (error) throw new Error(error)
      showNotification('Leave request updated successfully', 'success')
      return { success: true, data }
    } catch (err) {
      showNotification(err.message, 'error')
      return { success: false, error: err.message }
    }
  }

  const deleteLeaveRequest = async (id) => {
    try {
      const { error } = await leaveService.deleteLeaveRequest(id)
      if (error) throw new Error(error)
      showNotification('Leave request deleted successfully', 'success')
      return { success: true }
    } catch (err) {
      showNotification(err.message, 'error')
      return { success: false, error: err.message }
    }
  }

  return {
    requests,
    loading,
    error,
    createLeaveRequest,
    updateLeaveRequest,
    deleteLeaveRequest,
    refreshRequests: fetchLeaveRequests
  }
}