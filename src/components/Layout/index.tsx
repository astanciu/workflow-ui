import React from 'react';
import styled from 'styled-components';
import { SideBar } from 'Components/SideBar';

const Root = styled.div`
  // border: 1px solid red;
  display: flex;
  height: 100%;
  max-width: 1300px;
  justify-content: space-between;
  align-items: stretch;
  background-color: #b2b3b1;
  overflow: auto;
  background-color: #fff;
`;

const Left = styled.div`
  min-width: 200px;
  box-shadow: 1px 0px 3px 0px #00000021
  z-index: 10;
  display: flex;
  flex-direction: column;
`;
const Center = styled.div`
  min-width: 500px;
  max-width: 850px;
  width: 100%;
  background-color: #e7ebee;
  padding: 0px 20px;
`;
const Right = styled.div`
  min-width: 300px;

  background-color: #fff;
  box-shadow: -1px 0px 3px 0px #00000021
  z-index: 10;
`;

export const Layout = ({ children }) => {
  return (
    <Root>
      <Left>
        <SideBar />
      </Left>
      <Center>{children}</Center>
      <Right id="right-bar">right</Right>
    </Root>
  );
};
