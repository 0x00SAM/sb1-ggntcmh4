import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye24Regular, EyeOff24Regular } from '@fluentui/react-icons'
import { useAuth } from '../../contexts/AuthContext'
import AuthLayout from '../../components/auth/AuthLayout'
import Button from '../../components/shared/Button'
import Input from '../../components/shared/Input'

function Login() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error } = await signIn({
        email: formData.email,
        password: formData.password,
      })

      if (error) throw error
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-8 text-center">Welcome Back</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
              {error}
            </div>
          )}

          <Input
            label="Email"
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="name@company.com"
            error={error}
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              error={error}
              contentAfter={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9"
                >
                  {showPassword ? <EyeOff24Regular /> : <Eye24Regular />}
                </button>
              }
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
          >
            Sign In
          </Button>

          <div className="text-center">
            <Link
              to="/register"
              className="text-primary-blue hover:underline"
            >
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login