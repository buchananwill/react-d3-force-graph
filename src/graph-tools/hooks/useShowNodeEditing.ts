import { useGraphDispatch } from "@/graph-tools/hooks/useGraphSelectiveContext";
import { GraphSelectiveContextKeys } from "@/graph-tools/literals/graphSelectiveContextKeys";
import { useEffect } from "react";

export function useShowNodeEditing(show: boolean) {
  const { dispatchWithoutListen } = useGraphDispatch(
    GraphSelectiveContextKeys.showNodeEditing,
  );
  useEffect(() => {
    dispatchWithoutListen(show);
  }, [show, dispatchWithoutListen]);
}
