import React from 'react';
import { useDispatch } from 'react-redux';
import { loginStart } from 'ReduxState/actions';

export const Login = (props) => {
  const dispatch = useDispatch();
  dispatch(loginStart());

  return <div />;
};
