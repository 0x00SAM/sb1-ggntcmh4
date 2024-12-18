import { Card, Text, ProgressBar } from '@fluentui/react-components'

function LeaveBalance({ total, used, pending, remaining }) {
  const usedPercentage = (used / total) * 100
  const pendingPercentage = (pending / total) * 100

  return (
    <Card className="p-6">
      <Text size={500} weight="semibold" className="mb-4">
        Leave Balance
      </Text>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <Text>Used Leave</Text>
            <Text>{used} days</Text>
          </div>
          <ProgressBar
            value={usedPercentage}
            color="error"
            className="w-full"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <Text>Pending Requests</Text>
            <Text>{pending} days</Text>
          </div>
          <ProgressBar
            value={pendingPercentage}
            color="warning"
            className="w-full"
          />
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between">
            <Text weight="semibold">Remaining Balance</Text>
            <Text weight="semibold" className="text-primary-green">
              {remaining} days
            </Text>
          </div>
          <Text size={200} className="text-gray-500">
            of {total} days annual leave
          </Text>
        </div>
      </div>
    </Card>
  )
}

export default LeaveBalance