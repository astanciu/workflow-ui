import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
`;

const Title = styled.div`
  color: #525a5f;
  font-size: 1.2em;
  font-weight: 700;
  letter-spacing: 0.04em;
`;

type Props = {
  empty?: boolean;
  title?: string;
  action?: any;
  children?: any;
  r?: any;
};

export const Page = ({ empty = false, title, children, action, r }: Props) => {
  return (
    <PageWrapper ref={r}>
      {!empty && (
        <Header>
          <Title>{title}</Title>
          {action && (
            <Button type="primary" icon={action.icon || 'plus'} size="default" onClick={action.onClick}>
              {action.title}
            </Button>
          )}
        </Header>
      )}
      {children}
    </PageWrapper>
  );
};

Page.Header = Header;
Page.Title = Title;
