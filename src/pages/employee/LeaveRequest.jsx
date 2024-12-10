import { useState } from 'react'
import LeaveRequestForm from '../../components/leave/LeaveRequestForm'
import LeaveRequestsTable from '../../components/dashboard/LeaveRequestsTable'
import DeleteConfirmationDialog from '../../components/leave/DeleteConfirmationDialog'

function LeaveRequest() {
  const [editingRequest, setEditingRequest] = useState(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deletingRequest, setDeletingRequest] = useState(null)

  // Mock data - replace with actual API calls
  const [requests, setRequests] = useState([
    {
      id: 1,
      type: 'Holiday',
      dateFrom: '2024-02-12',
      dateTo: '2024-02-12',
      duration: 13,
      status: 'pending',
    },
    {
      id: 2,
      type: 'Sick',
      dateFrom: '2024-04-18',
      dateTo: '2024-04-18',
      duration: 24,
      status: 'pending',
    },
  ])

  const handleSubmit = (formData) => {
    if (editingRequest) {
      // Update existing request
      setRequests(prev =>
        prev.map(req =>
          req.id === editingRequest.id
            ? { ...req, ...formData }
            : req
        )
      )
      setEditingRequest(null)
    } else {
      // Add new request
      setRequests(prev => [
        ...prev,
        {
          id: Date.now(),
          ...formData,
          status: 'pending',
          duration: 8, // Calculate actual duration based on dates
        },
      ])
    }
  }

  const handleAction = (action, request) => {
    switch (action) {
      case 'edit':
        setEditingRequest(request)
        break
      case 'delete':
        setDeletingRequest(request)
        setShowDeleteDialog(true)
        break
      default:
        break
    }
  }

  const handleDelete = () => {
    setRequests(prev => prev.filter(req => req.id !== deletingRequest.id))
    setShowDeleteDialog(false)
    setDeletingRequest(null)
  }

  return (
    <div className="pt-16 pl-64">
      <div className="p-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">
              {editingRequest ? 'Edit Leave Request' : 'Add Leave Request'}
            </h2>
            <LeaveRequestForm
              initialData={editingRequest}
              onSubmit={handleSubmit}
            />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Pending Leave Requests</h2>
            <LeaveRequestsTable
              requests={requests}
              isAdmin={false}
              onAction={handleAction}
            />
          </div>
        </div>

        <DeleteConfirmationDialog
          isOpen={showDeleteDialog}
          onClose={() => {
            setShowDeleteDialog(false)
            setDeletingRequest(null)
          }}
          onConfirm={handleDelete}
        />
      </div>
    </div>
  )
}

export default LeaveRequest