import { useEffect, useRef } from 'react';
import { useRootSvgContext } from '../rootSvgContextCreator';
import { useSvgZoom } from './useSvgZoom';
import {useGlobalController} from "selective-context";


export function useSvgScale(uniqueElementKey: string) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const rootSvgKey = useRootSvgContext();
  const svgScaleKey = `${rootSvgKey}:svg-scale`;
  const zoomScale = useSvgZoom(uniqueElementKey, rootSvgKey);

  const { currentState: svgScale, dispatch: setSvgScale } =
    useGlobalController({
      contextKey: svgScaleKey,
      listenerKey: uniqueElementKey,
      initialValue: 1
    });

  useEffect(() => {
    const svg = svgRef.current;

    if (svg) {
      const viewBox = svg.viewBox;
      setSvgScale(
        viewBox.baseVal.width / svg.width.baseVal.value
      );
    }
  }, [svgRef, setSvgScale, svgScaleKey, zoomScale]);

  return { svgScale, svgRef };
}
