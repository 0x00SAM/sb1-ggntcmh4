import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useEmployees() {
  const [employees, setEmployees] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data, error } = await supabase
          .from('employees')
          .select('*')
          .order('lastName')

        if (error) throw error

        // Cache the employee list in session storage
        sessionStorage.setItem('employees', JSON.stringify(data))
        setEmployees(data)
      } catch (err) {
        setError(err.message)
        // Try to load from cache if available
        const cached = sessionStorage.getItem('employees')
        if (cached) {
          setEmployees(JSON.parse(cached))
        }
      } finally {
        setLoading(false)
      }
    }

    // Check cache first
    const cached = sessionStorage.getItem('employees')
    if (cached) {
      setEmployees(JSON.parse(cached))
      setLoading(false)
      // Fetch fresh data in the background
      fetchEmployees()
    } else {
      fetchEmployees()
    }
  }, [])

  return { employees, loading, error }
}