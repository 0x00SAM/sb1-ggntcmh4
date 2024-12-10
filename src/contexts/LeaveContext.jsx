import { createContext, useContext, useState, useCallback } from 'react'
import { useApi } from '../hooks/useApi'
import { leaveApi } from '../services/api'

const LeaveContext = createContext({})

export const useLeave = () => {
  const context = useContext(LeaveContext)
  if (!context) {
    throw new Error('useLeave must be used within a LeaveProvider')
  }
  return context
}

export function LeaveProvider({ children }) {
  const [leaves, setLeaves] = useState([])
  const { loading, error, execute } = useApi(leaveApi.getLeaves)

  const fetchLeaves = useCallback(async () => {
    const { data, error } = await execute()
    if (!error && data) {
      setLeaves(data)
    }
    return { data, error }
  }, [execute])

  const createLeave = async (leaveData) => {
    const { data, error } = await useApi(leaveApi.createLeave).execute(leaveData)
    if (!error && data) {
      setLeaves(prev => [data, ...prev])
    }
    return { data, error }
  }

  const updateLeave = async (id, updates) => {
    const { data, error } = await useApi(leaveApi.updateLeave).execute(id, updates)
    if (!error && data) {
      setLeaves(prev => prev.map(leave => 
        leave.id === id ? data : leave
      ))
    }
    return { data, error }
  }

  const deleteLeave = async (id) => {
    const { error } = await useApi(leaveApi.deleteLeave).execute(id)
    if (!error) {
      setLeaves(prev => prev.filter(leave => leave.id !== id))
    }
    return { error }
  }

  const value = {
    leaves,
    loading,
    error,
    fetchLeaves,
    createLeave,
    updateLeave,
    deleteLeave,
  }

  return (
    <LeaveContext.Provider value={value}>
      {children}
    </LeaveContext.Provider>
  )
}