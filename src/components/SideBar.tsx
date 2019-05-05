import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

import { UserMenu } from 'Components/UserMenu';
import { Logo } from 'Components/Logo';
import { Menu, MenuItem } from 'Components/Menu';

const SideMenu = styled.div`
  height: 100%;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserContainer = styled.div`
  // padding: 7px 20px;
`;

export const SideBar = (props) => {
  let user = useSelector((state) => state.app.user);
  if (!user) {
    user = { name: 'Not Found' };
  }
  return (
    <>
      <LogoContainer>
        <Logo size={30} />
      </LogoContainer>
      <SideMenu>
        <Menu>
          <Menu.Section title="Configure">
            <MenuItem icon="home" to="/">
              Dashboard
            </MenuItem>
            <MenuItem icon="code" to="/adapters">
              Adapters
            </MenuItem>
            <MenuItem icon="fork" rotate={90} to="/workflows">
              Workflows
            </MenuItem>
          </Menu.Section>
          <Menu.Section title="Other">
            <MenuItem icon="tags" to="/stuff">
              Stuff
            </MenuItem>
            <MenuItem icon="setting" to="/things">
              Things
            </MenuItem>
          </Menu.Section>
        </Menu>
      </SideMenu>
      <UserContainer>
        <UserMenu user={user} />
      </UserContainer>
    </>
  );
};
