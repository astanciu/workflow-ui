import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { loginStart } from 'redux-assets/actions';

export const Login = props => {
  const dispatch = useDispatch();

  const startLogin = useCallback(() => dispatch(loginStart()), [dispatch]);

  useEffect(() => {
    startLogin();
  });

  return <div>Login</div>;
};
