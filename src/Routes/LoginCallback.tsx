import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { loginCallback } from 'ReduxState/actions';
import { Spinner } from 'Components';

export const LoginCallback = (props) => {
  const dispatch = useDispatch();
  const callback = useCallback(() => dispatch(loginCallback()), [dispatch]);

  useEffect(() => {
    callback();
  });

  return (
    <div>
      <Spinner />
    </div>
  );
};
