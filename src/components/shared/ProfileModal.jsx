import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
  Text,
} from '@fluentui/react-components'
import { Person24Regular, SignOut24Regular } from '@fluentui/react-icons'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

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

  return (
    <Dialog open={isOpen} onOpenChange={(_, { open }) => !open && onClose()}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Profile</DialogTitle>
          <DialogContent>
            <div className="flex items-center gap-4 mb-6">
              <Avatar
                icon={<Person24Regular />}
                size={48}
                className="bg-primary-blue text-white"
              />
              <Text weight="semibold" size={400}>
                {user?.user_metadata?.first_name}
              </Text>
            </div>

            {isAdmin && (
              <Button
                appearance="subtle"
                icon={<Person24Regular />}
                className="w-full mb-2 justify-start"
                onClick={handleAdminDashboard}
              >
                Admin Dashboard
              </Button>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              appearance="secondary"
              icon={<SignOut24Regular />}
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}

export default ProfileModal