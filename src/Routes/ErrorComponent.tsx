import { Typography } from 'antd';
import { BareLayout } from 'Components/RootLayout/Bare';
import get from 'lodash-es/get';
import React from 'react';
import { Link } from 'react-router-dom';

export const ErrorComponent = ({ history }) => {
  const errors = get(history, 'location.state.errors', []);
  const message = errors[0].message || 'An unknown error has occurred.';
  console.log(errors[0]);

  return (
    <BareLayout center>
      <Typography.Title>Error</Typography.Title>
      <Typography.Paragraph type="danger">{message}</Typography.Paragraph>
      <Link to="/">Back to Dashboard</Link>
    </BareLayout>
  );
};
