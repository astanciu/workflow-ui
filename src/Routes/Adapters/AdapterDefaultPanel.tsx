import { Typography } from 'antd';
import { GenericPanel } from 'Components/RootLayout/GenericPanel';
import React from 'react';

export const AdapterDefaultPanel = (props) => {
  return (
    <GenericPanel title="Adapters">
      <Typography.Paragraph>Adapters let you do things.</Typography.Paragraph>
    </GenericPanel>
  );
};
