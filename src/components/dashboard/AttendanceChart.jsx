import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import { Card, Text } from '@fluentui/react-components'

function AttendanceChart({ present, absent }) {
  const data = [
    { name: 'Present', value: present, color: '#37ce36' },
    { name: 'Absent', value: absent, color: '#EF4444' },
  ]

  return (
    <Card className="p-6">
      <Text size={500} weight="semibold" className="mb-4">
        Employee Attendance
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
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-around mt-4">
        <div className="text-center">
          <Text size={400} weight="semibold">
            {present}
          </Text>
          <Text size={200}>Total Present</Text>
        </div>
        <div className="text-center">
          <Text size={400} weight="semibold">
            {absent}
          </Text>
          <Text size={200}>Absent</Text>
        </div>
      </div>
    </Card>
  )
}

export default AttendanceChart