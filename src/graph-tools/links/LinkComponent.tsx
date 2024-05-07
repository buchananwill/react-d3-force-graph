'use client';

import React, {useContext} from 'react';
import {useNodeSelectedListener} from '../nodes/NodeInteractionContext';

import {useGraphRefs} from '../nodes/genericNodeContextCreator';

import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";
import {useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {NodePositionsKey} from "@/graph-tools/constants";
import {LinkComponentContext} from "@/graph-tools/links/linkComponentContextCreator";

export interface Coordinate {
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

  const {component: Component} = useContext(LinkComponentContext);

  const updatedLinkOptional =
    genericLinks === undefined || genericLinks.length < linkIndex
      ? undefined
      : genericLinks[linkIndex];
  let updatedLink: DataLink<T> | undefined;

  const sourceSelected = useNodeSelectedListener(updatedLinkOptional?.source);
  const targetSelected = useNodeSelectedListener(updatedLinkOptional?.target);

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

  return (
    <Component linkData={linkData} linkIndex={linkIndex} sourceNodeLocation={{x: x1, y: y1}} targetNodeLocation={{x: x2, y: y2}} showEdgesFromChildren={showEdgesFromChildren} sourceSelected={sourceSelected} showEdgesFromParents={showEdgesFromParents} targetSelected={targetSelected} showArrowsToParents={showArrowsToParents} showArrowsToChildren={showArrowsToChildren}/>
  );
}

