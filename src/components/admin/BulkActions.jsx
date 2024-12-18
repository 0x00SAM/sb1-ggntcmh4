import { Button, ButtonGroup } from '@fluentui/react-components'
import { CheckmarkCircle24Regular, DismissCircle24Regular } from '@fluentui/react-icons'

function BulkActions({ selectedCount, onApprove, onReject }) {
  if (selectedCount === 0) return null

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 border-t">
      <span className="text-sm text-gray-600">
        {selectedCount} request{selectedCount !== 1 ? 's' : ''} selected
      </span>
      <ButtonGroup>
        <Button
          icon={<CheckmarkCircle24Regular />}
          appearance="primary"
          onClick={onApprove}
        >
          Approve Selected
        </Button>
        <Button
          icon={<DismissCircle24Regular />}
          appearance="secondary"
          onClick={onReject}
        >
          Reject Selected
        </Button>
      </ButtonGroup>
    </div>
  )
}

export default BulkActions