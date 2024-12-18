import { Card, Text, ProgressBar } from '@fluentui/react-components'

function DepartmentStats({ stats }) {
  const totalRequests = stats.reduce((sum, dept) => 
    sum + (dept.leave_requests?.length || 0), 0)

  return (
    <Card className="p-6">
      <Text size={500} weight="semibold" className="mb-4">
        Department Statistics
      </Text>
      
      <div className="space-y-4">
        {stats.map(dept => {
          const deptRequests = dept.leave_requests?.length || 0
          const percentage = (deptRequests / totalRequests) * 100 || 0
          
          return (
            <div key={dept.id}>
              <div className="flex justify-between mb-2">
                <Text>{dept.department}</Text>
                <Text>{deptRequests} requests</Text>
              </div>
              <ProgressBar
                value={percentage}
                color="brand"
                className="w-full"
              />
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export default DepartmentStats