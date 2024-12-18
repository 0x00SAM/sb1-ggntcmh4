import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useLeaves() {
  const [leaves, setLeaves] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('leave_requests')
          .select('*')
          .order('created_at', { ascending: false })

        if (fetchError) throw fetchError
        setLeaves(data || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaves()
  }, [])

  return { leaves, loading, error }
}