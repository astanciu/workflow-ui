import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
`;

export const Err = ({ error }) => {
  return (
    <Container>
      <h2>Error</h2>
      <p>{error.message}</p>
    </Container>
  );
};
