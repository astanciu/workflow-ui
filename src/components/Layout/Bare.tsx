import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: #e7ebee;
  overflow: auto;
`;

const Content = styled.div`
  padding: 20px;

  ${({ center }) => center && 'text-align: center;'}
`;

export const BareLayout = ({ children, center = false }) => {
  return (
    <Container>
      <Content center={center}>{children}</Content>
    </Container>
  );
};
