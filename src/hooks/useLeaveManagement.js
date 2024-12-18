import { useState } from 'react'
import { adminService } from '../services/adminService'
import { useNotification } from '../contexts/NotificationContext'

export function useLeaveManagement() {
  const [selectedLeaves, setSelectedLeaves] = useState([])
  const { showNotification } = useNotification()

  const handleStatusUpdate = async (leaveId, status, reason = '') => {
    const { error } = await adminService.updateLeaveStatus(leaveId, status, reason)
    
    if (error) {
      showNotification(error, 'error')
      return false
    }
    
    showNotification(`Leave request ${status} successfully`, 'success')
    return true
  }

  const handleBulkStatusUpdate = async (status) => {
    if (selectedLeaves.length === 0) {
      showNotification('No leave requests selected', 'warning')
      return
    }

    const { error } = await adminService.bulkUpdateLeaveStatus(selectedLeaves, status)
    
    if (error) {
      showNotification(error, 'error')
      return false
    }
    
    showNotification(`${selectedLeaves.length} leave requests updated successfully`, 'success')
    setSelectedLeaves([])
    return true
  }

  return {
    selectedLeaves,
    setSelectedLeaves,
    handleStatusUpdate,
    handleBulkStatusUpdate
  }
}