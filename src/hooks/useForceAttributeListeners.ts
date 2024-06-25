import { useCallback, useMemo, useRef } from "react";
import { useGlobalListener, useGlobalListenerGroup } from "selective-context";

import {
  normalizeForceRange,
  useNormalizeForceRange,
} from "./useNormalizeForceRange";
import { useGraphName } from "./useGraphName";
import { ForceAttributesInitial } from "../literals";
import { ForceAttributeKey } from "../types/forceAttributes";

const defaultValueForForceSliders = 100;

const initialValue = defaultValueForForceSliders;

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

  const valueMapRef = useRef(valueMap);
  valueMapRef.current = valueMap;
  const prevValueMapRef = useRef(new Map(valueMap));

  const getValue = useCallback(
    (key: ForceAttributeKey) => {
      const attributeKey = getGraphNamespacedAttributeKey(graphName, key);
      const rawValue = valueMapRef.current.get(attributeKey) ?? 0;
      return normalizeForceRange(rawValue, key);
    },
    [valueMapRef],
  );

  const getPrevValue = useCallback(
    (key: ForceAttributeKey) => {
      const attributeKey = getGraphNamespacedAttributeKey(graphName, key);
      const rawValue = prevValueMapRef.current.get(attributeKey) ?? 0;
      return normalizeForceRange(rawValue, key);
    },
    [valueMapRef],
  );

  const valueChanged = useCallback((key: ForceAttributeKey) => {
    return getValue(key) !== getPrevValue(key);
  }, []);

  const updatePrev = useCallback((key: ForceAttributeKey) => {
    const latestValue = getValue(key);
    const attributeKey = getGraphNamespacedAttributeKey(graphName, key);
    prevValueMapRef.current.set(attributeKey, latestValue);
  }, []);

  return {
    getValue,
    getPrevValue,
    valueChanged,
    updatePrev,
  };
}

const initialMap = new Map<string, number>();

export function useForceAttributeListeners(listenerKey: string) {
  const uniqueGraphName = useGraphName();
  const { currentState: manyBodyStrength } = useGlobalListener<number>({
    contextKey: `${uniqueGraphName}:manyBodyStrength`,
    listenerKey,
    initialValue,
  });
  const { currentState: forceXStrength } = useGlobalListener<number>({
    contextKey: `${uniqueGraphName}:forceXStrength`,
    listenerKey,
    initialValue,
  });
  const { currentState: forceYStrength } = useGlobalListener<number>({
    contextKey: `${uniqueGraphName}:forceYStrength`,
    listenerKey,
    initialValue,
  });
  const { currentState: forceRadialYRelative } = useGlobalListener<number>({
    contextKey: `${uniqueGraphName}:forceRadialYRelative`,
    listenerKey,
    initialValue,
  });
  const { currentState: forceRadialStrength } = useGlobalListener<number>({
    contextKey: `${uniqueGraphName}:forceRadialStrength`,
    listenerKey,
    initialValue,
  });
  const { currentState: linkStrength } = useGlobalListener<number>({
    contextKey: `${uniqueGraphName}:linkStrength`,
    listenerKey,
    initialValue,
  });
  const { currentState: forceRadialXRelative } = useGlobalListener<number>({
    contextKey: `${uniqueGraphName}:forceRadialXRelative`,
    listenerKey,
    initialValue,
  });
  const { currentState: manyBodyMinDistance } = useGlobalListener<number>({
    contextKey: `${uniqueGraphName}:manyBodyMinDistance`,
    listenerKey,
    initialValue,
  });
  const { currentState: manyBodyMaxDistance } = useGlobalListener<number>({
    contextKey: `${uniqueGraphName}:manyBodyMaxDistance`,
    listenerKey,
    initialValue,
  });
  const { currentState: linkDistance } = useGlobalListener<number>({
    contextKey: `${uniqueGraphName}:linkDistance`,
    listenerKey,
    initialValue,
  });
  const { currentState: collideStrength } = useGlobalListener<number>({
    contextKey: `${uniqueGraphName}:collideStrength`,
    listenerKey,
    initialValue,
  });
  const { currentState: centerStrength } = useGlobalListener<number>({
    contextKey: `${uniqueGraphName}:centerStrength`,
    listenerKey,
    initialValue,
  });
  const { currentState: manyBodyTheta } = useGlobalListener<number>({
    contextKey: `${uniqueGraphName}:manyBodyTheta`,
    listenerKey,
    initialValue,
  });

  const manyBodyStrengthNormalized = useNormalizeForceRange(
    manyBodyStrength,
    "manyBodyStrength",
  );
  const forceXStrengthNormalized = useNormalizeForceRange(forceXStrength);
  const forceYStrengthNormalized = useNormalizeForceRange(forceYStrength);
  const forceRadialYRelativeNormalized =
    useNormalizeForceRange(forceRadialYRelative);
  const forceRadialStrengthNormalized =
    useNormalizeForceRange(forceRadialStrength);
  const linkStrengthNormalized = useNormalizeForceRange(linkStrength);
  const linkDistanceNormalized = useNormalizeForceRange(
    linkDistance,
    "linkDistance",
  );
  const forceRadialXRelativeNormalized =
    useNormalizeForceRange(forceRadialXRelative);
  const manyBodyMinDistanceNormalized = useNormalizeForceRange(
    manyBodyMinDistance,
    "manyBodyMinDistance",
  );
  const manyBodyMaxDistanceNormalized = useNormalizeForceRange(
    manyBodyMaxDistance,
    "manyBodyMaxDistance",
  );
  const collideStrengthNormalized = useNormalizeForceRange(collideStrength);
  const centerStrengthNormalized = useNormalizeForceRange(centerStrength);
  const manyBodyThetaNormalized = useNormalizeForceRange(manyBodyTheta);
  const manyBodyStrengthRef = useRef(manyBodyStrengthNormalized);
  const forceXStrengthRef = useRef(forceXStrengthNormalized);
  const forceYStrengthRef = useRef(forceYStrengthNormalized);
  const forceRadialYRelativeRef = useRef(forceRadialYRelativeNormalized);
  const forceRadialStrengthRef = useRef(forceRadialStrengthNormalized);
  const linkStrengthRef = useRef(linkStrengthNormalized);
  const forceRadialXRelativeRef = useRef(forceRadialXRelativeNormalized);
  const manyBodyMinDistanceRef = useRef(manyBodyMinDistanceNormalized);
  const manyBodyMaxDistanceRef = useRef(manyBodyMaxDistanceNormalized);
  const linkDistanceRef = useRef(linkDistanceNormalized);
  const collideStrengthRef = useRef(collideStrengthNormalized);
  const centerStrengthRef = useRef(centerStrengthNormalized);
  const manyBodyThetaRef = useRef(manyBodyThetaNormalized);
  return useMemo(
    () => ({
      manyBodyStrengthNormalized,
      forceXStrengthNormalized,
      forceYStrengthNormalized,
      forceRadialYRelativeNormalized,
      forceRadialStrengthNormalized,
      linkStrengthNormalized,
      forceRadialXRelativeNormalized,
      manyBodyMinDistanceNormalized,
      manyBodyMaxDistanceNormalized,
      linkDistanceNormalized,
      collideStrengthNormalized,
      centerStrengthNormalized,
      manyBodyThetaNormalized,
      manyBodyStrengthRef,
      forceXStrengthRef,
      forceYStrengthRef,
      forceRadialYRelativeRef,
      forceRadialStrengthRef,
      linkStrengthRef,
      forceRadialXRelativeRef,
      manyBodyMinDistanceRef,
      manyBodyMaxDistanceRef,
      linkDistanceRef,
      collideStrengthRef,
      centerStrengthRef,
      manyBodyThetaRef,
    }),
    [
      manyBodyStrengthNormalized,
      forceXStrengthNormalized,
      forceYStrengthNormalized,
      forceRadialYRelativeNormalized,
      forceRadialStrengthNormalized,
      linkStrengthNormalized,
      forceRadialXRelativeNormalized,
      manyBodyMinDistanceNormalized,
      manyBodyMaxDistanceNormalized,
      linkDistanceNormalized,
      collideStrengthNormalized,
      centerStrengthNormalized,
      manyBodyThetaNormalized,
    ],
  );
}
