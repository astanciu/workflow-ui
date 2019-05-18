import { Typography } from 'antd';
import { GenericPanel } from 'Components/RootLayout/GenericPanel';
import React from 'react';

export const WelcomePanel = (props) => {
  return (
    <GenericPanel title="Welcome">
      <Typography.Paragraph>Welcome to workflows</Typography.Paragraph>
    </GenericPanel>
  );
};
