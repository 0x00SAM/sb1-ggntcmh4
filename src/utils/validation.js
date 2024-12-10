export const validateLeaveRequest = (data) => {
  const errors = {}

  if (!data.type) {
    errors.type = 'Leave type is required'
  }

  if (!data.startDate) {
    errors.startDate = 'Start date is required'
  }

  if (!data.endDate) {
    errors.endDate = 'End date is required'
  }

  if (data.startDate && data.endDate && new Date(data.startDate) > new Date(data.endDate)) {
    errors.endDate = 'End date must be after start date'
  }

  if (!data.reason || data.reason.trim().length < 10) {
    errors.reason = 'Please provide a detailed reason (minimum 10 characters)'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const validatePassword = (password) => {
  const minLength = 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  
  const errors = []
  
  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`)
  }
  if (!hasUpperCase) {
    errors.push('Password must contain at least one uppercase letter')
  }
  if (!hasLowerCase) {
    errors.push('Password must contain at least one lowercase letter')
  }
  if (!hasNumbers) {
    errors.push('Password must contain at least one number')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}