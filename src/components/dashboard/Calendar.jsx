import { useState } from 'react'
import { Card, Text, Button } from '@fluentui/react-components'
import { DatePicker } from '@fluentui/react-datepicker-compat'
import { ChevronLeft24Regular, ChevronRight24Regular } from '@fluentui/react-icons'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'

function Calendar({ events = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const hasEvent = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    return events.some(event => event.date === dateStr)
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <Button icon={<ChevronLeft24Regular />} appearance="subtle" onClick={prevMonth} />
        <Text size={500} weight="semibold">
          {format(currentDate, 'MMMM yyyy')}
        </Text>
        <Button icon={<ChevronRight24Regular />} appearance="subtle" onClick={nextMonth} />
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
          <div key={day} className="text-center font-semibold p-2">
            {day}
          </div>
        ))}
        
        {daysInMonth.map((date) => (
          <div
            key={date.toString()}
            className={`p-2 text-center rounded-full ${
              hasEvent(date) ? 'bg-primary-blue text-white' : ''
            }`}
          >
            {format(date, 'd')}
          </div>
        ))}
      </div>

      <DatePicker
        className="hidden"
        value={currentDate}
        onSelectDate={(date) => date && setCurrentDate(date)}
      />
    </Card>
  )
}

export default Calendar