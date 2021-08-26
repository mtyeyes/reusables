import { useEffect } from 'react';

const useDisableScroll = (disableScroll: boolean) => {
  const preventDefaultHandler = (e: WheelEvent | TouchEvent) => {
    e.preventDefault();
  };

  const preventDefaultForKeys = (e: KeyboardEvent) => {
    const keys = ['Tab', 'ArrowUp', 'ArrowDown', ' ', 'Space', 'PageDown', 'PageUp', 'Home', 'End'];

    if (keys.includes(e.key)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (window && disableScroll) {
      window.addEventListener('wheel', preventDefaultHandler, { passive: false });
      window.addEventListener('touchmove', preventDefaultHandler, { passive: false });
      window.addEventListener('keydown', preventDefaultForKeys, false);
    }
    return () => {
      window.removeEventListener('wheel', preventDefaultHandler);
      window.removeEventListener('touchmove', preventDefaultHandler);
      window.removeEventListener('keydown', preventDefaultForKeys, false);
    };
  }, [disableScroll]);
};

export default useDisableScroll;
