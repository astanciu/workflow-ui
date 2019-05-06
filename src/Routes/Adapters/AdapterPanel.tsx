import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Tag, Button, Avatar } from 'antd';
import { Portal } from 'Components/Portal';
import { HTMLNodeIcon } from 'Components/NodeIcon';

const Container = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const AdapterPanel = ({ adapter }) => {
  return <Container>{adapter.name}</Container>;
};
