import { useState } from 'react'
import {
  Calendar24Regular,
  Clock24Regular,
  Person24Regular,
} from '@fluentui/react-icons'
import SummaryCard from '../../components/dashboard/SummaryCard'
import LeaveStatistics from '../../components/dashboard/LeaveStatistics'
import LeaveBalance from '../../components/dashboard/LeaveBalance'
import LeaveHistory from '../../components/dashboard/LeaveHistory'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import { useDashboardData } from '../../hooks/useDashboardData'
import { useLeaveBalance } from '../../hooks/useLeaveBalance'
import { useLeaveRequests } from '../../hooks/useLeaveRequests'

function EmployeeDashboard() {
  const [timeframe, setTimeframe] = useState('6')
  const { leaveStats, attendance, loading: statsLoading, error: statsError } = useDashboardData(parseInt(timeframe))
  const { requests, loading: requestsLoading, error: requestsError } = useLeaveRequests()
  const { total, used, pending, remaining, loading: balanceLoading, error: balanceError } = useLeaveBalance()

  if (statsLoading || requestsLoading || balanceLoading) {
    return (
      <div className="pt-16 pl-64">
        <div className="p-6">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  if (statsError || requestsError || balanceError) {
    return (
      <div className="pt-16 pl-64">
        <div className="p-6 text-center text-red-500">
          {statsError || requestsError || balanceError}
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 pl-64">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Your Leave Summary</h1>

        <div className="grid grid-cols-4 gap-6 mb-6">
          <SummaryCard
            icon={<Calendar24Regular />}
            count={remaining}
            label="Days Available"
            color="blue"
          />
          <SummaryCard
            icon={<Clock24Regular />}
            count={pending}
            label="Days Pending"
            color="yellow"
          />
          <SummaryCard
            icon={<Calendar24Regular />}
            count={used}
            label="Days Used"
            color="green"
          />
          <SummaryCard
            icon={<Person24Regular />}
            count={total}
            label="Total Days"
            color="blue"
          />
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <LeaveStatistics
            data={leaveStats}
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
          />
          <LeaveBalance
            total={total}
            used={used}
            pending={pending}
            remaining={remaining}
          />
        </div>

        <div className="bg-white rounded-lg shadow">
          <LeaveHistory leaves={requests} />
        </div>
      </div>
    </div>
  )
}

export default EmployeeDashboard