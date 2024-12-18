import axios from 'axios'
import { supabase } from '../lib/supabase'
import { API_ENDPOINTS } from './constants'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession()
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await supabase.auth.signOut()
    }
    return Promise.reject(error)
  }
)

export const handleApiError = (error) => {
  const message = error.response?.data?.error || error.message
  return {
    error: message,
    data: null,
  }
}

export const handleApiResponse = (response) => ({
  data: response.data,
  error: null,
})

export const apiClient = {
  get: async (url, config) => {
    try {
      const response = await api.get(url, config)
      return handleApiResponse(response)
    } catch (error) {
      return handleApiError(error)
    }
  },
  post: async (url, data, config) => {
    try {
      const response = await api.post(url, data, config)
      return handleApiResponse(response)
    } catch (error) {
      return handleApiError(error)
    }
  },
  put: async (url, data, config) => {
    try {
      const response = await api.put(url, data, config)
      return handleApiResponse(response)
    } catch (error) {
      return handleApiError(error)
    }
  },
  delete: async (url, config) => {
    try {
      const response = await api.delete(url, config)
      return handleApiResponse(response)
    } catch (error) {
      return handleApiError(error)
    }
  },
}

export default api