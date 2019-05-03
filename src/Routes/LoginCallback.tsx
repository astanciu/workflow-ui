import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { loginCallback } from 'redux-assets/actions';
import { Link } from 'react-router-dom';

export const LoginCallback = (props) => {
  const dispatch = useDispatch();

  const callback = useCallback(() => dispatch(loginCallback()), [dispatch]);

  // callback();
  useEffect(() => {
    console.log(`heyooo`);
    // dispatch(loginBeginCallback());
    callback();
  });

  return (
    <div>
      Processing login... <br />
      <Link to="/login">Login</Link>
    </div>
  );
};
