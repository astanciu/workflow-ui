import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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

export const TopBar = (props) => {
  const { user } = useSelector((state) => ({
    user: state.app.user,
  }));
  return (
    <Cont fluid className="foo">
      <TopBarContainer>
        <Logo />
        <Link to="/login">Login</Link>
        <Link to="/logout">Logout</Link>
        <div>{user.name}</div>
      </TopBarContainer>
    </Cont>
  );
};
