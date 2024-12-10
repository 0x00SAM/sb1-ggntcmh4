import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import App from './App'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import { LeaveProvider } from './contexts/LeaveContext'
import ErrorBoundary from './components/shared/ErrorBoundary'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <FluentProvider theme={webLightTheme}>
        <BrowserRouter>
          <AuthProvider>
            <LeaveProvider>
              <App />
            </LeaveProvider>
          </AuthProvider>
        </BrowserRouter>
      </FluentProvider>
    </ErrorBoundary>
  </StrictMode>,
)