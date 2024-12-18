import { Card, Text, Badge } from '@fluentui/react-components'
import { format } from 'date-fns'

function LeaveHistory({ history = [] }) {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'success'
      case 'pending':
        return 'warning'
      case 'rejected':
        return 'danger'
      default:
        return 'neutral'
    }
  }

  return (
    <Card className="p-6">
      <Text size={500} weight="semibold" className="mb-4">
        Recent Leave History
      </Text>
      <div className="space-y-4">
        {history?.length > 0 ? (
          history.map((leave) => (
            <div
              key={leave.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <Text size={300} weight="semibold">
                  {leave.type}
                </Text>
                <Text size={200} className="text-gray-500">
                  {format(new Date(leave.start_date), 'MMM d')} -{' '}
                  {format(new Date(leave.end_date), 'MMM d, yyyy')}
                </Text>
              </div>
              <Badge color={getStatusColor(leave.status)}>
                {leave.status}
              </Badge>
            </div>
          ))
        ) : (
          <Text className="text-center text-gray-500">
            No leave history available
          </Text>
        )}
      </div>
    </Card>
  )
}

export default LeaveHistory