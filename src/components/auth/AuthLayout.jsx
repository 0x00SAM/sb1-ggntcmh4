import { useLocation } from 'react-router-dom'

function AuthLayout({ children }) {
  const location = useLocation()
  const isLogin = location.pathname === '/login'

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8">
        {children}
      </div>

      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-blue to-primary-yellow relative">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col items-center justify-center p-16 text-white">
          <h2 className="text-4xl font-bold mb-4">Welcome to HRLS</h2>
          <p className="text-xl text-center">
            {isLogin
              ? 'Sign in to access your dashboard'
              : 'Create an account to get started'
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout