import { forwardRef } from 'react'
import { Input as FluentInput, Label } from '@fluentui/react-components'

const Input = forwardRef(({
  label,
  error,
  helperText,
  required,
  fullWidth = true,
  ...props
}, ref) => {
  return (
    <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
      {label && (
        <Label
          htmlFor={props.id}
          required={required}
          className="block mb-1"
        >
          {label}
        </Label>
      )}
      <FluentInput
        ref={ref}
        {...props}
        className={`
          ${fullWidth ? 'w-full' : ''}
          ${error ? 'border-red-500' : ''}
        `}
      />
      {(error || helperText) && (
        <div className={`text-sm mt-1 ${error ? 'text-red-500' : 'text-gray-500'}`}>
          {error || helperText}
        </div>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input