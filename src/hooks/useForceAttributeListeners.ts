import { useCallback, useMemo, useRef } from "react";
import { ObjectPlaceholder, useGlobalListenerGroup } from "selective-context";

import { normalizeForceRange } from "./useNormalizeForceRange";
import { useGraphName } from "./useGraphName";
import { ForceAttributesInitial, GraphSelectiveContextKeys } from "../literals";
import { ForceAttributeKey } from "../types/forceAttributes";
import { useGraphListener } from "./useGraphSelectiveContext";
import { ForceNormalizationCoefficients } from "../types/forceGraphPageProps";

const defaultValueForForceSliders = 100;

export const initialValue = defaultValueForForceSliders;

function getGraphNamespacedAttributeKey(
  graphName: string,
  key: ForceAttributeKey,
) {
  return `${graphName}:${key}`;
}

export function useForceAttributeListenerGroup() {
  const listenerKey = useRef<string>(crypto.randomUUID());
  const graphName = useGraphName();

  const contextKeys: string[] = useMemo(() => {
    return Object.keys(ForceAttributesInitial)
      .filter((key) => key !== "id")
      .map((key) =>
        getGraphNamespacedAttributeKey(graphName, key as ForceAttributeKey),
      );
  }, [graphName]);

  const { currentState: valueMap } = useGlobalListenerGroup<number>({
    contextKeys,
    listenerKey: listenerKey.current,
    initialValue: initialMap,
  });

  const { currentState: normalizationCoefficients } = useGraphListener(
    GraphSelectiveContextKeys.forceNormalization,
    listenerKey.current,
    ObjectPlaceholder as ForceNormalizationCoefficients,
  );

  // const valueMapRef = useRef(valueMap);
  // valueMapRef.current = valueMap;
  const prevValueMapRef = useRef(new Map(valueMap));

  const getRawValue = useCallback(
    (key: ForceAttributeKey) => {
      const attributeKey = getGraphNamespacedAttributeKey(graphName, key);
      return valueMap.get(attributeKey) ?? 0;
    },
    [valueMap],
  );

  const getValue = useCallback(
    (key: ForceAttributeKey) => {
      const rawValue = getRawValue(key);
      return normalizeForceRange(rawValue, key, normalizationCoefficients[key]);
    },
    [valueMap, graphName, normalizationCoefficients],
  );

  const getPrevRawValue = useCallback(
    (key: ForceAttributeKey) => {
      const attributeKey = getGraphNamespacedAttributeKey(graphName, key);
      return prevValueMapRef.current.get(attributeKey) ?? 0;
      // const rawValue =
      // return normalizeForceRange(rawValue, key);
    },
    [graphName],
  );

  const valueChanged = useCallback(
    (key: ForceAttributeKey) => {
      return getRawValue(key) !== getPrevRawValue(key);
    },
    [getValue, getPrevRawValue],
  );

  const updatePrev = useCallback(
    (key: ForceAttributeKey) => {
      const latestRawValue = getRawValue(key);
      const attributeKey = getGraphNamespacedAttributeKey(graphName, key);
      prevValueMapRef.current.set(attributeKey, latestRawValue);
    },
    [getValue, graphName],
  );

  return {
    getValue,
    getPrevValue: getPrevRawValue,
    valueChanged,
    updatePrev,
  };
}

const initialMap = new Map<string, number>();
