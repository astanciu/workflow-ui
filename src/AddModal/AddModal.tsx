import React, { useState } from 'react';

import { MenuItem } from './MenuItem';
import {
  ModalBackdrop,
  ModalContainer,
  SideMenuContainer,
  MainContainer,
  SearchContainer,
  NodesContainer,
  FooterContainer,
  Separator
} from './AddModalStyles';
import { SearchBar } from './SearchBar';
import { NodeList } from './NodeList';
import { Icon, LinkButton } from 'Components';

export const AddModal = props => {
  const [selected, select] = useState('');
  return (
    <ModalBackdrop>
      <ModalContainer>
        <SideMenuContainer>
          <MenuItem
            title="Create"
            icon="node"
            desc="Create new Node"
            selected={selected === 'create'}
            onClick={() => select('create')}
          />
          <Separator />
          <MenuItem
            title="Mine"
            icon="user"
            desc="Created by me"
            selected={selected === 'mine'}
            onClick={() => select('mine')}
          />
          <MenuItem
            title="Team"
            icon="users"
            desc="Created by my team"
            selected={selected === 'team'}
            onClick={() => select('team')}
          />
          <MenuItem
            title="System"
            icon="hdd"
            desc="Provided by the system"
            selected={selected === 'system'}
            onClick={() => select('system')}
          />
          <MenuItem
            title="Gallery"
            icon="cloud"
            desc="Shared by other Workflow.dev users"
            selected={selected === 'gallery'}
            onClick={() => select('gallery')}
          />
        </SideMenuContainer>
        <MainContainer>
          <SearchContainer>
            <SearchBar />
          </SearchContainer>
          <NodesContainer>
            <NodeList />
          </NodesContainer>
          <FooterContainer>
            <LinkButton onClick={() => console.log('add')}>
              Add To Workflow{' '}
              <Icon icon="arrow-alt-circle-right" color="#1BC757" size={24} />
            </LinkButton>
          </FooterContainer>
        </MainContainer>
      </ModalContainer>
    </ModalBackdrop>
  );
};
