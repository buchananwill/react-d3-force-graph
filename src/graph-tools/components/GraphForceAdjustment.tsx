'use client';

import React, {useContext, useEffect} from 'react';

import {GraphContext} from '../graph/graphContextCreator';
import {forceAttributesInitial} from '../forceAttributesMetaData';

import {ShowForceAdjustmentsKey} from '../graph/ShowForceAdjustments';
import {useGraphController, useGraphListener} from "@/graph-tools/graph/useGraphSelectiveContext";
import {ForceGraphAttributesDto} from "@/graph-tools/hooks/ForceGraphAttributesDto";
import {useGlobalController} from "selective-context";


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

  const sliders = Object.entries(forceAttributesInitial).map((entry) => {
    if (entry[0] === 'id') {
      return null;
    }
    const stringKey = `${uniqueGraphName}-${entry[0]}`;
    const entryKey = entry[0] as keyof ForceGraphAttributesDto;
    const initial = forceAttributesInitial[entryKey];
    // const min = forceAttributesMin[entryKey];
    // const max = forceAttributesMax[entryKey];

    useGlobalController({contextKey: stringKey, listenerKey: stringKey, initialValue: initial})

    return null;
      // <li key={stringKey}>
      //   <div className={'flex items-center w-full justify-between'}>
      //     <label htmlFor={stringKey}>{entry[0]}</label>
      //     <SelectiveContextRangeSlider
      //       className={'max-w-[50%]'}
      //       contextKey={stringKey}
      //       listenerKey={stringKey}
      //       minValue={min}
      //       maxValue={max}
      //       initialValue={initial}
      //     />
      //   </div>
      // </li>

  });

  return (
    <div className={`${show ? '' : 'hidden'}`}>
      {/*<DisclosureThatGrowsOpen*/}
      {/*  label={'Adjust Forces'}*/}
      {/*  heightWhenOpen={'h-60'}*/}
      {/*  showBorder={true}*/}
      {/*>*/}
        <div className={'h-60 overflow-auto border-slate-300 '}>
          <ul className={' p-2 '}>{...sliders}</ul>
        </div>
      {/*</DisclosureThatGrowsOpen>*/}
    </div>
  );
}
