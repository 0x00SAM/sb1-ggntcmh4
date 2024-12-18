import { useState } from 'react'
import { NotificationContext } from '../../contexts/NotificationContext'
import { Toast } from '@fluentui/react-components'

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null)

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}
      {notification && (
        <div className="fixed bottom-4 right-4 z-50">
          <Toast>
            {notification.message}
          </Toast>
        </div>
      )}
    </NotificationContext.Provider>
  )
}