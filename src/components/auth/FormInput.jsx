import { Input, Label } from '@fluentui/react-components'

function FormInput({ label, id, error, ...props }) {
  return (
    <div className="mb-4">
      <Label htmlFor={id} className="block mb-2">
        {label}
      </Label>
      <Input
        id={id}
        {...props}
        className={`w-full p-2 rounded-md border ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
    </div>
  )
}

export default FormInput