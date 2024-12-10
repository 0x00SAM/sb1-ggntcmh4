import { useState } from 'react'
import { 
  Checkbox,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@fluentui/react-components'

function QuickActionCheckbox({ requestId, onAction }) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [selectedAction, setSelectedAction] = useState(null)

  const handleCheckboxChange = (action) => {
    setSelectedAction(action)
    setShowConfirmDialog(true)
  }

  const handleConfirm = () => {
    onAction(requestId, selectedAction)
    setShowConfirmDialog(false)
  }

  return (
    <>
      <div className="flex gap-2">
        <Checkbox
          label="Approve"
          onChange={() => handleCheckboxChange('approve')}
        />
        <Checkbox
          label="Reject"
          onChange={() => handleCheckboxChange('reject')}
        />
      </div>

      <Dialog open={showConfirmDialog} onOpenChange={(_, { open }) => setShowConfirmDialog(open)}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogContent>
              Are you sure you want to {selectedAction} this leave request?
            </DialogContent>
            <DialogActions>
              <Button appearance="primary" onClick={handleConfirm}>
                Confirm
              </Button>
              <Button appearance="subtle" onClick={() => setShowConfirmDialog(false)}>
                Cancel
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </>
  )
}

export default QuickActionCheckbox