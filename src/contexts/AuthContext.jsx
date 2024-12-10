import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, AUTH_EVENTS, USER_ROLES } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Check active sessions
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)

      switch (event) {
        case AUTH_EVENTS.SIGNED_IN:
          navigate(session?.user?.user_metadata?.role === USER_ROLES.ADMIN ? '/admin' : '/employee')
          break
        case AUTH_EVENTS.SIGNED_OUT:
          navigate('/login')
          break
        default:
          break
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  const value = {
    user,
    loading,
    isAdmin: user?.user_metadata?.role === USER_ROLES.ADMIN,
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signInWithPassword(data),
    signOut: () => supabase.auth.signOut(),
    updateProfile: async (updates) => {
      try {
        const { data, error } = await supabase.auth.updateUser({
          data: updates
        })
        if (error) throw error
        return { data, error: null }
      } catch (error) {
        return { data: null, error }
      }
    }
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}