import { Input, Dropdown } from '@fluentui/react-components'
import { Search24Regular, Filter24Regular } from '@fluentui/react-icons'

function EmployeeFilter({ searchQuery, onSearchChange, onFilterChange }) {
  const departments = ['All', 'HR', 'IT', 'Finance', 'Marketing']
  const statuses = ['All', 'Active', 'On Leave', 'Pending Leave']

  return (
    <div className="flex gap-4 mb-6">
      <Input
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search employees..."
        contentBefore={<Search24Regular />}
        className="flex-1"
      />
      <Dropdown
        placeholder="Department"
        options={departments}
        onChange={(_, data) => onFilterChange('department', data.value)}
        contentBefore={<Filter24Regular />}
      />
      <Dropdown
        placeholder="Status"
        options={statuses}
        onChange={(_, data) => onFilterChange('status', data.value)}
        contentBefore={<Filter24Regular />}
      />
    </div>
  )
}

export default EmployeeFilter