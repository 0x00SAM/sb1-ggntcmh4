import { Card, Text } from '@fluentui/react-components'

function SummaryCard({ icon, count, label, color = 'blue' }) {
  const colorClasses = {
    green: 'bg-primary-green',
    blue: 'bg-primary-blue',
    yellow: 'bg-primary-yellow',
    red: 'bg-red-500',
  }

  return (
    <Card className="flex items-center p-4">
      <div className={`${colorClasses[color]} p-3 rounded-full mr-4`}>
        {icon}
      </div>
      <div>
        <Text size={800} weight="semibold">
          {count}
        </Text>
        <Text size={300} className="text-gray-500">
          {label}
        </Text>
      </div>
    </Card>
  )
}

export default SummaryCard