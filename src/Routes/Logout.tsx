import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from 'ReduxState/actions';
import { Link } from 'react-router-dom';

export const Logout = (props) => {
  const dispatch = useDispatch();
  dispatch(logout());

  return (
    <div>
      Logged Out. <br />
      <Link to="/login">Log back in</Link>
    </div>
  );
};
