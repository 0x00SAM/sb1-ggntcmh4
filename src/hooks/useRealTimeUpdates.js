import { useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNotification } from '../contexts/NotificationContext'

export function useRealTimeUpdates(callback) {
  const { showNotification } = useNotification()

  useEffect(() => {
    const subscription = supabase
      .channel('db_changes')
      .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'leave_requests' },
          (payload) => {
            callback(payload)
            
            // Show notifications for relevant changes
            switch (payload.eventType) {
              case 'INSERT':
                showNotification('New leave request received', 'info')
                break
              case 'UPDATE':
                if (payload.new.status !== payload.old.status) {
                  showNotification(
                    `Leave request ${payload.new.status}`,
                    payload.new.status === 'approved' ? 'success' : 'warning'
                  )
                }
                break
              case 'DELETE':
                showNotification('Leave request deleted', 'info')
                break
              default:
                break
            }
          })
      .subscribe()

    return () => subscription.unsubscribe()
  }, [callback, showNotification])
}