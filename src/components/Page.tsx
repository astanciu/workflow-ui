import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  color: #525a5f;
  padding-bottom: 20px;
  font-size: 1.2em;
  font-weight: 700;
  letter-spacing: 0.06em;
`;
const PageWrapper = styled.div`
  padding: 20px;
`;

export const Page = ({ title, children }) => {
  return (
    <PageWrapper>
      <Header>{title}</Header>
      {children}
    </PageWrapper>
  );
};
