'use client';
import React, {useCallback} from 'react';
import {useGlobalController} from "selective-context";
import {Slider} from "@nextui-org/slider";

// Todo: make this a dispatch, not a controller.
export function SelectiveContextRangeSlider({
  contextKey,
  initialValue,
  listenerKey,
  maxValue = 200,
  minValue = 0,
  className = ''
}: {
  contextKey: string;
  initialValue: number;
  listenerKey: string;
  maxValue?: number;
  minValue?: number;
  className?: string;
}) {
  const { currentState, dispatch: dispatchUpdate } = useGlobalController({
    contextKey,
    listenerKey,
    initialValue
  });

  const onSliderChange = useCallback((value: number | number[]) => {
    const singleValue = Array.isArray(value) ? value[0] : value;
    dispatchUpdate(
        singleValue
    );
  }, [dispatchUpdate]);

  return (
      <Slider
      className={className}
      label={contextKey.substring(contextKey.indexOf(':')+1)}
      hideValue={false}
      showTooltip={true}
      hideThumb
      size={'md'}
      name={contextKey}
      id={contextKey}
      minValue={minValue}
      maxValue={maxValue}
      value={currentState}
      aria-label={contextKey}
      onChange={onSliderChange}
    ></Slider>
  );
}
