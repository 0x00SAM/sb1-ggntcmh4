import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Avatar,
  Badge,
  Button,
  Checkbox,
} from '@fluentui/react-components'
import { Edit24Regular, Delete24Regular } from '@fluentui/react-icons'
import BulkActions from '../admin/BulkActions'

function LeaveRequestsTable({ requests, isAdmin, onAction, selectedRequests = [], onSelect }) {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'warning'
      case 'approved':
        return 'success'
      case 'rejected':
        return 'danger'
      default:
        return 'neutral'
    }
  }

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelect?.(requests.map(r => r.id))
    } else {
      onSelect?.([])
    }
  }

  const handleSelectRequest = (requestId, checked) => {
    if (checked) {
      onSelect?.([...selectedRequests, requestId])
    } else {
      onSelect?.(selectedRequests.filter(id => id !== requestId))
    }
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {isAdmin && (
              <TableHeaderCell>
                <Checkbox
                  checked={selectedRequests.length === requests.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </TableHeaderCell>
            )}
            {isAdmin && <TableHeaderCell>Employee</TableHeaderCell>}
            <TableHeaderCell>Leave Type</TableHeaderCell>
            <TableHeaderCell>Date From</TableHeaderCell>
            <TableHeaderCell>Date To</TableHeaderCell>
            <TableHeaderCell>Duration</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              {isAdmin && (
                <TableCell>
                  <Checkbox
                    checked={selectedRequests.includes(request.id)}
                    onChange={(e) => handleSelectRequest(request.id, e.target.checked)}
                  />
                </TableCell>
              )}
              {isAdmin && (
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar
                      name={`${request.user_profiles.first_name} ${request.user_profiles.last_name}`}
                    />
                    <span>
                      {request.user_profiles.first_name} {request.user_profiles.last_name}
                    </span>
                  </div>
                </TableCell>
              )}
              <TableCell>{request.type}</TableCell>
              <TableCell>{request.start_date}</TableCell>
              <TableCell>{request.end_date}</TableCell>
              <TableCell>{request.duration} days</TableCell>
              <TableCell>
                <Badge color={getStatusColor(request.status)}>
                  {request.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {isAdmin ? (
                    <>
                      <Button
                        icon={<Edit24Regular />}
                        appearance="subtle"
                        onClick={() => onAction('edit', request)}
                      />
                      <Button
                        icon={<Delete24Regular />}
                        appearance="subtle"
                        onClick={() => onAction('delete', request)}
                      />
                    </>
                  ) : (
                    request.status === 'pending' && (
                      <Button
                        appearance="subtle"
                        onClick={() => onAction('cancel', request)}
                      >
                        Cancel
                      </Button>
                    )
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isAdmin && selectedRequests.length > 0 && (
        <BulkActions
          selectedCount={selectedRequests.length}
          onApprove={() => onAction('bulk-approve', selectedRequests)}
          onReject={() => onAction('bulk-reject', selectedRequests)}
        />
      )}
    </div>
  )
}

export default LeaveRequestsTable