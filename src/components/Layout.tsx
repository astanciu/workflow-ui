import React from 'react';
import styled from 'styled-components';

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${({ style }) => style}
`;

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ style }) => style}
`;
