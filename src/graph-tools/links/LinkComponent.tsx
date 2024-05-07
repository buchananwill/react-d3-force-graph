'use client';

import React from 'react';
import {useNodeSelectedListener} from '../nodes/NodeInteractionContext';

import * as d3 from 'd3';

import {useGraphRefs} from '../nodes/genericNodeContextCreator';

import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";
import {useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {useSineLutContext} from "@/graph-tools/animation-sync-context/animationSyncContextCreator";
import {calculateRotationAngle} from "@/graph-tools/links/calculateRotationAngle";
import {NodePositionsKey} from "@/graph-tools/constants";

const Emerald = 'hsla(160, 84%, 39%, 1)'

interface Coordinate {
  x: number;
  y: number;
}

export function LinkComponent<T extends HasNumberId>({
  linkIndex,
  linkData
}: {
  linkData: DataLink<T>;
  linkIndex: number;
}) {

  const { linkListRef } = useGraphRefs();

  const listenerKey = `link-${linkData.closureType}-${linkData.id}`;

  useGraphListener(NodePositionsKey, listenerKey, 0);


  const genericLinks = linkListRef?.current;

  const { currentState: showArrowsToParents } = useGraphListener(
    'arrows-to-parents',
    listenerKey,
    true
  );
  const { currentState: showArrowsToChildren } = useGraphListener(
    'arrows-to-children',
    listenerKey,
    true
  );
  const { currentState: showEdgesFromChildren } = useGraphListener(
    'highlight-from-source',
    listenerKey,
    true
  );
  const { currentState: showEdgesFromParents } = useGraphListener(
    "highlight-from-target",
    listenerKey,
    true
  );

  const updatedLinkOptional =
    genericLinks === undefined || genericLinks.length < linkIndex
      ? undefined
      : genericLinks[linkIndex];
  let updatedLink: DataLink<T> | undefined;

  const sourceSelected = useNodeSelectedListener(updatedLinkOptional?.source);
  const targetSelected = useNodeSelectedListener(updatedLinkOptional?.target);

  const sineLutSync = Math.abs(useSineLutContext(Date.now() / 10));

  if (updatedLinkOptional !== undefined) {
    updatedLink = updatedLinkOptional as DataLink<T>;
  }

  if (
    updatedLink === undefined ||
    updatedLink.source === undefined ||
    !updatedLink.target === undefined
  ) {
    return null;
  }
  const source = updatedLink.source as DataNode<T>;
  const target = updatedLink.target as DataNode<T>;

  const { x: x1, y: y1 } = source;
  const { x: x2, y: y2 } = target;

  if (!(x1 && y1 && x2 && y2)) {
    return null;
  }

  const lineGenerator = d3
    .line(
      (d: Coordinate) => d.x,
      (d: Coordinate) => d.y
    )
    .curve(d3.curveBasis);
  const locationInterpolation = d3.interpolateObject(
    { x: x1, y: y1 },
    { x: x2, y: y2 }
  );

  const firstQuart = { ...locationInterpolation(0.25) };
  const midPoint = { ...locationInterpolation(0.5) };
  const lastQuart = { ...locationInterpolation(0.75) };

  const data: Coordinate[] = [
    { x: x1, y: y1 },
    { x: firstQuart.x, y: y1 },
    { x: midPoint.x, y: midPoint.y },
    { x: lastQuart.x, y: y2 },
    { x: x2, y: y2 }
  ];

  const curvePathData = lineGenerator(data);

  const interpolateArrowPositionX = d3.interpolateBasis(data.map((d) => d.x));
  const interpolateArrowPositionY = d3.interpolateBasis(data.map((d) => d.y));

  const arrowToParentLocation = {
    x: interpolateArrowPositionX(0.67 + 0.15 * sineLutSync),
    y: interpolateArrowPositionY(0.67 + 0.15 * sineLutSync)
  };
  const arrowToChildLocation = {
    x: interpolateArrowPositionX(0.33 - 0.15 * sineLutSync),
    y: interpolateArrowPositionY(0.33 - 0.15 * sineLutSync)
  };

  const parentRotationAngle = calculateRotationAngle(
    x1,
    y1,
    arrowToParentLocation.x,
    arrowToParentLocation.y
  );
  const childRotationAngle = (parentRotationAngle + 180) % 360;

  const glow =
    (showEdgesFromChildren && sourceSelected) ||
    (showEdgesFromParents && targetSelected);

  const emeraldGlow = d3.color(Emerald)!.copy({ opacity: 0.2 });

  return (
    <g>
      {/*<line*/}
      {/*  x1={source.x}*/}
      {/*  y1={source.y}*/}
      {/*  x2={target.x}*/}
      {/*  y2={target.y}*/}
      {/*  className={'stroke-gray-600 stroke-1 opacity-25'}*/}
      {/*  onClick={() => console.log(updatedLink)}*/}
      {/*>*/}
      {/*  {children}*/}
      {/*</line>*/}
      {curvePathData && (
        <path
          d={curvePathData}
          className={'stroke-gray-600 stroke-1 opacity-25 fill-transparent'}
        ></path>
      )}
      {glow && curvePathData && (
        <>
          <path
            d={curvePathData}
            stroke={emeraldGlow.formatHsl()}
            strokeWidth={4}
            strokeLinecap={'round'}
            className={'fill-transparent'}
          ></path>
          {showArrowsToParents && (
            <path
              style={{
                translate: `${arrowToParentLocation.x}px ${arrowToParentLocation.y}px`,
                rotate: `${parentRotationAngle}deg`
              }}
              fill={'none'}
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke={Emerald}
              d="m-7.5 7.5 7.5-7.5 7.5 7.5"
            />
          )}
          {showArrowsToChildren && (
            <path
              style={{
                translate: `${arrowToChildLocation.x}px ${arrowToChildLocation.y}px`,
                rotate: `${childRotationAngle}deg`
              }}
              fill={'none'}
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke={Emerald}
              d="m-7.5 7.5 7.5-7.5 7.5 7.5"
            />
          )}
        </>
      )}
    </g>
  );
}

