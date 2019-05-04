import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from 'Components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: gray;

  & :hover {
    cursor: pointer;
  }
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
  color: redcolor: #6c7277;
  display: inline-block;
  font-size: 14px;
  margin-right: 7px;
`;

export const UserMenu = ({ user }) => {
  const [show, setShow] = useState(false);

  // const change = (a, b) => {
  //   console.log(a, b);
  // };

  return (
    <Container
      onClick={() => {
        console.log(`clicked`, show, !show);
        setShow(!show);
      }}
    >
      <UserIcon user={user} size={25} />
      <UserName>{user.name}</UserName>
      <Icon icon="caret-up" size={15} color="#888" />
    </Container>
  );
};

export const UserIcon = ({ user, size = 15 }) => {
  return <ProfileImage src={user.picture} size={size} />;
};
