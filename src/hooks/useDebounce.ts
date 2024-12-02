import { useEffect, useRef, useCallback } from 'react';

export default function useDebounce<T extends (...args: any[]) => any>(callback: T, delay: number) {
  // we use a ref for the timeout because it would restart on re-render otherwise
  const timeoutRef = useRef<number>();

  // clears timer on mount/unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // useCallback memoizes the function so it doesn't change on every render
  return useCallback(
    (...args: Parameters<T>) => {
      // if there's already a timeout pending, clear it
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay], // recreate the function if the callback or delay changes
  );
}
