import React from 'react';
import { Page } from 'Components/Page';
// import { Portal } from 'Components/Portal';
import { FlexCol, FlexRow } from 'Components/Layout';
import { Button } from 'antd';
// import styled from 'styled-components';
// import { useGetData } from 'Core/Data';
import { Files } from './Files';
import { Editor } from './Editor';

export const CodeEditor = () => {
  return (
    <Page empty={true}>
      <Page.Header>
        <Page.Title>Google Adapter</Page.Title>
      </Page.Header>
      <FlexRow style={{ alignItems: 'stretch', height: '100%' }}>
        <Files />
        <Editor />
      </FlexRow>
    </Page>
  );
};
