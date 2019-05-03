import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { TopBar } from 'Components/TopBar';
import { SideBar } from 'Components/SideBar';

const RootContainerStyled = styled.div`
  // border: 2px solid black;
  width: 1000px;
  margin: auto;
  padding-top: 40px;
`;

export const Layout = ({ children }) => {
  return (
    <>
      <div>
        <Row>
          <TopBar />
        </Row>
      </div>
      <RootContainerStyled>
        <Row>
          <Col xs={2}>
            <SideBar />
          </Col>
          <Col>
            <Container>{children}</Container>
          </Col>
        </Row>
      </RootContainerStyled>
    </>
  );
};
