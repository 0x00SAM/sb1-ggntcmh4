import { useState } from 'react'
import {
  Button,
  Dropdown,
  Label,
  Textarea,
} from '@fluentui/react-components'
import { DatePicker } from '@fluentui/react-datepicker-compat'
import { Calendar24Regular } from '@fluentui/react-icons'

const LEAVE_TYPES = [
  { text: 'Vacation', value: 'vacation' },
  { text: 'Sick Leave', value: 'sick' },
  { text: 'Personal Leave', value: 'personal' },
  { text: 'Family Time', value: 'family' },
]

function LeaveRequestForm({ initialData, onSubmit }) {
  const [formData, setFormData] = useState(initialData || {
    type: '',
    startDate: null,
    endDate: null,
    reason: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="type">Leave Type</Label>
        <Dropdown
          id="type"
          value={formData.type}
          options={LEAVE_TYPES}
          onChange={(_, data) => 
            setFormData(prev => ({ ...prev, type: data.value }))
          }
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <DatePicker
            id="startDate"
            value={formData.startDate}
            onSelectDate={(date) =>
              setFormData(prev => ({ ...prev, startDate: date }))
            }
            minDate={new Date()}
            placeholder="Choose date"
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="endDate">End Date</Label>
          <DatePicker
            id="endDate"
            value={formData.endDate}
            onSelectDate={(date) =>
              setFormData(prev => ({ ...prev, endDate: date }))
            }
            minDate={formData.startDate || new Date()}
            placeholder="Choose date"
            className="w-full"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="reason">Reason Note</Label>
        <Textarea
          id="reason"
          value={formData.reason}
          onChange={(e) => 
            setFormData(prev => ({ ...prev, reason: e.target.value }))
          }
          placeholder="Enter your reason for leave request"
          className="w-full"
        />
      </div>

      <div className="flex gap-4">
        <Button
          type="submit"
          appearance="primary"
        >
          {initialData ? 'Update Request' : 'Submit Request'}
        </Button>
        <Button
          type="button"
          appearance="subtle"
          onClick={() => setFormData(initialData || {
            type: '',
            startDate: null,
            endDate: null,
            reason: '',
          })}
        >
          Reset
        </Button>
      </div>
    </form>
  )
}

export default LeaveRequestForm