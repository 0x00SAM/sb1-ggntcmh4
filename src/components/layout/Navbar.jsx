import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Badge,
  Avatar,
} from '@fluentui/react-components'
import { 
  Mail24Regular,
  Alert24Regular,
  Person24Regular,
} from '@fluentui/react-icons'
import { useAuth } from '../../contexts/AuthContext'
import Button from '../shared/Button'
import ProfileModal from './ProfileModal'

function Navbar() {
  const { user } = useAuth()
  const [showProfileModal, setShowProfileModal] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
      <div className="px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-primary-green">
          HRLS
        </Link>

        <div className="flex items-center gap-4">
          <Button
            icon={<Mail24Regular />}
            variant="subtle"
            className="relative"
          >
            <Badge
              appearance="filled"
              color="danger"
              className="absolute -top-1 -right-1"
            >
              3
            </Badge>
          </Button>

          <Button
            icon={<Alert24Regular />}
            variant="subtle"
            className="relative"
          >
            <Badge
              appearance="filled"
              color="danger"
              className="absolute -top-1 -right-1"
            >
              5
            </Badge>
          </Button>

          <Button
            icon={<Avatar icon={<Person24Regular />} />}
            variant="subtle"
            onClick={() => setShowProfileModal(true)}
          >
            {user?.user_metadata?.first_name}
          </Button>
        </div>
      </div>

      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </nav>
  )
}

export default Navbar