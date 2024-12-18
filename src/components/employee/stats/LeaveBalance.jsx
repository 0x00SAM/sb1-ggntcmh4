import { Card, Text } from '@fluentui/react-components'
import { Calendar24Regular } from '@fluentui/react-icons'

function LeaveBalance({ available, total }) {
  const percentage = (available / total) * 100

  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <div className="bg-primary-blue p-3 rounded-full">
          <Calendar24Regular className="text-white" />
        </div>
        <div>
          <Text size={600} weight="semibold">
            {available} / {total}
          </Text>
          <Text size={200} className="text-gray-500">
            Days Available
          </Text>
        </div>
      </div>
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-blue rounded-full h-2"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </Card>
  )
}

export default LeaveBalance