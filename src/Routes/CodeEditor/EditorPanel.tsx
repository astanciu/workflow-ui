import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Collapse } from 'antd';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Run } from './Runner';
import { FlexRow } from 'Components/Layout';
import { HTMLNodeIcon } from 'Components/NodeIcon';
import { Title } from 'Components/EditableTitle';
import { PanelSection } from 'Components/PanelSection';

const Container = styled.div`
  // border: 1px solid red;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Scrollable = styled.div`
  // border: 1px solid red;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  ${({ style }) => style}
`;

export const EditorPanel = ({ adapter }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(adapter.name);
  const runCode = async () => {
    let result = await Run(adapter.files);
    console.log('Result: ', result);
  };
  return (
    <Container>
      <FlexRow style={{ padding: '20px 0px 0px 20px' }}>
        <HTMLNodeIcon icon={adapter.icon} size={20} />
        <Title>{title}</Title>
      </FlexRow>

      <Scrollable style={{ paddingTop: '20px' }}>
        <PanelSection title="Input" icon="login">
          Hi There
        </PanelSection>
        <PanelSection title="Run" icon="code">
          <Button onClick={runCode} icon="code">
            Run
          </Button>
        </PanelSection>
        <PanelSection title="Output" icon="logout">
          Hi There
        </PanelSection>
      </Scrollable>
    </Container>
  );
};
