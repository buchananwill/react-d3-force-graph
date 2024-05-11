'use client';

import React, {useEffect, useMemo} from 'react';

import {useGraphName} from '../graph/graphContextCreator';
import {ForceAttributesDto, ForceAttributesInitial} from '../forceAttributesMetaData';

import {ShowForceAdjustmentsKey} from '../graph/ShowForceAdjustments';
import {GraphSelectiveKeys, useGraphController, useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import ControllerComponent from "@/graph-tools/components/ControllerComponent";
import {PartialDeep} from "type-fest";
import {ForceGraphPageOptionProps} from "@/graph-tools/ForceGraphPage";


const listenerKey = 'graph-force-adjustment';
export default function GraphForceAttributes({forceAttributesInitial}:PartialDeep<Pick<ForceGraphPageOptionProps, 'forceAttributesInitial'>>) {
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

  const controllers = useMemo(() => Object.entries(ForceAttributesInitial).map((entry) => {
    if (entry[0] === 'id') {
      return null;
    }

    const stringKey = `${uniqueGraphName}:${entry[0]}`;
    const entryKey = entry[0] as keyof ForceAttributesDto;
    const initial = forceAttributesInitial?.[entryKey] ?? ForceAttributesInitial[entryKey]

    return <ControllerComponent key={stringKey} contextKey={stringKey} listenerKey={stringKey} initialValue={initial}/>

  }), [uniqueGraphName, forceAttributesInitial])


  return (
    <>
      {...controllers}
    </>
  );
}
