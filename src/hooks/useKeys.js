import { useEffect } from 'react';
export const useKeys = (key, action) => {
  useEffect(() => {
    const callback = ({ code }) => {
      if (code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    };
    window.addEventListener('keydown', callback);
    return () => window.removeEventListener('keydown', callback);
  }, [action, key]);
};
