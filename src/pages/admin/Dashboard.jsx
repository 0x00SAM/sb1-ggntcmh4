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
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import { useAdminDashboard } from '../../hooks/useAdminDashboard'
import { useLeaveRequests } from '../../hooks/useLeaveRequests'
import { useLeaveManagement } from '../../hooks/useLeaveManagement'
import { useNotification } from '../../contexts/NotificationContext'

function AdminDashboard() {
  const [timeframe, setTimeframe] = useState('6')
  const { showNotification } = useNotification()
  const { 
    newRequests,
    pendingApprovals,
    rejections,
    totalRequests,
    loading: summaryLoading,
    error: summaryError 
  } = useAdminDashboard()
  
  const {
    requests,
    loading: requestsLoading,
    error: requestsError,
    updateLeaveRequest
  } = useLeaveRequests()

  const {
    selectedLeaves,
    setSelectedLeaves,
    handleStatusUpdate,
    handleBulkStatusUpdate
  } = useLeaveManagement()

  if (summaryLoading || requestsLoading) {
    return (
      <div className="pt-16 pl-64">
        <div className="p-6">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  if (summaryError || requestsError) {
    return (
      <div className="pt-16 pl-64">
        <div className="p-6 text-center text-red-500">
          {summaryError || requestsError}
        </div>
      </div>
    )
  }

  const handleLeaveAction = async (action, data) => {
    try {
      switch (action) {
        case 'approve':
        case 'reject':
          await handleStatusUpdate(data.id, action === 'approve' ? 'approved' : 'rejected')
          break
        case 'bulk-approve':
        case 'bulk-reject':
          await handleBulkStatusUpdate(action === 'bulk-approve' ? 'approved' : 'rejected')
          break
        default:
          console.warn('Unknown action:', action)
      }
    } catch (error) {
      showNotification(error.message, 'error')
    }
  }

  // Calculate attendance data from requests
  const attendanceData = {
    present: requests.filter(r => r.status === 'approved').length,
    absent: requests.filter(r => 
      ['pending', 'rejected', 'cancelled'].includes(r.status)
    ).length
  }

  // Get calendar events from approved requests
  const calendarEvents = requests
    .filter(r => r.status === 'approved')
    .map(r => ({
      date: r.start_date,
      type: 'leave'
    }))

  return (
    <div className="pt-16 pl-64">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-4 gap-6 mb-6">
          <SummaryCard
            icon={<Add24Regular />}
            count={newRequests}
            label="New Requests"
            color="green"
          />
          <SummaryCard
            icon={<Clock24Regular />}
            count={pendingApprovals}
            label="Pending Approvals"
            color="yellow"
          />
          <SummaryCard
            icon={<Dismiss24Regular />}
            count={rejections}
            label="Rejections"
            color="red"
          />
          <SummaryCard
            icon={<People24Regular />}
            count={totalRequests}
            label="Total Requests"
            color="blue"
          />
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <LeaveStatistics
            data={requests.map(r => ({
              month: new Date(r.start_date).toLocaleString('default', { month: 'short' }),
              days: 1
            }))}
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
              onAction={handleLeaveAction}
              selectedRequests={selectedLeaves}
              onSelect={setSelectedLeaves}
            />
          </div>
          <Calendar events={calendarEvents} />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard