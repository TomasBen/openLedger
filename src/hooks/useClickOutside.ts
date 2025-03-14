import { RefObject, useEffect } from 'react';

export function useClickOutside(
  ref: RefObject<HTMLDivElement>,
  callback: () => void,
  dependencies: any[] = [],
) {
  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (ref.current === event.target) {
        event.preventDefault();
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, callback, ...dependencies]);
}
