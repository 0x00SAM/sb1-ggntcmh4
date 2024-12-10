import { useState } from 'react'
import { useLeaves } from '../../hooks/useLeaves'
import LeaveBalance from '../../components/employee/stats/LeaveBalance'
import LeaveHistory from '../../components/employee/stats/LeaveHistory'
import UpcomingLeaves from '../../components/employee/stats/UpcomingLeaves'
import LeaveStatistics from '../../components/dashboard/LeaveStatistics'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import Card from '../../components/shared/Card'

function EmployeeDashboard() {
  const [timeframe, setTimeframe] = useState('6')
  const { leaves, loading, error } = useLeaves()
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  if (error) {
    return (
      <Card className="p-6 text-center">
        <div className="text-red-500">Failed to load dashboard data</div>
        <div className="text-sm text-gray-500 mt-2">{error}</div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Your Leave Summary</h1>

      <div className="grid grid-cols-3 gap-6">
        <LeaveBalance available={15} total={25} />
        <div className="col-span-2">
          <LeaveStatistics
            data={[
              { month: 'Jan', days: 2 },
              { month: 'Feb', days: 3 },
              { month: 'Mar', days: 1 },
              { month: 'Apr', days: 0 },
              { month: 'May', days: 2 },
              { month: 'Jun', days: 1 },
            ]}
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <LeaveHistory history={leaves || []} />
        <UpcomingLeaves leaves={leaves || []} />
      </div>
    </div>
  )
}

export default EmployeeDashboard