import { useState, useEffect } from 'react'
import { adminService } from '../services/adminService'
import { useNotification } from '../contexts/NotificationContext'

export function useEmployeeList() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const { showNotification } = useNotification()

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true)
      const { data, error } = await adminService.getEmployees(searchQuery)
      
      if (error) {
        setError(error)
        showNotification(error, 'error')
      } else {
        setEmployees(data)
        setError(null)
      }
      
      setLoading(false)
    }

    const debounceTimer = setTimeout(fetchEmployees, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchQuery, showNotification])

  return {
    employees,
    loading,
    error,
    searchQuery,
    setSearchQuery
  }
}