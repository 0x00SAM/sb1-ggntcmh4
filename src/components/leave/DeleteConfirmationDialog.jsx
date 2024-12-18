import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@fluentui/react-components'

function DeleteConfirmationDialog({ isOpen, onClose, onConfirm }) {
  return (
    <Dialog open={isOpen} onOpenChange={(_, { open }) => !open && onClose()}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Delete Leave Request</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this leave request? This action cannot be undone.
          </DialogContent>
          <DialogActions>
            <Button appearance="primary" onClick={onConfirm}>
              Delete
            </Button>
            <Button appearance="subtle" onClick={onClose}>
              Cancel
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}

export default DeleteConfirmationDialog