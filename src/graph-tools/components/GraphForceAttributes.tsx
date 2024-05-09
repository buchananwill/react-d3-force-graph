'use client';

import React, {useContext, useEffect, useMemo} from 'react';

import {GraphContext, useGraphName} from '../graph/graphContextCreator';
import {forceAttributesInitial} from '../forceAttributesMetaData';

import {ShowForceAdjustmentsKey} from '../graph/ShowForceAdjustments';
import {GraphSelectiveKeys, useGraphController, useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {ForceGraphAttributesDto} from "@/graph-tools/hooks/ForceGraphAttributesDto";
import {useGlobalController} from "selective-context";
import ControllerComponent from "@/graph-tools/components/ControllerComponent";
import {SelectiveContextRangeSlider} from "@/app/demo/components/SelectiveContextRangeSlider";


const listenerKey = 'graph-force-adjustment';
export default function GraphForceAttributes() {
  const uniqueGraphName = useGraphName();
  const { currentState, dispatch } = useGraphController(
    GraphSelectiveKeys.ready,
    listenerKey,
    false
  );

  useGraphListener(
    ShowForceAdjustmentsKey,
    listenerKey,
    false
  );

  useEffect(() => {
    if (!currentState) {
      dispatch( true);
    }
  }, [dispatch, currentState]);

  const controllers = useMemo(() => Object.entries(forceAttributesInitial).map((entry) => {
    if (entry[0] === 'id') {
      return null;
    }
    const stringKey = `${uniqueGraphName}:${entry[0]}`;
    const entryKey = entry[0] as keyof ForceGraphAttributesDto;
    const initial = forceAttributesInitial[entryKey];


    return <ControllerComponent key={stringKey} contextKey={stringKey} listenerKey={stringKey} initialValue={initial}/>

  }), [uniqueGraphName])


  return (
    <>
      {...controllers}
    </>
  );
}
