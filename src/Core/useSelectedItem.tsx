import { useEffect, useState } from 'react';

export const useSelectedItem = (domEl, defaultSelected = '') => {
  const [selectedItem, select] = useState(defaultSelected);

  useEffect(() => {
    const handleClick = (e) => {
      let node = domEl.current;

      if (node && domEl && domEl.current && domEl.current.contains(e.target)) {
        select('');
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [domEl]);

  return [selectedItem, select];
};
