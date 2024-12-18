import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Input,
  Avatar,
  Button,
  Spinner,
  Text,
} from '@fluentui/react-components'
import {
  Search24Regular,
  DismissRegular,
  PersonRegular,
} from '@fluentui/react-icons'
import { useEmployeeList } from '../../hooks/useEmployeeList'

function EmployeeList() {
  const navigate = useNavigate()
  const { 
    employees, 
    loading, 
    error, 
    searchQuery, 
    setSearchQuery 
  } = useEmployeeList()
  const [isExpanded, setIsExpanded] = useState(false)

  const handleEmployeeClick = (employeeId) => {
    navigate(`/admin/employee/${employeeId}`)
    setIsExpanded(false)
  }

  return (
    <div className="relative">
      <div className="px-4 mb-2">
        <div className="relative">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search employees..."
            contentBefore={<Search24Regular />}
            contentAfter={
              searchQuery && (
                <Button
                  icon={<DismissRegular />}
                  appearance="transparent"
                  onClick={() => setSearchQuery('')}
                />
              )
            }
            className="w-full"
          />
        </div>
      </div>

      <div className={`overflow-y-auto transition-all duration-300 ${
        isExpanded ? 'max-h-96' : 'max-h-0'
      }`}>
        {loading ? (
          <div className="flex justify-center p-4">
            <Spinner size="small" />
          </div>
        ) : error ? (
          <div className="p-4 text-red-500 text-center">
            <Text>Failed to load employees</Text>
            <Button
              onClick={() => window.location.reload()}
              appearance="subtle"
            >
              Retry
            </Button>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {employees?.map((employee) => (
              <Button
                key={employee.id}
                icon={
                  <Avatar
                    name={`${employee.first_name} ${employee.last_name}`}
                    icon={<PersonRegular />}
                    size={24}
                  />
                }
                appearance="subtle"
                className="w-full justify-start"
                onClick={() => handleEmployeeClick(employee.id)}
              >
                {`${employee.first_name} ${employee.last_name}`}
              </Button>
            ))}
            {employees?.length === 0 && (
              <Text className="text-center block p-2 text-gray-500">
                No employees found
              </Text>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default EmployeeList