import { useMemo, useState } from "react";
import { useEscapeToClose } from "@/app/demo/react-flow/components/nodes/useEscapeToClose";

export function usePopoverFix() {
  const [popoverVisible, setPopoverVisible] = useState(false);

  const shouldCloseOnInteractOutside = useMemo(() => {
    return () => {
      setPopoverVisible(false);
      return false;
    };
  }, [setPopoverVisible]);

  useEscapeToClose(popoverVisible, setPopoverVisible);

  return {
    isOpen: popoverVisible,
    onOpenChange: setPopoverVisible,
    isKeyboardDismissDisabled: false,
    shouldCloseOnInteractOutside,
  };
}