import { forwardRef } from 'react'
import { Dropdown, Label } from '@fluentui/react-components'

const Select = forwardRef(({
  label,
  options = [],
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
      <Dropdown
        ref={ref}
        {...props}
        options={options}
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

Select.displayName = 'Select'

export default Select