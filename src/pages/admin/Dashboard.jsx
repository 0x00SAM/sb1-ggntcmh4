import { useState } from 'react'
import {
  Add24Regular,
  Clock24Regular,
  Dismiss24Regular,
  People24Regular,
} from '@fluentui/react-icons'
import SummaryCard from '../../components/dashboard/SummaryCard'
import LeaveStatistics from '../../components/dashboard/LeaveStatistics'
import LeaveRequestsTable from '../../components/dashboard/LeaveRequestsTable'
import AttendanceChart from '../../components/dashboard/AttendanceChart'
import Calendar from '../../components/dashboard/Calendar'

function AdminDashboard() {
  const [timeframe, setTimeframe] = useState('6')
  
  // Mock data - replace with actual API calls
  const summaryData = {
    newRequests: 25,
    pendingApprovals: 12,
    rejections: 9,
    totalRequests: 125,
  }

  const statisticsData = [
    { month: 'Jan', days: 2 },
    { month: 'Feb', days: 3 },
    { month: 'Mar', days: 7 },
    { month: 'Apr', days: 4 },
    { month: 'May', days: 1 },
    { month: 'Jun', days: 5 },
  ]

  const attendanceData = {
    present: 104,
    absent: 16,
  }

  const calendarEvents = [
    { date: '2024-02-15', type: 'leave' },
    { date: '2024-02-20', type: 'leave' },
  ]

  const requests = [
    {
      id: 1,
      employee: { name: 'John Doe' },
      type: 'Vacation',
      dateFrom: '2024-02-15',
      dateTo: '2024-02-20',
      duration: 40,
      status: 'pending',
    },
  ]

  return (
    <div className="pt-16 pl-64">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-4 gap-6 mb-6">
          <SummaryCard
            icon={<Add24Regular />}
            count={summaryData.newRequests}
            label="New Requests"
            color="green"
          />
          <SummaryCard
            icon={<Clock24Regular />}
            count={summaryData.pendingApprovals}
            label="Pending Approvals"
            color="yellow"
          />
          <SummaryCard
            icon={<Dismiss24Regular />}
            count={summaryData.rejections}
            label="Rejections"
            color="red"
          />
          <SummaryCard
            icon={<People24Regular />}
            count={summaryData.totalRequests}
            label="Total Requests"
            color="blue"
          />
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <LeaveStatistics
            data={statisticsData}
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
          />
          <AttendanceChart
            present={attendanceData.present}
            absent={attendanceData.absent}
          />
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Leave Requests</h2>
            <LeaveRequestsTable
              requests={requests}
              isAdmin={true}
              onAction={(action, request) => {
                console.log(action, request)
              }}
            />
          </div>
          <Calendar events={calendarEvents} />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard