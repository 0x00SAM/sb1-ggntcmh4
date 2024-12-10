import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye24Regular, EyeOff24Regular } from '@fluentui/react-icons'
import { useAuth } from '../../contexts/AuthContext'
import AuthLayout from '../../components/auth/AuthLayout'
import Button from '../../components/shared/Button'
import Input from '../../components/shared/Input'

function Register() {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match')
    }

    setLoading(true)

    try {
      const { error } = await signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            role: 'employee',
          },
        },
      })

      if (error) throw error
      navigate('/login')
    } catch (err) {
      setError('Failed to create account. Please try again.')
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
        <h1 className="text-2xl font-bold mb-8 text-center">Create Account</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="John"
            />

            <Input
              label="Last Name"
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Doe"
            />
          </div>

          <Input
            label="Email"
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="name@company.com"
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

          <Input
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="••••••••"
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
          >
            Create Account
          </Button>

          <div className="text-center">
            <Link
              to="/login"
              className="text-primary-blue hover:underline"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Register