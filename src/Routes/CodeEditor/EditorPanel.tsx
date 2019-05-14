import { Button } from 'antd';
import { Title } from 'Components/EditableTitle';
import { Center, FlexRow } from 'Components/Layout';
import { Monaco } from 'Components/Monaco';
import { HTMLNodeIcon } from 'Components/NodeIcon';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Run } from './Runner';
import { RunPane } from './RunPane';

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

const defResult = `
  // Results 
`;

const defInput = JSON.stringify({ name: 'Smith' });

export const EditorPanel = ({ adapter }) => {
  const [result, setResult] = useState(defResult);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(defInput);

  const runCode = async () => {
    setLoading(true);
    try {
      let mod = await Run(adapter.files);
      if (typeof mod !== 'function') {
        throw new Error('Must export a function');
      }
      if (mod.length !== 1) {
        throw new Error('Only one param allowed');
      }
      let result = await mod(JSON.parse(input));
      console.log(`result: `, result);
      setResult(JSON.stringify(result));
      setLoading(false);
    } catch (err) {
      console.log(err);
      setResult(err.message);
      setLoading(false);
    }
  };

  return (
    <Container id="editor-panel">
      <FlexRow style={{ padding: '20px 0px 0px 20px' }}>
        <HTMLNodeIcon icon={adapter.icon} size={20} />
        <Title>{adapter.name}</Title>
      </FlexRow>

      <Scrollable style={{ paddingTop: '20px' }}>
        <RunPane title="Run">
          <RunPane.Section style={{ marginTop: '-10px', backgroundColor: '#dbe2e5' }} first>
            <Monaco
              id="input"
              language="json"
              code={input}
              onChange={(code) => setInput(code)}
              width="100%"
              height="200px"
              hideGutter={true}
              toolbar={false}
              focus={false}
            />
          </RunPane.Section>
          <RunPane.Section icon="down-circle">
            <RunPane.Text>
              <Center>
                <div>Enter the input above and execute the Adapter. Output will be show below.</div>

                <Button
                  type="primary"
                  icon="play-circle"
                  style={{ margin: '20px' }}
                  onClick={runCode}
                  loading={loading}
                >
                  Run
                </Button>
              </Center>
            </RunPane.Text>
          </RunPane.Section>
          <RunPane.Section icon="down-circle" style={{ backgroundColor: '#dbe2e5' }}>
            <Monaco
              id="output"
              code={result}
              language="json"
              width="100%"
              height="200px"
              hideGutter={true}
              toolbar={false}
              focus={false}
            />
          </RunPane.Section>
        </RunPane>
      </Scrollable>
    </Container>
  );
};
