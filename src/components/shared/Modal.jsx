import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@fluentui/react-components'

function Modal({
  isOpen,
  onClose,
  title,
  children,
  actions,
  size = 'medium',
  className = '',
}) {
  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-lg',
    large: 'max-w-2xl',
    full: 'max-w-full'
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(_, { open }) => !open && onClose()}
    >
      <DialogSurface className={`${sizeClasses[size]} ${className}`}>
        <DialogBody>
          {title && (
            <DialogTitle>{title}</DialogTitle>
          )}
          <DialogContent>
            {children}
          </DialogContent>
          {actions && (
            <DialogActions>
              {actions}
            </DialogActions>
          )}
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}

export default Modal