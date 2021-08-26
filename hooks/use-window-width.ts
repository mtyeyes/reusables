import { useState, useEffect } from 'react';

const getWindowWidth = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth;
  }
  return undefined;
};

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(getWindowWidth());
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return windowWidth;
};

export default useWindowWidth;
