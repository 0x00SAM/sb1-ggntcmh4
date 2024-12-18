export function handleApiError(error, showNotification) {
    console.error('API Error:', error)
    
    let message = 'An unexpected error occurred'
    
    if (error.response) {
      // Server responded with error
      message = error.response.data?.message || error.response.statusText
    } else if (error.request) {
      // Request made but no response
      message = 'Server not responding. Please try again later.'
    } else {
      // Request setup error
      message = error.message
    }
    
    showNotification(message, 'error')
    return message
  }
  
  export function handleAuthError(error, showNotification) {
    console.error('Auth Error:', error)
    
    let message = 'Authentication failed'
    
    if (error.message.includes('invalid_credentials')) {
      message = 'Invalid email or password'
    } else if (error.message.includes('email_taken')) {
      message = 'Email already in use'
    }
    
    showNotification(message, 'error')
    return message
  }
  