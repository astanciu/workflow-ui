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
  padding: 7px 20px;
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
            <MenuItem icon="cubes" to="/adapters">
              Adapters
            </MenuItem>
            <MenuItem icon="project-diagram" to="/workflows">
              Workflows
            </MenuItem>
          </Menu.Section>
          <Menu.Section title="Other">
            <MenuItem icon="code-branch" to="/stuff">
              Stuff
            </MenuItem>
            <MenuItem icon="cog" to="/things">
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
