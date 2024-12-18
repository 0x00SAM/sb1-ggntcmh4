import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Text } from '@fluentui/react-components'
import LeaveRequestForm from '../../components/leave/LeaveRequestForm'
import LeaveRequestsTable from '../../components/dashboard/LeaveRequestsTable'
import DeleteConfirmationDialog from '../../components/leave/DeleteConfirmationDialog'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import { useLeaveRequests } from '../../hooks/useLeaveRequests'

function LeaveRequest() {
  const navigate = useNavigate()
  const [editingRequest, setEditingRequest] = useState(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deletingRequest, setDeletingRequest] = useState(null)
  const {
    requests,
    loading,
    error,
    createLeaveRequest,
    updateLeaveRequest,
    deleteLeaveRequest
  } = useLeaveRequests()

  const handleSubmit = async (formData) => {
    try {
      if (editingRequest) {
        const { success, error } = await updateLeaveRequest(editingRequest.id, formData)
        if (!success) throw new Error(error)
        setEditingRequest(null)
      } else {
        const { success, error } = await createLeaveRequest(formData)
        if (!success) throw new Error(error)
      }
      navigate('/employee')
    } catch (err) {
      console.error('Failed to submit leave request:', err)
      // Show error message to user
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
      case 'cancel':
        handleCancelRequest(request)
        break
      default:
        break
    }
  }

  const handleDelete = async () => {
    if (!deletingRequest) return

    try {
      const { success, error } = await deleteLeaveRequest(deletingRequest.id)
      if (!success) throw new Error(error)
      setShowDeleteDialog(false)
      setDeletingRequest(null)
    } catch (err) {
      console.error('Failed to delete leave request:', err)
      // Show error message to user
    }
  }

  const handleCancelRequest = async (request) => {
    try {
      const { success, error } = await updateLeaveRequest(request.id, { status: 'cancelled' })
      if (!success) throw new Error(error)
    } catch (err) {
      console.error('Failed to cancel leave request:', err)
      // Show error message to user
    }
  }

  if (loading) return <LoadingSpinner />

  if (error) {
    return (
      <div className="p-6 text-center">
        <Text className="text-red-500">{error}</Text>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    )
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
            <h2 className="text-xl font-semibold mb-6">Your Leave Requests</h2>
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