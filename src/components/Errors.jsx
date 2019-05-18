import { Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
  width: 100%;
  height: 50%;
  // border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  margin-bottom: 20px;
`;
export const PageError = ({ error, children = null }) => (
  <Container>
    <Typography.Title>Oops</Typography.Title>
    <Text>{error}</Text>
    <Text>{children}</Text>
  </Container>
);
