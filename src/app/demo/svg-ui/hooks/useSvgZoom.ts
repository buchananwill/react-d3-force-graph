import {useGlobalListener} from "selective-context";


export function useSvgZoom(uniqueElementKey: string, rootSvgKey: string) {
  const { currentState: zoomScale } = useGlobalListener(
      {contextKey: `${rootSvgKey}:zoom`,
      listenerKey: uniqueElementKey,
      initialValue: 1
}
  );
  return zoomScale;
}
