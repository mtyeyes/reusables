import { useLayoutEffect } from 'react';

const setBodyOverflowStyle = (overflowStyle: string) => {
  document.body.style.overflow = overflowStyle;
};

const useDisableScroll = (disableScroll: boolean) => {
  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (disableScroll) {
      setBodyOverflowStyle('hidden');
    }

    return () => {
      setBodyOverflowStyle(originalStyle);
    };
  }, [disableScroll]);
};

export default useDisableScroll;
