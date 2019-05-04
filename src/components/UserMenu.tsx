import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { push } from 'connected-react-router';
import { Icon } from 'Components';
import { Button } from 'antd';

const Container = styled.div`
  // border: 1px solid red;
  padding: 10px;
  display: flex;
  flex-direction: column;

  ${({ selected }) =>
    selected &&
    `
    background-color: #f3f3f3;
    padding-top: 20px;
  `}

  & :hover {
    cursor: pointer;
  }
`;

const UserPill = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileImage = styled.img`
  border-radius: 15px;
  margin: 0px 10px;
  filter: grayscale(100%);
  ${({ size = 30 }) => `
  width: ${size}px;
  height: ${size}px;
  `}

  ${Container}:hover & {
    filter: none;
  }
`;

const UserName = styled.div`
  color: #6c7277;
  display: inline-block;
  font-size: 14px;
  margin-right: 7px;
`;

const Menu = styled.div`
  ${({ visible }) => (visible ? `display: flex;` : `display: none;`)}

  flex-direction: column;
  padding: 10px 0px;
  align-items: stretch;
`;
const Item = styled.div`
  padding: 10px;
  text-align: center;
`;

export const UserMenu = ({ user, ...props }) => {
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();
  const logout = () => {
    console.log(`clicked`);
    dispatch(push('/logout'));
  };
  return (
    <Container selected={selected} onClick={() => setSelected(!selected)}>
      <UserPill>
        <UserIcon user={user} size={25} />
        <UserName>{user.name}</UserName>
        <Icon icon={selected ? 'caret-down' : 'caret-up'} size={15} color="#888" />
      </UserPill>
      <Menu visible={selected}>
        <Item>
          <Button onClick={logout}>Log Out</Button>
        </Item>
      </Menu>
    </Container>
  );
};

export const UserIcon = ({ user, size = 15 }) => {
  return <ProfileImage src={user.picture} size={size} />;
};
