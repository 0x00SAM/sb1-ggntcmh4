import { Card, Text, Badge } from '@fluentui/react-components'
import { format, isAfter } from 'date-fns'

function UpcomingLeaves({ leaves = [] }) {
  const upcomingLeaves = leaves
    ?.filter(leave => 
      isAfter(new Date(leave.start_date), new Date()) && 
      leave.status === 'approved'
    )
    .sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
    .slice(0, 5)

  return (
    <Card className="p-6">
      <Text size={500} weight="semibold" className="mb-4">
        Upcoming Leaves
      </Text>
      <div className="space-y-4">
        {upcomingLeaves?.length > 0 ? (
          upcomingLeaves.map((leave) => (
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
              <Badge color="success">
                {Math.ceil(
                  (new Date(leave.end_date) - new Date(leave.start_date)) / 
                  (1000 * 60 * 60 * 24)
                )} days
              </Badge>
            </div>
          ))
        ) : (
          <Text className="text-center text-gray-500">
            No upcoming leaves
          </Text>
        )}
      </div>
    </Card>
  )
}

export default UpcomingLeaves