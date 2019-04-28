import React from 'react';
import styled from 'styled-components';
// import { Container, Row, Col } from 'react-bootstrap';
import { Logo } from 'Components/Logo';

const TopBarContainer = styled.div`
  // border: 1px solid red;
  height: 56px;
  width: 1000px;
  margin: auto;
  padding: 0px 15px;
`;

const Cont = styled.div`
  height: 56px;
  background-color: #141414;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  background-color: #000;
`;

export const TopBar = props => {
  return (
    <Cont fluid className="foo">
      <TopBarContainer>
        <Logo />
      </TopBarContainer>
    </Cont>
  );
};
