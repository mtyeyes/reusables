import { useCallback, useEffect, useState } from "react";

export const useThrottleAndDebounce = <T extends (...args: any) => any>(
  functionToCall: T,
  interval: number
) => {
  const [isThrottled, setIsThrottled] = useState(false);
  const [functionArguments, setFunctionArguments] = useState<
    Parameters<T> | undefined
  >(undefined);

  const functionCall = useCallback(
    args => {
      if (isThrottled) {
        setFunctionArguments(args);
      } else {
        setIsThrottled(true);
        setTimeout(() => {
          setIsThrottled(false);
        }, interval);
        functionToCall();
      }
    },
    [functionToCall, interval, isThrottled]
  );

  useEffect(() => {
    if (isThrottled === false && functionArguments !== undefined) {
      functionToCall(functionArguments);
      setFunctionArguments(undefined);
      setIsThrottled(true);
    }
  }, [isThrottled, functionToCall]);

  return functionCall;
};