import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from 'ReduxState/actions';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import { BareLayout } from 'Components/Layout/Bare';
export const Logout = (props) => {
  const dispatch = useDispatch();
  dispatch(logout());

  return (
    <BareLayout center>
      <Typography.Title>Logged Out</Typography.Title>
      <Link to="/login">Log back in</Link>
    </BareLayout>
  );
};
