import { useMemo, useState } from "react";

export function usePopoverFix() {
  const [popoverVisible, setPopoverVisible] = useState(false);

  const shouldCloseOnInteractOutside = useMemo(() => {
    return () => {
      setPopoverVisible(false);
      return false;
    };
  }, [setPopoverVisible]);

  return {
    isOpen: popoverVisible,
    onOpenChange: setPopoverVisible,
    isKeyboardDismissDisabled: false,
    shouldCloseOnInteractOutside,
  };
}
