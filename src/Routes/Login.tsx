import React from 'react';
import { useDispatch } from 'react-redux';
import { loginStart } from 'ReduxState/actions';
import { Spinner } from 'Components';

export const Login = (props) => {
  const dispatch = useDispatch();
  dispatch(loginStart());

  return <Spinner />;
};
