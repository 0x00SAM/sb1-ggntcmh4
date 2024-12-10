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
} from '@fluentui/react-components'
import { Edit24Regular, Delete24Regular } from '@fluentui/react-icons'

function LeaveRequestsTable({ requests, isAdmin, onAction }) {
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

  return (
    <Table>
      <TableHeader>
        <TableRow>
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
                <div className="flex items-center gap-2">
                  <Avatar name={request.employee.name} />
                  <span>{request.employee.name}</span>
                </div>
              </TableCell>
            )}
            <TableCell>{request.type}</TableCell>
            <TableCell>{request.dateFrom}</TableCell>
            <TableCell>{request.dateTo}</TableCell>
            <TableCell>{request.duration} hours</TableCell>
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
  )
}

export default LeaveRequestsTable