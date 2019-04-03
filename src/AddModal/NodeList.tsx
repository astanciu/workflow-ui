import React, { useState } from 'react';

import {
  NodeListWrapper,
  NodeItemWrapper,
  IconContainer,
  Content,
  Title,
  Description
} from './NodeItemStyles';
import { HTMLNodeIcon } from './NodeIcon';
import { nodes } from '../samples/library';

const makeNode = node => {
  return (
    <NodeItemWrapper key={node.id}>
      <IconContainer>
        <HTMLNodeIcon icon={node.icon} size={40} />
      </IconContainer>
      <Content>
        <Title>{node.name}</Title>
        <Description>{node.description}</Description>
      </Content>
    </NodeItemWrapper>
  );
};

export const NodeList = props => {
  const nodeItems = nodes.map(makeNode);
  return <NodeListWrapper>{nodeItems}</NodeListWrapper>;
};
