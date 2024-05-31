import { Dispatch, SetStateAction, useEffect } from "react";

export function useEffectSyncToMemo<T>(
  dispatch: Dispatch<SetStateAction<T>>,
  memoizedValue: T,
) {
  useEffect(() => {
    dispatch((memo) => {
      if (memo !== memoizedValue) return memoizedValue;
      else return memo;
    });
  }, [memoizedValue, dispatch]);
}
