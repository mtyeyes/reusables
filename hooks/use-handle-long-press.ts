import { useEffect, useState, useRef, KeyboardEventHandler, MouseEventHandler } from 'react';

const useHandleLongPress = (handlerFunction: () => void, interval: number, validKeys: string[]) => {
  const [isLongPress, setIsLongPress] = useState(false);
  const handlerLink = useRef(handlerFunction);
  const timer = useRef<number>();

  useEffect(() => {
    handlerLink.current = handlerFunction;
  }, [handlerFunction]);

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, []);

  const step = () => {
    timer.current = setTimeout(() => {
      setIsLongPress(true);
      handlerLink.current();
      step();
    }, interval) as unknown as number;
  };

  const clearTimer = () => {
    clearTimeout(timer.current);
    clearEventListeners();
  };

  const clearEventListeners = () => {
    document.removeEventListener('mouseup', clearTimer);
    document.removeEventListener('keyup', clearTimer);
  };

  const handleClick = () => {
    isLongPress ? setIsLongPress(false) : handlerLink.current();
  };

  const handleMouseDown: MouseEventHandler<HTMLElement> = () => {
    step();
    document.addEventListener('mouseup', clearTimer);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLElement> = (e) => {
    if (validKeys.includes(e.key) && !e.repeat) step();
    document.addEventListener('keyup', clearTimer);
  };

  return { onClick: handleClick, onMouseDown: handleMouseDown, onKeyDown: handleKeyDown };
};

export default useHandleLongPress;
