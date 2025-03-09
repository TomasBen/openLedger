import { useEffect } from 'react';

export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  dependencies: any[] = [],
) {
  useEffect(() => {
    const handleKeydown = (event: globalThis.KeyboardEvent) => {
      if (event.key === key && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        callback();
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [key, callback, ...dependencies]);
}
