import { Component } from 'react'
import Button from './Button'
import Card from './Card'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <Card className="max-w-lg w-full p-6 text-center">
            <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <Button
              onClick={() => window.location.reload()}
              variant="primary"
            >
              Refresh Page
            </Button>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary