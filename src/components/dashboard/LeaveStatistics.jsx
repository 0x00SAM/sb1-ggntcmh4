import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Card, Text, Dropdown } from '@fluentui/react-components'

function LeaveStatistics({ data, timeframe, onTimeframeChange }) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Text size={500} weight="semibold">
          Leave Statistics
        </Text>
        <Dropdown
          value={timeframe}
          onChange={(e, data) => onTimeframeChange(data.value)}
          options={[
            { text: 'Last 6 months', value: '6' },
            { text: 'Last 12 months', value: '12' },
          ]}
        />
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="days" fill="#3b5be9" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

export default LeaveStatistics