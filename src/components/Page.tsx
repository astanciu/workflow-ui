import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

const PageWrapper = styled.div`
  padding: 20px;
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
};

export const Page = ({ empty = false, title, children, action }: Props) => {
  return (
    <PageWrapper>
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
