import { createContext, useContext } from 'react'

export const NotificationContext = createContext({
  notification: null,
  showNotification: () => {}
})

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}