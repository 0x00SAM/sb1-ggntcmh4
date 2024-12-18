import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Calendar24Regular,
  Clock24Regular,
  Person24Regular,
} from '@fluentui/react-icons'
import SummaryCard from '../../components/dashboard/SummaryCard'
import LeaveStatistics from '../../components/dashboard/LeaveStatistics'
import LeaveRequestsTable from '../../components/dashboard/LeaveRequestsTable'
import QuickActionCheckbox from '../../components/admin/QuickActionCheckbox'

function EmployeeLeaveDetails() {
  const { employeeId } = useParams()
  const [timeframe, setTimeframe] = useState('6')
  
  // Mock data - replace with actual API calls
  const employeeData = {
    id: employeeId,
    name: 'John Doe',
    summary: {
      daysAvailable: 7,
      pendingRequests: 4,
      daysUpcoming: 0,
      daysPerYear: 20,
    },
    statistics: [
      { month: 'Jan', days: 2 },
      { month: 'Feb', days: 3 },
      { month: 'Mar', days: 7 },
      { month: 'Apr', days: 2 },
      { month: 'May', days: 1 },
      { month: 'Jun', days: 4 },
    ],
    requests: [
      {
        id: 1,
        type: 'Sick',
        dateFrom: '2024-01-18',
        dateTo: '2024-01-18',
        duration: 11,
        status: 'declined',
      },
      {
        id: 2,
        type: 'Time off',
        dateFrom: '2024-03-15',
        dateTo: '2024-03-15',
        duration: 48,
        status: 'approved',
      },
      {
        id: 3,
        type: 'Holiday',
        dateFrom: '2024-04-28',
        dateTo: '2024-04-28',
        duration: 12,
        status: 'pending',
      },
    ],
  }

  const handleQuickAction = (requestId, action) => {
    console.log(`Quick action ${action} for request ${requestId}`)
    // Implement the API call to update request status
  }

  return (
    <div className="pt-16 pl-64">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">
          Leave Summary for {employeeData.name}
        </h1>

        <div className="grid grid-cols-4 gap-6 mb-6">
          <SummaryCard
            icon={<Calendar24Regular className="text-white" />}
            count={employeeData.summary.daysAvailable}
            label="Days available"
            color="blue"
          />
          <SummaryCard
            icon={<Clock24Regular className="text-gray-600" />}
            count={employeeData.summary.pendingRequests}
            label="Pending requests"
          />
          <SummaryCard
            icon={<Calendar24Regular className="text-gray-600" />}
            count={employeeData.summary.daysUpcoming}
            label="Days upcoming"
          />
          <SummaryCard
            icon={<Person24Regular className="text-gray-600" />}
            count={employeeData.summary.daysPerYear}
            label="Days per year"
          />
        </div>

        <div className="mb-6">
          <LeaveStatistics
            data={employeeData.statistics}
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Requested time off</h2>
            <LeaveRequestsTable
              requests={employeeData.requests}
              isAdmin={true}
              onAction={(action, request) => {
                console.log(action, request)
              }}
            />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Time off requests</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">Leave Type</th>
                    <th className="text-left py-3">Date from</th>
                    <th className="text-left py-3">Date to</th>
                    <th className="text-left py-3">Duration</th>
                    <th className="text-left py-3">Added on</th>
                    <th className="text-left py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeData.requests.map((request) => (
                    <tr key={request.id} className="border-b">
                      <td className="py-3">{request.type}</td>
                      <td className="py-3">{request.dateFrom}</td>
                      <td className="py-3">{request.dateTo}</td>
                      <td className="py-3">{request.duration} hours</td>
                      <td className="py-3">{request.dateFrom}</td>
                      <td className="py-3">
                        <QuickActionCheckbox
                          requestId={request.id}
                          onAction={handleQuickAction}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeLeaveDetails