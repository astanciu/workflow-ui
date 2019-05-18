import get from 'lodash-es/get';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedAdapter } from 'ReduxState/actions';

export const useSelectedItem = (domEl, defaultSelected = '', storeLocation = '') => {
  const dispatch = useDispatch();
  const [selectedItem, select] = useState(defaultSelected);
  const selectedFromStore = useSelector((state) => get(state, storeLocation), [storeLocation]);

  if (selectedFromStore) {
    if (selectedItem !== selectedFromStore) {
      select(selectedFromStore);
      dispatch(clearSelectedAdapter());
    }
  }

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
  }, [domEl]); // eslint-disable-line react-hooks/exhaustive-deps

  return [selectedItem, select];
};
