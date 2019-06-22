import { Icon } from 'antd';
import { FlexRow } from 'Components/Layout';
import { useLocalStorage } from 'Core/useLocalStorage';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border-top: 1px solid #d1d6d8;
  padding: 10px;
`;

const Title = styled.div`
  font-size: 1em;
  font-weight: 600;
  margin-left: 5px;
`;
const Panel = styled.div`
  margin-top: 10px
  min-height: 50px;
  display: ${({ open }) => (open ? 'flex' : 'none')};
  flex-direction: column;
  padding: 5px;
  ${({ center }) => center && 'text-align: center;'}
`;

export const PanelSection = ({ children, title, icon = '', color = '#1b96ff', center = false }) => {
  const [open, setOpen] = useLocalStorage(`settings:adapterpanel:${title}`, true);
  return (
    <Container>
      <FlexRow onClick={() => setOpen(!open)} style={{ hover: '' }} hover={true}>
        <Icon type="caret-right" rotate={open ? 90 : 0} />
        <Title>{title}</Title>
      </FlexRow>
      <Panel color={color} open={open} center={center}>
        {children}
      </Panel>
    </Container>
  );
};
