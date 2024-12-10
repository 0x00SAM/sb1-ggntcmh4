import { useState, useCallback } from 'react'

export function useApi(apiFunc) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiFunc(...args)
      setData(response.data)
      return { data: response.data, error: null }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message
      setError(errorMessage)
      return { data: null, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [apiFunc])

  return { data, loading, error, execute }
}