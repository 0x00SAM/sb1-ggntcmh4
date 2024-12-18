import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { 
  Button,
  Avatar,
} from '@fluentui/react-components'
import {
  Home24Regular,
  CalendarLtr24Regular,
  Mail24Regular,
  Alert24Regular,
  People24Regular,
  ChevronDown24Regular,
  ChevronRight24Regular,
} from '@fluentui/react-icons'
import { useAuth } from '../../contexts/AuthContext'
import EmployeeList from '../admin/EmployeeList'

function Sidebar() {
  const { user } = useAuth()
  const isAdmin = user?.user_metadata?.role === 'admin'
  const [employeeListExpanded, setEmployeeListExpanded] = useState(false)

  const navItems = [
    {
      icon: <Home24Regular />,
      label: 'Dashboard',
      to: isAdmin ? '/admin' : '/employee',
    },
    {
      icon: <CalendarLtr24Regular />,
      label: 'Leave Requests',
      to: `${isAdmin ? '/admin' : '/employee'}/requests`,
    },
    {
      icon: <Mail24Regular />,
      label: 'Messages',
      to: `${isAdmin ? '/admin' : '/employee'}/messages`,
    },
  ]

  if (isAdmin) {
    navItems.push(
      {
        icon: <Alert24Regular />,
        label: 'HR Notifications',
        to: '/admin/notifications',
      }
    )
  }

  return (
    <aside className="w-64 bg-white h-screen fixed left-0 top-16 border-r border-gray-200 overflow-hidden">
      <nav className="p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md mb-2 ${
                isActive
                  ? 'bg-primary-blue text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}

        {isAdmin && (
          <div>
            <Button
              icon={<People24Regular />}
              appearance="transparent"
              className="w-full justify-between px-4 py-2 mb-2"
              onClick={() => setEmployeeListExpanded(!employeeListExpanded)}
              contentAfter={
                employeeListExpanded ? (
                  <ChevronDown24Regular />
                ) : (
                  <ChevronRight24Regular />
                )
              }
            >
              Employees
            </Button>
            <EmployeeList expanded={employeeListExpanded} />
          </div>
        )}
      </nav>
    </aside>
  )
}

export default Sidebar