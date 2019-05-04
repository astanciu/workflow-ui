import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { UserMenu } from 'Components/UserMenu';
import { Logo } from 'Components/Logo';

const TopBarContainer = styled.div`
  // border: 1px solid red;
  display: flex;
  align-items: center;
  display: flex;
  height: 56px;
  width: 1000px;
  margin: auto;
  padding: 0px 15px;
`;

const Cont = styled.div`
  height: 56px;
  background-color: #fff;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
`;

const UserContainer = styled.div``;
const LogoContainer = styled.div`
  flex-grow: 1;
`;

export const TopBar = (props) => {
  let user = useSelector((state) => state.app.user);
  if (!user) {
    user = { name: 'Not Found' };
  }

  return (
    <Cont fluid className="foo">
      <TopBarContainer>
        <LogoContainer>
          <Logo size={30} />
        </LogoContainer>
        <UserContainer>
          <UserMenu user={user} />
        </UserContainer>
      </TopBarContainer>
    </Cont>
  );
};
