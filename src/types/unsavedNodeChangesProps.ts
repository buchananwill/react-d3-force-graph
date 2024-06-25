export interface UnsavedNodeChangesProps {
  unsavedChanges: boolean;
  handleOpen?: () => void;
  show?: boolean;
  onClose?: () => void;
  onConfirm: () => Promise<void>;
  onCancel?: () => void;
}
