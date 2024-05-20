import { useGraphDispatch } from "./useGraphSelectiveContext";
import { GraphSelectiveContextKeys } from "../literals";
import { useEffect } from "react";

export function useShowNodeEditing(show: boolean) {
  const { dispatchWithoutListen } = useGraphDispatch(
    GraphSelectiveContextKeys.showNodeEditing,
  );
  useEffect(() => {
    dispatchWithoutListen(show);
  }, [show, dispatchWithoutListen]);
}
