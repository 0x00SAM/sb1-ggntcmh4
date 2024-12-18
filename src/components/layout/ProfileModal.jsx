import { useNavigate } from 'react-router-dom'
import { Avatar } from '@fluentui/react-components'
import { Person24Regular, SignOut24Regular } from '@fluentui/react-icons'
import { useAuth } from '../../contexts/AuthContext'
import Modal from '../shared/Modal'
import Button from '../shared/Button'

function ProfileModal({ isOpen, onClose }) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const isAdmin = user?.user_metadata?.role === 'admin'

  const handleSignOut = async () => {
    await signOut()
    onClose()
    navigate('/login')
  }

  const handleAdminDashboard = () => {
    navigate('/admin')
    onClose()
  }

  const actions = (
    <>
      <Button
        variant="secondary"
        icon={<SignOut24Regular />}
        onClick={handleSignOut}
      >
        Sign Out
      </Button>
    </>
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Profile"
      actions={actions}
      size="small"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar
            icon={<Person24Regular />}
            size={48}
            className="bg-primary-blue text-white"
          />
          <div>
            <div className="font-semibold">
              {user?.user_metadata?.first_name} {user?.user_metadata?.last_name}
            </div>
            <div className="text-sm text-gray-500">
              {user?.email}
            </div>
          </div>
        </div>

        {isAdmin && (
          <Button
            variant="subtle"
            icon={<Person24Regular />}
            fullWidth
            onClick={handleAdminDashboard}
          >
            Admin Dashboard
          </Button>
        )}
      </div>
    </Modal>
  )
}

export default ProfileModal