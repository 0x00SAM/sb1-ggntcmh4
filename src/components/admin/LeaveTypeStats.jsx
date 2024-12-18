import { Card, Text, PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'

function LeaveTypeStats({ stats }) {
  const leaveTypes = stats.reduce((acc, request) => {
    acc[request.type] = (acc[request.type] || 0) + 1
    return acc
  }, {})

  const data = Object.entries(leaveTypes).map(([type, count]) => ({
    name: type,
    value: count
  }))

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  return (
    <Card className="p-6">
      <Text size={500} weight="semibold" className="mb-4">
        Leave Types Distribution
      </Text>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

export default LeaveTypeStats