import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Collapse, Icon } from 'antd';
import { FlexRow } from 'Components/Layout';

const Container = styled.div`
  border-top: 1px solid #d1d6d8;
  margin-bottom: 20px;
  padding: 10px;
`;
const Title = styled.div`
  font-size: 1em;
  font-weight: 400;
  margin-left: 5px;
`;
const Panel = styled.div`
  border: 1px solid #dad9d9;
  border-top: 3px solid ${({ color }) => color};
  border-radius: 3px;
  background-color: #fafbfd;
  box-shadow: 0px 2px 5px 0px #e0e0e06b;
  min-height: 50px;
  display: ${({ open }) => (open ? 'flex' : 'none')};
  flex-direction: column;
  padding: 5px;
`;

const IconWrapper = styled.div`
  width: 28px;
  height: 28px;
  position: relative;
  top: -20px;
  border-radius: 20px;
  margin: 0px auto;
  background-color: #1b96ff;
  text-align: center;
  box-shadow: 0px 0px 0 5px white;
`;

export const PanelSection = ({ children, title, icon = '', color = '#1b96ff' }) => {
  const [open, setOpen] = useState(true);
  return (
    <Container>
      <FlexRow onClick={() => setOpen(!open)} style={{ hover: '' }} hover={true}>
        <Icon type="caret-right" rotate={open ? 90 : 0} />
        <Title>{title}</Title>
      </FlexRow>
      <Panel color={color} open={open}>
        <IconWrapper>
          <Icon type={icon} style={{ fontSize: '1em', color: 'white', position: 'relative', top: '5px' }} />
        </IconWrapper>
        {children}
      </Panel>
    </Container>
  );
};
