import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
import { FlexRow } from 'Components/Layout';

const Container = styled.div`
  // border-top: 3px solid #1b96ff;
  margin-bottom: 20px;
  padding: 0px;
  margin: 0px 0px 20px 10px;
`;
const Title = styled.div`
  font-size: 1em;
  font-weight: 400;
  margin-left: 5px;
`;
const Panel = styled.div`
  border: 1px solid #dad9d9;
  border-bottom: none;
  ${({ color }) => color && `border-top: 3px solid ${color}`}

  background-color: #fafbfd;
  box-shadow: 0px 2px 5px 0px #e0e0e06b;
  min-height: 50px;
  
  // ${({ maxHeight }) => maxHeight && `max-height: ${maxHeight}`}
  display: flex;
  flex-direction: column;

  // &:nth-child(2) {
  //   margin-top: -28px;
  // }

  &:last-child {
    border-bottom: 1px solid #dad9d9;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
`;

const PanelWrapper = styled.div`
  border-top: 3px solid ${({ color }) => color};
  min-height: 50px;
  display: ${({ open }) => (open ? 'flex' : 'none')};
  flex-direction: column;
`;

const IconWrapper = styled.div`
  width: 28px;
  height: 28px;
  position: relative;
  top: -16px;
  border-radius: 20px;
  margin: 0px auto;
  background-color: #fafbfd;
  text-align: center;
  box-shadow: 0px 0px 0 5px #fafbfd;
  z-index: 1;
`;

const PanelIconWrapper = styled.div`
  width: 28px;
  height: 28px;
  position: relative;
  top: -16px;
  border-radius: 20px;
  margin: 0px auto;
  background-color: #1b96ff;
  text-align: center;
  box-shadow: 0px 0px 0 5px white;
  z-index: 1;
`;

const Content = styled.div`
  ${({ pullUp }) => pullUp && 'margin-top: -28px;'};
`;

const PaddedContent = styled.div`
  margin: 20px 5px;
`;

export const RunPane = ({ children, title = '' }) => {
  const [open, setOpen] = useState(true);
  return (
    <Container id="run-pane">
      <FlexRow onClick={() => setOpen(!open)} style={{ hover: '' }} hover={true}>
        <Icon type="caret-right" rotate={open ? 90 : 0} />
        <Title>{title}</Title>
      </FlexRow>
      <PanelWrapper color="#1b96ff" open={open} id="panel-wrapper">
        <PanelIconWrapper>
          <Icon
            type="play-circle"
            style={{ fontSize: '1.05em', color: 'white', position: 'relative', top: '6px', zIndex: 100 }}
          />
        </PanelIconWrapper>
        {children}
      </PanelWrapper>
    </Container>
  );
};

RunPane.Section = ({ children, icon = '', title = '', style = {}, first = false }) => {
  return (
    <Panel style={style} id="run-pane-section">
      {icon && (
        <IconWrapper>
          <Icon type={icon} style={{ fontSize: '2em', color: '#a2abaf', position: 'relative', top: '1px' }} />
        </IconWrapper>
      )}
      <Content pullUp={!first} id="run-pane-content">
        {children}
      </Content>
    </Panel>
  );
};

RunPane.Text = ({ children }) => <PaddedContent>{children}</PaddedContent>;
