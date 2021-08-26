import { useState, useEffect, MutableRefObject } from 'react';

type FocusableElements = MutableRefObject<HTMLElement | null>[];
type FocusedIndex = undefined | number;

const useTrapKeyboardFocus = (focusableElements: FocusableElements, trapFocus: boolean) => {
  const [focusedIndex, setFocusedIndex] = useState(undefined as FocusedIndex);

  useEffect(() => {
    const elementToFocus = focusedIndex !== undefined ? focusableElements[focusedIndex]?.current : undefined;

    elementToFocus ? elementToFocus.focus() : setFocusedIndex(undefined);
  }, [focusableElements, focusedIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isTabPressed = e.key === 'Tab';
      const isShiftPressed = e.shiftKey;

      if (!isTabPressed) return;
      e.preventDefault();

      isShiftPressed ? focusOnPrevious() : focusOnNext();
    };

    const focusOnNext = () => {
      const range = focusableElements.length;
      if (!range) return setFocusedIndex(undefined);
      if (focusedIndex === undefined) return setFocusedIndex(0);
      if (focusedIndex >= range - 1) return setFocusedIndex(0);
      setFocusedIndex((prevValue) => prevValue! + 1);
    };

    const focusOnPrevious = () => {
      if (focusableElements.length === 0) return setFocusedIndex(undefined);
      if (focusedIndex === undefined) return setFocusedIndex(focusableElements.length - 1);
      if (focusedIndex === 0) return setFocusedIndex(focusableElements.length - 1);
      setFocusedIndex((prevValue) => prevValue! - 1);
    };

    if (trapFocus === true) document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusableElements, trapFocus, focusedIndex]);
};

export default useTrapKeyboardFocus;
