import { Card, Text, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

function StatusStats({ stats }) {
  const statusCounts = stats.reduce((acc, request) => {
    acc[request.status] = (acc[request.status] || 0) + 1
    return acc
  }, {})

  const data = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    count
  }))

  return (
    <Card className="p-6">
      <Text size={500} weight="semibold" className="mb-4">
        Leave Request Status
      </Text>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

export default StatusStats