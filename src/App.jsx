import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import EmployeeDashboard from './pages/employee/Dashboard'
import AdminDashboard from './pages/admin/Dashboard'
import EmployeeLeaveDetails from './pages/admin/EmployeeLeaveDetails'
import LeaveRequest from './pages/employee/LeaveRequest'

function App() {
  const { user, isAdmin } = useAuth()

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          {/* Employee Routes */}
          <Route path="/employee" element={<EmployeeDashboard />} />
          <Route path="/employee/requests" element={<LeaveRequest />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/employee/:employeeId" element={<EmployeeLeaveDetails />} />
        </Route>
      </Route>

      {/* Default Route */}
      <Route path="/" element={
        <Navigate to={
          user 
            ? isAdmin 
              ? '/admin' 
              : '/employee'
            : '/login'
        } replace />
      } />
    </Routes>
  )
}

export default App