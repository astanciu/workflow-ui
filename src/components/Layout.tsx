import styled from 'styled-components';

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${({ style }) => style}

  ${({ hover }) => hover && `:hover { cursor: pointer;}`}
`;

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ style }) => style}
`;

export const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  ${({ style }) => style}
`;
