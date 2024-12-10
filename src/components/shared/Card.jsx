import { Card as FluentCard } from '@fluentui/react-components'

function Card({ children, className = '', ...props }) {
  return (
    <FluentCard 
      className={`bg-white rounded-lg shadow-md ${className}`}
      {...props}
    >
      {children}
    </FluentCard>
  )
}

export default Card