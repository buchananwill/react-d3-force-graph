export interface UnsavedNodeChangesProps {
    unsavedChanges: boolean;
    handleOpen?: () => void;
    show?: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
}