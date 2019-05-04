import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from 'Components';
import { useSelector } from 'react-redux';

const Container = styled.div`
  margin-top: 30px;
`;
const Section = styled.div`
  margin-top: 30px;
`;
const Title = styled.div`
  padding: 5px 20px;
  color: #8d9eb3;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.15em;
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const ItemWrapper = styled.div`
  a {
    color: inherit;
    text-decoration: none;
  }
`;
const Item = styled.div`
  // border: 1px solid red;
  border-left: 3px solid transparent;
  padding: 6px 0px;
  padding-left: 20px;
  display: flex;

  align-items: center;

  &:hover {
    cursor: pointer;
  }

  span {
    margin-left: 8px;
  }

  ${({ active }) =>
    active &&
    `
      background: #e8ebee;
      border-left: 3px solid #0295fd;
      a {
        color: red
      }
    `}
`;

export const Menu = ({ children }) => {
  return <Container>{children}</Container>;
};

Menu.Section = ({ title, children }) => {
  return (
    <Section>
      <Title>{title}</Title>
      <ItemsList>{children}</ItemsList>
    </Section>
  );
};

export const MenuItem = ({ children, to, icon, ...props }) => {
  const router = useSelector((state) => state.router);
  const isActive = router.location.pathname === to;

  return (
    <ItemWrapper>
      <Link to={to}>
        <Item active={isActive}>
          <Icon icon={icon} size={15} color={isActive ? '#777' : '#8d9eb3'} />
          <span>{children}</span>
        </Item>
      </Link>
    </ItemWrapper>
  );
};
