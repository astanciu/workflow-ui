import { useState, useEffect } from 'react';

export const useSelectedItem = (domEl, defaultSelected = '') => {
  const [selectedItem, select] = useState(defaultSelected);
  useEffect(() => {
    const handleClick = (e) => {
      let node = domEl.current;
      if (node) {
        if (domEl && domEl.current && domEl.current.contains(e.target)) {
          return;
        }
        // select('');
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [domEl]);

  return [selectedItem, select];
};
