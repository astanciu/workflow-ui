import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from 'ReduxState/actions';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import { BareLayout } from 'Components/Layout/Bare';
import { Spinner } from 'Components';
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
