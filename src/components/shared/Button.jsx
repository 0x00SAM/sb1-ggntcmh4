import { forwardRef } from 'react'
import { Button as FluentButton } from '@fluentui/react-components'

const Button = forwardRef(({ 
  children, 
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  disabled = false,
  ...props 
}, ref) => {
  const getAppearance = () => {
    switch (variant) {
      case 'primary':
        return 'primary'
      case 'secondary':
        return 'secondary'
      case 'outline':
        return 'outline'
      default:
        return 'subtle'
    }
  }

  return (
    <FluentButton
      ref={ref}
      appearance={getAppearance()}
      size={size}
      disabled={disabled || loading}
      className={`${fullWidth ? 'w-full' : ''}`}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
          Loading...
        </div>
      ) : (
        children
      )}
    </FluentButton>
  )
})

Button.displayName = 'Button'

export default Button