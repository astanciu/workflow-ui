import { Typography } from 'antd';
import { FlexRow } from 'Components/Layout';
import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
  // border: 1px solid red;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const GenericPanel = ({ title, children }) => {
  return (
    <Container>
      <FlexRow style={{ padding: '20px 0px 20px 20px' }}>
        <Typography.Title level={3}>{title}</Typography.Title>
      </FlexRow>
      <FlexRow style={{ padding: '0px 20px' }}>{children}</FlexRow>
    </Container>
  );
};
