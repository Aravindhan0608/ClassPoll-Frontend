import { AlertTriangle } from 'lucide-react';
import Modal from './Modal.jsx';
import Button from '../common/Button.jsx';

/**
 * Generic "are you sure?" dialog for destructive or high-impact actions
 * (restricting an account, archiving a class, deleting a user). Renders
 * on top of Modal so it gets the same escape-key/backdrop/focus handling.
 */
const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  description,
  confirmLabel = 'Confirm',
  variant = 'danger',
  isLoading = false,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title}>
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-danger-500/15 text-danger-400">
        <AlertTriangle className="h-4 w-4" />
      </div>
      <p className="text-sm text-ink-muted">{description}</p>
    </div>
    <div className="mt-6 flex gap-3">
      <Button variant="secondary" onClick={onClose} className="flex-1" disabled={isLoading}>
        Cancel
      </Button>
      <Button variant={variant} onClick={onConfirm} isLoading={isLoading} className="flex-1">
        {confirmLabel}
      </Button>
    </div>
  </Modal>
);

export default ConfirmDialog;
