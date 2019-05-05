import React from 'react';
import { Page } from 'Components/Page';
import { Auth } from 'Core/Auth';
import { Button } from 'antd';
export const Things = (props) => {
  return (
    <Page title="Things">
      <Button onClick={() => Auth.silentRefresh()}>Refresh Login</Button>
      <Button onClick={() => Auth.login()}>Login</Button>
    </Page>
  );
};
