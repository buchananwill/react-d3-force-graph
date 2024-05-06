'use client';

import React, {useContext, useEffect, useMemo} from 'react';

import {GraphContext} from '../graph/graphContextCreator';
import {forceAttributesInitial} from '../forceAttributesMetaData';

import {ShowForceAdjustmentsKey} from '../graph/ShowForceAdjustments';
import {useGraphController, useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {ForceGraphAttributesDto} from "@/graph-tools/hooks/ForceGraphAttributesDto";
import {useGlobalController} from "selective-context";
import GraphForceController from "@/graph-tools/components/GraphForceController";


const listenerKey = 'graph-force-adjustment';
export default function GraphForceAdjustment() {
  const { uniqueGraphName } = useContext(GraphContext);
  const readyToGraph = `${uniqueGraphName}-ready`;
  const { currentState, dispatch } = useGraphController(
    'ready',
    listenerKey,
    false
  );

  const { currentState: show } = useGraphListener(
    ShowForceAdjustmentsKey,
    listenerKey,
    false
  );

  useEffect(() => {
    if (!currentState) {
      dispatch( true);
    }
  }, [dispatch, currentState, readyToGraph]);

  const sliders = useMemo(() => Object.entries(forceAttributesInitial).map((entry) => {
    if (entry[0] === 'id') {
      return null;
    }
    const stringKey = `${uniqueGraphName}-${entry[0]}`;
    const entryKey = entry[0] as keyof ForceGraphAttributesDto;
    const initial = forceAttributesInitial[entryKey];
    // const min = forceAttributesMin[entryKey];
    // const max = forceAttributesMax[entryKey];

    return <GraphForceController key={stringKey} contextKey={stringKey} listenerKey={stringKey} initialValue={initial}/>

  }), [uniqueGraphName])

  return (
    <div className={'h-0'}>


          <ul className={' p-2 '}>{...sliders}</ul>

    </div>
  );
}
