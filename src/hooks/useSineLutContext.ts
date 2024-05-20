import { useContext } from "react";
import { AnimationSyncContext } from "../contexts/animationSyncContextCreator";


export function useSineLutContext(input: number) {
  const { sineLut } = useContext(AnimationSyncContext);
  return sineLut[Math.floor(input) % 360];
}