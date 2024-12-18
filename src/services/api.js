import axios from 'axios'
import { supabase } from '../lib/supabase'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession()
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`
  }
  return config
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await supabase.auth.signOut()
    }
    return Promise.reject(error)
  }
)

export const leaveApi = {
  getLeaves: () => api.get('/leaves'),
  createLeave: (data) => api.post('/leaves', data),
  updateLeave: (id, data) => api.put(`/leaves/${id}`, data),
  deleteLeave: (id) => api.delete(`/leaves/${id}`),
  updateStatus: (id, status) => api.put(`/leaves/${id}/status`, { status }),
}

export const userApi = {
  getUsers: () => api.get('/users'),
  getUser: (id) => api.get(`/users/${id}`),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
}

export const statsApi = {
  getAttendance: () => api.get('/statistics/attendance'),
  getLeaveStats: (params) => api.get('/statistics/leaves', { params }),
}

export default api