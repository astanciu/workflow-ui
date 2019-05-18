import { SideBar } from 'Components/SideBar';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Root = styled.div`
  // border: 1px solid red;
  display: flex;
  height: 100%;
  // ${({ showPanel }) => showPanel && 'max-width: 1300px;'}
  justify-content: space-between;
  align-items: stretch;
  background-color: #e7ebee;
  overflow: auto;
`;

const Left = styled.div`
  min-width: 200px;
  box-shadow: 1px 0px 3px 0px #00000021
  z-index: 10;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background-color: #fff;
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
  background-color: #fff;
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
      {showPanel && (
        <Right id="side-panel">
          <h1>Welcome</h1>
          <p>This is a test</p>
        </Right>
      )}
    </Root>
  );
};
