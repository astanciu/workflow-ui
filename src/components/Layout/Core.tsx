import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { SideBar } from 'Components/SideBar';

const Root = styled.div`
  // border: 1px solid red;
  display: flex;
  height: 100%;
  ${({ showPanel }) => showPanel && 'max-width: 1300px;'}
  justify-content: flex-start;
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
  overflow-y: auto;
`;

const Center = styled.div`
  // border: 1px solid red;
  min-width: 500px;
  ${({ showPanel }) => showPanel && 'max-width: 850px;'}
  width: 100%;
  background-color: #e7ebee;
  overflow-y: auto;
`;

const Right = styled.div`
  min-width: 300px;

  background-color: transparent;
  box-shadow: -1px 0px 3px 0px #00000021
  z-index: 10;
  overflow-y: auto;
`;

export const Layout = ({ children }) => {
  const showPanel = useSelector((state) => state.app.showPanel);
  return (
    <Root showPanel={showPanel}>
      <Left>
        <SideBar />
      </Left>
      <Center showPanel={showPanel}>{children}</Center>
      {showPanel && <Right id="right-bar">right</Right>}
    </Root>
  );
};
