import React from 'react';
import { Icon } from '../components/Icon';
import {
  MenuListItem,
  IconContainer,
  Content,
  Title,
  Description
} from './MenuItemStyles';

export const MenuItem = ({ title, desc, icon, onClick, selected = false }) => {
  return (
    <a onClick={onClick}>
      <MenuListItem selected={selected}>
        <IconContainer>
          <Icon icon={icon} color="#848C93" size={15} />
        </IconContainer>
        <Content>
          <Title>{title}</Title>
          <Description>{desc}</Description>
        </Content>
      </MenuListItem>
    </a>
  );
};
