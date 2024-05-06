import { useEffect, useRef } from 'react';
import { useRootSvgContext } from '../rootSvgContextCreator';
import { useSvgZoom } from './useSvgZoom';
import { useSelectiveContextControllerNumber } from '../selective-context/components/typed/selective-context-manager-number';

export function useSvgScale(uniqueElementKey: string) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const rootSvgKey = useRootSvgContext();
  const svgScaleKey = `svg-scale-${rootSvgKey}`;
  const zoomScale = useSvgZoom(uniqueElementKey, rootSvgKey);

  const { currentState: svgScale, dispatchUpdate: setSvgScale } =
    useSelectiveContextControllerNumber({
      contextKey: svgScaleKey,
      listenerKey: uniqueElementKey,
      initialValue: 1
    });

  useEffect(() => {
    const svg = svgRef.current;

    if (svg) {
      const viewBox = svg.viewBox;
      setSvgScale({
        contextKey: svgScaleKey,
        update: viewBox.baseVal.width / svg.width.baseVal.value
      });
    }
  }, [svgRef, setSvgScale, svgScaleKey, zoomScale]);

  return { svgScale, svgRef };
}
