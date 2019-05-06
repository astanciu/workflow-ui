import { useState, useEffect } from 'react';

export const useSelectedItem = (domEl) => {
  const [selectedItem, select] = useState('');
  const handleClick = (e) => {
    let node = domEl.current;
    if (node) {
      if (domEl && domEl.current && domEl.current.contains(e.target)) {
        return;
      }
      select('');
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [handleClick]);

  return [selectedItem, select];
};
