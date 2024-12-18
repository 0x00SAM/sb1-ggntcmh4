import { useState } from 'react'
import {
  Card,
  Text,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge,
  Dropdown,
  Input,
} from '@fluentui/react-components'
import { Search24Regular, Filter24Regular } from '@fluentui/react-icons'

function LeaveHistory({ leaves }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  const filteredLeaves = leaves.filter(leave => {
    const matchesSearch = leave.reason.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || leave.status === statusFilter
    const matchesType = typeFilter === 'all' || leave.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'success'
      case 'pending': return 'warning'
      case 'rejected': return 'error'
      default: return 'neutral'
    }
  }

  return (
    <Card className="p-6">
      <Text size={500} weight="semibold" className="mb-4">
        Leave History
      </Text>

      <div className="flex gap-4 mb-6">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by reason..."
          contentBefore={<Search24Regular />}
          className="flex-1"
        />
        <Dropdown
          value={statusFilter}
          onChange={(_, data) => setStatusFilter(data.value)}
          placeholder="Status"
          options={[
            { text: 'All Status', value: 'all' },
            { text: 'Approved', value: 'approved' },
            { text: 'Pending', value: 'pending' },
            { text: 'Rejected', value: 'rejected' }
          ]}
          contentBefore={<Filter24Regular />}
        />
        <Dropdown
          value={typeFilter}
          onChange={(_, data) => setTypeFilter(data.value)}
          placeholder="Leave Type"
          options={[
            { text: 'All Types', value: 'all' },
            { text: 'Annual', value: 'annual' },
            { text: 'Sick', value: 'sick' },
            { text: 'Personal', value: 'personal' }
          ]}
          contentBefore={<Filter24Regular />}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell>From</TableHeaderCell>
            <TableHeaderCell>To</TableHeaderCell>
            <TableHeaderCell>Duration</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Reason</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLeaves.map((leave) => (
            <TableRow key={leave.id}>
              <TableCell>{leave.type}</TableCell>
              <TableCell>{new Date(leave.start_date).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(leave.end_date).toLocaleDateString()}</TableCell>
              <TableCell>{leave.duration} days</TableCell>
              <TableCell>
                <Badge color={getStatusColor(leave.status)}>
                  {leave.status}
                </Badge>
              </TableCell>
              <TableCell>{leave.reason}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}

export default LeaveHistory