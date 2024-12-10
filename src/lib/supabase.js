import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
  throw new Error('Please check your .env file and ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const TABLES = {
  USERS: 'user_profiles',
  LEAVES: 'leave_requests',
}

export const LEAVE_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
}

export const LEAVE_TYPES = {
  VACATION: 'vacation',
  SICK: 'sick',
  PERSONAL: 'personal',
  FAMILY: 'family',
}

export const AUTH_EVENTS = {
  SIGNED_IN: 'SIGNED_IN',
  SIGNED_OUT: 'SIGNED_OUT',
  USER_UPDATED: 'USER_UPDATED',
  PASSWORD_RECOVERY: 'PASSWORD_RECOVERY',
}

export const USER_ROLES = {
  ADMIN: 'admin',
  EMPLOYEE: 'employee',
}