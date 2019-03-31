import React from 'react';
import styled from 'styled-components';
import styles from './TopBar.module.css';

const TopBarStyled = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  height: 56px;
  right: 0px;
  background-color: #141414;
  display: flex;
  justify-content: space-between;
`;

const Brand = styled.div`
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 28px;
  color: #e7ebee;
  align-self: center;
  margin-left: 20px;
`;

const Name = styled.span`
  font-family: 'Nunito', sans-serif;
  font-weight: 200;
  font-size: 22px;
  color: #9ca3a9;
  margin-left: 20px;
`;

const UserMenu = styled.div`
  border: 1px solid red;
  align-self: center;
  margin-right: 20px;
`;

export const TopBar = props => {
  return (
    <TopBarStyled>
      <Brand>
        Workflow:<Name>My workflow</Name>
      </Brand>
      <UserMenu>Hello</UserMenu>
    </TopBarStyled>
  );
};
