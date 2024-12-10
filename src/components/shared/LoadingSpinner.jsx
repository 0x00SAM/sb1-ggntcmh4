function LoadingSpinner({ size = 'medium', className = '' }) {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  }

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`
          animate-spin rounded-full
          border-2 border-gray-200
          border-t-primary-blue
          ${sizeClasses[size]}
        `}
      />
    </div>
  )
}

export default LoadingSpinner