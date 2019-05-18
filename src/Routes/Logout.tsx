import { Typography } from 'antd';
import { Spinner } from 'Components';
import { BareLayout } from 'Components/RootLayout/Bare';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from 'ReduxState/actions';

export const Logout = ({ location }) => {
  const dispatch = useDispatch();

  let isDone = false;
  if (location.search) {
    const search = new URLSearchParams(location.search);
    const done = search.get('done') || false;
    isDone = done === 'true';
  }

  if (!isDone) {
    dispatch(logout());

    return <Spinner />;
  }

  return (
    <BareLayout center>
      <Typography.Title>Logged Out</Typography.Title>
      <Link to="/login">Log back in</Link>
    </BareLayout>
  );
};
