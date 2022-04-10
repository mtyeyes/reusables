import { useCallback, useRef } from "react";

export const useDebounce = <T extends (...args: any[]) => any>(
  functionToCall: T,
  interval: number
) => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const throttledFunction = useCallback(
    (...args: Parameters<T>) => {
      if (timerRef.current !== undefined) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        functionToCall(...args);
      }, interval);
    },
    [functionToCall, interval]
  );

  return throttledFunction;
};