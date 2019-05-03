import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SideBarContainer = styled.div`
  // border: 1px solid blue;
`;

export const SideBar = props => {
  return (
    <SideBarContainer>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/adapters">Adapters</Link>
        </li>
        <li>
          <Link to="/workflows">Workflows</Link>
        </li>
      </ul>
    </SideBarContainer>
  );
};
